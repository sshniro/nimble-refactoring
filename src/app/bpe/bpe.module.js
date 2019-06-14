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
var bpe_routing_module_1 = require("./bpe-routing.module");
// TODO: Get rid of these dependencies
var catalogue_module_1 = require("../catalogue/catalogue.module");
var bp_configure_component_1 = require("./bp-configure.component");
var bps_component_1 = require("./bps.component");
var bp_detail_component_1 = require("./bp-detail.component");
var product_bp_options_component_1 = require("./bp-view/product-bp-options.component");
var order_component_1 = require("./bp-view/order/order.component");
var fulfilment_component_1 = require("./bp-view/fulfilment/fulfilment.component");
var receipt_advice_component_1 = require("./bp-view/fulfilment/receipt-advice.component");
var negotiation_component_1 = require("./bp-view/negotiation/negotiation.component");
var transport_execution_plan_component_1 = require("./bp-view/transport-execution-plan/transport-execution-plan.component");
var bp_product_details_component_1 = require("./bp-view/bp-product-details.component");
var ppap_component_1 = require("./bp-view/ppap/ppap.component");
var ppap_document_select_component_1 = require("./bp-view/ppap/ppap-document-select.component");
var ppap_document_upload_component_1 = require("./bp-view/ppap/ppap-document-upload.component");
var ppap_document_download_component_1 = require("./bp-view/ppap/ppap-document-download.component");
var contract_component_1 = require("./bp-view/contract/contract.component");
var clause_component_1 = require("./bp-view/contract/clause.component");
var ppap_clause_component_1 = require("./bp-view/contract/ppap-clause.component");
var product_bp_steps_component_1 = require("./bp-view/product-bp-steps.component");
var negotiation_request_component_1 = require("./bp-view/negotiation/negotiation-request.component");
var negotiation_request_input_component_1 = require("./bp-view/negotiation/negotiation-request-input.component");
var negotiation_response_component_1 = require("./bp-view/negotiation/negotiation-response.component");
var item_information_request_component_1 = require("./bp-view/item-information/item-information-request.component");
var item_information_response_component_1 = require("./bp-view/item-information/item-information-response.component");
var item_information_component_1 = require("./bp-view/item-information/item-information.component");
var product_details_module_1 = require("../product-details/product-details.module");
var dispatch_advice_component_1 = require("./bp-view/fulfilment/dispatch-advice.component");
var shipment_input_component_1 = require("./bp-view/fulfilment/shipment-input.component");
var transport_negotiation_request_component_1 = require("./bp-view/transport-negotiation/transport-negotiation-request.component");
var transport_negotiation_component_1 = require("./bp-view/transport-negotiation/transport-negotiation.component");
var transport_negotiation_response_component_1 = require("./bp-view/transport-negotiation/transport-negotiation-response.component");
var transport_service_details_component_1 = require("./bp-view/transport-negotiation/transport-service-details.component");
var transport_negotiation_address_component_1 = require("./bp-view/transport-negotiation/transport-negotiation-address.component");
var terms_and_conditions_component_1 = require("./bp-view/contract/terms-and-conditions.component");
var BPEModule = /** @class */ (function () {
    function BPEModule() {
    }
    BPEModule = __decorate([
        core_1.NgModule({
            imports: [
                common_1.CommonModule,
                common_module_1.AppCommonModule,
                forms_1.FormsModule,
                http_1.HttpModule,
                forms_1.ReactiveFormsModule,
                bpe_routing_module_1.BPERoutingModule,
                catalogue_module_1.CatalogueModule,
                product_details_module_1.ProductDetailsModule,
                ng_bootstrap_1.NgbModule.forRoot()
            ],
            declarations: [
                bp_configure_component_1.BPConfigureComponent,
                bps_component_1.BPsComponent,
                bp_detail_component_1.BPDetailComponent,
                product_bp_options_component_1.ProductBpOptionsComponent,
                product_bp_steps_component_1.ProductBpStepsComponent,
                order_component_1.OrderComponent,
                terms_and_conditions_component_1.TermsAndConditionsComponent,
                fulfilment_component_1.FulfilmentComponent,
                dispatch_advice_component_1.DispatchAdviceComponent,
                receipt_advice_component_1.ReceiptAdviceComponent,
                item_information_request_component_1.ItemInformationRequestComponent,
                item_information_response_component_1.ItemInformationResponseComponent,
                item_information_component_1.ItemInformationComponent,
                negotiation_component_1.NegotiationComponent,
                negotiation_request_component_1.NegotiationRequestComponent,
                negotiation_request_input_component_1.NegotiationRequestInputComponent,
                negotiation_response_component_1.NegotiationResponseComponent,
                transport_execution_plan_component_1.TransportExecutionPlanComponent,
                transport_negotiation_request_component_1.TransportNegotiationRequestComponent,
                transport_negotiation_response_component_1.TransportNegotiationResponseComponent,
                transport_negotiation_address_component_1.TransportNegotiationAddressComponent,
                transport_service_details_component_1.TransportServiceDetailsComponent,
                transport_negotiation_component_1.TransportNegotiationComponent,
                bp_product_details_component_1.BpProductDetailsComponent,
                ppap_component_1.PpapComponent,
                ppap_document_select_component_1.PpapDocumentSelectComponent,
                ppap_document_upload_component_1.PpapDocumentUploadComponent,
                ppap_document_download_component_1.PpapDocumentDownloadComponent,
                contract_component_1.ContractComponent,
                clause_component_1.ClauseComponent,
                ppap_clause_component_1.PpapClauseComponent,
                shipment_input_component_1.ShipmentInputComponent
            ],
            exports: [
                bp_configure_component_1.BPConfigureComponent,
                bps_component_1.BPsComponent,
                bp_detail_component_1.BPDetailComponent,
                product_bp_options_component_1.ProductBpOptionsComponent,
                order_component_1.OrderComponent,
                fulfilment_component_1.FulfilmentComponent,
                receipt_advice_component_1.ReceiptAdviceComponent,
                negotiation_component_1.NegotiationComponent,
                transport_execution_plan_component_1.TransportExecutionPlanComponent,
                bp_product_details_component_1.BpProductDetailsComponent,
                contract_component_1.ContractComponent,
                clause_component_1.ClauseComponent,
                ppap_clause_component_1.PpapClauseComponent
            ],
            providers: []
        })
    ], BPEModule);
    return BPEModule;
}());
exports.BPEModule = BPEModule;
//# sourceMappingURL=bpe.module.js.map