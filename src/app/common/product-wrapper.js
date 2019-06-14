"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ubl_model_utils_1 = require("../catalogue/model/ubl-model-utils");
var utils_1 = require("./utils");
var quantity_1 = require("../catalogue/model/publish/quantity");
var dimension_1 = require("../catalogue/model/publish/dimension");
var multi_valued_dimension_1 = require("../catalogue/model/publish/multi-valued-dimension");
var discount_price_wrapper_1 = require("./discount-price-wrapper");
/**
 * Wrapper class for Catalogue line.
 * This class offers useful getters used in the product details page.
 */
var ProductWrapper = /** @class */ (function () {
    function ProductWrapper(line, negotiationSettings, quantity) {
        if (quantity === void 0) { quantity = new quantity_1.Quantity(1, line.requiredItemLocationQuantity.price.baseQuantity.unitCode); }
        this.line = line;
        this.negotiationSettings = negotiationSettings;
        this.quantity = quantity;
        this.priceWrapper = new discount_price_wrapper_1.DiscountPriceWrapper(line.requiredItemLocationQuantity.price, line.requiredItemLocationQuantity.price, line.requiredItemLocationQuantity.applicableTaxCategory[0].percent, this.quantity, this.line.priceOption);
    }
    Object.defineProperty(ProductWrapper.prototype, "goodsItem", {
        get: function () {
            return this.line.goodsItem;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ProductWrapper.prototype, "item", {
        get: function () {
            return this.goodsItem.item;
        },
        enumerable: true,
        configurable: true
    });
    ProductWrapper.prototype.getPropertiesWithListOfValues = function () {
        return this.getUniquePropertiesWithFilter(function (prop) { return utils_1.getPropertyValues(prop).length > 1; });
    };
    ProductWrapper.prototype.getUniquePropertiesWithValue = function () {
        return this.getUniquePropertiesWithFilter(function (prop) { return utils_1.getPropertyValues(prop).length > 0; });
    };
    ProductWrapper.prototype.getAllUniqueProperties = function () {
        return this.getUniquePropertiesWithFilter(function () { return true; });
    };
    ProductWrapper.prototype.getDimensions = function (includingNullValues) {
        if (includingNullValues === void 0) { includingNullValues = true; }
        if (!this.item) {
            return [];
        }
        var ret = [];
        this.item.dimension.forEach(function (prop) {
            if (includingNullValues) {
                if (prop.attributeID)
                    ret.push(prop);
            }
            else {
                if (prop.attributeID && prop.measure.value)
                    ret.push(prop);
            }
        });
        return ret;
    };
    // it creates MultiValuedDimensions using the item's dimensions
    // if the item has no dimensions, then it creates them using the given list of dimension units.
    ProductWrapper.prototype.getDimensionMultiValue = function (includeDimensionsWithNullValues, dimensions) {
        if (includeDimensionsWithNullValues === void 0) { includeDimensionsWithNullValues = true; }
        if (dimensions === void 0) { dimensions = []; }
        var multiValuedDimensions = [];
        // each item should have dimensions
        if (this.item.dimension.length == 0 && dimensions.length > 0) {
            this.item.dimension = ubl_model_utils_1.UBLModelUtils.createDimensions(dimensions);
        }
        for (var _i = 0, _a = this.item.dimension; _i < _a.length; _i++) {
            var dimension = _a[_i];
            if (!includeDimensionsWithNullValues && !dimension.measure.value) {
                continue;
            }
            var found = false;
            for (var _b = 0, multiValuedDimensions_1 = multiValuedDimensions; _b < multiValuedDimensions_1.length; _b++) {
                var multiValuedDimension = multiValuedDimensions_1[_b];
                if (multiValuedDimension.attributeID == dimension.attributeID) {
                    multiValuedDimension.measure.push(dimension.measure);
                    found = true;
                    break;
                }
            }
            if (!found) {
                multiValuedDimensions.push(new multi_valued_dimension_1.MultiValuedDimension(dimension.attributeID, [dimension.measure]));
            }
        }
        return multiValuedDimensions;
    };
    ProductWrapper.prototype.addDimension = function (attributeId) {
        var dimension = new dimension_1.Dimension(attributeId);
        this.item.dimension.push(dimension);
    };
    ProductWrapper.prototype.removeDimension = function (attributeId, quantity) {
        var index = this.item.dimension.slice().reverse().findIndex(function (dim) { return dim.attributeID == attributeId && dim.measure.value == quantity.value; });
        var count = this.item.dimension.length - 1;
        var finalIndex = count - index;
        this.item.dimension.splice(finalIndex, 1);
    };
    ProductWrapper.prototype.getPackaging = function () {
        var qty = this.goodsItem.containingPackage.quantity;
        var type = this.goodsItem.containingPackage.packagingTypeCode;
        if (!qty.value || !type.value) {
            return "Not specified";
        }
        return qty.value + " " + qty.unitCode + " per " + type.value;
    };
    ProductWrapper.prototype.getSpecialTerms = function () {
        return this.goodsItem.deliveryTerms.specialTerms.length > 0 ? this.goodsItem.deliveryTerms.specialTerms[0].value : "None";
    };
    ProductWrapper.prototype.getDeliveryPeriod = function () {
        return utils_1.periodToString(this.goodsItem.deliveryTerms.estimatedDeliveryPeriod);
    };
    ProductWrapper.prototype.getWarrantyPeriod = function () {
        return utils_1.periodToString(this.line.warrantyValidityPeriod);
    };
    ProductWrapper.prototype.getIncoterms = function () {
        return this.goodsItem.deliveryTerms.incoterms || "None";
    };
    ProductWrapper.prototype.getPaymentTerms = function () {
        return this.negotiationSettings.paymentTerms[0];
    };
    ProductWrapper.prototype.getPaymentMeans = function () {
        return this.negotiationSettings.paymentMeans[0];
    };
    ProductWrapper.prototype.getFreeSample = function () {
        return this.line.freeOfChargeIndicator ? "Yes" : "No";
    };
    ProductWrapper.prototype.getPricePerItem = function () {
        return this.priceWrapper.discountedPricePerItemString;
    };
    ProductWrapper.prototype.getVat = function () {
        return this.line.requiredItemLocationQuantity.applicableTaxCategory[0] ? this.line.requiredItemLocationQuantity.applicableTaxCategory[0].percent + '' : '';
    };
    ProductWrapper.prototype.getPropertyName = function (property) {
        return utils_1.sanitizePropertyName(utils_1.selectName(property));
    };
    ProductWrapper.prototype.getLogisticsStatus = function () {
        return utils_1.isLogisticsService(this.line);
    };
    ProductWrapper.prototype.isTransportService = function () {
        return utils_1.isTransportService(this.line);
    };
    ProductWrapper.prototype.getAdditionalDocuments = function () {
        return this.item.itemSpecificationDocumentReference;
    };
    /*
     * Private methods
     */
    ProductWrapper.prototype.getUniquePropertiesWithFilter = function (filter) {
        if (!this.item) {
            return [];
        }
        var duplicates = {};
        var result = [];
        this.item.additionalItemProperty.forEach(function (prop) {
            if (!filter(prop)) {
                return;
            }
            var key = utils_1.getPropertyKey(prop);
            if (!duplicates[key] || utils_1.isCustomProperty(prop)) {
                result.push(prop);
            }
            duplicates[key] = true;
        });
        return result.sort(function (p1, p2) { return utils_1.selectName(p1).localeCompare(utils_1.selectName(p2)); });
    };
    return ProductWrapper;
}());
exports.ProductWrapper = ProductWrapper;
//# sourceMappingURL=product-wrapper.js.map