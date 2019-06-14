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
var BooleanInputComponent = /** @class */ (function () {
    function BooleanInputComponent() {
        this.visible = true;
        this.disabled = false;
        this.presentationMode = "edit";
        this.labelClass = "col-3";
        this.labelMainClass = "";
        this.rowClass = "";
        this.valueTextClass = "";
        this.valueChange = new core_1.EventEmitter();
    }
    BooleanInputComponent.prototype.ngOnInit = function () {
        if (!this.valueClass) {
            this.valueClass = this.label ? "col-9" : "col-12";
        }
    };
    Object.defineProperty(BooleanInputComponent.prototype, "value", {
        get: function () {
            return this.booleanValue;
        },
        set: function (value) {
            this.booleanValue = value;
            this.valueChange.emit(value);
        },
        enumerable: true,
        configurable: true
    });
    __decorate([
        core_1.Input(),
        __metadata("design:type", Boolean)
    ], BooleanInputComponent.prototype, "visible", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Boolean)
    ], BooleanInputComponent.prototype, "disabled", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", String)
    ], BooleanInputComponent.prototype, "presentationMode", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", String)
    ], BooleanInputComponent.prototype, "label", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", String)
    ], BooleanInputComponent.prototype, "definition", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", String)
    ], BooleanInputComponent.prototype, "labelClass", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", String)
    ], BooleanInputComponent.prototype, "labelMainClass", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", String)
    ], BooleanInputComponent.prototype, "rowClass", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", String)
    ], BooleanInputComponent.prototype, "valueClass", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", String)
    ], BooleanInputComponent.prototype, "valueTextClass", void 0);
    __decorate([
        core_1.Output(),
        __metadata("design:type", Object)
    ], BooleanInputComponent.prototype, "valueChange", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Boolean),
        __metadata("design:paramtypes", [Boolean])
    ], BooleanInputComponent.prototype, "value", null);
    BooleanInputComponent = __decorate([
        core_1.Component({
            selector: "boolean-input",
            templateUrl: "./boolean-input.component.html",
            styleUrls: ["./boolean-input.component.css"],
        }),
        __metadata("design:paramtypes", [])
    ], BooleanInputComponent);
    return BooleanInputComponent;
}());
exports.BooleanInputComponent = BooleanInputComponent;
//# sourceMappingURL=boolean-input.component.js.map