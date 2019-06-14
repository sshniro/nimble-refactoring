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
var ng2_cookies_1 = require("ng2-cookies");
var bp_data_service_1 = require("../bp-data-service");
var router_1 = require("@angular/router");
var ubl_model_utils_1 = require("../../../catalogue/model/ubl-model-utils");
var PpapComponent = /** @class */ (function () {
    function PpapComponent(bpDataService, cookieService, route) {
        this.bpDataService = bpDataService;
        this.cookieService = cookieService;
        this.route = route;
    }
    PpapComponent.prototype.ngOnInit = function () {
        var _this = this;
        if (!this.bpDataService.ppap) {
            this.bpDataService.initPpap([]);
        }
        var currentCompanyId = this.cookieService.get("company_id");
        var sellerId = ubl_model_utils_1.UBLModelUtils.getPartyId(this.bpDataService.getCatalogueLine().goodsItem.item.manufacturerParty);
        this.formerProcess = this.bpDataService.bpActivityEvent.formerProcess;
        this.route.queryParams.subscribe(function (params) {
            if (!params['pid']) {
                _this.screen = "select";
                _this.userRole = "buyer";
            }
            else if (currentCompanyId === sellerId) {
                // seller
                _this.userRole = "seller";
                if (_this.bpDataService.ppapResponse && _this.bpDataService.ppapResponse.requestedDocument) {
                    _this.screen = "download";
                }
                else {
                    _this.screen = "upload";
                }
            }
            else {
                // buyer
                _this.userRole = "buyer";
                if (!_this.bpDataService.ppapResponse) {
                    _this.screen = "select";
                }
                else {
                    _this.screen = "download";
                }
            }
        });
    };
    PpapComponent = __decorate([
        core_1.Component({
            selector: "ppap",
            templateUrl: "./ppap.component.html"
        }),
        __metadata("design:paramtypes", [bp_data_service_1.BPDataService,
            ng2_cookies_1.CookieService,
            router_1.ActivatedRoute])
    ], PpapComponent);
    return PpapComponent;
}());
exports.PpapComponent = PpapComponent;
//# sourceMappingURL=ppap.component.js.map