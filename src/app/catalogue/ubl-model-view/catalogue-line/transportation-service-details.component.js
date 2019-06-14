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
var catalogue_line_1 = require("../../model/publish/catalogue-line");
var property_block_pipe_1 = require("../../property-block-pipe");
var publish_and_aip_service_1 = require("../../publish-and-aip.service");
var transportation_service_1 = require("../../model/publish/transportation-service");
var forms_1 = require("@angular/forms");
var TransportationServiceDetails = /** @class */ (function () {
    function TransportationServiceDetails(publishService) {
        this.publishService = publishService;
        this.PROPERTY_BLOCK_FIELD_NAME = "name";
        this.PROPERTY_BLOCK_FIELD_ISCOLLAPSED = "isCollapsed";
        this.PROPERTY_BLOCK_FIELD_PROPERTIES = "properties";
        this.PROPERTY_BLOCK_FIELD_PROPERTY_DETAILS = "propertyDetails";
        // keeping the collapsed state of property blocks. it is actually a reference to the actual kept in publish service
        this.propertyBlockCollapsedStates = new Map();
        this.propertyBlockCollapsedStates = this.publishService.getCollapsedStates();
    }
    TransportationServiceDetails.prototype.ngOnInit = function () {
        if (this.catalogueLine.goodsItem.item.transportationServiceDetails == null) {
            this.catalogueLine.goodsItem.item.transportationServiceDetails = new transportation_service_1.TransportationService();
        }
    };
    TransportationServiceDetails.prototype.toggleCollapsed = function (blockName) {
        this.propertyBlockCollapsedStates.set(blockName, !this.propertyBlockCollapsedStates.get(blockName));
    };
    TransportationServiceDetails.prototype.trackByIndex = function (index, item) {
        return index;
    };
    __decorate([
        core_1.Input(),
        __metadata("design:type", String)
    ], TransportationServiceDetails.prototype, "presentationMode", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", catalogue_line_1.CatalogueLine)
    ], TransportationServiceDetails.prototype, "catalogueLine", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", forms_1.FormGroup)
    ], TransportationServiceDetails.prototype, "parentForm", void 0);
    TransportationServiceDetails = __decorate([
        core_1.Component({
            selector: 'transportation-service-details',
            providers: [property_block_pipe_1.PropertyBlockPipe],
            templateUrl: './transportation-service-details.component.html',
        }),
        __metadata("design:paramtypes", [publish_and_aip_service_1.PublishService])
    ], TransportationServiceDetails);
    return TransportationServiceDetails;
}());
exports.TransportationServiceDetails = TransportationServiceDetails;
//# sourceMappingURL=transportation-service-details.component.js.map