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
var app_component_1 = require("../app.component");
var ng2_cookies_1 = require("ng2-cookies");
var user_service_1 = require("./user.service");
var category_service_1 = require("../catalogue/category/category.service");
var catalogue_service_1 = require("../catalogue/catalogue.service");
var constants = require("../common/constants");
var LogoutComponent = /** @class */ (function () {
    function LogoutComponent(cookieService, appComponent, userService, categoryService, catalogueService) {
        this.cookieService = cookieService;
        this.appComponent = appComponent;
        this.userService = userService;
        this.categoryService = categoryService;
        this.catalogueService = catalogueService;
    }
    LogoutComponent.prototype.ngOnInit = function () {
        this.cookieService.delete("user_id");
        this.cookieService.delete("company_id");
        this.cookieService.delete("user_fullname");
        this.cookieService.delete("user_email");
        this.userService.resetData();
        this.categoryService.resetData();
        this.catalogueService.resetData();
        this.cookieService.delete("active_company_name");
        this.cookieService.delete("show_welcome");
        this.cookieService.delete("bearer_token");
        this.cookieService.delete(constants.chatToken);
        this.cookieService.delete(constants.chatUsername);
        this.cookieService.delete(constants.chatUserID);
        this.cookieService.delete(constants.chatRCToken);
        this.cookieService.delete(constants.chatRCID);
        this.cookieService.delete(constants.chatRCConnect);
        this.userService.resetData();
        this.appComponent.checkLogin("/user-mgmt/login");
    };
    LogoutComponent = __decorate([
        core_1.Component({
            selector: 'nimble-logout',
            providers: [ng2_cookies_1.CookieService],
            templateUrl: './logout.component.html'
        }),
        __metadata("design:paramtypes", [ng2_cookies_1.CookieService,
            app_component_1.AppComponent,
            user_service_1.UserService,
            category_service_1.CategoryService,
            catalogue_service_1.CatalogueService])
    ], LogoutComponent);
    return LogoutComponent;
}());
exports.LogoutComponent = LogoutComponent;
//# sourceMappingURL=logout.component.js.map