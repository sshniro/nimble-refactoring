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
var platform_analytics_component_1 = require("./platform-analytics.component");
var company_analytics_component_1 = require("./company-analytics.component");
var trust_policy_component_1 = require("./trust-policy.component");
var company_management_component_1 = require("./company-management.component");
var platform_info_component_1 = require("./platform-info.component");
var members_component_1 = require("./members.component");
var chat_component_1 = require("./chat.component");
var routes = [
    { path: 'platform', component: platform_analytics_component_1.PlatformAnalyticsComponent },
    { path: 'company', component: company_analytics_component_1.CompanyAnalyticsComponent },
    { path: 'trust', component: trust_policy_component_1.TrustPolicyComponent },
    { path: 'management', component: company_management_component_1.CompanyManagementComponent },
    { path: 'info', component: platform_info_component_1.PlatformInfoComponent },
    { path: 'members', component: members_component_1.MembersComponent },
    { path: 'chat', component: chat_component_1.ChatComponent }
];
var AnalyticsRoutingModule = /** @class */ (function () {
    function AnalyticsRoutingModule() {
    }
    AnalyticsRoutingModule = __decorate([
        core_1.NgModule({
            imports: [router_1.RouterModule.forChild(routes)],
            exports: [router_1.RouterModule]
        })
    ], AnalyticsRoutingModule);
    return AnalyticsRoutingModule;
}());
exports.AnalyticsRoutingModule = AnalyticsRoutingModule;
//# sourceMappingURL=analytics-routing.module.js.map