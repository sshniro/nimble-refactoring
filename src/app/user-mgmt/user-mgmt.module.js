"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var forms_1 = require("@angular/forms");
var http_1 = require("@angular/http");
var common_1 = require("@angular/common");
var common_module_1 = require("../common/common.module");
var ng_bootstrap_1 = require("@ng-bootstrap/ng-bootstrap");
var user_mgmt_routing_module_1 = require("./user-mgmt-routing.module");
var login_component_1 = require("./login.component");
var logout_component_1 = require("./logout.component");
var forgot_password_component_1 = require("./forgot-password.component");
var registration_component_1 = require("./registration.component");
var user_form_component_1 = require("./user-form.component");
var credentials_form_component_1 = require("./credentials-form.component");
var address_component_1 = require("./subforms/address.component");
var delivery_terms_component_1 = require("./subforms/delivery-terms.component");
var company_registration_component_1 = require("./company-registration.component");
var company_invitation_component_1 = require("./company-invitation.component");
var company_settings_component_1 = require("./company-settings/company-settings.component");
var company_description_settings_component_1 = require("./company-settings/company-description-settings.component");
var company_negotiation_settings_component_1 = require("./company-settings/company-negotiation-settings.component");
var company_certificates_settings_component_1 = require("./company-settings/company-certificates-settings.component");
var company_data_settings_component_1 = require("./company-settings/company-data-settings.component");
var company_delivery_terms_component_1 = require("./company-settings/company-delivery-terms.component");
var company_categories_settings_component_1 = require("./company-settings/company-categories-settings.component");
var company_details_component_1 = require("./company-details.component");
var company_rating_component_1 = require("./company-rating.component");
var user_profile_component_1 = require("./user-profile.component");
var UserMgmtModule = /** @class */ (function () {
    function UserMgmtModule() {
    }
    UserMgmtModule = __decorate([
        core_1.NgModule({
            imports: [
                common_1.CommonModule,
                common_module_1.AppCommonModule,
                forms_1.FormsModule,
                forms_1.ReactiveFormsModule,
                http_1.HttpModule,
                user_mgmt_routing_module_1.UserMgmtRoutingModule,
                ng_bootstrap_1.NgbModule.forRoot()
            ],
            declarations: [
                login_component_1.LoginComponent,
                logout_component_1.LogoutComponent,
                registration_component_1.RegistrationComponent,
                user_form_component_1.UserFormComponent,
                credentials_form_component_1.CredentialsFormComponent,
                address_component_1.AddressSubForm,
                delivery_terms_component_1.DeliveryTermsSubForm,
                company_settings_component_1.CompanySettingsComponent,
                company_description_settings_component_1.CompanyDescriptionSettingsComponent,
                company_registration_component_1.CompanyRegistrationComponent,
                company_invitation_component_1.CompanyInvitationComponent,
                company_negotiation_settings_component_1.CompanyNegotiationSettingsComponent,
                company_certificates_settings_component_1.CompanyCertificatesSettingsComponent,
                company_data_settings_component_1.CompanyDataSettingsComponent,
                company_delivery_terms_component_1.CompanyDeliveryTermsComponent,
                company_categories_settings_component_1.CompanyCategoriesSettingsComponent,
                company_details_component_1.CompanyDetailsComponent,
                company_rating_component_1.CompanyRatingComponent,
                user_profile_component_1.UserProfileComponent,
                forgot_password_component_1.ForgotPasswordComponent
            ],
            exports: [
                login_component_1.LoginComponent,
                logout_component_1.LogoutComponent,
                registration_component_1.RegistrationComponent,
                user_form_component_1.UserFormComponent,
                credentials_form_component_1.CredentialsFormComponent,
                address_component_1.AddressSubForm,
                delivery_terms_component_1.DeliveryTermsSubForm,
                company_registration_component_1.CompanyRegistrationComponent,
                company_invitation_component_1.CompanyInvitationComponent,
                company_details_component_1.CompanyDetailsComponent,
                company_rating_component_1.CompanyRatingComponent,
                user_profile_component_1.UserProfileComponent,
                forgot_password_component_1.ForgotPasswordComponent
            ],
            providers: []
        })
    ], UserMgmtModule);
    return UserMgmtModule;
}());
exports.UserMgmtModule = UserMgmtModule;
//# sourceMappingURL=user-mgmt.module.js.map