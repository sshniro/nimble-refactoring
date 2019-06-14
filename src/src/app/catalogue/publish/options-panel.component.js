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
var text_1 = require("../model/publish/text");
var item_property_1 = require("../model/publish/item-property");
var utils_1 = require("../../common/utils");
var logistic_publishing_service_1 = require("./logistic-publishing.service");
var OptionsPanelComponent = /** @class */ (function () {
    function OptionsPanelComponent(logisticPublishingService) {
        this.logisticPublishingService = logisticPublishingService;
        this.checkboxOther = true;
        this.selectedOptionsWithExtraColumn = true;
        // variables
        this.options = [];
        this.option = null;
        this.isOtherOptionEnabled = false;
        this.title = null;
    }
    OptionsPanelComponent.prototype.ngOnInit = function () {
        var _this = this;
        if (this.itemProperty) {
            this.logisticPublishingService.getCachedProperty(this.itemProperty.uri).then(function (indexedProperty) {
                // set the title
                _this.title = utils_1.selectPreferredValue(_this.itemProperty.name);
                // retrieve options
                _this.logisticPublishingService.getCachedPropertyCodeList(indexedProperty.codeListId).then(function (codeListResult) {
                    for (var _i = 0, _a = codeListResult.result; _i < _a.length; _i++) {
                        var result = _a[_i];
                        var label = utils_1.selectNameFromLabelObject(result.label);
                        _this.options.push(new text_1.Text(label));
                    }
                });
            });
        }
    };
    OptionsPanelComponent.prototype.onOptionAdded = function () {
        if (this.option) {
            this.itemProperty.value.push(new text_1.Text(this.option));
            this.option = null;
        }
    };
    OptionsPanelComponent.prototype.onOptionRemoved = function (value) {
        this.itemProperty.value.splice(this.itemProperty.value.indexOf(value), 1);
    };
    OptionsPanelComponent.prototype.onCheckboxChanged = function (checked, option) {
        if (checked)
            this.itemProperty.value.push(option);
        else
            for (var _i = 0, _a = this.itemProperty.value; _i < _a.length; _i++) {
                var selectedOption = _a[_i];
                if (selectedOption.value == option.value) {
                    this.itemProperty.value.splice(this.itemProperty.value.indexOf(selectedOption), 1);
                    break;
                }
            }
    };
    OptionsPanelComponent.prototype.isDefaultOption = function (option) {
        for (var _i = 0, _a = this.options; _i < _a.length; _i++) {
            var text = _a[_i];
            if (text.value == option.value) {
                return true;
            }
        }
        return false;
    };
    OptionsPanelComponent.prototype.isSelected = function (option) {
        for (var _i = 0, _a = this.itemProperty.value; _i < _a.length; _i++) {
            var text = _a[_i];
            if (text.value == option.value) {
                return true;
            }
        }
        return false;
    };
    __decorate([
        core_1.Input(),
        __metadata("design:type", item_property_1.ItemProperty)
    ], OptionsPanelComponent.prototype, "itemProperty", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Object)
    ], OptionsPanelComponent.prototype, "checkboxOther", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Object)
    ], OptionsPanelComponent.prototype, "selectedOptionsWithExtraColumn", void 0);
    OptionsPanelComponent = __decorate([
        core_1.Component({
            selector: "options-panel",
            templateUrl: "./options-panel.component.html",
            styleUrls: ["./options-panel.component.css"]
        }),
        __metadata("design:paramtypes", [logistic_publishing_service_1.LogisticPublishingService])
    ], OptionsPanelComponent);
    return OptionsPanelComponent;
}());
exports.OptionsPanelComponent = OptionsPanelComponent;
//# sourceMappingURL=options-panel.component.js.map