"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var router_1 = require("@angular/router");
var login_component_1 = require("./login.component");
var logout_component_1 = require("./logout.component");
var registration_component_1 = require("./registration.component");
var company_registration_component_1 = require("./company-registration.component");
var company_invitation_component_1 = require("./company-invitation.component");
var company_settings_component_1 = require("./company-settings/company-settings.component");
var company_details_component_1 = require("./company-details.component");
var company_rating_component_1 = require("./company-rating.component");
var user_profile_component_1 = require("./user-profile.component");
var forgot_password_component_1 = require("./forgot-password.component");
var routes = [
    { path: "login", component: login_component_1.LoginComponent },
    { path: "logout", component: logout_component_1.LogoutComponent },
    { path: "forgot", component: forgot_password_component_1.ForgotPasswordComponent },
    { path: "registration", component: registration_component_1.RegistrationComponent },
    { path: "company-registration", component: company_registration_component_1.CompanyRegistrationComponent },
    { path: "company-invitation", component: company_invitation_component_1.CompanyInvitationComponent },
    { path: "company-settings", component: company_settings_component_1.CompanySettingsComponent },
    { path: "company-details", component: company_details_component_1.CompanyDetailsComponent },
    { path: "company-rating", component: company_rating_component_1.CompanyRatingComponent },
    { path: "user-profile", component: user_profile_component_1.UserProfileComponent }
];
var UserMgmtRoutingModule = /** @class */ (function () {
    function UserMgmtRoutingModule() {
    }
    UserMgmtRoutingModule = __decorate([
        core_1.NgModule({
            imports: [router_1.RouterModule.forChild(routes)],
            exports: [router_1.RouterModule]
        })
    ], UserMgmtRoutingModule);
    return UserMgmtRoutingModule;
}());
exports.UserMgmtRoutingModule = UserMgmtRoutingModule;
//# sourceMappingURL=user-mgmt-routing.module.js.map