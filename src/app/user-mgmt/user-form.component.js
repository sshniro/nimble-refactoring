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
var credentials_service_1 = require("./credentials.service");
var user_service_1 = require("./user.service");
var ng2_cookies_1 = require("ng2-cookies");
var myGlobals = require("../globals");
var user_registration_1 = require("./model/user-registration");
var router_1 = require("@angular/router");
var ng_bootstrap_1 = require("@ng-bootstrap/ng-bootstrap");
var router_2 = require("@angular/router");
var call_status_1 = require("../common/call-status");
var constants = require("../common/constants");
var utils_1 = require("../common/utils");
//declare var jsSHA: any;
var UserFormComponent = /** @class */ (function () {
    function UserFormComponent(userService, router, modalService, credentialsService, cookieService, appComponent, route) {
        this.userService = userService;
        this.router = router;
        this.modalService = modalService;
        this.credentialsService = credentialsService;
        this.cookieService = cookieService;
        this.appComponent = appComponent;
        this.route = route;
        this.password_validate = "";
        this.pw_val_class = "ng-valid";
        this.passwords_matching = false;
        this.email_preset = false;
        this.eula_accepted = false;
        this.debug = myGlobals.debug;
        this.config = myGlobals.config;
        this.requiredAgreements = {};
        /* ToDo: Hackathon only BEGIN */
        this.model = user_registration_1.UserRegistration.initEmpty();
        this.objToSubmit = user_registration_1.UserRegistration.initEmpty();
        this.submitCallStatus = new call_status_1.CallStatus();
    }
    UserFormComponent.prototype.ngOnInit = function () {
        var _this = this;
        for (var i = 0; i < this.config.requiredAgreements.length; i++) {
            this.requiredAgreements[this.config.requiredAgreements[i].title] = false;
        }
        this.route.queryParams.subscribe(function (params) {
            if (params['email']) {
                var test = /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9._-]+\.[a-z]{2,3}$/.test(params['email']);
                if (test) {
                    _this.model.user.email = params['email'];
                    _this.email_preset = true;
                }
                else {
                    _this.model.user.email = "";
                    _this.email_preset = false;
                }
            }
            else {
                _this.model.user.email = "";
                _this.email_preset = false;
            }
        });
    };
    UserFormComponent.prototype.post = function (userRegistration) {
        var _this = this;
        userRegistration.credentials.username = userRegistration.user.email;
        userRegistration.user.username = userRegistration.user.email;
        this.submitCallStatus.submit();
        this.userService.registerUser(userRegistration)
            .then(function (res) {
            _this.response = res;
            _this.submitCallStatus.callback("Registration Successful!");
            //this.router.navigate(["/user-mgmt/login"], {queryParams: { pageRef: "registration" }});
            _this.login(userRegistration.credentials);
        })
            .catch(function (error) {
            _this.submitCallStatus.error("Registration failed - please make sure your account is not yet registered and try again later", error);
        });
    };
    UserFormComponent.prototype.reset = function () {
        this.submitCallStatus.reset();
        /* ToDo: Hackathon only BEGIN */
        this.model = user_registration_1.UserRegistration.initEmpty();
        this.objToSubmit = user_registration_1.UserRegistration.initEmpty();
        //model = new User('','','','','','','','','');
        //objToSubmit = new User('','','','','','','','','');
        /* ToDo: Hackathon only END */
    };
    UserFormComponent.prototype.validatePW = function () {
        var pw = this.model.credentials.password;
        var pw_val = this.password_validate;
        if (pw.localeCompare(pw_val) == 0) {
            this.passwords_matching = true;
            this.pw_val_class = "ng-valid";
        }
        else {
            this.passwords_matching = false;
            this.pw_val_class = "ng-invalid";
        }
    };
    UserFormComponent.prototype.onSubmit = function () {
        this.objToSubmit = JSON.parse(JSON.stringify(this.model));
        /*
        this.shaObj = new jsSHA("SHA-256", "TEXT");
        this.shaObj.update(this.model.credentials.password);
        this.objToSubmit.credentials.password = this.shaObj.getHash("HEX");
        */
        // this.objToSubmit.dateOfBirth = new Date(this.model.dateOfBirth).toISOString(); // ToDo: add again to model
        this.post(this.objToSubmit);
    };
    UserFormComponent.prototype.login = function (credentials) {
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
            _this.appComponent.checkLogin("/user-mgmt/login");
            _this.submitCallStatus.error("Invalid email or password", error);
        });
    };
    UserFormComponent.prototype.open = function (content) {
        this.modalService.open(content);
    };
    UserFormComponent = __decorate([
        core_1.Component({
            selector: 'user-form',
            templateUrl: './user-form.component.html'
        }),
        __metadata("design:paramtypes", [user_service_1.UserService,
            router_2.Router,
            ng_bootstrap_1.NgbModal,
            credentials_service_1.CredentialsService,
            ng2_cookies_1.CookieService,
            app_component_1.AppComponent,
            router_1.ActivatedRoute])
    ], UserFormComponent);
    return UserFormComponent;
}());
exports.UserFormComponent = UserFormComponent;
//# sourceMappingURL=user-form.component.js.map