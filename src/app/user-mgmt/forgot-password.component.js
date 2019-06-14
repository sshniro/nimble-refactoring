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
var credentials_service_1 = require("./credentials.service");
var forgot_password_credentials_1 = require("./model/forgot-password-credentials");
var call_status_1 = require("../common/call-status");
var router_1 = require("@angular/router");
var ForgotPasswordComponent = /** @class */ (function () {
    function ForgotPasswordComponent(route, cookieService, appComponent, userService, categoryService, credentialsService, catalogueService) {
        this.route = route;
        this.cookieService = cookieService;
        this.appComponent = appComponent;
        this.userService = userService;
        this.categoryService = categoryService;
        this.credentialsService = credentialsService;
        this.catalogueService = catalogueService;
        this.showSuccessEmail = false;
        this.showErrorMessage = false;
        this.model = new forgot_password_credentials_1.ForgotPasswordCredentials('', '', '');
        this.key = null;
        this.newPasswordRepeated = null;
        this.passwords_matching = false;
        this.pw_val_class = "ng-invalid";
        this.submitCallStatus = new call_status_1.CallStatus();
    }
    ForgotPasswordComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.route
            .queryParams
            .subscribe(function (params) {
            if (params['key'] !== undefined)
                _this.key = params['key'];
        });
    };
    ForgotPasswordComponent.prototype.resetPasswordViaRecoveryProcess = function () {
        var _this = this;
        this.submitCallStatus.submit();
        this.credentialsService.passwordRecoveryAction(this.model)
            .then(function (res) {
            _this.showSuccessEmail = true;
            _this.submitCallStatus.callback("You should receive an email shortly with further instructions.");
        })
            .catch(function (error) {
            _this.showErrorMessage = true;
            _this.submitCallStatus.error("Invalid email", error);
        });
    };
    ForgotPasswordComponent.prototype.resetForgotPassword = function () {
        var _this = this;
        this.submitCallStatus.submit();
        this.model.key = this.key;
        this.credentialsService.resetPassword(this.model)
            .then(function (res) {
            _this.showSuccessEmail = true;
            _this.submitCallStatus.callback("Password Reset Successfully!");
            setTimeout(function () {
                _this.appComponent.checkLogin("/dashboard");
            }, 2000);
        })
            .catch(function (error) {
            _this.showErrorMessage = true;
            if (error.status == 404) {
                _this.submitCallStatus.error("Invalid email", error);
            }
            else if (error.status == 400) {
                _this.submitCallStatus.error("Invalid Link", error);
            }
            else if (error.status == 401) {
                _this.submitCallStatus.error("Link Expired", error);
            }
            else {
                _this.submitCallStatus.error("Error occurred while resetting the password", error);
            }
        });
    };
    ForgotPasswordComponent.prototype.validatePasswords = function () {
        if (this.model.newPassword.localeCompare(this.newPasswordRepeated) == 0) {
            this.passwords_matching = true;
            this.pw_val_class = "ng-valid";
        }
        else {
            this.passwords_matching = false;
            this.pw_val_class = "ng-invalid";
        }
    };
    ForgotPasswordComponent = __decorate([
        core_1.Component({
            selector: 'nimble-forgot',
            providers: [ng2_cookies_1.CookieService],
            templateUrl: './forgot-password.component.html'
        }),
        __metadata("design:paramtypes", [router_1.ActivatedRoute,
            ng2_cookies_1.CookieService,
            app_component_1.AppComponent,
            user_service_1.UserService,
            category_service_1.CategoryService,
            credentials_service_1.CredentialsService,
            catalogue_service_1.CatalogueService])
    ], ForgotPasswordComponent);
    return ForgotPasswordComponent;
}());
exports.ForgotPasswordComponent = ForgotPasswordComponent;
//# sourceMappingURL=forgot-password.component.js.map