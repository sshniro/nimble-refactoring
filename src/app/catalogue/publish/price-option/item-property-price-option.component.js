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
var price_option_1 = require("../../model/publish/price-option");
var utils_1 = require("../../../common/utils");
var ubl_model_utils_1 = require("../../model/ubl-model-utils");
var catalogue_line_1 = require("../../model/publish/catalogue-line");
var text_1 = require("../../model/publish/text");
/**
 * Created by suat on 03-Sep-18.
 */
var ItemPropertyPriceOptionComponent = /** @class */ (function () {
    function ItemPropertyPriceOptionComponent() {
        this.getItemPropertyName = utils_1.selectPreferredValues;
    }
    ItemPropertyPriceOptionComponent.prototype.selectProperty = function (itemPropertyId) {
        // ignore if the property is already selected
        var copyProperty = this.priceOption.additionalItemProperty.find(function (property) { return itemPropertyId == property.id; });
        if (copyProperty != null) {
            return;
        }
        // retrieve item property
        var itemProperty = this.catalogueLine.goodsItem.item.additionalItemProperty.find(function (property) { return property.id == itemPropertyId; });
        copyProperty = ubl_model_utils_1.UBLModelUtils.removeHjidFieldsFromObject(utils_1.copy(itemProperty));
        copyProperty.value = [];
        copyProperty.valueDecimal = [];
        copyProperty.valueQuantity = [];
        this.priceOption.additionalItemProperty.push(copyProperty);
        this.priceOption.additionalItemProperty = [].concat(this.priceOption.additionalItemProperty);
    };
    ItemPropertyPriceOptionComponent.prototype.getOriginalValuesOfProperty = function (copyProperty) {
        var itemProperty = this.catalogueLine.goodsItem.item.additionalItemProperty.find(function (property) { return property.id == copyProperty.id; });
        return utils_1.getPropertyValuesAsStrings(itemProperty);
    };
    ItemPropertyPriceOptionComponent.prototype.selectPropertyValue = function (value, copyProperty) {
        switch (copyProperty.valueQualifier) {
            case "INT":
            case "DOUBLE":
            case "NUMBER": {
                var index = copyProperty.valueDecimal.findIndex(function (propVal) { return propVal == value; });
                index !== -1 ? copyProperty.valueDecimal.splice(index, 1) : copyProperty.valueDecimal.push(value);
            }
            case "QUANTITY": {
                var quantityVal_1 = value;
                var index = copyProperty.valueQuantity.findIndex(function (propVal) { return propVal.value == quantityVal_1.value && propVal.unitCode == quantityVal_1.unitCode; });
                index !== -1 ? copyProperty.value.splice(index, 1) : copyProperty.value.push(new text_1.Text(value));
            }
            case "STRING": {
                var index = copyProperty.value.findIndex(function (propVal) { return propVal == value; });
                index !== -1 ? copyProperty.value.splice(index, 1) : copyProperty.value.push(new text_1.Text(value));
            }
        }
        this.priceOption.additionalItemProperty = [].concat(this.priceOption.additionalItemProperty);
    };
    ItemPropertyPriceOptionComponent.prototype.removeOption = function (index) {
        this.priceOption.additionalItemProperty.splice(index, 1);
        this.priceOption.additionalItemProperty = [].concat(this.priceOption.additionalItemProperty);
    };
    ItemPropertyPriceOptionComponent.prototype.getCheckedStatus = function (value, copyProperty) {
        switch (copyProperty.valueQualifier) {
            case "INT":
            case "DOUBLE":
            case "NUMBER": {
                var index = copyProperty.valueDecimal.findIndex(function (propVal) { return propVal == value; });
                return index != -1;
            }
            case "QUANTITY": {
                var quantityVal_2 = value;
                var index = copyProperty.valueQuantity.findIndex(function (propVal) { return propVal.value == quantityVal_2.value && propVal.unitCode == quantityVal_2.unitCode; });
                return index != -1;
            }
            case "STRING": {
                var index = copyProperty.value.findIndex(function (propVal) { return propVal.value == value; });
                return index != -1;
            }
        }
    };
    __decorate([
        core_1.Input(),
        __metadata("design:type", catalogue_line_1.CatalogueLine)
    ], ItemPropertyPriceOptionComponent.prototype, "catalogueLine", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", price_option_1.PriceOption)
    ], ItemPropertyPriceOptionComponent.prototype, "priceOption", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Number)
    ], ItemPropertyPriceOptionComponent.prototype, "index", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Object)
    ], ItemPropertyPriceOptionComponent.prototype, "discountUnits", void 0);
    ItemPropertyPriceOptionComponent = __decorate([
        core_1.Component({
            selector: "item-property-price-option",
            templateUrl: "./item-property-price-option.component.html",
            styleUrls: ["./item-property-price-option.component.css"]
        })
    ], ItemPropertyPriceOptionComponent);
    return ItemPropertyPriceOptionComponent;
}());
exports.ItemPropertyPriceOptionComponent = ItemPropertyPriceOptionComponent;
//# sourceMappingURL=item-property-price-option.component.js.map