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
var forms_1 = require("@angular/forms");
var child_form_1 = require("../child-form");
/**
 * Created by suat on 19-Sep-17.
 */
var ValueViewComponent = /** @class */ (function (_super) {
    __extends(ValueViewComponent, _super);
    function ValueViewComponent() {
        var _this = _super.call(this) || this;
        _this.mandatory = false;
        _this.largeInput = false;
        // the definition of the property
        _this.definition = null;
        _this.json = JSON;
        _this.valueChange = new core_1.EventEmitter();
        return _this;
    }
    Object.defineProperty(ValueViewComponent.prototype, "value", {
        get: function () {
            return this.valueObj;
        },
        set: function (val) {
            this.valueObj = val;
            this.valueChange.emit(this.valueObj);
        },
        enumerable: true,
        configurable: true
    });
    ValueViewComponent.prototype.ngOnInit = function () {
        this.control = new forms_1.FormControl(null, this.mandatory ? forms_1.Validators.required : null);
        this.addToParentForm(this.propName, this.control);
    };
    ValueViewComponent.prototype.ngOnDestroy = function () {
        this.removeFromParentForm(this.propName);
    };
    __decorate([
        core_1.Input(),
        __metadata("design:type", String)
    ], ValueViewComponent.prototype, "presentationMode", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", String)
    ], ValueViewComponent.prototype, "propName", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Boolean)
    ], ValueViewComponent.prototype, "mandatory", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Boolean)
    ], ValueViewComponent.prototype, "largeInput", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", String)
    ], ValueViewComponent.prototype, "definition", void 0);
    __decorate([
        core_1.Output(),
        __metadata("design:type", Object)
    ], ValueViewComponent.prototype, "valueChange", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Object),
        __metadata("design:paramtypes", [Object])
    ], ValueViewComponent.prototype, "value", null);
    ValueViewComponent = __decorate([
        core_1.Component({
            selector: 'value-view',
            templateUrl: './value-view.component.html'
        }),
        __metadata("design:paramtypes", [])
    ], ValueViewComponent);
    return ValueViewComponent;
}(child_form_1.ChildForm));
exports.ValueViewComponent = ValueViewComponent;
//# sourceMappingURL=value-view.component.js.map