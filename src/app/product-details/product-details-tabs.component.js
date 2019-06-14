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
var product_wrapper_1 = require("../common/product-wrapper");
var bp_workflow_options_1 = require("../bpe/model/bp-workflow-options");
var bpe_service_1 = require("../bpe/bpe.service");
var utils_1 = require("../common/utils");
var company_settings_1 = require("../user-mgmt/model/company-settings");
var myGlobals = require("../globals");
var ProductDetailsTabsComponent = /** @class */ (function () {
    function ProductDetailsTabsComponent(bpeService) {
        this.bpeService = bpeService;
        this.showOverview = false;
        this.readonly = false;
        this.tabStatus = new core_1.EventEmitter();
        this.config = myGlobals.config;
        this.isLogistics = false;
        this.isTransportService = false;
        this.haveDetails = true;
        this.haveTransportServiceDetails = true;
        this.haveCertificates = true;
        this.haveLCPA = true;
        this.havePrice = true;
        this.haveRating = false;
    }
    Object.defineProperty(ProductDetailsTabsComponent.prototype, "tabToOpen", {
        set: function (tab) {
            if (tab)
                this.selectedTab = tab;
            this.tabStatus.emit(false);
        },
        enumerable: true,
        configurable: true
    });
    ProductDetailsTabsComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.selectedTab = this.getFirstTab();
        this.isLogistics = this.wrapper.getLogisticsStatus();
        this.isTransportService = this.wrapper.isTransportService();
        if (this.wrapper.getDimensions().length == 0 && this.wrapper.getUniquePropertiesWithValue().length == 0 && this.wrapper.getAdditionalDocuments().length == 0) {
            this.haveDetails = false;
            this.selectedTab = this.getFirstTab();
        }
        if (!this.isLogistics) {
            if (this.wrapper.getIncoterms() == '' && this.wrapper.getSpecialTerms() == null && this.wrapper.getDeliveryPeriod() == '' && this.wrapper.getPackaging() == '') {
                this.haveTransportServiceDetails = false;
                this.selectedTab = this.getFirstTab();
            }
        }
        else if (this.isTransportService) {
            if (this.wrapper.line.goodsItem.item.transportationServiceDetails.transportServiceCode.name == "" &&
                this.wrapper.line.goodsItem.item.transportationServiceDetails.supportedCommodityClassification[0].natureCode.name == "" &&
                this.wrapper.line.goodsItem.item.transportationServiceDetails.supportedCommodityClassification[0].cargoTypeCode.name == "" &&
                this.wrapper.line.goodsItem.item.transportationServiceDetails.totalCapacityDimension.measure.value == null &&
                this.wrapper.line.goodsItem.item.transportationServiceDetails.estimatedDurationPeriod.durationMeasure.value == null &&
                this.wrapper.line.goodsItem.item.transportationServiceDetails.scheduledServiceFrequency[0].weekDayCode.name == "" &&
                this.wrapper.line.goodsItem.item.transportationServiceDetails.shipmentStage[0].transportModeCode.name == "" &&
                utils_1.selectPartyName(this.wrapper.line.goodsItem.item.transportationServiceDetails.shipmentStage[0].carrierParty.partyName) == null &&
                (this.wrapper.line.requiredItemLocationQuantity.applicableTerritoryAddress == null || this.wrapper.line.requiredItemLocationQuantity.applicableTerritoryAddress == [] || this.wrapper.line.requiredItemLocationQuantity.applicableTerritoryAddress == undefined) &&
                this.wrapper.line.goodsItem.item.transportationServiceDetails.shipmentStage[0].transportMeans.transportMeansTypeCode.name == "" &&
                this.wrapper.line.goodsItem.item.transportationServiceDetails.shipmentStage[0].transportMeans.transportEquipment[0].humidityPercent == null &&
                this.wrapper.line.goodsItem.item.transportationServiceDetails.shipmentStage[0].transportMeans.transportEquipment[0].refrigeratedIndicator == null &&
                this.wrapper.line.goodsItem.item.transportationServiceDetails.shipmentStage[0].transportMeans.transportEquipment[0].characteristics == null &&
                this.wrapper.line.goodsItem.item.transportationServiceDetails.shipmentStage[0].transportMeans.transportEquipment[0].transportEquipmentTypeCode.name == "" &&
                this.wrapper.line.goodsItem.item.transportationServiceDetails.environmentalEmission[0].environmentalEmissionTypeCode.name == "" &&
                this.wrapper.line.goodsItem.item.transportationServiceDetails.environmentalEmission[0].valueMeasure.value == null) {
                this.haveTransportServiceDetails = false;
                this.selectedTab = this.getFirstTab();
            }
        }
        if (this.wrapper.getPricePerItem() == '' && this.wrapper.getFreeSample() == '') {
            this.havePrice = false;
            this.selectedTab = this.getFirstTab();
        }
        if (this.settings.certificates.length == 0 && this.wrapper.line.goodsItem.item.certificate.length == 0) {
            this.haveCertificates = false;
            this.selectedTab = this.getFirstTab();
        }
        if (this.wrapper.line.goodsItem.item.lifeCyclePerformanceAssessmentDetails == null) {
            this.haveLCPA = false;
            this.selectedTab = this.getFirstTab();
        }
        this.bpeService.getRatingsSummary(this.settings.companyID).then(function (ratings) {
            if (ratings.totalNumberOfRatings <= 0) {
                _this.haveRating = false;
                _this.selectedTab = _this.getFirstTab();
            }
            else {
                _this.haveRating = true;
            }
        })
            .catch(function (error) {
            _this.haveRating = false;
            _this.selectedTab = _this.getFirstTab();
        });
    };
    ProductDetailsTabsComponent.prototype.onSelectTab = function (event) {
        event.preventDefault();
        this.selectedTab = event.target.id;
        this.tabStatus.emit(false);
    };
    ProductDetailsTabsComponent.prototype.getValuesAsString = function (property) {
        return utils_1.getPropertyValuesAsStrings(property);
    };
    ProductDetailsTabsComponent.prototype.getMultiValuedDimensionAsString = function (quantities) {
        var quantitiesWithUnits = quantities.filter(function (qty) { return qty.unitCode && qty.unitCode != ''; });
        return quantitiesWithUnits.map(function (qty) { return qty.value + " " + qty.unitCode; }).join(", ");
    };
    ProductDetailsTabsComponent.prototype.getHumanReadablePropertyName = function (propertyName) {
        return propertyName.replace("Has", "");
    };
    ProductDetailsTabsComponent.prototype.getTransportStatusTab = function (data) {
        if (data) {
            this.haveTransportServiceDetails = false;
            if (this.selectedTab == "DELIVERY_TRADING")
                this.selectedTab = this.getFirstTab();
        }
    };
    ProductDetailsTabsComponent.prototype.getCertificateStatusTab = function (data) {
        if (data) {
            this.haveCertificates = false;
            if (this.selectedTab == "CERTIFICATES")
                this.selectedTab = this.getFirstTab();
        }
    };
    ProductDetailsTabsComponent.prototype.getLCPAStatusTab = function (data) {
        if (data) {
            this.haveLCPA = false;
            if (this.selectedTab == "LCPA")
                this.selectedTab = this.getFirstTab();
        }
    };
    ProductDetailsTabsComponent.prototype.getRatingStatusTab = function (data) {
        if (data) {
            this.haveRating = false;
            if (this.selectedTab == "RATING")
                this.selectedTab = this.getFirstTab();
        }
    };
    ProductDetailsTabsComponent.prototype.getFirstTab = function () {
        this.tabStatus.emit(false);
        if (this.tabToOpen) {
            return this.tabToOpen;
        }
        if (this.showOverview) {
            return "OVERVIEW";
        }
        else {
            if (this.haveDetails)
                return "DETAILS";
            else if (this.havePrice)
                return "PRICE";
            else if (this.haveTransportServiceDetails)
                return "DELIVERY_TRADING";
            else if (this.haveCertificates)
                return "CERTIFICATES";
            else if (this.config.showLCPA && this.haveLCPA)
                return "LCPA";
            else
                return "COMPANY";
        }
    };
    __decorate([
        core_1.Input(),
        __metadata("design:type", product_wrapper_1.ProductWrapper)
    ], ProductDetailsTabsComponent.prototype, "wrapper", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", bp_workflow_options_1.BpWorkflowOptions)
    ], ProductDetailsTabsComponent.prototype, "options", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", company_settings_1.CompanySettings)
    ], ProductDetailsTabsComponent.prototype, "settings", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Boolean)
    ], ProductDetailsTabsComponent.prototype, "showOverview", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Boolean)
    ], ProductDetailsTabsComponent.prototype, "readonly", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", String),
        __metadata("design:paramtypes", [String])
    ], ProductDetailsTabsComponent.prototype, "tabToOpen", null);
    __decorate([
        core_1.Output(),
        __metadata("design:type", Object)
    ], ProductDetailsTabsComponent.prototype, "tabStatus", void 0);
    ProductDetailsTabsComponent = __decorate([
        core_1.Component({
            selector: 'product-details-tabs',
            templateUrl: './product-details-tabs.component.html',
            styleUrls: ['./product-details-tabs.component.css']
        }),
        __metadata("design:paramtypes", [bpe_service_1.BPEService])
    ], ProductDetailsTabsComponent);
    return ProductDetailsTabsComponent;
}());
exports.ProductDetailsTabsComponent = ProductDetailsTabsComponent;
//# sourceMappingURL=product-details-tabs.component.js.map