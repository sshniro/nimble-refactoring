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
var OptionsInputComponent = /** @class */ (function () {
    function OptionsInputComponent() {
        this.visible = true;
        this.disabled = false;
        this.presentationMode = "edit";
        this.labelClass = "col-3";
        this.labelMainClass = "";
        this.rowClass = "";
        this.selectedChange = new core_1.EventEmitter();
    }
    OptionsInputComponent.prototype.ngOnInit = function () {
        if (!this.valueClass) {
            this.valueClass = this.label ? "col-9" : "col-12";
        }
    };
    Object.defineProperty(OptionsInputComponent.prototype, "selected", {
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
    OptionsInputComponent.prototype.getValue = function (option) {
        if (option) {
            return typeof option === "string" ? option : option.value;
        }
    };
    OptionsInputComponent.prototype.getName = function (option) {
        if (option) {
            return typeof option === "string" ? option : option.name;
        }
    };
    __decorate([
        core_1.Input(),
        __metadata("design:type", Boolean)
    ], OptionsInputComponent.prototype, "visible", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Boolean)
    ], OptionsInputComponent.prototype, "disabled", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", String)
    ], OptionsInputComponent.prototype, "presentationMode", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", String)
    ], OptionsInputComponent.prototype, "label", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", String)
    ], OptionsInputComponent.prototype, "definition", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", String)
    ], OptionsInputComponent.prototype, "labelClass", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", String)
    ], OptionsInputComponent.prototype, "labelMainClass", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", String)
    ], OptionsInputComponent.prototype, "rowClass", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", String)
    ], OptionsInputComponent.prototype, "valueClass", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Array)
    ], OptionsInputComponent.prototype, "options", void 0);
    __decorate([
        core_1.Output(),
        __metadata("design:type", Object)
    ], OptionsInputComponent.prototype, "selectedChange", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", String),
        __metadata("design:paramtypes", [String])
    ], OptionsInputComponent.prototype, "selected", null);
    OptionsInputComponent = __decorate([
        core_1.Component({
            selector: "options-input",
            templateUrl: "./options-input.component.html",
            styleUrls: ["./options-input.component.css"],
        }),
        __metadata("design:paramtypes", [])
    ], OptionsInputComponent);
    return OptionsInputComponent;
}());
exports.OptionsInputComponent = OptionsInputComponent;
//# sourceMappingURL=options-input.component.js.map