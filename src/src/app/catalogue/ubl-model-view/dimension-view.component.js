"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var ubl_model_utils_1 = require("../model/ubl-model-utils");
var bp_data_service_1 = require("../../bpe/bp-view/bp-data-service");
var forms_1 = require("@angular/forms");
var child_form_1 = require("../child-form");
/**
 * Created by suat on 04-Oct-17.
 */
var DimensionViewComponent = /** @class */ (function (_super) {
    __extends(DimensionViewComponent, _super);
    function DimensionViewComponent(bpDataService, cdr) {
        var _this = _super.call(this) || this;
        _this.bpDataService = bpDataService;
        _this.cdr = cdr;
        _this.dimensionForm = new forms_1.FormGroup({});
        _this.dimensions = new Map();
        _this.object = Object;
        return _this;
    }
    DimensionViewComponent.prototype.ngOnInit = function () {
        this.createDimensionBlocks();
        this.addToParentForm('dimensions', this.dimensionForm);
    };
    DimensionViewComponent.prototype.ngOnDestroy = function () {
        this.removeFromParentForm('dimensions');
    };
    DimensionViewComponent.prototype.ngOnChanges = function (changes) {
        // manually triggering the creation of dimension blocks as the list is initialized after ngOnInit is called
        var itemDimensionChanges = changes.itemDimensions;
        if (itemDimensionChanges && !itemDimensionChanges.firstChange) {
            this.createDimensionBlocks();
        }
    };
    DimensionViewComponent.prototype.addValueToDimension = function (attributeId, unitCode) {
        var dimension = ubl_model_utils_1.UBLModelUtils.createDimension(attributeId, unitCode);
        this.itemDimensions.push(dimension);
        this.createDimensionBlocks();
    };
    DimensionViewComponent.prototype.addNewDimension = function (attributeId, unitCode) {
        // check existence of same dimension
        var index = this.itemDimensions.findIndex(function (dim) { return dim.attributeID == attributeId; });
        if (index != -1) {
            return;
        }
        this.addValueToDimension(attributeId, unitCode);
    };
    DimensionViewComponent.prototype.removeDimension = function (attributeId, value) {
        var dimension = this.itemDimensions;
        var index = dimension.findIndex(function (dim) { return dim.attributeID == attributeId && dim.measure.value == value; });
        dimension.splice(index, 1);
        this.createDimensionBlocks();
    };
    DimensionViewComponent.prototype.updateDimensionAttribute = function (attributeId, value) {
        var _this = this;
        // check the new dimension name already exists
        var index = this.itemDimensions.findIndex(function (dim) { return dim.attributeID == value; });
        if (index == -1) {
            for (var _i = 0, _a = this.itemDimensions; _i < _a.length; _i++) {
                var dim = _a[_i];
                if (dim.attributeID == attributeId) {
                    dim.attributeID = value;
                }
            }
            this.createDimensionBlocks();
            // in case the dimension name is updated to an existing dimension, the changes are not reflected to the
            // actual dimension list and the view is re-rendered
        }
        else {
            this.keys = [];
            setTimeout(function () {
                _this.createDimensionBlocks();
            });
        }
    };
    // TODO: this is not the proper place to have such a method
    DimensionViewComponent.prototype.selectDimension = function (attributeId, event) {
        this.bpDataService.updateDimension(attributeId, event);
        this.createDimensionBlocks();
    };
    // this process might be realized in a pipe
    DimensionViewComponent.prototype.createDimensionBlocks = function () {
        this.dimensions = new Map();
        //this.removeFromParentForm('dimensions');
        for (var _i = 0, _a = this.itemDimensions; _i < _a.length; _i++) {
            var dim = _a[_i];
            if (this.dimensions.has(dim.attributeID)) {
                this.dimensions.get(dim.attributeID).push(dim.measure);
            }
            else {
                this.dimensions.set(dim.attributeID, [dim.measure]);
            }
        }
        this.keys = Array.from(this.dimensions.keys());
    };
    __decorate([
        core_1.Input(),
        __metadata("design:type", String)
    ], DimensionViewComponent.prototype, "presentationMode", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", String)
    ], DimensionViewComponent.prototype, "header", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Array)
    ], DimensionViewComponent.prototype, "itemDimensions", void 0);
    DimensionViewComponent = __decorate([
        core_1.Component({
            selector: 'dimension-view',
            templateUrl: './dimension-view.component.html'
        }),
        __metadata("design:paramtypes", [bp_data_service_1.BPDataService,
            core_1.ChangeDetectorRef])
    ], DimensionViewComponent);
    return DimensionViewComponent;
}(child_form_1.ChildForm));
exports.DimensionViewComponent = DimensionViewComponent;
//# sourceMappingURL=dimension-view.component.js.map