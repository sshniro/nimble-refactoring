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
var quantity_1 = require("../../../catalogue/model/publish/quantity");
var unit_service_1 = require("../../../common/unit-service");
var NegotiationRequestInputComponent = /** @class */ (function () {
    function NegotiationRequestInputComponent(unitService) {
        this.unitService = unitService;
        this.cbModelChange = new core_1.EventEmitter();
        this.cbDisabled = false;
        this.disabled = false;
        this.invalid = false;
        this.textChange = new core_1.EventEmitter();
        this.selectedChange = new core_1.EventEmitter();
        this.quantityChange = new core_1.EventEmitter();
        this.disableQuantityUnit = false;
        this.amountChange = new core_1.EventEmitter();
    }
    NegotiationRequestInputComponent.prototype.ngOnInit = function () {
        var _this = this;
        if (this.quantityType) {
            this.quantityUnits = ["Loading..."];
            this.unitService.getCachedUnitList(this.quantityType)
                .then(function (units) {
                _this.quantityUnits = units;
            });
        }
    };
    Object.defineProperty(NegotiationRequestInputComponent.prototype, "cbModel", {
        get: function () {
            return this.cbModelValue;
        },
        set: function (cbModel) {
            this.cbModelValue = cbModel;
            this.cbModelChange.emit(cbModel);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NegotiationRequestInputComponent.prototype, "text", {
        get: function () {
            return this.textValue;
        },
        set: function (text) {
            this.textValue = text;
            this.textChange.emit(text);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NegotiationRequestInputComponent.prototype, "selected", {
        get: function () {
            return this.selectedValue;
        },
        set: function (selected) {
            this.selectedValue = selected;
            this.selectedChange.emit(selected);
        },
        enumerable: true,
        configurable: true
    });
    NegotiationRequestInputComponent.prototype.onQuantityValueChanged = function () {
        this.quantityChange.emit(this.quantity.value);
    };
    Object.defineProperty(NegotiationRequestInputComponent.prototype, "amount", {
        get: function () {
            return this.amountValue;
        },
        set: function (value) {
            this.amountValue = value;
            this.amountChange.emit(value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NegotiationRequestInputComponent.prototype, "formControlClass", {
        get: function () {
            return this.invalid ? "ng-invalid" : "ng-valid";
        },
        enumerable: true,
        configurable: true
    });
    __decorate([
        core_1.Input(),
        __metadata("design:type", String)
    ], NegotiationRequestInputComponent.prototype, "label", void 0);
    __decorate([
        core_1.Output(),
        __metadata("design:type", Object)
    ], NegotiationRequestInputComponent.prototype, "cbModelChange", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Boolean)
    ], NegotiationRequestInputComponent.prototype, "cbDisabled", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Boolean)
    ], NegotiationRequestInputComponent.prototype, "disabled", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Boolean)
    ], NegotiationRequestInputComponent.prototype, "invalid", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", String)
    ], NegotiationRequestInputComponent.prototype, "id", void 0);
    __decorate([
        core_1.Output(),
        __metadata("design:type", Object)
    ], NegotiationRequestInputComponent.prototype, "textChange", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Array)
    ], NegotiationRequestInputComponent.prototype, "options", void 0);
    __decorate([
        core_1.Output(),
        __metadata("design:type", Object)
    ], NegotiationRequestInputComponent.prototype, "selectedChange", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", quantity_1.Quantity)
    ], NegotiationRequestInputComponent.prototype, "quantity", void 0);
    __decorate([
        core_1.Output(),
        __metadata("design:type", Object)
    ], NegotiationRequestInputComponent.prototype, "quantityChange", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Array)
    ], NegotiationRequestInputComponent.prototype, "quantityUnits", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", String)
    ], NegotiationRequestInputComponent.prototype, "quantityType", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Boolean)
    ], NegotiationRequestInputComponent.prototype, "disableQuantityUnit", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Number)
    ], NegotiationRequestInputComponent.prototype, "amountValue", void 0);
    __decorate([
        core_1.Output(),
        __metadata("design:type", Object)
    ], NegotiationRequestInputComponent.prototype, "amountChange", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", String)
    ], NegotiationRequestInputComponent.prototype, "amountUnit", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Boolean),
        __metadata("design:paramtypes", [Boolean])
    ], NegotiationRequestInputComponent.prototype, "cbModel", null);
    __decorate([
        core_1.Input(),
        __metadata("design:type", String),
        __metadata("design:paramtypes", [String])
    ], NegotiationRequestInputComponent.prototype, "text", null);
    __decorate([
        core_1.Input(),
        __metadata("design:type", String),
        __metadata("design:paramtypes", [String])
    ], NegotiationRequestInputComponent.prototype, "selected", null);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Number),
        __metadata("design:paramtypes", [Number])
    ], NegotiationRequestInputComponent.prototype, "amount", null);
    NegotiationRequestInputComponent = __decorate([
        core_1.Component({
            selector: "negotiation-request-input",
            templateUrl: "./negotiation-request-input.component.html",
            styleUrls: ["./negotiation-request-input.component.css"],
        }),
        __metadata("design:paramtypes", [unit_service_1.UnitService])
    ], NegotiationRequestInputComponent);
    return NegotiationRequestInputComponent;
}());
exports.NegotiationRequestInputComponent = NegotiationRequestInputComponent;
//# sourceMappingURL=negotiation-request-input.component.js.map