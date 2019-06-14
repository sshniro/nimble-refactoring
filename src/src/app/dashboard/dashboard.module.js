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
var dashboard_routing_module_1 = require("./dashboard-routing.module");
var dashboard_threaded_component_1 = require("./dashboard-threaded.component");
var thread_summary_component_1 = require("./thread-summary.component");
var facet_component_1 = require("./facet-component");
var catalogue_module_1 = require("../catalogue/catalogue.module");
var analytics_module_1 = require("../analytics/analytics.module");
var thread_event_component_1 = require("./thread-event.component");
var DashboardModule = /** @class */ (function () {
    function DashboardModule() {
    }
    DashboardModule = __decorate([
        core_1.NgModule({
            imports: [
                common_1.CommonModule,
                common_module_1.AppCommonModule,
                forms_1.FormsModule,
                http_1.HttpModule,
                forms_1.ReactiveFormsModule,
                dashboard_routing_module_1.DashboardRoutingModule,
                catalogue_module_1.CatalogueModule,
                analytics_module_1.AnalyticsModule,
                ng_bootstrap_1.NgbModule.forRoot()
            ],
            declarations: [
                dashboard_threaded_component_1.DashboardThreadedComponent,
                thread_summary_component_1.ThreadSummaryComponent,
                thread_event_component_1.ThreadEventComponent,
                facet_component_1.FacetComponent
            ],
            exports: [
                dashboard_threaded_component_1.DashboardThreadedComponent,
                thread_summary_component_1.ThreadSummaryComponent,
                facet_component_1.FacetComponent
            ],
            providers: []
        })
    ], DashboardModule);
    return DashboardModule;
}());
exports.DashboardModule = DashboardModule;
//# sourceMappingURL=dashboard.module.js.map