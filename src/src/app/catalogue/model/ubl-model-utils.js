"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var item_property_1 = require("./publish/item-property");
var commodity_classification_1 = require("./publish/commodity-classification");
var code_1 = require("./publish/code");
var price_1 = require("./publish/price");
var amount_1 = require("./publish/amount");
var item_location_quantity_1 = require("./publish/item-location-quantity");
var item_1 = require("./publish/item");
var goods_item_1 = require("./publish/goods-item");
var catalogue_line_1 = require("./publish/catalogue-line");
var order_reference_1 = require("./publish/order-reference");
var document_reference_1 = require("./publish/document-reference");
var quantity_1 = require("./publish/quantity");
var line_item_1 = require("./publish/line-item");
var order_line_1 = require("./publish/order-line");
var delivery_terms_1 = require("./publish/delivery-terms");
var period_1 = require("./publish/period");
var package_1 = require("./publish/package");
var item_identification_1 = require("./publish/item-identification");
var request_for_quotation_line_1 = require("./publish/request-for-quotation-line");
var delivery_1 = require("./publish/delivery");
var quotation_line_1 = require("./publish/quotation-line");
var dimension_1 = require("./publish/dimension");
var country_1 = require("./publish/country");
var despatch_line_1 = require("./publish/despatch-line");
var despatch_advice_1 = require("./publish/despatch-advice");
var receipt_advice_1 = require("./publish/receipt-advice");
var receipt_line_1 = require("./publish/receipt-line");
var payment_means_1 = require("./publish/payment-means");
var order_1 = require("./publish/order");
var order_response_simple_1 = require("./publish/order-response-simple");
var request_for_quotation_1 = require("./publish/request-for-quotation");
var quotation_1 = require("./publish/quotation");
var location_1 = require("./publish/location");
var ppap_1 = require("./publish/ppap");
var ppap_response_1 = require("./publish/ppap-response");
var shipment_1 = require("./publish/shipment");
var transport_execution_plan_request_1 = require("./publish/transport-execution-plan-request");
var transport_execution_plan_1 = require("./publish/transport-execution-plan");
var item_information_request_1 = require("./publish/item-information-request");
var item_information_response_1 = require("./publish/item-information-response");
var payment_terms_1 = require("./publish/payment-terms");
var address_1 = require("./publish/address");
var monetary_total_1 = require("./publish/monetary-total");
var negotiation_options_1 = require("./publish/negotiation-options");
var constants_1 = require("./constants");
var trading_term_1 = require("./publish/trading-term");
var company_negotiation_settings_1 = require("../../user-mgmt/model/company-negotiation-settings");
var shipment_stage_1 = require("./publish/shipment-stage");
var utils_1 = require("../../common/utils");
var text_1 = require("./publish/text");
var attachment_1 = require("./publish/attachment");
var multi_type_value_1 = require("./publish/multi-type-value");
/**
 * Created by suat on 05-Jul-17.
 */
var UBLModelUtils = /** @class */ (function () {
    function UBLModelUtils() {
    }
    /**
     * Create a property based on the given property and category parameters.
     *
     * If the category is not null then a corresponding code is created and used in the item property to be returned. The
     * code refers to the category in the corresponding taxonomy is created. If the category is null, the code refers to
     * the "Custom" property.
     *
     * If the property is not null; unit, value qualifier, id and name is used from the given property. Fields keeping
     * actual data are still set to empty values.
     *
     * @param property
     * @param category
     * @returns {ItemProperty}
     */
    UBLModelUtils.createAdditionalItemProperty = function (property, category) {
        var code = category
            ? new code_1.Code(category.id, utils_1.selectPreferredName(category), category.categoryUri, category.taxonomyId, null)
            : new code_1.Code(null, null, null, "Custom", null);
        if (property == null) {
            return new item_property_1.ItemProperty(this.generateUUID(), [], [], [], [], new Array(), "STRING", code, null);
        }
        var itemProperty = new item_property_1.ItemProperty(property.id, [], property.dataType === "BOOLEAN" ? [new text_1.Text("false", "en")] : [], [], [], new Array(), property.dataType, code, property.uri);
        itemProperty.name = [].concat(property.preferredName);
        return itemProperty;
    };
    UBLModelUtils.createCommodityClassification = function (category) {
        var code = new code_1.Code(category.id, utils_1.selectPreferredName(category), category.categoryUri, category.taxonomyId, null);
        var commodityClassification = new commodity_classification_1.CommodityClassification(code, null, null, "");
        return commodityClassification;
    };
    UBLModelUtils.createItemLocationQuantity = function (amount) {
        // price
        var price = this.createPrice();
        // item location quantity
        var ilq = new item_location_quantity_1.ItemLocationQuantity(null, [], price, []);
        return ilq;
    };
    UBLModelUtils.createCatalogueLine = function (catalogueUuid, providerParty, settings, dimensionUnits) {
        if (dimensionUnits === void 0) { dimensionUnits = []; }
        // create additional item properties
        var additionalItemProperties = new Array();
        // catalogue document reference
        var docRef = new document_reference_1.DocumentReference();
        docRef.id = catalogueUuid;
        // create item
        var uuid = this.generateUUID();
        var item = new item_1.Item([], [], [], [], additionalItemProperties, providerParty, this.createItemIdentificationWithId(uuid), docRef, [], [], this.createDimensions(dimensionUnits), null);
        // create goods item
        var goodsItem = new goods_item_1.GoodsItem(uuid, item, this.createPackage(), this.createDeliveryTerms(null, settings.deliveryPeriodUnits[0]));
        // create required item location quantity
        var ilq = this.createItemLocationQuantity("");
        var catalogueLine = new catalogue_line_1.CatalogueLine(uuid, null, null, false, this.createPeriod(settings.warrantyPeriodRanges[0].start, settings.warrantyPeriodUnits[0]), [], ilq, [], goodsItem);
        // extra initialization
        catalogueLine.goodsItem.containingPackage.quantity.unitCode = "item(s)";
        return catalogueLine;
    };
    UBLModelUtils.createCatalogueLinesForLogistics = function (catalogueUuid, providerParty, settings, logisticRelatedServices, eClassLogisticCategories, furnitureOntologyLogisticCategories) {
        var logisticCatalogueLines = new Map();
        // if we have furniture ontology categories for logistics services,then use them.
        if (furnitureOntologyLogisticCategories) {
            var furnitureOntologyLogisticRelatedServices = logisticRelatedServices["FurnitureOntology"];
            var eClassLogisticRelatedServices = logisticRelatedServices["eClass"];
            // for each service type, create a catalogue line
            for (var _i = 0, _a = Object.keys(furnitureOntologyLogisticRelatedServices); _i < _a.length; _i++) {
                var serviceType = _a[_i];
                // get corresponding furniture ontology category
                var furnitureOntologyCategory = this.getCorrespondingCategory(furnitureOntologyLogisticRelatedServices[serviceType], furnitureOntologyLogisticCategories);
                // get corresponding eClass category
                var eClassCategory = null;
                if (eClassLogisticCategories && eClassLogisticRelatedServices[serviceType]) {
                    eClassCategory = this.getCorrespondingCategory(eClassLogisticRelatedServices[serviceType], eClassLogisticCategories);
                }
                // create the catalogue line
                var catalogueLine_1 = this.createCatalogueLine(catalogueUuid, providerParty, settings);
                // add item name and descriptions
                var newItemName = new text_1.Text("", constants_1.DEFAULT_LANGUAGE());
                var newItemDescription = new text_1.Text("", constants_1.DEFAULT_LANGUAGE());
                catalogueLine_1.goodsItem.item.name.push(newItemName);
                catalogueLine_1.goodsItem.item.description.push(newItemDescription);
                // clear additional item properties
                catalogueLine_1.goodsItem.item.additionalItemProperty = [];
                // add additional item properties
                for (var _b = 0, _c = furnitureOntologyCategory.properties; _b < _c.length; _b++) {
                    var property = _c[_b];
                    catalogueLine_1.goodsItem.item.additionalItemProperty.push(this.createAdditionalItemProperty(property, furnitureOntologyCategory));
                }
                // add its default furniture ontology category
                catalogueLine_1.goodsItem.item.commodityClassification.push(this.createCommodityClassification(furnitureOntologyCategory));
                // add its default eClass category if exists
                if (eClassCategory) {
                    catalogueLine_1.goodsItem.item.commodityClassification.push(this.createCommodityClassification(eClassCategory));
                }
                // push it to the list
                logisticCatalogueLines.set(serviceType, catalogueLine_1);
            }
            // create a dummy catalogue line to represent transport services
            var catalogueLine = this.createCatalogueLine(catalogueUuid, providerParty, settings);
            var category = this.getCorrespondingCategory(furnitureOntologyLogisticRelatedServices["ROADTRANSPORT"], furnitureOntologyLogisticCategories);
            for (var _d = 0, _e = category.properties; _d < _e.length; _d++) {
                var property = _e[_d];
                catalogueLine.goodsItem.item.additionalItemProperty.push(this.createAdditionalItemProperty(property, category));
            }
            // push it to the list
            logisticCatalogueLines.set("TRANSPORT", catalogueLine);
        }
        return logisticCatalogueLines;
    };
    UBLModelUtils.getCorrespondingCategory = function (categoryUri, logisticCategories) {
        for (var _i = 0, logisticCategories_1 = logisticCategories; _i < logisticCategories_1.length; _i++) {
            var category = logisticCategories_1[_i];
            if (category.id == categoryUri) {
                return category;
            }
        }
    };
    UBLModelUtils.createOrder = function () {
        var quantity = new quantity_1.Quantity(null, "", null);
        var item = this.createItem();
        var price = this.createPrice();
        var lineItem = this.createLineItem(quantity, price, item);
        var orderLine = new order_line_1.OrderLine(lineItem);
        var settings = new company_negotiation_settings_1.CompanyNegotiationSettings();
        return new order_1.Order(this.generateUUID(), [''], new period_1.Period(), new address_1.Address(), null, null, null, this.getDefaultPaymentMeans(settings), this.getDefaultPaymentTerms(settings), new monetary_total_1.MonetaryTotal(), [orderLine]);
    };
    UBLModelUtils.createOrderResponseSimple = function (order, acceptedIndicator) {
        var orderReference = this.createOrderReference(order.id);
        this.removeHjidFieldsFromObject(order.buyerCustomerParty);
        this.removeHjidFieldsFromObject(order.sellerSupplierParty);
        var customerParty = order.buyerCustomerParty;
        var supplierParty = order.sellerSupplierParty;
        var orderResponseSimple = new order_response_simple_1.OrderResponseSimple(this.generateUUID(), [''], "", acceptedIndicator, orderReference, supplierParty, customerParty);
        return orderResponseSimple;
    };
    UBLModelUtils.createPpap = function (documents) {
        var quantity = new quantity_1.Quantity(null, "", null);
        var item = this.createItem();
        var price = this.createPrice();
        var lineItem = this.createLineItem(quantity, price, item);
        var ppap = new ppap_1.Ppap(this.generateUUID(), [''], documents, null, null, lineItem);
        return ppap;
    };
    UBLModelUtils.createPpapResponse = function (ppap, acceptedIndicator) {
        /*
        let documentReference:DocumentReference = new DocumentReference(ppap.id);
        let ppapDocumentReference:PPAPDocumentReference = new PPAPDocumentReference(documentReference);
        this.removeHjidFieldsFromObject(ppap.buyerCustomerParty);
        this.removeHjidFieldsFromObject(ppap.sellerSupplierParty);
        let customerParty:CustomerParty = ppap.buyerCustomerParty;
        let supplierParty:SupplierParty = ppap.sellerSupplierParty;
        let ppapResponse:PpapResponse = new PpapResponse("","",acceptedIndicator,customerParty,supplierParty,null,documentReference);
        return ppapResponse;*/
        var ppapResponse = new ppap_response_1.PpapResponse();
        ppapResponse.id = this.generateUUID();
        ppapResponse.ppapDocumentReference = new document_reference_1.DocumentReference(ppap.id);
        this.removeHjidFieldsFromObject(ppap.buyerCustomerParty);
        this.removeHjidFieldsFromObject(ppap.sellerSupplierParty);
        ppapResponse.buyerCustomerParty = ppap.buyerCustomerParty;
        ppapResponse.sellerSupplierParty = ppap.sellerSupplierParty;
        ppapResponse.acceptedIndicator = acceptedIndicator;
        return ppapResponse;
    };
    UBLModelUtils.createRequestForQuotation = function (negotiationOptions, settings) {
        if (settings == null) {
            settings = new company_negotiation_settings_1.CompanyNegotiationSettings();
        }
        var quantity = new quantity_1.Quantity(null, "", null);
        var item = this.createItem();
        var price = this.createPrice();
        var lineItem = this.createLineItem(quantity, price, item);
        var requestForQuotationLine = new request_for_quotation_line_1.RequestForQuotationLine(lineItem);
        var rfq = new request_for_quotation_1.RequestForQuotation(this.generateUUID(), [""], false, null, null, new delivery_1.Delivery(), [requestForQuotationLine], negotiationOptions, this.getDefaultPaymentMeans(settings), this.getDefaultPaymentTerms(settings), [], []);
        // TODO remove this custom dimension addition once the dimension-view is improved to handle such cases
        var handlingUnitDimension = new dimension_1.Dimension();
        handlingUnitDimension.attributeID = 'Handling Unit Length';
        rfq.requestForQuotationLine[0].lineItem.delivery[0].shipment.transportHandlingUnit[0].measurementDimension.push(handlingUnitDimension);
        handlingUnitDimension = new dimension_1.Dimension();
        handlingUnitDimension.attributeID = 'Handling Unit Width';
        rfq.requestForQuotationLine[0].lineItem.delivery[0].shipment.transportHandlingUnit[0].measurementDimension.push(handlingUnitDimension);
        return rfq;
    };
    UBLModelUtils.createRequestForQuotationWithOrder = function (order, catalogueLine) {
        var quantity = new quantity_1.Quantity(null, "", null);
        var item = catalogueLine.goodsItem.item;
        var price = catalogueLine.requiredItemLocationQuantity.price;
        var lineItem = this.createLineItem(quantity, price, item);
        var requestForQuotationLine = new request_for_quotation_line_1.RequestForQuotationLine(lineItem);
        var rfq = new request_for_quotation_1.RequestForQuotation(this.generateUUID(), [""], false, null, null, new delivery_1.Delivery(), [requestForQuotationLine], new negotiation_options_1.NegotiationOptions(), null, null, null, null);
        rfq.requestForQuotationLine[0].lineItem.delivery[0].requestedDeliveryPeriod.durationMeasure = order.orderLine[0].lineItem.delivery[0].requestedDeliveryPeriod.durationMeasure;
        rfq.requestForQuotationLine[0].lineItem.deliveryTerms.deliveryLocation.address = order.orderLine[0].lineItem.deliveryTerms.deliveryLocation.address;
        rfq.requestForQuotationLine[0].lineItem.delivery[0].shipment.totalTransportHandlingUnitQuantity = order.orderLine[0].lineItem.quantity;
        rfq.requestForQuotationLine[0].lineItem.delivery[0].shipment.originAddress = order.orderLine[0].lineItem.item.manufacturerParty.postalAddress;
        rfq.requestForQuotationLine[0].lineItem.item.transportationServiceDetails = catalogueLine.goodsItem.item.transportationServiceDetails;
        rfq.requestForQuotationLine[0].lineItem.delivery[0].shipment.goodsItem[0].item.name = order.orderLine[0].lineItem.item.name;
        rfq.requestForQuotationLine[0].lineItem.delivery[0].shipment.totalTransportHandlingUnitQuantity = order.orderLine[0].lineItem.quantity;
        rfq.paymentTerms = utils_1.copy(order.paymentTerms);
        rfq.paymentMeans = utils_1.copy(order.paymentMeans);
        // TODO remove this custom dimension addition once the dimension-view is improved to handle such cases
        var handlingUnitDimension = new dimension_1.Dimension();
        handlingUnitDimension.attributeID = 'Handling Unit Length';
        rfq.requestForQuotationLine[0].lineItem.delivery[0].shipment.transportHandlingUnit[0].measurementDimension.push(handlingUnitDimension);
        handlingUnitDimension = new dimension_1.Dimension();
        handlingUnitDimension.attributeID = 'Handling Unit Width';
        rfq.requestForQuotationLine[0].lineItem.delivery[0].shipment.transportHandlingUnit[0].measurementDimension.push(handlingUnitDimension);
        this.removeHjidFieldsFromObject(rfq);
        return rfq;
    };
    UBLModelUtils.createRequestForQuotationWithTransportExecutionPlanRequest = function (transportExecutionPlanRequest, catalogueLine) {
        var quantity = new quantity_1.Quantity(null, "", null);
        var item = this.createItem();
        var price = this.createPrice();
        var lineItem = this.createLineItem(quantity, price, item);
        var requestForQuotationLine = new request_for_quotation_line_1.RequestForQuotationLine(lineItem);
        var settings = new company_negotiation_settings_1.CompanyNegotiationSettings();
        var rfq = new request_for_quotation_1.RequestForQuotation(this.generateUUID(), [""], false, null, null, new delivery_1.Delivery(), [requestForQuotationLine], new negotiation_options_1.NegotiationOptions(), this.getDefaultPaymentMeans(settings), this.getDefaultPaymentTerms(settings), [], []);
        rfq.requestForQuotationLine[0].lineItem.delivery[0].shipment.goodsItem[0].item.name = transportExecutionPlanRequest.consignment[0].consolidatedShipment[0].goodsItem[0].item.name;
        rfq.requestForQuotationLine[0].lineItem.delivery[0].shipment.consignment[0].grossVolumeMeasure = transportExecutionPlanRequest.consignment[0].grossVolumeMeasure;
        rfq.requestForQuotationLine[0].lineItem.delivery[0].shipment.consignment[0].grossWeightMeasure = transportExecutionPlanRequest.consignment[0].grossWeightMeasure;
        rfq.requestForQuotationLine[0].lineItem.deliveryTerms.deliveryLocation.address = transportExecutionPlanRequest.toLocation.address;
        rfq.requestForQuotationLine[0].lineItem.item.transportationServiceDetails = catalogueLine.goodsItem.item.transportationServiceDetails;
        // TODO remove this custom dimension addition once the dimension-view is improved to handle such cases
        var handlingUnitDimension = new dimension_1.Dimension();
        handlingUnitDimension.attributeID = 'Handling Unit Length';
        rfq.requestForQuotationLine[0].lineItem.delivery[0].shipment.transportHandlingUnit[0].measurementDimension.push(handlingUnitDimension);
        handlingUnitDimension = new dimension_1.Dimension();
        handlingUnitDimension.attributeID = 'Handling Unit Width';
        rfq.requestForQuotationLine[0].lineItem.delivery[0].shipment.transportHandlingUnit[0].measurementDimension.push(handlingUnitDimension);
        this.removeHjidFieldsFromObject(rfq);
        return rfq;
    };
    UBLModelUtils.getDefaultPaymentTerms = function (settings) {
        var terms = new payment_terms_1.PaymentTerms([
            new trading_term_1.TradingTerm("Payment_In_Advance", [new text_1.Text("Payment in advance")], "PIA", new multi_type_value_1.MultiTypeValue(null, 'STRING', [new text_1.Text("false")], null, null)),
            // new TradingTerm("Values_Net","e.g.,NET 10,payment 10 days after invoice date","Net %s",[null]),
            new trading_term_1.TradingTerm("End_of_month", [new text_1.Text("End of month")], "EOM", new multi_type_value_1.MultiTypeValue(null, 'STRING', [new text_1.Text("false")], null, null)),
            new trading_term_1.TradingTerm("Cash_next_delivery", [new text_1.Text("Cash next delivery")], "CND", new multi_type_value_1.MultiTypeValue(null, 'STRING', [new text_1.Text("false")], null, null)),
            new trading_term_1.TradingTerm("Cash_before_shipment", [new text_1.Text("Cash before shipment")], "CBS", new multi_type_value_1.MultiTypeValue(null, 'STRING', [new text_1.Text("false")], null, null)),
            // new TradingTerm("Values_MFI","e.g.,21 MFI,21st of the month following invoice date","%s MFI", [null]),
            // new TradingTerm("Values_/NET","e.g.,1/10 NET 30,1% discount if payment received within 10 days otherwise payment 30 days after invoice date","%s/%s NET %s",[null,null,null]),
            new trading_term_1.TradingTerm("Cash_on_delivery", [new text_1.Text("Cash on delivery")], "COD", new multi_type_value_1.MultiTypeValue(null, 'STRING', [new text_1.Text("false")], null, null)),
            new trading_term_1.TradingTerm("Cash_with_order", [new text_1.Text("Cash with order")], "CWO", new multi_type_value_1.MultiTypeValue(null, 'STRING', [new text_1.Text("false")], null, null)),
            new trading_term_1.TradingTerm("Cash_in_advance", [new text_1.Text("Cash in advance")], "CIA", new multi_type_value_1.MultiTypeValue(null, 'STRING', [new text_1.Text("false")], null, null)),
        ]);
        if (settings) {
            for (var _i = 0, _a = terms.tradingTerms; _i < _a.length; _i++) {
                var term = _a[_i];
                term.value.value[0].value = this.tradingTermToString(term) === settings.paymentTerms[0] ? "true" : "false";
            }
        }
        return terms;
    };
    UBLModelUtils.getDefaultPaymentTermsAsStrings = function (settings) {
        var _this = this;
        return this.getDefaultPaymentTerms(settings).tradingTerms.map(function (term) {
            return _this.tradingTermToString(term);
        });
    };
    UBLModelUtils.tradingTermToString = function (term) {
        return term.tradingTermFormat + " - " + term.description[0].value;
    };
    UBLModelUtils.getDefaultPaymentMeans = function (settings) {
        return new payment_means_1.PaymentMeans(new code_1.Code(settings.paymentMeans[0], settings.paymentMeans[0]));
    };
    UBLModelUtils.createRequestForQuotationWithIir = function (iir, fromAddress, toAddress, orderMetadata) {
        var rfq = this.createRequestForQuotation(new negotiation_options_1.NegotiationOptions(), null);
        rfq.requestForQuotationLine[0].lineItem.item = iir.item[0];
        if (iir.item[0].transportationServiceDetails != null) {
            rfq.requestForQuotationLine[0].lineItem.delivery[0].shipment.originAddress = fromAddress;
            rfq.requestForQuotationLine[0].lineItem.deliveryTerms.deliveryLocation.address = toAddress;
            rfq.requestForQuotationLine[0].lineItem.delivery[0].shipment.goodsItem[0].item.name = orderMetadata.content.orderLine[0].lineItem.item.name;
            rfq.requestForQuotationLine[0].lineItem.delivery[0].shipment.totalTransportHandlingUnitQuantity = orderMetadata.content.orderLine[0].lineItem.quantity;
        }
        this.removeHjidFieldsFromObject(rfq);
        return rfq;
    };
    UBLModelUtils.createQuotation = function (rfq) {
        var quotationLine = new quotation_line_1.QuotationLine(utils_1.copy(rfq.requestForQuotationLine[0].lineItem));
        // set start and end dates
        quotationLine.lineItem.delivery[0].requestedDeliveryPeriod.startDate = rfq.delivery.requestedDeliveryPeriod.startDate;
        quotationLine.lineItem.delivery[0].requestedDeliveryPeriod.endDate = rfq.delivery.requestedDeliveryPeriod.endDate;
        this.removeHjidFieldsFromObject(rfq.buyerCustomerParty);
        this.removeHjidFieldsFromObject(rfq.sellerSupplierParty);
        var customerParty = rfq.buyerCustomerParty;
        var supplierParty = rfq.sellerSupplierParty;
        var documentReference = new document_reference_1.DocumentReference(rfq.id);
        var quotation = new quotation_1.Quotation(this.generateUUID(), [""], new code_1.Code(), new code_1.Code(), 1, false, documentReference, customerParty, supplierParty, [quotationLine], rfq.paymentMeans, rfq.paymentTerms, rfq.tradingTerms, rfq.termOrCondition);
        return quotation;
    };
    UBLModelUtils.createDespatchAdvice = function (order) {
        var despatchAdvice = new despatch_advice_1.DespatchAdvice();
        despatchAdvice.id = this.generateUUID();
        despatchAdvice.orderReference = [UBLModelUtils.createOrderReference(order.id)];
        despatchAdvice.despatchLine = [new despatch_line_1.DespatchLine(new quantity_1.Quantity(), order.orderLine[0].lineItem.item, [new shipment_1.Shipment()])];
        despatchAdvice.despatchLine[0].shipment[0].shipmentStage.push(new shipment_stage_1.ShipmentStage());
        despatchAdvice.despatchSupplierParty = order.sellerSupplierParty;
        despatchAdvice.deliveryCustomerParty = order.buyerCustomerParty;
        return despatchAdvice;
    };
    UBLModelUtils.createReceiptAdvice = function (despatchAdvice) {
        var receiptAdvice = new receipt_advice_1.ReceiptAdvice();
        receiptAdvice.id = this.generateUUID();
        receiptAdvice.orderReference = [utils_1.copy(despatchAdvice.orderReference[0])];
        receiptAdvice.despatchDocumentReference = [new document_reference_1.DocumentReference(despatchAdvice.id)];
        receiptAdvice.deliveryCustomerParty = despatchAdvice.deliveryCustomerParty;
        receiptAdvice.despatchSupplierParty = despatchAdvice.despatchSupplierParty;
        receiptAdvice.receiptLine = [
            new receipt_line_1.ReceiptLine(new quantity_1.Quantity(0, despatchAdvice.despatchLine[0].deliveredQuantity.unitCode), [], despatchAdvice.despatchLine[0].item)
        ];
        return receiptAdvice;
    };
    UBLModelUtils.createTransportExecutionPlanRequest = function (transportationServiceLine) {
        var transportExecutionPlanRequest = new transport_execution_plan_request_1.TransportExecutionPlanRequest();
        transportExecutionPlanRequest.id = this.generateUUID();
        transportExecutionPlanRequest.consignment[0].consolidatedShipment.push(new shipment_1.Shipment());
        transportExecutionPlanRequest.mainTransportationService = transportationServiceLine.goodsItem.item;
        this.removeHjidFieldsFromObject(transportExecutionPlanRequest);
        return transportExecutionPlanRequest;
    };
    UBLModelUtils.createTransportExecutionPlanRequestWithOrder = function (order, transportationServiceLine) {
        var transportExecutionPlanRequest = new transport_execution_plan_request_1.TransportExecutionPlanRequest();
        transportExecutionPlanRequest.consignment[0].consolidatedShipment.push(new shipment_1.Shipment());
        transportExecutionPlanRequest.id = this.generateUUID();
        transportExecutionPlanRequest.mainTransportationService = transportationServiceLine.goodsItem.item;
        transportExecutionPlanRequest.toLocation.address = order.orderLine[0].lineItem.deliveryTerms.deliveryLocation.address;
        transportExecutionPlanRequest.fromLocation.address = order.orderLine[0].lineItem.item.manufacturerParty.postalAddress;
        transportExecutionPlanRequest.consignment[0].consolidatedShipment[0].goodsItem[0].item = order.orderLine[0].lineItem.item;
        this.removeHjidFieldsFromObject(transportExecutionPlanRequest);
        return transportExecutionPlanRequest;
    };
    UBLModelUtils.createTransportExecutionPlanRequestWithIir = function (iir, fromAddress, toAddress, orderMetadata) {
        var transportExecutionPlanRequest = new transport_execution_plan_request_1.TransportExecutionPlanRequest();
        transportExecutionPlanRequest.id = this.generateUUID();
        transportExecutionPlanRequest.consignment[0].consolidatedShipment.push(new shipment_1.Shipment());
        transportExecutionPlanRequest.mainTransportationService = iir.item[0];
        transportExecutionPlanRequest.toLocation.address = toAddress;
        transportExecutionPlanRequest.fromLocation.address = fromAddress;
        transportExecutionPlanRequest.consignment[0].consolidatedShipment[0].goodsItem[0].item.name = orderMetadata.content.orderLine[0].lineItem.item.name;
        this.removeHjidFieldsFromObject(transportExecutionPlanRequest);
        return transportExecutionPlanRequest;
    };
    UBLModelUtils.createTransportExecutionPlanRequestWithQuotation = function (quotation) {
        var transportExecutionPlanRequest = new transport_execution_plan_request_1.TransportExecutionPlanRequest();
        transportExecutionPlanRequest.id = this.generateUUID();
        transportExecutionPlanRequest.mainTransportationService = quotation.quotationLine[0].lineItem.item;
        transportExecutionPlanRequest.fromLocation.address = quotation.quotationLine[0].lineItem.delivery[0].shipment.originAddress;
        transportExecutionPlanRequest.toLocation.address = quotation.quotationLine[0].lineItem.deliveryTerms.deliveryLocation.address;
        transportExecutionPlanRequest.consignment[0].consolidatedShipment.push(quotation.quotationLine[0].lineItem.delivery[0].shipment);
        transportExecutionPlanRequest.consignment[0].grossVolumeMeasure = quotation.quotationLine[0].lineItem.delivery[0].shipment.consignment[0].grossVolumeMeasure;
        transportExecutionPlanRequest.consignment[0].grossWeightMeasure = quotation.quotationLine[0].lineItem.delivery[0].shipment.consignment[0].grossWeightMeasure;
        transportExecutionPlanRequest.serviceStartTimePeriod.startDate = quotation.quotationLine[0].lineItem.delivery[0].requestedDeliveryPeriod.startDate;
        transportExecutionPlanRequest.serviceStartTimePeriod.endDate = quotation.quotationLine[0].lineItem.delivery[0].requestedDeliveryPeriod.endDate;
        this.removeHjidFieldsFromObject(transportExecutionPlanRequest);
        return transportExecutionPlanRequest;
    };
    UBLModelUtils.createTransportExecutionPlanRequestWithTransportExecutionPlanRequest = function (transportExecutionPlanRequest) {
        var tep = utils_1.copy(transportExecutionPlanRequest);
        tep.id = this.generateUUID();
        this.removeHjidFieldsFromObject(tep);
        return tep;
    };
    UBLModelUtils.createTransportExecutionPlan = function (transportExecutionPlanRequest) {
        var transportExecutionPlan = new transport_execution_plan_1.TransportExecutionPlan();
        transportExecutionPlan.id = this.generateUUID();
        transportExecutionPlan.transportExecutionPlanRequestDocumentReference = new document_reference_1.DocumentReference(transportExecutionPlanRequest.id);
        transportExecutionPlan.transportUserParty = transportExecutionPlanRequest.transportUserParty;
        transportExecutionPlan.transportServiceProviderParty = transportExecutionPlanRequest.transportServiceProviderParty;
        this.removeHjidFieldsFromObject(transportExecutionPlan);
        return transportExecutionPlan;
    };
    UBLModelUtils.createItemInformationRequest = function () {
        var itemInformationRequest = new item_information_request_1.ItemInformationRequest();
        itemInformationRequest.id = this.generateUUID();
        return itemInformationRequest;
    };
    UBLModelUtils.createItemInformationResponse = function (itemInformationRequest) {
        var itemInformationResponse = new item_information_response_1.ItemInformationResponse();
        itemInformationResponse.id = this.generateUUID();
        itemInformationResponse.itemInformationRequestDocumentReference = new document_reference_1.DocumentReference(itemInformationRequest.id);
        itemInformationResponse.item[0] = JSON.parse(JSON.stringify(itemInformationRequest.itemInformationRequestLine[0].salesItem[0].item));
        itemInformationResponse.item[0].itemSpecificationDocumentReference = [];
        itemInformationResponse.sellerSupplierParty = itemInformationRequest.sellerSupplierParty;
        itemInformationResponse.buyerCustomerParty = itemInformationRequest.buyerCustomerParty;
        this.removeHjidFieldsFromObject(itemInformationResponse);
        return itemInformationResponse;
    };
    UBLModelUtils.createOrderReference = function (orderId) {
        var documentReference = new document_reference_1.DocumentReference(orderId);
        var orderReference = new order_reference_1.OrderReference(documentReference);
        return orderReference;
    };
    UBLModelUtils.createDocumentReferenceWithBinaryObject = function (binaryObject) {
        var attachment = new attachment_1.Attachment();
        attachment.embeddedDocumentBinaryObject = binaryObject;
        var documentReference = new document_reference_1.DocumentReference();
        documentReference.attachment = attachment;
        return documentReference;
    };
    UBLModelUtils.createItem = function () {
        var item = new item_1.Item([], [], [], [], [], null, this.createItemIdentification(), null, [], [], [], null);
        return item;
    };
    UBLModelUtils.createDimensions = function (dimensionUnits) {
        var dimensions = [];
        for (var _i = 0, dimensionUnits_1 = dimensionUnits; _i < dimensionUnits_1.length; _i++) {
            var unit = dimensionUnits_1[_i];
            var unitName = unit.charAt(0).toUpperCase() + unit.slice(1);
            dimensions.push(new dimension_1.Dimension(unitName));
        }
        return dimensions;
    };
    UBLModelUtils.createLineItem = function (quantity, price, item) {
        return new line_item_1.LineItem(quantity, [], [new delivery_1.Delivery()], new delivery_terms_1.DeliveryTerms(), price, item, new period_1.Period(), null);
    };
    UBLModelUtils.createPackage = function () {
        return new package_1.Package(this.createQuantity(), new code_1.Code(), null);
    };
    UBLModelUtils.createPrice = function () {
        var amountObj = this.createAmountWithCurrency(constants_1.CURRENCIES[0]);
        var quantity = this.createQuantity();
        var price = new price_1.Price(amountObj, quantity);
        return price;
    };
    UBLModelUtils.createDeliveryTerms = function (value, unit) {
        if (value === void 0) { value = null; }
        if (unit === void 0) { unit = "day(s)"; }
        var deliveryTerms = new delivery_terms_1.DeliveryTerms(null, this.createPeriod(value, unit), null, null, this.createAmount(), new location_1.Location(), null);
        return deliveryTerms;
    };
    UBLModelUtils.createPeriod = function (value, unit) {
        if (value === void 0) { value = null; }
        if (unit === void 0) { unit = "day(s)"; }
        return new period_1.Period(null, null, null, null, this.createQuantity(value, unit), null);
    };
    UBLModelUtils.createDimension = function (attributeId, unitCode) {
        var quantity = this.createQuantity();
        quantity.unitCode = unitCode;
        return new dimension_1.Dimension(attributeId, quantity);
    };
    UBLModelUtils.createAddress = function () {
        return new address_1.Address(null, null, null, null, null, this.createCountry());
    };
    UBLModelUtils.createCountry = function () {
        return new country_1.Country(null);
    };
    UBLModelUtils.createQuantity = function (value, unit) {
        if (value === void 0) { value = 1; }
        if (unit === void 0) { unit = "item(s)"; }
        return new quantity_1.Quantity(value, unit, null);
    };
    UBLModelUtils.createAmount = function () {
        var amount = new amount_1.Amount(null, null);
        return amount;
    };
    UBLModelUtils.createAmountWithCurrency = function (currency) {
        return new amount_1.Amount(null, currency);
    };
    UBLModelUtils.createItemIdentificationWithId = function (id) {
        return new item_identification_1.ItemIdentification(id);
    };
    UBLModelUtils.createItemIdentification = function () {
        return this.createItemIdentificationWithId(this.generateUUID());
    };
    UBLModelUtils.mapAddress = function (address) {
        var addr = new address_1.Address();
        addr.buildingNumber = address.buildingNumber;
        addr.cityName = address.cityName;
        addr.region = address.region;
        addr.postalZone = address.postalCode;
        addr.streetName = address.streetName;
        addr.country = new country_1.Country(address.country);
        return addr;
    };
    UBLModelUtils.removeHjidFieldsFromObject = function (object) {
        delete object.hjid;
        delete object.startDateItem;
        delete object.startTimeItem;
        delete object.endDateItem;
        delete object.endTimeItem;
        delete object.estimatedDeliveryDateItem;
        for (var field in object) {
            if (object.hasOwnProperty(field) && object[field] != null && typeof (object[field]) === 'object') {
                this.removeHjidFieldsFromObject(object[field]);
            }
        }
        return object;
    };
    UBLModelUtils.generateUUID = function () {
        var d = new Date().getTime();
        var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
            var r = (d + Math.random() * 16) % 16 | 0;
            d = Math.floor(d / 16);
            return (c == 'x' ? r : (r & 0x3 | 0x8)).toString(16);
        });
        return uuid;
    };
    ;
    UBLModelUtils.getPartyId = function (party) {
        return party.partyIdentification[0].id;
    };
    UBLModelUtils.getPartyDisplayName = function (party) {
        return this.getPartyDisplayNameForPartyName(party.partyName);
    };
    UBLModelUtils.getPartyDisplayNameForPartyName = function (partyNames) {
        var defaultLanguage = constants_1.DEFAULT_LANGUAGE();
        var englishName = null;
        for (var _i = 0, partyNames_1 = partyNames; _i < partyNames_1.length; _i++) {
            var partyName = partyNames_1[_i];
            if (partyName.name.languageID == "en") {
                englishName = partyName.name.value;
            }
            if (partyName.name.languageID == defaultLanguage) {
                return partyName.name.value;
            }
        }
        if (englishName) {
            return englishName;
        }
        return partyNames[0].name.value;
    };
    UBLModelUtils.isFilledLCPAInput = function (lcpaDetails) {
        if (lcpaDetails.lcpainput == null) {
            return false;
        }
        var lcpaInput = lcpaDetails.lcpainput;
        if (!utils_1.isNaNNullAware(lcpaInput.assemblyCost.value) ||
            !utils_1.isNaNNullAware(lcpaInput.consumableCost.value) ||
            !utils_1.isNaNNullAware(lcpaInput.endOfLifeCost.value) ||
            !utils_1.isNaNNullAware(lcpaInput.energyConsumptionCost.value) ||
            !utils_1.isNaNNullAware(lcpaInput.lifeCycleLength.value) ||
            !utils_1.isNaNNullAware(lcpaInput.purchasingPrice.value) ||
            !utils_1.isNaNNullAware(lcpaInput.sparePartCost.value) ||
            !utils_1.isNaNNullAware(lcpaInput.transportCost.value) ||
            lcpaInput.additionalLCPAInputDetail.length > 0) {
            return true;
        }
        else {
            return false;
        }
    };
    UBLModelUtils.isFilledLCPAOutput = function (lcpaDetails) {
        return false;
    };
    UBLModelUtils.isEmptyQuantity = function (quantity) {
        if (quantity.value == null) {
            return true;
        }
        return false;
    };
    UBLModelUtils.areQuantitiesEqual = function (quantity1, quantity2) {
        if (quantity1 == null && quantity2 == null) {
            return true;
        }
        if (quantity1 == null || quantity2 == null) {
            return false;
        }
        if (quantity1.value == quantity2.value && quantity1.unitCode == quantity2.unitCode) {
            return true;
        }
        return false;
    };
    UBLModelUtils.areAmountsEqual = function (amount1, amount2) {
        if (amount1 == null && amount2 == null) {
            return true;
        }
        if (amount1 == null || amount2 == null) {
            return false;
        }
        if (amount1.value == amount2.value && amount1.currencyID == amount2.currencyID) {
            return true;
        }
        return false;
    };
    UBLModelUtils.areTermsAndConditionListsDifferent = function (firstList, secondList) {
        // both null
        if (firstList == null && secondList == null) {
            return false;
        }
        // one of them is null
        if (firstList == null || secondList == null) {
            return true;
        }
        // check sizes
        if (firstList.length != secondList.length) {
            return true;
        }
        // check inner values
        for (var _i = 0, firstList_1 = firstList; _i < firstList_1.length; _i++) {
            var clause = firstList_1[_i];
            // find the corresponding clause in the passed array
            var correspondingClause = null;
            for (var _a = 0, secondList_1 = secondList; _a < secondList_1.length; _a++) {
                var otherClause = secondList_1[_a];
                if (clause.id == otherClause.id) {
                    correspondingClause = otherClause;
                    break;
                }
            }
            // did not found the corresponding clause
            if (correspondingClause == null) {
                return true;
            }
            else {
                // check the trading terms lists in the clauses
                // both null
                if (clause.tradingTerms == null && correspondingClause.tradingTerms == null) {
                    continue;
                }
                // one of them is null
                if (clause.tradingTerms == null || correspondingClause.tradingTerms == null) {
                    return true;
                }
                // check sizes
                if (clause.tradingTerms.length != correspondingClause.tradingTerms.length) {
                    return true;
                }
                // check the terms themselves
                for (var _b = 0, _c = clause.tradingTerms; _b < _c.length; _b++) {
                    var term = _c[_b];
                    // find the corresponding clause in the passed array
                    var correspondingTerm = null;
                    for (var _d = 0, _e = correspondingClause.tradingTerms; _d < _e.length; _d++) {
                        var otherTerm = _e[_d];
                        if (term.id == otherTerm.id) {
                            correspondingTerm = otherTerm;
                            break;
                        }
                    }
                    // did not found the corresponding term
                    if (correspondingTerm == null) {
                        return true;
                    }
                    else {
                        var qualifier = term.value.valueQualifier;
                        // qualifiers do not match
                        if (qualifier != term.value.valueQualifier) {
                            return true;
                        }
                        // skip if both values are null
                        if (term.value == null && correspondingTerm.value == null) {
                            continue;
                        }
                        // value existences do not match
                        if ((term.value == null && correspondingTerm.value != null) ||
                            term.value != null && correspondingTerm.value == null) {
                            return true;
                        }
                        // for it is possible to specify single value for terms concerning the terms and conditions
                        if (qualifier == 'STRING') {
                            if (term.value.value[0].value != correspondingTerm.value.value[0].value ||
                                term.value.value[0].languageID != correspondingTerm.value.value[0].languageID) {
                            }
                        }
                        else if (qualifier == 'NUMBER') {
                            if (term.value.valueDecimal[0] != correspondingTerm.value.valueDecimal[0]) {
                                return true;
                            }
                        }
                        else if (qualifier == 'QUANTITY') {
                            if (term.value.valueQuantity[0].value != correspondingTerm.value.valueQuantity[0].value ||
                                term.value.valueQuantity[0].unitCode != correspondingTerm.value.valueQuantity[0].unitCode) {
                                return true;
                            }
                        }
                        else if (qualifier == 'CODE') {
                            if (term.value.valueCode[0].value != correspondingTerm.value.valueCode[0].value ||
                                term.value.valueCode[0].name != correspondingTerm.value.valueCode[0].name) {
                                return true;
                            }
                        }
                    }
                }
            }
        }
    };
    return UBLModelUtils;
}());
exports.UBLModelUtils = UBLModelUtils;
//# sourceMappingURL=ubl-model-utils.js.map