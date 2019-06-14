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
var forms_1 = require("@angular/forms");
/**
 * Created by suat on 26-Dec-17.
 */
var ChildForm = /** @class */ (function () {
    function ChildForm() {
        this.parentForm = new forms_1.FormGroup({}); // it'is initialized to an empty group as angular complains if a null form group is passed to a form element
    }
    ChildForm.prototype.addToParentForm = function (elementName, control) {
        var _this = this;
        if (this.parentForm) {
            setTimeout(function () {
                _this.parentForm.addControl(elementName, control);
            });
        }
    };
    ChildForm.prototype.removeFromParentForm = function (elementName) {
        var _this = this;
        if (this.parentForm) {
            setTimeout(function () {
                _this.parentForm.removeControl(elementName);
            });
        }
    };
    __decorate([
        core_1.Input(),
        __metadata("design:type", forms_1.FormGroup)
    ], ChildForm.prototype, "parentForm", void 0);
    return ChildForm;
}());
exports.ChildForm = ChildForm;
//# sourceMappingURL=child-form.js.map