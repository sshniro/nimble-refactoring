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
var catalogue_routing_module_1 = require("./catalogue-routing.module");
var category_search_component_1 = require("./category/category-search.component");
var product_publish_component_1 = require("./publish/product-publish.component");
var additional_item_property_component_1 = require("./ubl-model-view/additional-item-property.component");
var catalogue_view_component_1 = require("./ubl-model-view/catalogue/catalogue-view.component");
var favourite_view_component_1 = require("./favourite/favourite-view.component");
var compare_view_component_1 = require("./compare-product/compare-view.component");
var catalogue_line_panel_component_1 = require("./ubl-model-view/catalogue/catalogue-line-panel.component");
var catalogue_line_view_component_1 = require("./ubl-model-view/catalogue-line/catalogue-line-view.component");
var catalogue_line_details_component_1 = require("./ubl-model-view/catalogue-line/catalogue-line-details.component");
var property_block_pipe_1 = require("./property-block-pipe");
var item_property_data_source_pipe_1 = require("./item-property-data-source-pipe");
var quantity_view_component_1 = require("./ubl-model-view/quantity-view.component");
var amount_view_component_1 = require("./ubl-model-view/amount-view.component");
var value_view_component_1 = require("./ubl-model-view/value-view.component");
var value_array_view_component_1 = require("./ubl-model-view/value-array-view.component");
var boolean_view_component_1 = require("./ubl-model-view/boolean-view-component");
var address_view_component_1 = require("./ubl-model-view/address-view.component");
var certificate_view_component_1 = require("./ubl-model-view/certificate-view.component");
var dimension_view_component_1 = require("./ubl-model-view/dimension-view.component");
var catalogue_line_header_component_1 = require("./ubl-model-view/catalogue-line/catalogue-line-header.component");
var product_trading_details_component_1 = require("./ubl-model-view/catalogue-line/product-trading-details.component");
var transportation_service_details_component_1 = require("./ubl-model-view/catalogue-line/transportation-service-details.component");
var shipment_view_component_1 = require("./ubl-model-view/shipment-view.component");
var publish_deactivate_guard_service_1 = require("./publish-deactivate-guard.service");
var category_deactivate_guard_service_1 = require("./category/category-deactivate-guard.service");
var quantity_value_view_component_1 = require("./ubl-model-view/quantity-value-view.component");
var detailed_address_view_component_1 = require("./ubl-model-view/detailed-address-view.component");
var payment_terms_view_1 = require("./ubl-model-view/payment-terms-view");
var category_tree_component_1 = require("./category/category-tree.component");
var edit_property_modal_component_1 = require("./publish/edit-property-modal.component");
var product_delivery_trading_component_1 = require("./publish/product-delivery-trading.component");
var product_details_module_1 = require("../product-details/product-details.module");
var product_price_tab_component_1 = require("./publish/product-price-tab.component");
var product_certificates_tab_component_1 = require("./publish/product-certificates-tab.component");
var product_track_and_trace_tab_component_1 = require("./publish/product-track-and-trace-tab.component");
var user_mgmt_module_1 = require("../user-mgmt/user-mgmt.module");
var note_file_view_component_1 = require("./ubl-model-view/note-file-view.component");
var price_option_count_pipe_1 = require("./publish/price-option/price-option-count.pipe");
var price_option_pipe_1 = require("./publish/price-option/price-option.pipe");
var quantity_price_option_component_1 = require("./publish/price-option/quantity-price-option.component");
var item_property_price_option_component_1 = require("./publish/price-option/item-property-price-option.component");
var discount_target_component_1 = require("./publish/price-option/discount-target.component");
var price_option_view_component_1 = require("./publish/price-option/price-option-view.component");
var bulk_publish_component_1 = require("./publish/bulk-publish.component");
var options_panel_component_1 = require("./publish/options-panel.component");
var origin_destination_view_component_1 = require("./publish/origin-destination-view-component");
var name_description_panel_component_1 = require("./publish/name-description-panel.component");
var logistic_service_publish_component_1 = require("./publish/logistic-service-publish.component");
var logistic_publish_deactivate_guard_service_1 = require("./logistic-publish-deactivate-guard.service");
var CatalogueModule = /** @class */ (function () {
    function CatalogueModule() {
    }
    CatalogueModule = __decorate([
        core_1.NgModule({
            imports: [common_1.CommonModule,
                common_module_1.AppCommonModule,
                forms_1.FormsModule,
                forms_1.ReactiveFormsModule,
                http_1.HttpModule,
                catalogue_routing_module_1.CatalogueRoutingModule,
                product_details_module_1.ProductDetailsModule,
                user_mgmt_module_1.UserMgmtModule,
                ng_bootstrap_1.NgbModule.forRoot()
            ],
            declarations: [
                category_search_component_1.CategorySearchComponent,
                category_tree_component_1.CategoryTreeComponent,
                product_publish_component_1.ProductPublishComponent,
                logistic_service_publish_component_1.LogisticServicePublishComponent,
                edit_property_modal_component_1.EditPropertyModalComponent,
                bulk_publish_component_1.BulkPublishComponent,
                options_panel_component_1.OptionsPanelComponent,
                origin_destination_view_component_1.OriginDestinationViewComponent,
                name_description_panel_component_1.NameDescriptionPanelComponent,
                product_delivery_trading_component_1.ProductDeliveryTradingComponent,
                product_price_tab_component_1.ProductPriceTabComponent,
                additional_item_property_component_1.AdditionalItemPropertyComponent,
                catalogue_view_component_1.CatalogueViewComponent,
                catalogue_line_panel_component_1.CatalogueLinePanelComponent,
                catalogue_line_view_component_1.CatalogueLineViewComponent,
                catalogue_line_details_component_1.CatalogueLineDetailsComponent,
                product_certificates_tab_component_1.ProductCertificatesTabComponent,
                product_track_and_trace_tab_component_1.ProductTrackAndTraceTabComponent,
                quantity_view_component_1.QuantityViewComponent,
                amount_view_component_1.AmountViewComponent,
                quantity_value_view_component_1.QuantityValueViewComponent,
                value_view_component_1.ValueViewComponent,
                value_array_view_component_1.ValueArrayViewComponent,
                boolean_view_component_1.BooleanViewComponent,
                address_view_component_1.AddressViewComponent,
                certificate_view_component_1.CertificateViewComponent,
                dimension_view_component_1.DimensionViewComponent,
                catalogue_line_header_component_1.CatalogueLineHeaderComponent,
                product_trading_details_component_1.ProductTradingDetailsComponent,
                transportation_service_details_component_1.TransportationServiceDetails,
                shipment_view_component_1.ShipmentViewComponent,
                property_block_pipe_1.PropertyBlockPipe,
                item_property_data_source_pipe_1.ItemPropertyDataSourcePipe,
                detailed_address_view_component_1.DetailedAddressViewComponent,
                payment_terms_view_1.PaymentTermsView,
                note_file_view_component_1.NoteFileViewComponent,
                payment_terms_view_1.PaymentTermsView,
                price_option_count_pipe_1.PriceOptionCountPipe,
                price_option_pipe_1.PriceOptionPipe,
                quantity_price_option_component_1.QuantityPriceOptionComponent,
                item_property_price_option_component_1.ItemPropertyPriceOptionComponent,
                discount_target_component_1.DiscountTargetComponent,
                price_option_view_component_1.PriceOptionViewComponent,
                favourite_view_component_1.FavouriteViewComponent,
                compare_view_component_1.CompareViewComponent
            ],
            exports: [
                category_search_component_1.CategorySearchComponent,
                additional_item_property_component_1.AdditionalItemPropertyComponent,
                catalogue_view_component_1.CatalogueViewComponent,
                catalogue_line_panel_component_1.CatalogueLinePanelComponent,
                catalogue_line_view_component_1.CatalogueLineViewComponent,
                catalogue_line_details_component_1.CatalogueLineDetailsComponent,
                quantity_view_component_1.QuantityViewComponent,
                amount_view_component_1.AmountViewComponent,
                quantity_value_view_component_1.QuantityValueViewComponent,
                value_view_component_1.ValueViewComponent,
                value_array_view_component_1.ValueArrayViewComponent,
                boolean_view_component_1.BooleanViewComponent,
                address_view_component_1.AddressViewComponent,
                certificate_view_component_1.CertificateViewComponent,
                dimension_view_component_1.DimensionViewComponent,
                catalogue_line_header_component_1.CatalogueLineHeaderComponent,
                product_trading_details_component_1.ProductTradingDetailsComponent,
                transportation_service_details_component_1.TransportationServiceDetails,
                shipment_view_component_1.ShipmentViewComponent,
                property_block_pipe_1.PropertyBlockPipe,
                item_property_data_source_pipe_1.ItemPropertyDataSourcePipe,
                detailed_address_view_component_1.DetailedAddressViewComponent,
                payment_terms_view_1.PaymentTermsView,
                quantity_price_option_component_1.QuantityPriceOptionComponent,
                item_property_price_option_component_1.ItemPropertyPriceOptionComponent,
                discount_target_component_1.DiscountTargetComponent,
                payment_terms_view_1.PaymentTermsView,
                note_file_view_component_1.NoteFileViewComponent,
                price_option_view_component_1.PriceOptionViewComponent,
                favourite_view_component_1.FavouriteViewComponent,
                compare_view_component_1.CompareViewComponent
            ],
            providers: [publish_deactivate_guard_service_1.PublishDeactivateGuardService, category_deactivate_guard_service_1.CategoryDeactivateGuardService, logistic_publish_deactivate_guard_service_1.LogisticPublishDeactivateGuardService]
        })
    ], CatalogueModule);
    return CatalogueModule;
}());
exports.CatalogueModule = CatalogueModule;
//# sourceMappingURL=catalogue.module.js.map