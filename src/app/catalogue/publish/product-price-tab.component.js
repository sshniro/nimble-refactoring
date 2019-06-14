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
var catalogue_line_1 = require("../model/publish/catalogue-line");
var constants_1 = require("../model/constants");
var price_option_count_pipe_1 = require("./price-option/price-option-count.pipe");
var price_option_1 = require("../model/publish/price-option");
var quantity_1 = require("../model/publish/quantity");
var price_option_pipe_1 = require("./price-option/price-option.pipe");
var period_1 = require("../model/publish/period");
var address_1 = require("../model/publish/address");
var company_negotiation_settings_1 = require("../../user-mgmt/model/company-negotiation-settings");
var payment_means_1 = require("../model/publish/payment-means");
var catalogue_service_1 = require("../catalogue.service");
var tax_category_1 = require("../model/publish/tax-category");
var user_service_1 = require("../../user-mgmt/user.service");
var ng2_cookies_1 = require("ng2-cookies");
var ProductPriceTabComponent = /** @class */ (function () {
    function ProductPriceTabComponent(catalogueService, userService, cookieService) {
        this.catalogueService = catalogueService;
        this.userService = userService;
        this.cookieService = cookieService;
        // TODO: later, get these from a service?
        this.CURRENCIES = constants_1.CURRENCIES;
        this.priceOptions = constants_1.PRICE_OPTIONS;
        this.object = Object;
        this.discountUnits = [];
        this.defaultVatRate = 20;
    }
    ProductPriceTabComponent_1 = ProductPriceTabComponent;
    ProductPriceTabComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.updateDiscountUnits();
        var vatRatesPromise = Promise.resolve(ProductPriceTabComponent_1.vatRates);
        if (ProductPriceTabComponent_1.vatRates == null) {
            vatRatesPromise = this.catalogueService.getTaxRates();
        }
        var userId = this.cookieService.get("user_id");
        var userPartyPromise = this.userService.getUserParty(userId);
        Promise.all([vatRatesPromise, userPartyPromise])
            .then(function (_a) {
            var rates = _a[0], party = _a[1];
            ProductPriceTabComponent_1.vatRates = rates;
            _this.catalogueLine.requiredItemLocationQuantity.applicableTaxCategory[0].percent = _this.getVatRateForCountry(party);
        }).catch(function (error) {
            _this.catalogueLine.requiredItemLocationQuantity.applicableTaxCategory[0].percent = _this.defaultVatRate;
        });
        if (this.catalogueLine.requiredItemLocationQuantity.applicableTaxCategory == null || this.catalogueLine.requiredItemLocationQuantity.applicableTaxCategory.length == 0) {
            this.catalogueLine.requiredItemLocationQuantity.applicableTaxCategory = [new tax_category_1.TaxCategory()];
        }
    };
    ProductPriceTabComponent.prototype.addPriceOption = function (priceOptionType) {
        var priceOption = new price_option_1.PriceOption();
        priceOption.typeID = priceOptionType;
        if (priceOptionType == constants_1.PRICE_OPTIONS.ORDERED_QUANTITY.typeID) {
            priceOption.itemLocationQuantity.minimumQuantity = new quantity_1.Quantity(this.catalogueLine.requiredItemLocationQuantity.price.baseQuantity.value, this.catalogueLine.requiredItemLocationQuantity.price.baseQuantity.unitCode);
        }
        else if (priceOptionType == constants_1.PRICE_OPTIONS.PRODUCT_PROPERTY.typeID) {
            priceOption.additionalItemProperty = [];
        }
        else if (priceOptionType == constants_1.PRICE_OPTIONS.INCOTERM.typeID) {
            priceOption.incoterms = [];
        }
        else if (priceOptionType == constants_1.PRICE_OPTIONS.PAYMENT_MEAN.typeID) {
            priceOption.paymentMeans = [new payment_means_1.PaymentMeans()];
        }
        else if (priceOptionType == constants_1.PRICE_OPTIONS.DELIVERY_LOCATION.typeID) {
            priceOption.itemLocationQuantity.applicableTerritoryAddress = [new address_1.Address()];
        }
        else if (priceOptionType == constants_1.PRICE_OPTIONS.DELIVERY_PERIOD.typeID) {
            priceOption.estimatedDeliveryPeriod = new period_1.Period();
        }
        this.catalogueLine.priceOption.push(priceOption);
        this.catalogueLine.priceOption = [].concat(this.catalogueLine.priceOption);
        // update discount unit list
        this.updateDiscountUnits();
    };
    ProductPriceTabComponent.prototype.removePriceOption = function (index) {
        this.catalogueLine.priceOption.splice(index, 1);
        this.catalogueLine.priceOption = [].concat(this.catalogueLine.priceOption);
    };
    ProductPriceTabComponent.prototype.updateDiscountUnits = function () {
        this.discountUnits = [].concat([this.catalogueLine.requiredItemLocationQuantity.price.priceAmount.currencyID, "%"]);
    };
    ProductPriceTabComponent.prototype.getVatRateForCountry = function (userParty) {
        if (ProductPriceTabComponent_1.vatRates != null) {
            for (var _i = 0, _a = Object.keys(ProductPriceTabComponent_1.vatRates.rates); _i < _a.length; _i++) {
                var countryCode = _a[_i];
                if (ProductPriceTabComponent_1.vatRates.rates[countryCode].country_name == userParty.postalAddress.country.name.value) {
                    return ProductPriceTabComponent_1.vatRates.rates[countryCode].standard_rate;
                }
            }
        }
        return this.defaultVatRate;
    };
    ProductPriceTabComponent.vatRates = null;
    __decorate([
        core_1.Input(),
        __metadata("design:type", catalogue_line_1.CatalogueLine)
    ], ProductPriceTabComponent.prototype, "catalogueLine", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", company_negotiation_settings_1.CompanyNegotiationSettings)
    ], ProductPriceTabComponent.prototype, "companyNegotiationSettings", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Boolean)
    ], ProductPriceTabComponent.prototype, "disabled", void 0);
    ProductPriceTabComponent = ProductPriceTabComponent_1 = __decorate([
        core_1.Component({
            selector: "product-price-tab",
            templateUrl: "./product-price-tab.component.html",
            styleUrls: ["./product-price-tab.component.css"],
            providers: [price_option_count_pipe_1.PriceOptionCountPipe, price_option_pipe_1.PriceOptionPipe],
        }),
        __metadata("design:paramtypes", [catalogue_service_1.CatalogueService,
            user_service_1.UserService,
            ng2_cookies_1.CookieService])
    ], ProductPriceTabComponent);
    return ProductPriceTabComponent;
    var ProductPriceTabComponent_1;
}());
exports.ProductPriceTabComponent = ProductPriceTabComponent;
//# sourceMappingURL=product-price-tab.component.js.map