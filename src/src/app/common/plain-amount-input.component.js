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
var PlainAmountInputComponent = /** @class */ (function () {
    function PlainAmountInputComponent() {
        this.visible = true;
        this.disabled = false;
        this.presentationMode = "edit";
        this.labelClass = "col-3";
        this.labelMainClass = "";
        this.rowClass = "";
        this.placeholder = "Enter a value...";
        this.valueTextClass = "";
        this.amountChange = new core_1.EventEmitter();
    }
    PlainAmountInputComponent.prototype.ngOnInit = function () {
        if (!this.valueClass) {
            this.valueClass = this.label ? "col-9" : "col-12";
        }
    };
    Object.defineProperty(PlainAmountInputComponent.prototype, "amount", {
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
    __decorate([
        core_1.Input(),
        __metadata("design:type", Boolean)
    ], PlainAmountInputComponent.prototype, "visible", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Boolean)
    ], PlainAmountInputComponent.prototype, "disabled", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", String)
    ], PlainAmountInputComponent.prototype, "presentationMode", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", String)
    ], PlainAmountInputComponent.prototype, "label", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", String)
    ], PlainAmountInputComponent.prototype, "definition", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", String)
    ], PlainAmountInputComponent.prototype, "labelClass", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", String)
    ], PlainAmountInputComponent.prototype, "labelMainClass", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", String)
    ], PlainAmountInputComponent.prototype, "rowClass", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", String)
    ], PlainAmountInputComponent.prototype, "valueClass", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", String)
    ], PlainAmountInputComponent.prototype, "placeholder", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", String)
    ], PlainAmountInputComponent.prototype, "valueTextClass", void 0);
    __decorate([
        core_1.Output(),
        __metadata("design:type", Object)
    ], PlainAmountInputComponent.prototype, "amountChange", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", String)
    ], PlainAmountInputComponent.prototype, "amountUnit", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Number),
        __metadata("design:paramtypes", [Number])
    ], PlainAmountInputComponent.prototype, "amount", null);
    PlainAmountInputComponent = __decorate([
        core_1.Component({
            selector: "plain-amount-input",
            templateUrl: "./plain-amount-input.component.html",
            styleUrls: ["./plain-amount-input.component.css"],
        }),
        __metadata("design:paramtypes", [])
    ], PlainAmountInputComponent);
    return PlainAmountInputComponent;
}());
exports.PlainAmountInputComponent = PlainAmountInputComponent;
//# sourceMappingURL=plain-amount-input.component.js.map