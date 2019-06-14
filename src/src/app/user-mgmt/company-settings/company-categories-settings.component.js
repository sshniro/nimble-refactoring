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
var company_settings_1 = require("../model/company-settings");
var call_status_1 = require("../../common/call-status");
var user_service_1 = require("../user.service");
var ng2_cookies_1 = require("ng2-cookies");
var CompanyCategoriesSettingsComponent = /** @class */ (function () {
    function CompanyCategoriesSettingsComponent(cookieService, userService) {
        this.cookieService = cookieService;
        this.userService = userService;
        this.prefCats = [];
        this.recCats = [];
        this.prefCategoriesCallStatus = [];
        this.recCategoriesCallStatus = [];
    }
    CompanyCategoriesSettingsComponent.prototype.ngOnInit = function () {
        this.prefCats = this.settings.preferredProductCategories;
        this.recCats = this.settings.recentlyUsedProductCategories;
        this.prefCats.sort(function (a, b) { return a.split("::")[2].localeCompare(b.split("::")[2]); });
        this.recCats.sort(function (a, b) { return a.split("::")[2].localeCompare(b.split("::")[2]); });
        this.prefCategoriesCallStatus = this.prefCats.map(function () { return new call_status_1.CallStatus(); });
        this.recCategoriesCallStatus = this.recCats.map(function () { return new call_status_1.CallStatus(); });
    };
    CompanyCategoriesSettingsComponent.prototype.removePrefCat = function (cat, i) {
        var _this = this;
        if (confirm("Are you sure that you want to remove this category from your favorites?")) {
            this.prefCategoriesCallStatus[i].submit();
            var userId = this.cookieService.get("user_id");
            this.userService.togglePrefCat(userId, cat).then(function (res) {
                _this.prefCats = res;
                _this.prefCats.sort(function (a, b) { return a.split("::")[2].localeCompare(b.split("::")[2]); });
                _this.prefCategoriesCallStatus[i].callback("Succesfully removed category from favorites", true);
            })
                .catch(function (error) {
                _this.prefCategoriesCallStatus[i].error("Error while removing category from favourites", error);
            });
        }
    };
    CompanyCategoriesSettingsComponent.prototype.removeRecCat = function (cat, i) {
        var _this = this;
        if (confirm("Are you sure that you want to remove this category from your recently used ones?")) {
            this.recCategoriesCallStatus[i].submit();
            var userId = this.cookieService.get("user_id");
            this.userService.removeRecCat(userId, cat).then(function (res) {
                _this.recCats = res;
                _this.recCats.sort(function (a, b) { return a.split("::")[2].localeCompare(b.split("::")[2]); });
                _this.recCategoriesCallStatus[i].callback("Succesfully removed category from recently used", true);
            })
                .catch(function (error) {
                _this.recCategoriesCallStatus[i].error("Error while removing category from recently used", error);
            });
        }
    };
    __decorate([
        core_1.Input(),
        __metadata("design:type", company_settings_1.CompanySettings)
    ], CompanyCategoriesSettingsComponent.prototype, "settings", void 0);
    CompanyCategoriesSettingsComponent = __decorate([
        core_1.Component({
            selector: "company-categories-settings",
            templateUrl: "./company-categories-settings.component.html"
        }),
        __metadata("design:paramtypes", [ng2_cookies_1.CookieService,
            user_service_1.UserService])
    ], CompanyCategoriesSettingsComponent);
    return CompanyCategoriesSettingsComponent;
}());
exports.CompanyCategoriesSettingsComponent = CompanyCategoriesSettingsComponent;
//# sourceMappingURL=company-categories-settings.component.js.map