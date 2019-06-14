"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var common_1 = require("@angular/common");
var common_module_1 = require("../common/common.module");
var forms_1 = require("@angular/forms");
var http_1 = require("@angular/http");
var ng_bootstrap_1 = require("@ng-bootstrap/ng-bootstrap");
var product_details_component_1 = require("./product-details.component");
var product_details_routing_module_1 = require("./product-details-routing.module");
var product_details_tabs_component_1 = require("./product-details-tabs.component");
var product_details_overview_component_1 = require("./product-details-overview.component");
var transportation_service_input_component_1 = require("./transportation-service-input.component");
var product_details_certificates_component_1 = require("./product-details-certificates.component");
var user_mgmt_module_1 = require("../user-mgmt/user-mgmt.module");
var discount_modal_component_1 = require("./discount-modal.component");
var product_lcpa_tab_component_1 = require("./product-lcpa-tab.component");
var lcpa_detail_modal_component_1 = require("./lcpa-detail-modal.component");
var ProductDetailsModule = /** @class */ (function () {
    function ProductDetailsModule() {
    }
    ProductDetailsModule = __decorate([
        core_1.NgModule({
            imports: [
                common_1.CommonModule,
                common_module_1.AppCommonModule,
                forms_1.FormsModule,
                http_1.HttpModule,
                forms_1.ReactiveFormsModule,
                product_details_routing_module_1.ProductDetailsRoutingModule,
                user_mgmt_module_1.UserMgmtModule,
                ng_bootstrap_1.NgbModule.forRoot()
            ],
            declarations: [
                product_details_component_1.ProductDetailsComponent,
                product_details_tabs_component_1.ProductDetailsTabsComponent,
                product_details_overview_component_1.ProductDetailsOverviewComponent,
                product_details_certificates_component_1.ProductDetailsCertificatesComponent,
                transportation_service_input_component_1.TransportationServiceInput,
                discount_modal_component_1.DiscountModalComponent,
                product_lcpa_tab_component_1.ProductLcpaTabComponent,
                lcpa_detail_modal_component_1.LcpaDetailModalComponent
            ],
            exports: [
                product_details_tabs_component_1.ProductDetailsTabsComponent,
                transportation_service_input_component_1.TransportationServiceInput,
                discount_modal_component_1.DiscountModalComponent,
                product_lcpa_tab_component_1.ProductLcpaTabComponent,
                lcpa_detail_modal_component_1.LcpaDetailModalComponent
            ],
            providers: []
        })
    ], ProductDetailsModule);
    return ProductDetailsModule;
}());
exports.ProductDetailsModule = ProductDetailsModule;
//# sourceMappingURL=product-details.module.js.map