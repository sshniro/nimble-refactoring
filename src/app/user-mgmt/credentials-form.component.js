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
var credentials_1 = require("./model/credentials");
var credentials_service_1 = require("./credentials.service");
var myGlobals = require("../globals");
var ng2_cookies_1 = require("ng2-cookies");
var call_status_1 = require("../common/call-status");
var utils_1 = require("../common/utils");
var category_service_1 = require("../catalogue/category/category.service");
var constants = require("../common/constants");
//declare var jsSHA: any;
var CredentialsFormComponent = /** @class */ (function () {
    function CredentialsFormComponent(credentialsService, cookieService, appComponent, categoryService) {
        this.credentialsService = credentialsService;
        this.cookieService = cookieService;
        this.appComponent = appComponent;
        this.categoryService = categoryService;
        this.debug = myGlobals.debug;
        this.pwLink = myGlobals.pw_reset_link;
        this.model = new credentials_1.Credentials('', '');
        this.objToSubmit = new credentials_1.Credentials('', '');
        this.submitCallStatus = new call_status_1.CallStatus();
    }
    CredentialsFormComponent.prototype.ngOnInit = function () {
        if (this.cookieService.get("user_id")) {
            if (!this.appComponent.checkRoles("comp_req") && !this.appComponent.checkRoles('wait_comp'))
                this.appComponent.checkLogin("/user-mgmt/company-registration");
            else
                this.appComponent.checkLogin("/dashboard");
        }
        else {
            setTimeout(function () {
                var input = document.getElementById("email");
                if (input)
                    input.focus();
            }, 100);
        }
    };
    CredentialsFormComponent.prototype.post = function (credentials) {
        var _this = this;
        this.submitCallStatus.submit();
        this.credentialsService.post(credentials)
            .then(function (res) {
            if (myGlobals.debug)
                console.log("User logged in . Response: " + JSON.stringify(res));
            _this.response = res;
            _this.cookieService.set("user_id", res.userID);
            if (res.companyID)
                _this.cookieService.set("company_id", res.companyID);
            else
                _this.cookieService.set("company_id", null);
            if (res.companyName)
                _this.cookieService.set("active_company_name", utils_1.selectValueOfTextObject(res.companyName));
            else
                _this.cookieService.set("active_company_name", null);
            if (res.showWelcomeInfo)
                _this.cookieService.set("show_welcome", "true");
            else
                _this.cookieService.set("show_welcome", "false");
            _this.cookieService.set("user_fullname", res.firstname + " " + res.lastname);
            _this.cookieService.set("user_email", res.email);
            _this.cookieService.set("bearer_token", res.accessToken);
            // Setting cookie path to root to facilitate the iframe base login
            if (myGlobals.config.showChat) {
                _this.cookieService.set(constants.chatToken, res.rocketChatToken, undefined, '/');
                _this.cookieService.set(constants.chatUsername, res.rocketChatUsername, undefined, '/');
                _this.cookieService.set(constants.chatUserID, res.rocketChatUserID, undefined, '/');
            }
            _this.submitCallStatus.callback("Login Successful");
            if (!res.companyID && myGlobals.config.companyRegistrationRequired)
                _this.appComponent.checkLogin("/user-mgmt/company-registration");
            else
                _this.appComponent.checkLogin("/dashboard");
        })
            .catch(function (error) {
            _this.cookieService.delete("user_id");
            _this.cookieService.delete("company_id");
            _this.cookieService.delete("user_fullname");
            _this.cookieService.delete("user_email");
            _this.cookieService.delete("active_company_name");
            _this.cookieService.delete("show_welcome");
            _this.cookieService.delete("bearer_token");
            _this.cookieService.delete(constants.chatToken);
            _this.cookieService.delete(constants.chatUsername);
            _this.cookieService.delete(constants.chatUserID);
            _this.cookieService.delete(constants.chatRCToken);
            _this.cookieService.delete(constants.chatRCID);
            _this.cookieService.delete(constants.chatRCConnect);
            _this.appComponent.checkLogin("");
            _this.submitCallStatus.error("Invalid email or password", error);
        });
    };
    CredentialsFormComponent.prototype.reset = function () {
        this.submitCallStatus.reset();
        this.model = new credentials_1.Credentials('', '');
        this.objToSubmit = new credentials_1.Credentials('', '');
    };
    CredentialsFormComponent.prototype.onSubmit = function () {
        this.objToSubmit = utils_1.copy(this.model);
        /*
        this.shaObj = new jsSHA("SHA-256", "TEXT");
        this.shaObj.update(this.model.password);
        this.objToSubmit.password = this.shaObj.getHash("HEX");
        */
        this.post(this.objToSubmit);
    };
    CredentialsFormComponent = __decorate([
        core_1.Component({
            selector: 'credentials-form',
            providers: [ng2_cookies_1.CookieService],
            templateUrl: './credentials-form.component.html'
        }),
        __metadata("design:paramtypes", [credentials_service_1.CredentialsService,
            ng2_cookies_1.CookieService,
            app_component_1.AppComponent,
            category_service_1.CategoryService])
    ], CredentialsFormComponent);
    return CredentialsFormComponent;
}());
exports.CredentialsFormComponent = CredentialsFormComponent;
//# sourceMappingURL=credentials-form.component.js.map