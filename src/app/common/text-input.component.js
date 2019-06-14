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
var constants_1 = require("../catalogue/model/constants");
var TextInputComponent = /** @class */ (function () {
    function TextInputComponent() {
        this.visible = true;
        this.disabled = false;
        this.presentationMode = "edit";
        this.labelClass = "col-3";
        this.labelMainClass = "";
        this.rowClass = "";
        this.flexClass = "";
        this.placeholder = "Enter a value...";
        this.addButtonStyle = "";
        this.deleteButtonStyle = "";
        this.languageIdClass = "";
        this.valueTextClass = "";
        this.textChange = new core_1.EventEmitter();
        this.languageIdChange = new core_1.EventEmitter();
        this.addTextInput = new core_1.EventEmitter();
        this.deleteTextInput = new core_1.EventEmitter();
        this.rows = 3;
        this.maxLength = "255";
        this.languages = constants_1.LANGUAGES;
    }
    TextInputComponent.prototype.ngOnInit = function () {
        if (!this.valueClass) {
            this.valueClass = this.label ? "col-9" : "col-12";
        }
    };
    Object.defineProperty(TextInputComponent.prototype, "text", {
        get: function () {
            if (this.presentationMode == "view") {
                var textBreaks = "";
                var textBreaksArr = [""];
                if (this.textValue && typeof (this.textValue) == "string") {
                    textBreaksArr = this.textValue.split("\n");
                }
                if (textBreaksArr.length > 1)
                    textBreaks = textBreaksArr.join("<br/>");
                else
                    textBreaks = textBreaksArr[0];
                return textBreaks;
            }
            return this.textValue;
        },
        set: function (text) {
            this.textValue = text;
            this.textChange.emit(text);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TextInputComponent.prototype, "languageId", {
        get: function () {
            return this.languageIdValue;
        },
        set: function (languageId) {
            this.languageIdValue = languageId;
            this.languageIdChange.emit(languageId);
        },
        enumerable: true,
        configurable: true
    });
    TextInputComponent.prototype.onAddTextInput = function () {
        this.addTextInput.emit();
    };
    TextInputComponent.prototype.onDeleteTextInput = function () {
        this.deleteTextInput.emit();
    };
    __decorate([
        core_1.Input(),
        __metadata("design:type", Boolean)
    ], TextInputComponent.prototype, "visible", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Boolean)
    ], TextInputComponent.prototype, "disabled", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", String)
    ], TextInputComponent.prototype, "presentationMode", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", String)
    ], TextInputComponent.prototype, "label", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", String)
    ], TextInputComponent.prototype, "definition", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", String)
    ], TextInputComponent.prototype, "labelClass", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", String)
    ], TextInputComponent.prototype, "labelMainClass", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", String)
    ], TextInputComponent.prototype, "rowClass", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", String)
    ], TextInputComponent.prototype, "flexClass", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", String)
    ], TextInputComponent.prototype, "valueClass", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", String)
    ], TextInputComponent.prototype, "placeholder", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", String)
    ], TextInputComponent.prototype, "addButtonStyle", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", String)
    ], TextInputComponent.prototype, "deleteButtonStyle", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", String)
    ], TextInputComponent.prototype, "languageIdClass", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", String)
    ], TextInputComponent.prototype, "valueTextClass", void 0);
    __decorate([
        core_1.Output(),
        __metadata("design:type", Object)
    ], TextInputComponent.prototype, "textChange", void 0);
    __decorate([
        core_1.Output(),
        __metadata("design:type", Object)
    ], TextInputComponent.prototype, "languageIdChange", void 0);
    __decorate([
        core_1.Output(),
        __metadata("design:type", Object)
    ], TextInputComponent.prototype, "addTextInput", void 0);
    __decorate([
        core_1.Output(),
        __metadata("design:type", Object)
    ], TextInputComponent.prototype, "deleteTextInput", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Number)
    ], TextInputComponent.prototype, "rows", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", String)
    ], TextInputComponent.prototype, "maxLength", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", String),
        __metadata("design:paramtypes", [String])
    ], TextInputComponent.prototype, "text", null);
    __decorate([
        core_1.Input(),
        __metadata("design:type", String),
        __metadata("design:paramtypes", [String])
    ], TextInputComponent.prototype, "languageId", null);
    TextInputComponent = __decorate([
        core_1.Component({
            selector: "text-input",
            templateUrl: "./text-input.component.html",
            styleUrls: ["./text-input.component.css"],
        }),
        __metadata("design:paramtypes", [])
    ], TextInputComponent);
    return TextInputComponent;
}());
exports.TextInputComponent = TextInputComponent;
//# sourceMappingURL=text-input.component.js.map