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
var child_form_1 = require("../child-form");
var forms_1 = require("@angular/forms");
var unit_service_1 = require("../../common/unit-service");
var QuantityViewComponent = /** @class */ (function (_super) {
    __extends(QuantityViewComponent, _super);
    function QuantityViewComponent(fb, unitService) {
        var _this = _super.call(this) || this;
        _this.fb = fb;
        _this.unitService = unitService;
        _this.mandatory = false;
        _this.readonly = true;
        // whether the quantity value can have no value at all
        _this.zeroValue = false;
        // the definition of this quantity
        _this.definition = null;
        // type of this quantity such as time or volume
        _this.type = null;
        // single mode events
        _this.onSelectChange = new core_1.EventEmitter();
        // edit mode events
        _this.onValueAdded = new core_1.EventEmitter();
        _this.onValueDeleted = new core_1.EventEmitter();
        _this.onPropNameEdit = new core_1.EventEmitter();
        // the validator below is used to enforce both values are populated in case
        // the amount element is optional and only one of the fields are filled in
        _this.bothValuesExist = function (control) {
            var quantity = control.get('quantity');
            var unit = control.get('unit');
            // if only one of the fields is filled in
            if (((!quantity || !quantity.value) && (unit && unit.value))
                || ((!unit || !unit.value) && (quantity && quantity.value))) {
                return { bothValues: false };
            }
            else {
                return null;
            }
        };
        _this.quantityForm = _this.fb.group({});
        _this.quantityFormArray = _this.fb.array([]);
        _this.parentFormKey = ubl_model_utils_1.UBLModelUtils.generateUUID();
        _this.json = JSON;
        _this.unitValues = [];
        _this.quantityForm.addControl('values', _this.quantityFormArray);
        return _this;
    }
    QuantityViewComponent.prototype.ngOnInit = function () {
        var _this = this;
        if (this.type) {
            this.unitService.getCachedUnitList(this.type).then(function (res) {
                _this.unitValues = [""].concat(res);
            });
        }
        this.createFormControlsForQuantities();
        this.addToParentForm(this.parentFormKey, this.quantityForm);
    };
    QuantityViewComponent.prototype.ngOnDestroy = function () {
        this.removeFromParentForm(this.parentFormKey);
    };
    QuantityViewComponent.prototype.addNewValue = function () {
        this.quantity.push(ubl_model_utils_1.UBLModelUtils.createQuantity());
        var newGroup = this.createFormControlForQuantity();
        this.quantityFormArray.push(newGroup);
        this.onValueAdded.emit();
    };
    QuantityViewComponent.prototype.removeValue = function (index) {
        var value = this.quantity[index].value;
        this.quantity.splice(index, 1);
        // move the editible prop name control to first control in quantity form array
        if (this.quantityFormArray.controls.length > 1 && this.editablePropName) {
            this.quantityFormArray.controls[1].addControl('propName', this.quantityFormArray.controls[0].controls['propName']);
        }
        this.quantityFormArray.removeAt(index);
        this.onValueDeleted.emit(value);
    };
    QuantityViewComponent.prototype.selectChanged = function (event) {
        this.onSelectChange.emit(event);
    };
    QuantityViewComponent.prototype.onPropNameEditFocusOut = function (event) {
        this.onPropNameEdit.emit(event.target.value);
    };
    QuantityViewComponent.prototype.createFormControlsForQuantities = function () {
        for (var i = 0; i < this.quantity.length; i++) {
            var valueFormGroup = this.createFormControlForQuantity();
            if (i == 0 && this.editablePropName) {
                var propNameControl = new forms_1.FormControl(null, forms_1.Validators.required);
                valueFormGroup.addControl('propName', propNameControl);
            }
            this.quantityFormArray.push(valueFormGroup);
        }
    };
    QuantityViewComponent.prototype.createFormControlForQuantity = function () {
        var quantityControl = new forms_1.FormControl(null, this.mandatory ? forms_1.Validators.required : null);
        var unitControl = new forms_1.FormControl(null, this.mandatory ? forms_1.Validators.required : null);
        var valueFormGroup = new forms_1.FormGroup({}, this.bothValuesExist);
        valueFormGroup.addControl('quantity', quantityControl);
        valueFormGroup.addControl('unit', unitControl);
        return valueFormGroup;
    };
    __decorate([
        core_1.Input(),
        __metadata("design:type", String)
    ], QuantityViewComponent.prototype, "presentationMode", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", String)
    ], QuantityViewComponent.prototype, "propName", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Boolean)
    ], QuantityViewComponent.prototype, "mandatory", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Boolean)
    ], QuantityViewComponent.prototype, "readonly", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Array)
    ], QuantityViewComponent.prototype, "quantity", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Boolean)
    ], QuantityViewComponent.prototype, "multiValue", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Boolean)
    ], QuantityViewComponent.prototype, "zeroValue", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Boolean)
    ], QuantityViewComponent.prototype, "editablePropName", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", String)
    ], QuantityViewComponent.prototype, "definition", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Object)
    ], QuantityViewComponent.prototype, "type", void 0);
    __decorate([
        core_1.Output(),
        __metadata("design:type", Object)
    ], QuantityViewComponent.prototype, "onSelectChange", void 0);
    __decorate([
        core_1.Output(),
        __metadata("design:type", Object)
    ], QuantityViewComponent.prototype, "onValueAdded", void 0);
    __decorate([
        core_1.Output(),
        __metadata("design:type", Object)
    ], QuantityViewComponent.prototype, "onValueDeleted", void 0);
    __decorate([
        core_1.Output(),
        __metadata("design:type", Object)
    ], QuantityViewComponent.prototype, "onPropNameEdit", void 0);
    QuantityViewComponent = __decorate([
        core_1.Component({
            selector: 'quantity-view',
            templateUrl: './quantity-view.component.html'
        }),
        __metadata("design:paramtypes", [forms_1.FormBuilder,
            unit_service_1.UnitService])
    ], QuantityViewComponent);
    return QuantityViewComponent;
}(child_form_1.ChildForm));
exports.QuantityViewComponent = QuantityViewComponent;
//# sourceMappingURL=quantity-view.component.js.map