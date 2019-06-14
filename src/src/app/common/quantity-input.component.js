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
var quantity_1 = require("../catalogue/model/publish/quantity");
var unit_service_1 = require("./unit-service");
var utils_1 = require("./utils");
var QuantityInputComponent = /** @class */ (function () {
    function QuantityInputComponent(unitService) {
        this.unitService = unitService;
        this.visible = true;
        this.disabled = false;
        this.presentationMode = "edit";
        this.labelClass = "col-3";
        this.labelMainClass = "";
        this.rowClass = "";
        this.valueSizeClass = "col-7";
        this.unitSizeClass = "col-5";
        this.placeholder = "Enter value here...";
        this.unitPlaceholder = "Unit";
        this.valueTextClass = "";
        this.onQuantityValueChange = new core_1.EventEmitter();
        this.disableQuantityUnit = false;
        this.step = 1;
    }
    QuantityInputComponent.prototype.ngOnInit = function () {
        var _this = this;
        if (!this.valueClass) {
            this.valueClass = this.label ? "col-9" : "col-12";
        }
        if (this.quantityType) {
            this.quantityUnits = ["Loading..."];
            this.unitService.getCachedUnitList(this.quantityType)
                .then(function (units) {
                _this.quantityUnits = units;
                _this.initQuantityUnit();
            });
        }
        else if (this.quantityUnits != null && this.quantityUnits.length > 0) {
            this.initQuantityUnit();
        }
    };
    QuantityInputComponent.prototype.initQuantityUnit = function () {
        if (this.quantity.unitCode == null && this.quantityUnits != null) {
            this.quantity.unitCode = this.quantityUnits[0];
        }
    };
    QuantityInputComponent.prototype.onQuantityValueChanged = function (value) {
        this.onQuantityValueChange.emit(value);
    };
    QuantityInputComponent.prototype.quantityToString = function () {
        return utils_1.quantityToString(this.quantity);
    };
    __decorate([
        core_1.Input(),
        __metadata("design:type", Boolean)
    ], QuantityInputComponent.prototype, "visible", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Boolean)
    ], QuantityInputComponent.prototype, "disabled", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", String)
    ], QuantityInputComponent.prototype, "presentationMode", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", String)
    ], QuantityInputComponent.prototype, "label", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", String)
    ], QuantityInputComponent.prototype, "definition", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", String)
    ], QuantityInputComponent.prototype, "labelClass", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", String)
    ], QuantityInputComponent.prototype, "labelMainClass", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", String)
    ], QuantityInputComponent.prototype, "rowClass", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", String)
    ], QuantityInputComponent.prototype, "valueClass", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", String)
    ], QuantityInputComponent.prototype, "valueSizeClass", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", String)
    ], QuantityInputComponent.prototype, "unitSizeClass", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", String)
    ], QuantityInputComponent.prototype, "placeholder", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", String)
    ], QuantityInputComponent.prototype, "unitPlaceholder", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", String)
    ], QuantityInputComponent.prototype, "valueTextClass", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", quantity_1.Quantity)
    ], QuantityInputComponent.prototype, "quantity", void 0);
    __decorate([
        core_1.Output(),
        __metadata("design:type", Object)
    ], QuantityInputComponent.prototype, "onQuantityValueChange", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Array)
    ], QuantityInputComponent.prototype, "quantityUnits", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", String)
    ], QuantityInputComponent.prototype, "quantityType", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Boolean)
    ], QuantityInputComponent.prototype, "disableQuantityUnit", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Number)
    ], QuantityInputComponent.prototype, "step", void 0);
    QuantityInputComponent = __decorate([
        core_1.Component({
            selector: "quantity-input",
            templateUrl: "./quantity-input.component.html",
            styleUrls: ["./quantity-input.component.css"],
        }),
        __metadata("design:paramtypes", [unit_service_1.UnitService])
    ], QuantityInputComponent);
    return QuantityInputComponent;
}());
exports.QuantityInputComponent = QuantityInputComponent;
//# sourceMappingURL=quantity-input.component.js.map