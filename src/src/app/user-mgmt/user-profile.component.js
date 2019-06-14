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
var user_service_1 = require("./user.service");
var ng2_cookies_1 = require("ng2-cookies");
var call_status_1 = require("../common/call-status");
var reset_password_credentials_1 = require("./model/reset-password-credentials");
var UserProfileComponent = /** @class */ (function () {
    function UserProfileComponent(userService, cookieService) {
        this.userService = userService;
        this.cookieService = cookieService;
        this.userProfile = null;
        this.callStatus = new call_status_1.CallStatus();
        this.changePasswordCallStatus = new call_status_1.CallStatus();
        this.changePasswordCredentials = new reset_password_credentials_1.ResetPasswordCredentials(null, null);
        this.newPasswordRepeated = null;
        this.pw_val_class = "ng-invalid";
        this.passwords_matching = false;
    }
    UserProfileComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.callStatus.submit();
        var userId = this.cookieService.get("user_id");
        this.userService
            .getPerson(userId)
            .then(function (res) {
            _this.callStatus.callback("Successfully loaded user profile", true);
            _this.userProfile = res;
        })
            .catch(function (error) {
            _this.callStatus.error("Invalid credentials", error);
        });
    };
    UserProfileComponent.prototype.onChangePasswordSubmit = function () {
        var _this = this;
        this.changePasswordCallStatus.submit();
        this.userService.resetPassword(this.changePasswordCredentials)
            .then(function (res) {
            _this.changePasswordCallStatus.callback("Successfully changed password");
        })
            .catch(function (error) {
            _this.changePasswordCallStatus.error("Error while changing password", error);
        });
    };
    UserProfileComponent.prototype.validatePasswords = function () {
        if (this.changePasswordCredentials.newPassword.localeCompare(this.newPasswordRepeated) == 0) {
            this.passwords_matching = true;
            this.pw_val_class = "ng-valid";
        }
        else {
            this.passwords_matching = false;
            this.pw_val_class = "ng-invalid";
        }
    };
    UserProfileComponent = __decorate([
        core_1.Component({
            selector: "user-profile",
            templateUrl: "./user-profile.component.html",
            styleUrls: ['./user-profile.component.css']
        }),
        __metadata("design:paramtypes", [user_service_1.UserService,
            ng2_cookies_1.CookieService])
    ], UserProfileComponent);
    return UserProfileComponent;
}());
exports.UserProfileComponent = UserProfileComponent;
//# sourceMappingURL=user-profile.component.js.map