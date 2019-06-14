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
var bp_data_service_1 = require("../bp-data-service");
var request_for_quotation_1 = require("../../../catalogue/model/publish/request-for-quotation");
var utils_1 = require("../../../common/utils");
var TransportServiceDetailsComponent = /** @class */ (function () {
    function TransportServiceDetailsComponent(bpDataService) {
        this.bpDataService = bpDataService;
    }
    TransportServiceDetailsComponent.prototype.ngOnInit = function () {
        this.lineItem = this.rfq.requestForQuotationLine[0].lineItem;
        this.shipment = this.lineItem.delivery[0].shipment;
        this.itemName = utils_1.selectPreferredValue(this.shipment.goodsItem[0].item.name);
    };
    __decorate([
        core_1.Input(),
        __metadata("design:type", request_for_quotation_1.RequestForQuotation)
    ], TransportServiceDetailsComponent.prototype, "rfq", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Boolean)
    ], TransportServiceDetailsComponent.prototype, "disabled", void 0);
    TransportServiceDetailsComponent = __decorate([
        core_1.Component({
            selector: "transport-service-details",
            templateUrl: "./transport-service-details.component.html"
        }),
        __metadata("design:paramtypes", [bp_data_service_1.BPDataService])
    ], TransportServiceDetailsComponent);
    return TransportServiceDetailsComponent;
}());
exports.TransportServiceDetailsComponent = TransportServiceDetailsComponent;
//# sourceMappingURL=transport-service-details.component.js.map