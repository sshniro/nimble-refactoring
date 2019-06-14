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
var DateInputComponent = /** @class */ (function () {
    function DateInputComponent() {
        this.visible = true;
        this.disabled = false;
        this.presentationMode = "edit";
        this.labelClass = "col-3";
        this.labelMainClass = "";
        this.rowClass = "";
        this.placeholder = "Enter a value...";
        this.valueDateClass = "";
        this.dateChange = new core_1.EventEmitter();
    }
    DateInputComponent.prototype.ngOnInit = function () {
        if (!this.valueClass) {
            this.valueClass = this.label ? "col-9" : "col-12";
        }
    };
    Object.defineProperty(DateInputComponent.prototype, "date", {
        get: function () {
            return this.dateValue;
        },
        set: function (date) {
            if (date) {
                var index = date.indexOf("T");
                if (index != -1) {
                    date = date.substring(0, date.indexOf("T"));
                }
            }
            this.dateValue = date;
            this.dateChange.emit(date);
        },
        enumerable: true,
        configurable: true
    });
    __decorate([
        core_1.Input(),
        __metadata("design:type", Boolean)
    ], DateInputComponent.prototype, "visible", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Boolean)
    ], DateInputComponent.prototype, "disabled", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", String)
    ], DateInputComponent.prototype, "presentationMode", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", String)
    ], DateInputComponent.prototype, "label", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", String)
    ], DateInputComponent.prototype, "definition", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", String)
    ], DateInputComponent.prototype, "labelClass", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", String)
    ], DateInputComponent.prototype, "labelMainClass", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", String)
    ], DateInputComponent.prototype, "rowClass", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", String)
    ], DateInputComponent.prototype, "valueClass", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", String)
    ], DateInputComponent.prototype, "placeholder", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", String)
    ], DateInputComponent.prototype, "valueDateClass", void 0);
    __decorate([
        core_1.Output(),
        __metadata("design:type", Object)
    ], DateInputComponent.prototype, "dateChange", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", String),
        __metadata("design:paramtypes", [String])
    ], DateInputComponent.prototype, "date", null);
    DateInputComponent = __decorate([
        core_1.Component({
            selector: "date-input",
            templateUrl: "./date-input.component.html",
        }),
        __metadata("design:paramtypes", [])
    ], DateInputComponent);
    return DateInputComponent;
}());
exports.DateInputComponent = DateInputComponent;
//# sourceMappingURL=date-input.component.js.map