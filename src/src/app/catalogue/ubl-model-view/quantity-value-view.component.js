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
var QuantityValueViewComponent = /** @class */ (function () {
    function QuantityValueViewComponent() {
        this.onValueChanged = new core_1.EventEmitter();
    }
    QuantityValueViewComponent.prototype.ngOnChanges = function (values) {
        // emit the new value of the "value" field
        if (values['value'] != null) {
            this.onValueChanged.emit(values['value'].currentValue);
        }
    };
    __decorate([
        core_1.Input(),
        __metadata("design:type", String)
    ], QuantityValueViewComponent.prototype, "propName", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Number)
    ], QuantityValueViewComponent.prototype, "value", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", String)
    ], QuantityValueViewComponent.prototype, "unitType", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", String)
    ], QuantityValueViewComponent.prototype, "unit", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", String)
    ], QuantityValueViewComponent.prototype, "definition", void 0);
    __decorate([
        core_1.Output(),
        __metadata("design:type", core_1.EventEmitter)
    ], QuantityValueViewComponent.prototype, "onValueChanged", void 0);
    QuantityValueViewComponent = __decorate([
        core_1.Component({
            selector: 'quantity-value-view',
            templateUrl: './quantity-value-view.component.html'
        })
    ], QuantityValueViewComponent);
    return QuantityValueViewComponent;
}());
exports.QuantityValueViewComponent = QuantityValueViewComponent;
//# sourceMappingURL=quantity-value-view.component.js.map