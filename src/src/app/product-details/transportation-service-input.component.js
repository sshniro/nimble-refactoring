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
var catalogue_line_1 = require("../catalogue/model/publish/catalogue-line");
var transportation_service_1 = require("../catalogue/model/publish/transportation-service");
var utils_1 = require("../common/utils");
var TransportationServiceInput = /** @class */ (function () {
    function TransportationServiceInput() {
        this.presentationMode = "edit";
        this.transportStatus = new core_1.EventEmitter();
        this.spacingClass = "";
        this.valueTextClass = "";
        this.titleClass = "";
        this.shipmentStage = true;
        this.haveCountries = false;
        this.haveTransportMeans = true;
        this.haveEnvironmentalEmission = true;
        this.haveTransporationServiceDetails = true;
    }
    TransportationServiceInput.prototype.ngOnInit = function () {
        if (this.catalogueLine.goodsItem.item.transportationServiceDetails == null) {
            this.catalogueLine.goodsItem.item.transportationServiceDetails = new transportation_service_1.TransportationService();
        }
        if (this.catalogueLine.goodsItem.item.transportationServiceDetails.transportServiceCode.name == "" &&
            this.catalogueLine.goodsItem.item.transportationServiceDetails.supportedCommodityClassification[0].natureCode.name == "" &&
            this.catalogueLine.goodsItem.item.transportationServiceDetails.supportedCommodityClassification[0].cargoTypeCode.name == "" &&
            this.catalogueLine.goodsItem.item.transportationServiceDetails.totalCapacityDimension.measure.value == null &&
            this.catalogueLine.goodsItem.item.transportationServiceDetails.estimatedDurationPeriod.durationMeasure.value == null &&
            this.catalogueLine.goodsItem.item.transportationServiceDetails.scheduledServiceFrequency[0].weekDayCode.name == "") {
            this.haveTransporationServiceDetails = false;
        }
        if (this.catalogueLine.goodsItem.item.transportationServiceDetails.shipmentStage[0].transportModeCode.name == "" &&
            utils_1.selectPartyName(this.catalogueLine.goodsItem.item.transportationServiceDetails.shipmentStage[0].carrierParty.partyName) == null) {
            this.shipmentStage = false;
        }
        if (this.catalogueLine.requiredItemLocationQuantity.applicableTerritoryAddress == null ||
            this.catalogueLine.requiredItemLocationQuantity.applicableTerritoryAddress == [] ||
            this.catalogueLine.requiredItemLocationQuantity.applicableTerritoryAddress == undefined) {
            this.haveCountries = false;
        }
        else {
            for (this.address in this.catalogueLine.requiredItemLocationQuantity.applicableTerritoryAddress) {
                if (this.catalogueLine.requiredItemLocationQuantity.applicableTerritoryAddress[this.address].country.name.value !== null) {
                    this.haveCountries = true;
                }
            }
        }
        if (this.catalogueLine.goodsItem.item.transportationServiceDetails.shipmentStage[0].transportMeans.transportMeansTypeCode.name == "" &&
            this.catalogueLine.goodsItem.item.transportationServiceDetails.shipmentStage[0].transportMeans.transportEquipment[0].humidityPercent == null &&
            this.catalogueLine.goodsItem.item.transportationServiceDetails.shipmentStage[0].transportMeans.transportEquipment[0].refrigeratedIndicator == null &&
            this.catalogueLine.goodsItem.item.transportationServiceDetails.shipmentStage[0].transportMeans.transportEquipment[0].characteristics == null &&
            this.catalogueLine.goodsItem.item.transportationServiceDetails.shipmentStage[0].transportMeans.transportEquipment[0].transportEquipmentTypeCode.name == "") {
            this.haveTransportMeans = false;
        }
        if (this.catalogueLine.goodsItem.item.transportationServiceDetails.environmentalEmission[0].environmentalEmissionTypeCode.name == "" &&
            this.catalogueLine.goodsItem.item.transportationServiceDetails.environmentalEmission[0].valueMeasure.value == null) {
            this.haveEnvironmentalEmission = false;
        }
        if (this.haveCountries == false && this.haveEnvironmentalEmission == false && this.haveTransporationServiceDetails == false && this.haveTransportMeans == false && this.shipmentStage == false) {
            this.transportStatus.emit(true);
        }
        if (this.presentationMode === "edit") {
            this.spacingClass = "my-3";
            this.valueTextClass = "form-control-sm";
            this.titleClass = "my-2";
        }
        else {
            this.valueTextClass = "form-control-sm m-0 p-0";
            this.titleClass = "my-3";
        }
    };
    __decorate([
        core_1.Input(),
        __metadata("design:type", catalogue_line_1.CatalogueLine)
    ], TransportationServiceInput.prototype, "catalogueLine", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", String)
    ], TransportationServiceInput.prototype, "presentationMode", void 0);
    __decorate([
        core_1.Output(),
        __metadata("design:type", Object)
    ], TransportationServiceInput.prototype, "transportStatus", void 0);
    TransportationServiceInput = __decorate([
        core_1.Component({
            selector: "transportation-service-input",
            templateUrl: "./transportation-service-input.component.html"
        }),
        __metadata("design:paramtypes", [])
    ], TransportationServiceInput);
    return TransportationServiceInput;
}());
exports.TransportationServiceInput = TransportationServiceInput;
//# sourceMappingURL=transportation-service-input.component.js.map