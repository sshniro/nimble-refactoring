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
var address_1 = require("../model/publish/address");
var ng2_cookies_1 = require("ng2-cookies");
var user_service_1 = require("../../user-mgmt/user.service");
var call_status_1 = require("../../common/call-status");
/*
 * Anthony 14/06/2018: this class should be removed (no longer used) once the
 * business process payment details is redone.
 */
var DetailedAddressViewComponent = /** @class */ (function () {
    function DetailedAddressViewComponent(cookieService, userService) {
        this.cookieService = cookieService;
        this.userService = userService;
        this.getDefaultDeliveryLocation = new call_status_1.CallStatus();
    }
    DetailedAddressViewComponent.prototype.ngOnInit = function () {
        var _this = this;
        // get company address
        if (this.fetchDefaultDeliveryAddress) {
            this.getDefaultDeliveryLocation.submit();
            var userId = this.cookieService.get('user_id');
            this.userService.getSettingsForUser(userId).then(function (settings) {
                _this.deliveryAddress.country.name.value = settings.details.address.country;
                _this.deliveryAddress.postalZone = settings.details.address.postalCode;
                _this.deliveryAddress.cityName = settings.details.address.cityName;
                _this.deliveryAddress.region = settings.details.address.region;
                _this.deliveryAddress.buildingNumber = settings.details.address.buildingNumber;
                _this.deliveryAddress.streetName = settings.details.address.streetName;
                _this.getDefaultDeliveryLocation.callback("Retrieved default delivery location", true);
            }).catch(function (error) {
                _this.getDefaultDeliveryLocation.error("Failed to retrieve default delivery location", error);
            });
        }
        else {
            this.getDefaultDeliveryLocation.callback("Does not need to retrieve default delivery location", true);
        }
    };
    __decorate([
        core_1.Input(),
        __metadata("design:type", String)
    ], DetailedAddressViewComponent.prototype, "propName", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", String)
    ], DetailedAddressViewComponent.prototype, "presentationMode", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", address_1.Address)
    ], DetailedAddressViewComponent.prototype, "deliveryAddress", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Boolean)
    ], DetailedAddressViewComponent.prototype, "fetchDefaultDeliveryAddress", void 0);
    DetailedAddressViewComponent = __decorate([
        core_1.Component({
            selector: 'detailed-address-view',
            templateUrl: './detailed-address-view.component.html'
        }),
        __metadata("design:paramtypes", [ng2_cookies_1.CookieService,
            user_service_1.UserService])
    ], DetailedAddressViewComponent);
    return DetailedAddressViewComponent;
}());
exports.DetailedAddressViewComponent = DetailedAddressViewComponent;
//# sourceMappingURL=detailed-address-view.component.js.map