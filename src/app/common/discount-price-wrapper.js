"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var quantity_1 = require("../catalogue/model/publish/quantity");
var utils_1 = require("./utils");
var item_price_wrapper_1 = require("./item-price-wrapper");
var constants_1 = require("../catalogue/model/constants");
/**
 * Wrapper around a price and a quantity, contains convenience methods to get the total price,
 * price per item and their string representations.
 *
 * This class can also be substituted for a Quantity.
 */
var DiscountPriceWrapper = /** @class */ (function () {
    function DiscountPriceWrapper(originalCatalogueLinePrice, // immutable initial price that to be used as the starting price while calculating the discount
        price, // dynamically changing price upon the updates on the price
        vatPercentage, orderedQuantity, // ordered quantity
        priceOptions, additionalItemProperties, incoterm, paymentMeans, deliveryPeriod, deliveryLocation) {
        if (orderedQuantity === void 0) { orderedQuantity = new quantity_1.Quantity(1, price.baseQuantity.unitCode); }
        if (priceOptions === void 0) { priceOptions = []; }
        if (additionalItemProperties === void 0) { additionalItemProperties = []; }
        if (incoterm === void 0) { incoterm = null; }
        if (paymentMeans === void 0) { paymentMeans = null; }
        if (deliveryPeriod === void 0) { deliveryPeriod = null; }
        if (deliveryLocation === void 0) { deliveryLocation = null; }
        this.originalCatalogueLinePrice = originalCatalogueLinePrice;
        this.price = price;
        this.vatPercentage = vatPercentage;
        this.orderedQuantity = orderedQuantity;
        this.priceOptions = priceOptions;
        this.additionalItemProperties = additionalItemProperties;
        this.incoterm = incoterm;
        this.paymentMeans = paymentMeans;
        this.deliveryPeriod = deliveryPeriod;
        this.deliveryLocation = deliveryLocation;
        // this field is used to create discount-modal view
        this.appliedDiscounts = [];
        this.immutableOriginalCatalogueLinePrice = utils_1.copy(originalCatalogueLinePrice);
        this.itemPrice = new item_price_wrapper_1.ItemPriceWrapper(price);
        this.getDiscountedTotalPrice(); // to initialize the applied discounts list
    }
    Object.defineProperty(DiscountPriceWrapper.prototype, "originalPricePerItem", {
        get: function () {
            if (!this.hasPrice() || isNaN(this.orderedQuantity.value)) {
                return 0;
            }
            var baseQuantity = this.immutableOriginalCatalogueLinePrice.baseQuantity.value || 1;
            return this.immutableOriginalCatalogueLinePrice.priceAmount.value / baseQuantity;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DiscountPriceWrapper.prototype, "pricePerItem", {
        get: function () {
            if (!this.hasPrice() || isNaN(this.orderedQuantity.value)) {
                return 0;
            }
            return this.itemPrice.pricePerItem;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DiscountPriceWrapper.prototype, "pricePerItemString", {
        get: function () {
            var qty = this.orderedQuantity;
            if (!this.hasPrice() || !qty.value) {
                return "On demand";
            }
            return utils_1.roundToTwoDecimals(this.pricePerItem) + " " + utils_1.currencyToString(this.price.priceAmount.currencyID) + " per " + qty.unitCode;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DiscountPriceWrapper.prototype, "discountedPricePerItem", {
        get: function () {
            if (!this.hasPrice() || isNaN(this.orderedQuantity.value)) {
                return 0;
            }
            var discountedTotalPrice = this.getDiscountedTotalPrice();
            return discountedTotalPrice / this.orderedQuantity.value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DiscountPriceWrapper.prototype, "discountedPricePerItemString", {
        get: function () {
            var qty = this.orderedQuantity;
            if (!this.hasPrice() || !qty.value) {
                return "On demand";
            }
            return utils_1.roundToTwoDecimals(this.discountedPricePerItem) + " " + utils_1.currencyToString(this.price.priceAmount.currencyID) + " per " + qty.unitCode;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DiscountPriceWrapper.prototype, "totalPrice", {
        get: function () {
            if (!this.hasPrice() || !this.orderedQuantity.value) {
                return 0;
            }
            return this.orderedQuantity.value * this.itemPrice.value;
        },
        set: function (price) {
            var quantity = this.orderedQuantity.value || 1;
            this.price.priceAmount.value = price / quantity * this.itemPrice.baseQuantity;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DiscountPriceWrapper.prototype, "totalPriceString", {
        get: function () {
            if (!this.hasPrice()) {
                return "Not specified";
            }
            return utils_1.roundToTwoDecimals(this.totalPrice) + " " + this.currency;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DiscountPriceWrapper.prototype, "vatTotal", {
        get: function () {
            return this.totalPrice * this.vatPercentage / 100;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DiscountPriceWrapper.prototype, "vatTotalString", {
        get: function () {
            return utils_1.roundToTwoDecimals(this.vatTotal) + " " + this.currency;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DiscountPriceWrapper.prototype, "grossTotal", {
        get: function () {
            return this.totalPrice + this.vatTotal;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DiscountPriceWrapper.prototype, "grossTotalString", {
        get: function () {
            return utils_1.roundToTwoDecimals(this.grossTotal) + " " + this.currency;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DiscountPriceWrapper.prototype, "currency", {
        get: function () {
            return utils_1.currencyToString(this.price.priceAmount.currencyID);
        },
        set: function (currency) {
            this.price.priceAmount.currencyID = currency;
        },
        enumerable: true,
        configurable: true
    });
    DiscountPriceWrapper.prototype.hasPrice = function () {
        // != here gives "not null or undefined", which is the behaviour we want.
        return this.price.priceAmount.value != null;
    };
    DiscountPriceWrapper.prototype.isDiscountApplied = function () {
        return this.appliedDiscounts.length > 0;
    };
    /**
     *  Price options functions
     */
    DiscountPriceWrapper.prototype.getDiscountedTotalPrice = function () {
        // use the initial price if the discounts are calculated, otherwise use the current price value
        // this is required as the price value is update in this method
        //const pricePerItem = this.useCatalogueLinePrice ? this.initialCatalogueLinePrice : this.itemPrice.value;
        var totalPrice = this.orderedQuantity.value * this.originalPricePerItem;
        var totalDiscount = 0;
        var totalMinimumOrderQuantityDiscount = 0;
        var minimumOrderQuantityPriceOption = null;
        var totalDeliveryPeriodDiscount = 0;
        var deliveryPeriodPriceOption = null;
        // reset appliedDiscounts
        this.appliedDiscounts = [];
        // check for price options
        for (var _i = 0, _a = this.priceOptions; _i < _a.length; _i++) {
            var priceOption = _a[_i];
            // check for incoterms
            if (this.incoterm && priceOption.typeID == constants_1.PRICE_OPTIONS.INCOTERM.typeID && priceOption.incoterms.indexOf(this.incoterm) != -1) {
                priceOption.discount = this.calculateDiscountAmount(priceOption, totalPrice);
                totalDiscount += priceOption.discount;
                // add this discount to appliedDiscounts list
                this.appliedDiscounts.push(priceOption);
            }
            else if (this.paymentMeans && priceOption.typeID == constants_1.PRICE_OPTIONS.PAYMENT_MEAN.typeID && priceOption.paymentMeans[0].paymentMeansCode.value == this.paymentMeans) {
                priceOption.discount = this.calculateDiscountAmount(priceOption, totalPrice);
                totalDiscount += priceOption.discount;
                // add this discount to appliedDiscounts list
                this.appliedDiscounts.push(priceOption);
            }
            else if (priceOption.typeID == constants_1.PRICE_OPTIONS.ORDERED_QUANTITY.typeID && priceOption.itemLocationQuantity.minimumQuantity.unitCode == this.orderedQuantity.unitCode
                && this.orderedQuantity.value >= priceOption.itemLocationQuantity.minimumQuantity.value) {
                var qDiscount = this.calculateDiscountAmount(priceOption, totalPrice);
                if (qDiscount > totalMinimumOrderQuantityDiscount) {
                    totalMinimumOrderQuantityDiscount = qDiscount;
                    minimumOrderQuantityPriceOption = priceOption;
                }
            }
            else if (this.deliveryPeriod && priceOption.typeID == constants_1.PRICE_OPTIONS.DELIVERY_PERIOD.typeID &&
                priceOption.estimatedDeliveryPeriod.durationMeasure.unitCode == this.deliveryPeriod.unitCode &&
                priceOption.estimatedDeliveryPeriod.durationMeasure.value <= this.deliveryPeriod.value) {
                var dpDiscount = this.calculateDiscountAmount(priceOption, totalPrice);
                if (dpDiscount > totalMinimumOrderQuantityDiscount) {
                    totalDeliveryPeriodDiscount = dpDiscount;
                    deliveryPeriodPriceOption = priceOption;
                }
            }
            else if (this.additionalItemProperties.length > 0 && priceOption.typeID == constants_1.PRICE_OPTIONS.PRODUCT_PROPERTY.typeID) {
                for (var _b = 0, _c = this.additionalItemProperties; _b < _c.length; _b++) {
                    var property = _c[_b];
                    // check if a property is already selected for this discount option
                    if (priceOption.additionalItemProperty.length == 0) {
                        continue;
                    }
                    if (property.id == priceOption.additionalItemProperty[0].id && this.existenceOfPriceOptionForPropertyValue(priceOption.additionalItemProperty[0].value, property.value[0])) {
                        priceOption.discount = this.calculateDiscountAmount(priceOption, totalPrice);
                        totalDiscount += priceOption.discount;
                        // add this discount to appliedDiscounts list
                        this.appliedDiscounts.push(priceOption);
                    }
                }
            }
            else if (priceOption.typeID == constants_1.PRICE_OPTIONS.DELIVERY_LOCATION.typeID && this.deliveryLocation) {
                // check whether addresses are the same or not
                var checkStreetName = priceOption.itemLocationQuantity.applicableTerritoryAddress[0].streetName != "";
                var checkBuildingNumber = priceOption.itemLocationQuantity.applicableTerritoryAddress[0].buildingNumber != "";
                var checkPostalZone = priceOption.itemLocationQuantity.applicableTerritoryAddress[0].postalZone != "";
                var checkCityName = priceOption.itemLocationQuantity.applicableTerritoryAddress[0].cityName != "";
                var checkRegion = priceOption.itemLocationQuantity.applicableTerritoryAddress[0].region != "";
                var country = priceOption.itemLocationQuantity.applicableTerritoryAddress[0].country;
                var checkCountryName = country && country.name.value && country.name.value != "";
                if (checkStreetName && priceOption.itemLocationQuantity.applicableTerritoryAddress[0].streetName.toLocaleLowerCase() != this.deliveryLocation.streetName.toLocaleLowerCase()) {
                    continue;
                }
                if (checkBuildingNumber && priceOption.itemLocationQuantity.applicableTerritoryAddress[0].buildingNumber != this.deliveryLocation.buildingNumber) {
                    continue;
                }
                if (checkPostalZone && priceOption.itemLocationQuantity.applicableTerritoryAddress[0].postalZone != this.deliveryLocation.postalZone) {
                    continue;
                }
                if (checkCityName && priceOption.itemLocationQuantity.applicableTerritoryAddress[0].cityName.toLocaleLowerCase() != this.deliveryLocation.cityName.toLocaleLowerCase()) {
                    continue;
                }
                if (checkRegion && priceOption.itemLocationQuantity.applicableTerritoryAddress[0].region.toLocaleLowerCase() != this.deliveryLocation.region.toLocaleLowerCase()) {
                    continue;
                }
                if (checkCountryName && priceOption.itemLocationQuantity.applicableTerritoryAddress[0].country.name.value.toLocaleLowerCase() != this.deliveryLocation.country.name.value.toLocaleLowerCase()) {
                    continue;
                }
                // the delivery location satisfies all conditions
                priceOption.discount = this.calculateDiscountAmount(priceOption, totalPrice);
                totalDiscount += priceOption.discount;
                // add this discount to appliedDiscounts list
                this.appliedDiscounts.push(priceOption);
            }
        }
        // add the individual discounts
        totalDiscount += totalMinimumOrderQuantityDiscount;
        totalDiscount += totalDeliveryPeriodDiscount;
        if (minimumOrderQuantityPriceOption != null) {
            minimumOrderQuantityPriceOption.discount = totalMinimumOrderQuantityDiscount;
            this.appliedDiscounts.push(minimumOrderQuantityPriceOption);
        }
        if (deliveryPeriodPriceOption != null) {
            deliveryPeriodPriceOption.discount = totalDeliveryPeriodDiscount;
            this.appliedDiscounts.push(deliveryPeriodPriceOption);
        }
        return totalPrice - totalDiscount;
    };
    DiscountPriceWrapper.prototype.calculateDiscountAmount = function (priceOption, totalPrice) {
        var discount = 0;
        // total price
        if (priceOption.itemLocationQuantity.allowanceCharge[0].amount && priceOption.itemLocationQuantity.allowanceCharge[0].amount.value) {
            // unit is %
            if (priceOption.itemLocationQuantity.allowanceCharge[0].amount.currencyID == "%") {
                discount += totalPrice * priceOption.itemLocationQuantity.allowanceCharge[0].amount.value / 100.0;
            }
            else {
                discount += priceOption.itemLocationQuantity.allowanceCharge[0].amount.value;
            }
        }
        else if (priceOption.itemLocationQuantity.allowanceCharge[0].perUnitAmount.value) {
            discount += priceOption.itemLocationQuantity.allowanceCharge[0].perUnitAmount.value * this.orderedQuantity.value;
        }
        return discount;
    };
    // checks whether there's a price option for the selected property value or not
    DiscountPriceWrapper.prototype.existenceOfPriceOptionForPropertyValue = function (priceOptionPropertyValues, selectedPropertyValue) {
        for (var _i = 0, priceOptionPropertyValues_1 = priceOptionPropertyValues; _i < priceOptionPropertyValues_1.length; _i++) {
            var property = priceOptionPropertyValues_1[_i];
            if (property.value == selectedPropertyValue.value && property.languageID == selectedPropertyValue.languageID) {
                return true;
            }
        }
        return false;
    };
    return DiscountPriceWrapper;
}());
exports.DiscountPriceWrapper = DiscountPriceWrapper;
//# sourceMappingURL=discount-price-wrapper.js.map