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
var analytics_routing_module_1 = require("./analytics-routing.module");
var platform_analytics_component_1 = require("./platform-analytics.component");
var performance_analytics_component_1 = require("../analytics/performance/performance-analytics.component");
var company_analytics_component_1 = require("./company-analytics.component");
var trust_policy_component_1 = require("./trust-policy.component");
var company_management_component_1 = require("./company-management.component");
var platform_info_component_1 = require("./platform-info.component");
var members_component_1 = require("./members.component");
var chat_component_1 = require("./chat.component");
var AnalyticsModule = /** @class */ (function () {
    function AnalyticsModule() {
    }
    AnalyticsModule = __decorate([
        core_1.NgModule({
            imports: [
                common_1.CommonModule,
                common_module_1.AppCommonModule,
                forms_1.FormsModule,
                http_1.HttpModule,
                forms_1.ReactiveFormsModule,
                analytics_routing_module_1.AnalyticsRoutingModule,
                ng_bootstrap_1.NgbModule.forRoot()
            ],
            declarations: [
                platform_analytics_component_1.PlatformAnalyticsComponent,
                company_analytics_component_1.CompanyAnalyticsComponent,
                trust_policy_component_1.TrustPolicyComponent,
                company_management_component_1.CompanyManagementComponent,
                platform_info_component_1.PlatformInfoComponent,
                members_component_1.MembersComponent,
                chat_component_1.ChatComponent,
                performance_analytics_component_1.PerformanceAnalyticsComponent
            ],
            exports: [
                platform_analytics_component_1.PlatformAnalyticsComponent,
                company_analytics_component_1.CompanyAnalyticsComponent,
                trust_policy_component_1.TrustPolicyComponent,
                company_management_component_1.CompanyManagementComponent,
                platform_info_component_1.PlatformInfoComponent,
                members_component_1.MembersComponent,
                chat_component_1.ChatComponent,
                performance_analytics_component_1.PerformanceAnalyticsComponent
            ],
            providers: []
        })
    ], AnalyticsModule);
    return AnalyticsModule;
}());
exports.AnalyticsModule = AnalyticsModule;
//# sourceMappingURL=analytics.module.js.map