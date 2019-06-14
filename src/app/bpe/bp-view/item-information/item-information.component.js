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
var router_1 = require("@angular/router");
var ItemInformationComponent = /** @class */ (function () {
    function ItemInformationComponent(bpDataService, router) {
        this.bpDataService = bpDataService;
        this.router = router;
    }
    ItemInformationComponent.prototype.ngOnInit = function () {
        if (this.bpDataService.bpActivityEvent.userRole == null) {
            this.router.navigate(['dashboard']);
        }
        if (this.bpDataService.itemInformationRequest == null) {
            // initiating a new business process from scratch
            this.bpDataService.initItemInformationRequest();
        }
    };
    ItemInformationComponent.prototype.shouldShowResponse = function () {
        return !!this.bpDataService.itemInformationResponse || this.bpDataService.bpActivityEvent.userRole === "seller";
    };
    ItemInformationComponent = __decorate([
        core_1.Component({
            selector: "item-information",
            templateUrl: "./item-information.component.html",
            styleUrls: ["./item-information.component.css"]
        }),
        __metadata("design:paramtypes", [bp_data_service_1.BPDataService,
            router_1.Router])
    ], ItemInformationComponent);
    return ItemInformationComponent;
}());
exports.ItemInformationComponent = ItemInformationComponent;
//# sourceMappingURL=item-information.component.js.map