"use strict";
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
var unit_service_1 = require("./unit-service");
var utils_1 = require("./utils");
var amount_1 = require("../catalogue/model/publish/amount");
var AmountInputComponent = /** @class */ (function () {
    function AmountInputComponent(unitService) {
        this.unitService = unitService;
        this.visible = true;
        this.disabled = false;
        this.presentationMode = "edit";
        this.labelClass = "col-3";
        this.labelMainClass = "";
        this.rowClass = "";
        this.placeholder = "Enter value here...";
        this.unitPlaceholder = "Unit";
        this.valueTextClass = "";
        this.disableAmountCurrency = false;
    }
    AmountInputComponent.prototype.ngOnInit = function () {
        var _this = this;
        if (!this.valueClass) {
            this.valueClass = this.label ? "col-9" : "col-12";
        }
        if (this.amountType) {
            this.amountCurrencies = ["Loading..."];
            this.unitService.getCachedUnitList(this.amountType)
                .then(function (units) {
                _this.amountCurrencies = units;
                _this.initAmountCurrency();
            });
        }
        else {
            if (this.amountCurrencies != null && this.amountCurrencies.length > 0) {
                this.initAmountCurrency();
            }
        }
    };
    AmountInputComponent.prototype.initAmountCurrency = function () {
        if (this.amount.currencyID == null && this.amountCurrencies != null) {
            this.amount.currencyID = this.amountCurrencies[0];
        }
    };
    AmountInputComponent.prototype.amountToString = function () {
        return utils_1.amountToString(this.amount);
    };
    __decorate([
        core_1.Input(),
        __metadata("design:type", Boolean)
    ], AmountInputComponent.prototype, "visible", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Boolean)
    ], AmountInputComponent.prototype, "disabled", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", String)
    ], AmountInputComponent.prototype, "presentationMode", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", String)
    ], AmountInputComponent.prototype, "label", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", String)
    ], AmountInputComponent.prototype, "definition", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", String)
    ], AmountInputComponent.prototype, "labelClass", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", String)
    ], AmountInputComponent.prototype, "labelMainClass", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", String)
    ], AmountInputComponent.prototype, "rowClass", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", String)
    ], AmountInputComponent.prototype, "valueClass", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", String)
    ], AmountInputComponent.prototype, "placeholder", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", String)
    ], AmountInputComponent.prototype, "unitPlaceholder", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", String)
    ], AmountInputComponent.prototype, "valueTextClass", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", amount_1.Amount)
    ], AmountInputComponent.prototype, "amount", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Array)
    ], AmountInputComponent.prototype, "amountCurrencies", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", String)
    ], AmountInputComponent.prototype, "amountType", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Boolean)
    ], AmountInputComponent.prototype, "disableAmountCurrency", void 0);
    AmountInputComponent = __decorate([
        core_1.Component({
            selector: "amount-input",
            templateUrl: "./amount-input.component.html",
            styleUrls: ["./amount-input.component.css"],
        }),
        __metadata("design:paramtypes", [unit_service_1.UnitService])
    ], AmountInputComponent);
    return AmountInputComponent;
}());
exports.AmountInputComponent = AmountInputComponent;
//# sourceMappingURL=amount-input.component.js.map