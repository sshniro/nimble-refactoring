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
var child_form_1 = require("../child-form");
var forms_1 = require("@angular/forms");
var unit_service_1 = require("../../common/unit-service");
var AmountViewComponent = /** @class */ (function (_super) {
    __extends(AmountViewComponent, _super);
    function AmountViewComponent(fb, unitService) {
        var _this = _super.call(this) || this;
        _this.fb = fb;
        _this.unitService = unitService;
        _this.mandatory = false;
        // units for currency
        _this.currencyValues = [];
        // the validator below is used to enforce both values are populated in case
        // the amount element is optional and only one of the fields are filled in
        _this.bothValuesExist = function (control) {
            var amount = control.get('amount');
            var currency = control.get('currency');
            // if only one of the fields is filled in
            if (((!amount || !amount.value) && (currency && currency.value))
                || ((!currency || !currency.value) && (amount && amount.value))) {
                return { bothValues: false };
            }
            else {
                return null;
            }
        };
        _this.amountForm = _this.fb.group({}, { validator: _this.bothValuesExist });
        return _this;
    }
    AmountViewComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.unitService.getCachedUnitList("currency_quantity").then(function (res) {
            _this.currencyValues = [""].concat(res);
        });
        var amountControl = new forms_1.FormControl(null, this.mandatory ? forms_1.Validators.required : null);
        var currencyControl = new forms_1.FormControl(null, this.mandatory ? forms_1.Validators.required : null);
        this.amountForm.addControl('amount', amountControl);
        this.amountForm.addControl('currency', currencyControl);
        this.addToParentForm(this.propName, this.amountForm);
    };
    AmountViewComponent.prototype.ngOnDestroy = function () {
        this.removeFromParentForm(this.propName);
    };
    __decorate([
        core_1.Input(),
        __metadata("design:type", String)
    ], AmountViewComponent.prototype, "presentationMode", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", String)
    ], AmountViewComponent.prototype, "propName", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Boolean)
    ], AmountViewComponent.prototype, "mandatory", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Array)
    ], AmountViewComponent.prototype, "amount", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", String)
    ], AmountViewComponent.prototype, "definition", void 0);
    AmountViewComponent = __decorate([
        core_1.Component({
            selector: 'amount-view',
            templateUrl: './amount-view.component.html'
        }),
        __metadata("design:paramtypes", [forms_1.FormBuilder,
            unit_service_1.UnitService])
    ], AmountViewComponent);
    return AmountViewComponent;
}(child_form_1.ChildForm));
exports.AmountViewComponent = AmountViewComponent;
//# sourceMappingURL=amount-view.component.js.map