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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var ubl_model_utils_1 = require("../../catalogue/model/ubl-model-utils");
var line_reference_1 = require("../../catalogue/model/publish/line-reference");
var core_1 = require("@angular/core");
var BehaviorSubject_1 = require("rxjs/BehaviorSubject");
var search_context_service_1 = require("../../simple-search/search-context.service");
var ng2_cookies_1 = require("ng2-cookies");
var user_service_1 = require("../../user-mgmt/user.service");
var preceding_bp_data_service_1 = require("./preceding-bp-data-service");
var bp_workflow_options_1 = require("../model/bp-workflow-options");
var negotiation_options_1 = require("../../catalogue/model/publish/negotiation-options");
var constants_1 = require("../../catalogue/model/constants");
var payment_means_1 = require("../../catalogue/model/publish/payment-means");
var code_1 = require("../../catalogue/model/publish/code");
var payment_terms_1 = require("../../catalogue/model/publish/payment-terms");
var utils_1 = require("../../common/utils");
var price_wrapper_1 = require("../../common/price-wrapper");
var document_service_1 = require("./document-service");
var shipment_stage_1 = require("../../catalogue/model/publish/shipment-stage");
var party_name_1 = require("../../catalogue/model/publish/party-name");
var bp_start_event_1 = require("../../catalogue/model/publish/bp-start-event");
var router_1 = require("@angular/router");
var text_1 = require("../../catalogue/model/publish/text");
var contract_1 = require("../../catalogue/model/publish/contract");
/**
 * Created by suat on 20-Sep-17.
 */
var BPDataService = /** @class */ (function () {
    function BPDataService(searchContextService, precedingBPDataService, userService, cookieService, documentService, router) {
        this.searchContextService = searchContextService;
        this.precedingBPDataService = precedingBPDataService;
        this.userService = userService;
        this.cookieService = cookieService;
        this.documentService = documentService;
        this.router = router;
        // original catalogue lines to initialize the business process data
        this.catalogueLines = [];
        // catalogue line object that is kept updated based on user selections
        this.modifiedCatalogueLines = [];
        // the company settings for the producers of the catalogue lines
        this.companySettings = [];
        ////////////////////////////////////////////////////////////////////////////
        //////// variables used when navigating to bp options details page //////
        ////////////////////////////////////////////////////////////////////////////
        // BpActivityEvent is used to set bp options while navigating to bp details page
        this.bpActivityEvent = new bp_start_event_1.BpActivityEvent(null, "Item_Information_Request", null, null, [], null, true, false);
        // these are used to update view according to the selected process type.
        this.bpActivityEventBehaviorSubject = new BehaviorSubject_1.BehaviorSubject(this.bpActivityEvent);
        this.bpActivityEventObservable = this.bpActivityEventBehaviorSubject.asObservable();
    }
    BPDataService.prototype.setCatalogueLines = function (catalogueLines, settings) {
        this.catalogueLines = [];
        this.relatedProducts = [];
        this.relatedProductCategories = [];
        this.companySettings = settings;
        for (var _i = 0, catalogueLines_1 = catalogueLines; _i < catalogueLines_1.length; _i++) {
            var line = catalogueLines_1[_i];
            this.catalogueLines.push(line);
            this.relatedProducts.push(line.goodsItem.item.name[0].value);
            for (var _a = 0, _b = line.goodsItem.item.commodityClassification; _a < _b.length; _a++) {
                var category = _b[_a];
                if (this.relatedProductCategories.indexOf(category.itemClassificationCode.name) == -1) {
                    this.relatedProductCategories.push(category.itemClassificationCode.name);
                }
            }
        }
    };
    BPDataService.prototype.getCatalogueLine = function () {
        return this.catalogueLines[0];
    };
    BPDataService.prototype.getCompanySettings = function () {
        return this.companySettings[0];
    };
    BPDataService.prototype.setProcessDocuments = function (processMetadata) {
        return __awaiter(this, void 0, void 0, function () {
            var activityVariables, processType, _a, quotationVariable, _b, orderResponseVariable, _c, ppapResponseVariable, _d, receiptAdviceVariable, _e, transportExecutionPlanVariable, _f, itemInformationResponseVariable;
            return __generator(this, function (_g) {
                switch (_g.label) {
                    case 0:
                        activityVariables = processMetadata.activityVariables;
                        processType = processMetadata.processType;
                        if (!(processType == 'Negotiation')) return [3 /*break*/, 3];
                        _a = this;
                        return [4 /*yield*/, this.documentService.getInitialDocument(activityVariables)];
                    case 1:
                        _a.requestForQuotation = _g.sent();
                        this.initFetchedRfq();
                        return [4 /*yield*/, this.documentService.getResponseDocument(activityVariables)];
                    case 2:
                        quotationVariable = _g.sent();
                        if (quotationVariable == null) {
                            // initialize the quotation only if the user is in seller role
                            if (this.bpActivityEvent.userRole == 'seller') {
                                this.quotation = utils_1.copy(ubl_model_utils_1.UBLModelUtils.createQuotation(this.requestForQuotation));
                            }
                        }
                        else {
                            this.quotation = quotationVariable;
                            this.order = ubl_model_utils_1.UBLModelUtils.createOrder();
                            this.order.orderLine[0].lineItem = this.quotation.quotationLine[0].lineItem;
                        }
                        return [3 /*break*/, 18];
                    case 3:
                        if (!(processType == 'Order')) return [3 /*break*/, 6];
                        _b = this;
                        return [4 /*yield*/, this.documentService.getInitialDocument(activityVariables)];
                    case 4:
                        _b.order = _g.sent();
                        return [4 /*yield*/, this.documentService.getResponseDocument(activityVariables)];
                    case 5:
                        orderResponseVariable = _g.sent();
                        if (orderResponseVariable == null) {
                            // initialize the order response only if the user is in seller role
                            if (this.bpActivityEvent.userRole == 'seller') {
                                this.orderResponse = ubl_model_utils_1.UBLModelUtils.createOrderResponseSimple(this.order, true);
                            }
                        }
                        else {
                            this.orderResponse = orderResponseVariable;
                        }
                        return [3 /*break*/, 18];
                    case 6:
                        if (!(processType == 'Ppap')) return [3 /*break*/, 9];
                        _c = this;
                        return [4 /*yield*/, this.documentService.getInitialDocument(activityVariables)];
                    case 7:
                        _c.ppap = _g.sent();
                        return [4 /*yield*/, this.documentService.getResponseDocument(activityVariables)];
                    case 8:
                        ppapResponseVariable = _g.sent();
                        if (ppapResponseVariable == null) {
                            if (this.bpActivityEvent.userRole == 'seller') {
                                this.ppapResponse = ubl_model_utils_1.UBLModelUtils.createPpapResponse(this.ppap, true);
                            }
                        }
                        else {
                            this.ppapResponse = ppapResponseVariable;
                        }
                        return [3 /*break*/, 18];
                    case 9:
                        if (!(processType == 'Fulfilment')) return [3 /*break*/, 12];
                        _d = this;
                        return [4 /*yield*/, this.documentService.getInitialDocument(activityVariables)];
                    case 10:
                        _d.despatchAdvice = _g.sent();
                        return [4 /*yield*/, this.documentService.getResponseDocument(activityVariables)];
                    case 11:
                        receiptAdviceVariable = _g.sent();
                        if (receiptAdviceVariable == null) {
                            // initialize the quotation only if the user is in seller role
                            if (this.bpActivityEvent.userRole == 'buyer') {
                                this.receiptAdvice = ubl_model_utils_1.UBLModelUtils.createReceiptAdvice(this.despatchAdvice);
                            }
                        }
                        else {
                            this.receiptAdvice = receiptAdviceVariable;
                        }
                        return [3 /*break*/, 18];
                    case 12:
                        if (!(processType == 'Transport_Execution_Plan')) return [3 /*break*/, 15];
                        _e = this;
                        return [4 /*yield*/, this.documentService.getInitialDocument(activityVariables)];
                    case 13:
                        _e.transportExecutionPlanRequest = _g.sent();
                        return [4 /*yield*/, this.documentService.getResponseDocument(activityVariables)];
                    case 14:
                        transportExecutionPlanVariable = _g.sent();
                        if (transportExecutionPlanVariable == null) {
                            if (this.bpActivityEvent.userRole == 'seller') {
                                this.transportExecutionPlan = ubl_model_utils_1.UBLModelUtils.createTransportExecutionPlan(this.transportExecutionPlanRequest);
                            }
                        }
                        else {
                            this.transportExecutionPlan = transportExecutionPlanVariable;
                        }
                        return [3 /*break*/, 18];
                    case 15:
                        if (!(processType == 'Item_Information_Request')) return [3 /*break*/, 18];
                        _f = this;
                        return [4 /*yield*/, this.documentService.getInitialDocument(activityVariables)];
                    case 16:
                        _f.itemInformationRequest = _g.sent();
                        return [4 /*yield*/, this.documentService.getResponseDocument(activityVariables)];
                    case 17:
                        itemInformationResponseVariable = _g.sent();
                        if (itemInformationResponseVariable == null) {
                            if (this.bpActivityEvent.userRole == 'seller') {
                                this.itemInformationResponse = ubl_model_utils_1.UBLModelUtils.createItemInformationResponse(this.itemInformationRequest);
                            }
                        }
                        else {
                            this.itemInformationResponse = itemInformationResponseVariable;
                        }
                        _g.label = 18;
                    case 18: return [2 /*return*/];
                }
            });
        });
    };
    // This function is used to start viewing business processes.
    // Dashboard and product-details are two way to start viewing business processes. For dashboard, business process history contains process document metadatas since
    // they are already started/completed. However, in the product-details page, we start a new business process, this is why we check for new process processMetadata.
    BPDataService.prototype.startBp = function (bpActivityEvent, clearSearchContext, bpURLParams) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.resetBpData();
                        if (clearSearchContext) {
                            this.searchContextService.clearSearchContext();
                        }
                        else {
                            // If there is an associated process, we need to know collaboration group id since we will add the new process instance group to this collaboration group
                            // Else, it is OK to reset collaboration group id since a new collaboration group will be created for the process.
                            if (this.searchContextService.getAssociatedProcessType() == null) {
                                bpActivityEvent.collaborationGroupId = null;
                            }
                        }
                        this.bpActivityEvent = bpActivityEvent;
                        if (!!bpActivityEvent.newProcess) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.setProcessDocuments(bpActivityEvent.processHistory[0])];
                    case 1:
                        _a.sent();
                        _a.label = 2;
                    case 2:
                        this.bpActivityEventBehaviorSubject.next(this.bpActivityEvent);
                        this.navigateToBpExec(bpURLParams);
                        return [2 /*return*/];
                }
            });
        });
    };
    BPDataService.prototype.navigateToBpExec = function (bpURLParams) {
        if (bpURLParams.processInstanceId) {
            this.router.navigate(['bpe/bpe-exec'], {
                queryParams: {
                    catalogueId: bpURLParams.catalogueId,
                    id: bpURLParams.catalogueLineId,
                    pid: bpURLParams.processInstanceId,
                    termsSource: bpURLParams.termsSource
                }
            });
        }
        else {
            this.router.navigate(['bpe/bpe-exec'], {
                queryParams: {
                    catalogueId: bpURLParams.catalogueId,
                    id: bpURLParams.catalogueLineId,
                    termsSource: bpURLParams.termsSource
                }
            });
        }
    };
    // For business processes transitions (for example, from PPAP to Negotiation), we have to keep containerGroupId same since all processes are in the same process instance group
    // However, process type and userRole can be changed. Therefore, we use this function to update BpActivityEvent correctly.
    // Moreover, processMetadata should be cleared since we will create a new business process.
    BPDataService.prototype.proceedNextBpStep = function (userRole, processType) {
        var bpStartEvent = new bp_start_event_1.BpActivityEvent(userRole, processType, this.bpActivityEvent.containerGroupId, this.bpActivityEvent.collaborationGroupId, this.bpActivityEvent.processHistory, null, true, // new process is true
        false); // as this is a new process there is no subsequent process after this one
        this.bpActivityEvent = bpStartEvent;
        // this event is listened by the product-bp-options.component where the displayed process view is adjusted
        this.bpActivityEventBehaviorSubject.next(bpStartEvent);
        // TODO make getting the user role and process type more systematic, we should not have a logic as below
        // it is crucial to update userRole after updating process type. Otherwise, we will have problems while viewing transport execution plan details.
        this.bpActivityEvent.userRole = userRole;
    };
    // this method is supposed to be called when the user is about to initialize a business process via the
    // search details page
    BPDataService.prototype.initRfq = function (settings) {
        var _this = this;
        var rfq = ubl_model_utils_1.UBLModelUtils.createRequestForQuotation(this.bpActivityEvent.workflowOptions ? this.bpActivityEvent.workflowOptions.negotiation : new negotiation_options_1.NegotiationOptions(), settings);
        this.requestForQuotation = rfq;
        var line = this.catalogueLines[0];
        var rfqLine = this.requestForQuotation.requestForQuotationLine[0];
        rfqLine.lineItem.item = utils_1.copy(line.goodsItem.item);
        rfqLine.lineItem.lineReference = [new line_reference_1.LineReference(line.id)];
        var linePriceWrapper = new price_wrapper_1.PriceWrapper(line.requiredItemLocationQuantity.price, line.requiredItemLocationQuantity.applicableTaxCategory[0].percent);
        if (linePriceWrapper.hasPrice()) {
            rfqLine.lineItem.price = utils_1.copy(line.requiredItemLocationQuantity.price);
        }
        else {
            rfqLine.lineItem.price.priceAmount.value = 1;
        }
        rfqLine.lineItem.delivery[0].requestedDeliveryPeriod.durationMeasure =
            utils_1.copy(line.goodsItem.deliveryTerms.estimatedDeliveryPeriod.durationMeasure);
        rfqLine.lineItem.warrantyValidityPeriod = utils_1.copy(line.warrantyValidityPeriod);
        rfqLine.lineItem.deliveryTerms.incoterms = line.goodsItem.deliveryTerms.incoterms;
        rfqLine.lineItem.quantity.unitCode = line.requiredItemLocationQuantity.price.baseQuantity.unitCode;
        this.selectFirstValuesAmongAlternatives(rfqLine.lineItem.item);
        // quantity
        rfqLine.lineItem.quantity.value = this.bpActivityEvent.workflowOptions ? this.bpActivityEvent.workflowOptions.quantity : 1;
        var userId = this.cookieService.get('user_id');
        return this.userService.getSettingsForUser(userId).then(function (settings) {
            // we can't copy because those are 2 different types of addresses.
            var lineItem = _this.requestForQuotation.requestForQuotationLine[0].lineItem;
            var address = lineItem.deliveryTerms.deliveryLocation.address;
            address.country.name = new text_1.Text(settings.details.address.country, constants_1.DEFAULT_LANGUAGE());
            address.postalZone = settings.details.address.postalCode;
            address.cityName = settings.details.address.cityName;
            address.region = settings.details.address.region;
            address.buildingNumber = settings.details.address.buildingNumber;
            address.streetName = settings.details.address.streetName;
        });
    };
    BPDataService.prototype.initRfqForTransportationWithOrder = function (order) {
        this.requestForQuotation = ubl_model_utils_1.UBLModelUtils.createRequestForQuotationWithOrder(utils_1.copy(order), utils_1.copy(this.catalogueLines[0]));
        return Promise.resolve();
    };
    BPDataService.prototype.initRfqForTransportationWithThreadMetadata = function (thread) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.setProcessDocuments(thread)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/, this.initRfqForTransportationWithOrder(this.order)];
                }
            });
        });
    };
    BPDataService.prototype.initRfqWithIir = function () {
        var copyIir = utils_1.copy(this.itemInformationResponse);
        this.resetBpData();
        this.modifiedCatalogueLines = utils_1.copy(this.catalogueLines);
        this.requestForQuotation = ubl_model_utils_1.UBLModelUtils.createRequestForQuotationWithIir(copyIir, this.precedingBPDataService.fromAddress, this.precedingBPDataService.toAddress, this.precedingBPDataService.orderMetadata);
    };
    BPDataService.prototype.initFetchedRfq = function () {
        var rfq = this.requestForQuotation;
        rfq.negotiationOptions = new negotiation_options_1.NegotiationOptions();
        rfq.paymentMeans = rfq.paymentMeans || new payment_means_1.PaymentMeans(new code_1.Code(constants_1.PAYMENT_MEANS[0], constants_1.PAYMENT_MEANS[0]));
        rfq.paymentTerms = rfq.paymentTerms || new payment_terms_1.PaymentTerms();
    };
    BPDataService.prototype.initPpap = function (documents) {
        this.modifiedCatalogueLines = utils_1.copy(this.catalogueLines);
        this.ppap = ubl_model_utils_1.UBLModelUtils.createPpap(documents);
        this.ppap.lineItem.item = this.modifiedCatalogueLines[0].goodsItem.item;
        this.ppap.lineItem.lineReference = [new line_reference_1.LineReference(this.modifiedCatalogueLines[0].id)];
        this.selectFirstValuesAmongAlternatives(this.modifiedCatalogueLines[0].goodsItem.item);
    };
    BPDataService.prototype.initItemInformationRequest = function () {
        this.modifiedCatalogueLines = utils_1.copy(this.catalogueLines);
        this.itemInformationRequest = ubl_model_utils_1.UBLModelUtils.createItemInformationRequest();
        this.itemInformationRequest.itemInformationRequestLine[0].salesItem[0].item = this.modifiedCatalogueLines[0].goodsItem.item;
        this.selectFirstValuesAmongAlternatives(this.modifiedCatalogueLines[0].goodsItem.item);
    };
    BPDataService.prototype.initOrderWithQuotation = function () {
        var copyQuotation = utils_1.copy(this.quotation);
        var copyRfq = utils_1.copy(this.requestForQuotation);
        this.resetBpData();
        this.modifiedCatalogueLines = utils_1.copy(this.catalogueLines);
        this.order = ubl_model_utils_1.UBLModelUtils.createOrder();
        this.order.orderLine[0].lineItem = copyQuotation.quotationLine[0].lineItem;
        var copyLineItem = copyRfq.requestForQuotationLine[0].lineItem;
        this.order.orderLine[0].lineItem.deliveryTerms.deliveryLocation.address = copyLineItem.deliveryTerms.deliveryLocation.address;
        this.order.paymentMeans = copyQuotation.paymentMeans;
        this.order.paymentTerms = copyQuotation.paymentTerms;
        this.order.anticipatedMonetaryTotal.payableAmount.currencyID = copyRfq.requestForQuotationLine[0].lineItem.price.priceAmount.currencyID;
        // create a contract for Terms and Conditions
        var contract = new contract_1.Contract();
        contract.id = ubl_model_utils_1.UBLModelUtils.generateUUID();
        for (var _i = 0, _a = copyQuotation.termOrCondition; _i < _a.length; _i++) {
            var clause = _a[_i];
            var newClause = JSON.parse(JSON.stringify(clause));
            contract.clause.push(newClause);
        }
        // push contract to order.contract
        this.order.contract = [contract];
    };
    BPDataService.prototype.initOrderWithRfq = function () {
        var copyRfq = utils_1.copy(this.requestForQuotation);
        this.resetBpData();
        this.modifiedCatalogueLines = utils_1.copy(this.catalogueLines);
        this.order = ubl_model_utils_1.UBLModelUtils.createOrder();
        this.order.orderLine[0].lineItem = copyRfq.requestForQuotationLine[0].lineItem;
        var copyLineItem = copyRfq.requestForQuotationLine[0].lineItem;
        this.order.orderLine[0].lineItem.deliveryTerms.deliveryLocation.address = copyLineItem.deliveryTerms.deliveryLocation.address;
        this.order.paymentMeans = copyRfq.paymentMeans;
        this.order.paymentTerms = copyRfq.paymentTerms;
        // create a contract for Terms and Conditions
        var contract = new contract_1.Contract();
        contract.id = ubl_model_utils_1.UBLModelUtils.generateUUID();
        for (var _i = 0, _a = copyRfq.termOrCondition; _i < _a.length; _i++) {
            var clause = _a[_i];
            var newClause = JSON.parse(JSON.stringify(clause));
            contract.clause.push(newClause);
        }
        // push contract to order.contract
        this.order.contract = [contract];
    };
    BPDataService.prototype.initRfqWithQuotation = function () {
        var copyQuotation = utils_1.copy(this.quotation);
        var copyRfq = utils_1.copy(this.requestForQuotation);
        this.resetBpData();
        this.modifiedCatalogueLines = utils_1.copy(this.catalogueLines);
        this.requestForQuotation = ubl_model_utils_1.UBLModelUtils.createRequestForQuotation(new negotiation_options_1.NegotiationOptions(), null);
        this.requestForQuotation.requestForQuotationLine[0].lineItem = copyQuotation.quotationLine[0].lineItem;
        this.requestForQuotation.paymentMeans = copyQuotation.paymentMeans;
        this.requestForQuotation.paymentTerms = copyQuotation.paymentTerms;
        this.requestForQuotation.tradingTerms = copyQuotation.tradingTerms;
        this.requestForQuotation.termOrCondition = copyQuotation.termOrCondition;
        this.requestForQuotation.delivery = copyRfq.delivery;
        this.requestForQuotation.dataMonitoringRequested = copyRfq.dataMonitoringRequested;
    };
    BPDataService.prototype.initRfqWithOrder = function () {
        var copyOrder = utils_1.copy(this.order);
        this.resetBpData();
        this.modifiedCatalogueLines = utils_1.copy(this.catalogueLines);
        this.requestForQuotation = ubl_model_utils_1.UBLModelUtils.createRequestForQuotation(new negotiation_options_1.NegotiationOptions(), null);
        this.requestForQuotation.requestForQuotationLine[0].lineItem = copyOrder.orderLine[0].lineItem;
        this.requestForQuotation.paymentTerms = copyOrder.paymentTerms;
        this.requestForQuotation.paymentMeans = copyOrder.paymentMeans;
    };
    BPDataService.prototype.initRfqWithTransportExecutionPlanRequest = function () {
        var copyTransportExecutionPlanRequest = utils_1.copy(this.transportExecutionPlanRequest);
        this.resetBpData();
        this.modifiedCatalogueLines = utils_1.copy(this.catalogueLines);
        this.requestForQuotation = ubl_model_utils_1.UBLModelUtils.createRequestForQuotationWithTransportExecutionPlanRequest(copyTransportExecutionPlanRequest, this.modifiedCatalogueLines[0]);
    };
    BPDataService.prototype.initDispatchAdvice = function (handlingInst, carrierName, carrierContact, deliveredQuantity, endDate) {
        var copyOrder;
        if (this.order) {
            copyOrder = utils_1.copy(this.order);
        }
        else {
            copyOrder = utils_1.copy(this.productOrder);
        }
        this.resetBpData();
        this.modifiedCatalogueLines = utils_1.copy(this.catalogueLines);
        this.despatchAdvice = ubl_model_utils_1.UBLModelUtils.createDespatchAdvice(copyOrder);
        if (deliveredQuantity.unitCode == null) {
            this.despatchAdvice.despatchLine[0].deliveredQuantity.unitCode = copyOrder.orderLine[0].lineItem.quantity.unitCode;
        }
        else {
            this.despatchAdvice.despatchLine[0].deliveredQuantity.unitCode = deliveredQuantity.unitCode;
        }
        this.despatchAdvice.despatchLine[0].deliveredQuantity.value = deliveredQuantity.value;
        if (handlingInst) {
            this.despatchAdvice.despatchLine[0].shipment[0].handlingInstructions = [handlingInst];
        }
        else {
            this.despatchAdvice.despatchLine[0].shipment[0].handlingInstructions = [new text_1.Text("", constants_1.DEFAULT_LANGUAGE())];
        }
        this.despatchAdvice.despatchLine[0].shipment[0].shipmentStage.push(new shipment_stage_1.ShipmentStage());
        var partyName = new party_name_1.PartyName();
        partyName.name.value = carrierName;
        partyName.name.languageID = constants_1.DEFAULT_LANGUAGE();
        this.despatchAdvice.despatchLine[0].shipment[0].shipmentStage[0].carrierParty.partyName = [partyName];
        this.despatchAdvice.despatchLine[0].shipment[0].shipmentStage[0].carrierParty.contact.telephone = carrierContact;
        this.despatchAdvice.despatchLine[0].shipment[0].shipmentStage[0].estimatedDeliveryDate = endDate;
    };
    BPDataService.prototype.initTransportExecutionPlanRequest = function () {
        this.modifiedCatalogueLines = utils_1.copy(this.catalogueLines);
        this.transportExecutionPlanRequest = ubl_model_utils_1.UBLModelUtils.createTransportExecutionPlanRequest(this.modifiedCatalogueLines[0]);
        this.selectFirstValuesAmongAlternatives(this.modifiedCatalogueLines[0].goodsItem.item);
        if (this.quotation) {
            var quotationPeriod = this.quotation.quotationLine[0].lineItem.delivery[0].requestedDeliveryPeriod;
            this.transportExecutionPlanRequest.serviceStartTimePeriod.startDate = quotationPeriod.startDate;
            this.transportExecutionPlanRequest.serviceStartTimePeriod.endDate = quotationPeriod.endDate;
        }
    };
    BPDataService.prototype.initTransportExecutionPlanRequestWithOrder = function () {
        return __awaiter(this, void 0, void 0, function () {
            var copyOrder;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.resetBpData();
                        return [4 /*yield*/, this.setProcessDocuments(this.searchContextService.getAssociatedProcessMetadata())];
                    case 1:
                        _a.sent();
                        copyOrder = utils_1.copy(this.order);
                        this.modifiedCatalogueLines = utils_1.copy(this.catalogueLines);
                        this.transportExecutionPlanRequest = ubl_model_utils_1.UBLModelUtils.createTransportExecutionPlanRequestWithOrder(copyOrder, this.modifiedCatalogueLines[0]);
                        this.requestForQuotation = ubl_model_utils_1.UBLModelUtils.createRequestForQuotationWithOrder(utils_1.copy(this.order), this.modifiedCatalogueLines[0]);
                        this.selectFirstValuesAmongAlternatives(this.modifiedCatalogueLines[0].goodsItem.item);
                        return [2 /*return*/];
                }
            });
        });
    };
    BPDataService.prototype.initTransportExecutionPlanRequestWithIir = function () {
        var copyIir = utils_1.copy(this.itemInformationResponse);
        this.resetBpData();
        this.modifiedCatalogueLines = utils_1.copy(this.catalogueLines);
        this.transportExecutionPlanRequest = ubl_model_utils_1.UBLModelUtils.createTransportExecutionPlanRequestWithIir(copyIir, this.precedingBPDataService.fromAddress, this.precedingBPDataService.toAddress, this.precedingBPDataService.orderMetadata);
    };
    BPDataService.prototype.initTransportExecutionPlanRequestWithQuotation = function () {
        var copyQuotation = utils_1.copy(this.quotation);
        this.resetBpData();
        this.modifiedCatalogueLines = utils_1.copy(this.catalogueLines);
        this.transportExecutionPlanRequest = ubl_model_utils_1.UBLModelUtils.createTransportExecutionPlanRequestWithQuotation(copyQuotation);
    };
    BPDataService.prototype.initTransportExecutionPlanRequestWithTransportExecutionPlanRequest = function () {
        var copyTransportExecutionPlanRequest = utils_1.copy(this.transportExecutionPlanRequest);
        this.resetBpData();
        this.modifiedCatalogueLines = utils_1.copy(this.catalogueLines);
        this.transportExecutionPlanRequest = ubl_model_utils_1.UBLModelUtils.createTransportExecutionPlanRequestWithTransportExecutionPlanRequest(copyTransportExecutionPlanRequest);
    };
    BPDataService.prototype.resetBpData = function () {
        this.bpActivityEventBehaviorSubject.next(null);
        this.modifiedCatalogueLines = null;
        this.requestForQuotation = null;
        this.quotation = null;
        this.order = null;
        this.orderResponse = null;
        this.despatchAdvice = null;
        this.receiptAdvice = null;
        this.ppap = null;
        this.ppapResponse = null;
        this.transportExecutionPlanRequest = null;
        this.transportExecutionPlan = null;
        this.itemInformationRequest = null;
        this.itemInformationResponse = null;
        // reinitialize the messages considering the search context
        //this.setBpMessages(this.searchContextService.associatedProcessType, this.searchContextService.associatedProcessMetadata);
    };
    /********************************************************************************************
     * Methods to update the modified catalogue lines based on the user activities on the UI
     * For example, user would choose a particular dimension for the product to be ordered, or
     * the user may choose a particular value for the color of the product among many.
     * The modified objects reflect the user selections during the continuation of the process.
     ********************************************************************************************/
    BPDataService.prototype.selectFirstValuesAmongAlternatives = function (item) {
        this.chooseAllDimensions(item);
        this.chooseFirstValuesOfItemProperties(item);
    };
    /**
     * Updates modified catalogue line's dimensions with only the first occurrences of the dimension attributes
     */
    BPDataService.prototype.chooseAllDimensions = function (item) {
        var dimensions = item.dimension;
        var finalDimensions = [];
        var chosenAttributes = [];
        var _loop_1 = function (dim) {
            // attribute is not selected yet
            if (chosenAttributes.findIndex(function (aid) { return aid == dim.attributeID; }) == -1) {
                chosenAttributes.push(dim.attributeID);
                finalDimensions.push(dim);
            }
        };
        for (var _i = 0, dimensions_1 = dimensions; _i < dimensions_1.length; _i++) {
            var dim = dimensions_1[_i];
            _loop_1(dim);
        }
        item.dimension = finalDimensions;
    };
    BPDataService.prototype.chooseFirstValuesOfItemProperties = function (item) {
        for (var i = 0; i < item.additionalItemProperty.length; i++) {
            var prop = item.additionalItemProperty[i];
            var key = utils_1.getPropertyKey(prop);
            var indexToSelect = this.bpActivityEvent.workflowOptions ? this.bpActivityEvent.workflowOptions.selectedValues[key] || 0 : 0;
            switch (prop.valueQualifier) {
                case "STRING":
                    // Here, possible texts represent the values which can be chosen by the user in the product details page
                    var possibleTexts = this.getPossibleText(prop);
                    if (possibleTexts.length > 0) {
                        // instead of possibleTexts, if we use prop variable, property value may be wrong.
                        prop.value = [possibleTexts[indexToSelect]];
                    }
                    break;
                case "NUMBER":
                    if (prop.valueDecimal.length > 1) {
                        prop.valueDecimal = [prop.valueDecimal[indexToSelect]];
                    }
                    break;
                case "BOOLEAN":
                    if (prop.value.length > 1) {
                        prop.value = [prop.value[indexToSelect]];
                    }
                    break;
                case "QUANTITY":
                    if (prop.valueQuantity.length > 1) {
                        prop.valueQuantity = [prop.valueQuantity[indexToSelect]];
                    }
                    break;
            }
        }
    };
    // For the given item property, this function returns all values for the default language of the browser
    // if there's no value for the default language of the browser, it returns english values
    BPDataService.prototype.getPossibleText = function (itemProperty) {
        var texts = [];
        var defaultLanguage = constants_1.DEFAULT_LANGUAGE();
        var englishTexts = [];
        for (var _i = 0, _a = itemProperty.value; _i < _a.length; _i++) {
            var text = _a[_i];
            if (text.languageID === defaultLanguage) {
                texts.push(text);
            }
            else if (text.languageID == "en") {
                englishTexts.push(text);
            }
        }
        // there are values for the default language of the browser
        if (texts.length > 0) {
            return texts;
        }
        // there are english values
        if (englishTexts.length > 0) {
            return englishTexts;
        }
        return [];
    };
    BPDataService.prototype.getItemFromCurrentWorkflow = function () {
        switch (this.bpActivityEventBehaviorSubject.getValue().processType) {
            case "Item_Information_Request":
                return this.itemInformationRequest ? this.itemInformationRequest.itemInformationRequestLine[0].salesItem[0].item : null;
            case "Ppap":
                return this.ppap ? this.ppap.lineItem.item : null;
            case "Negotiation":
                return this.requestForQuotation ? this.requestForQuotation.requestForQuotationLine[0].lineItem.item : null;
            case "Order":
                return this.order ? this.order.orderLine[0].lineItem.item : null;
            case "Transport_Execution_Plan":
                return null;
            case "Fulfilment":
                return this.despatchAdvice ? this.despatchAdvice.despatchLine[0].item : null;
        }
    };
    BPDataService.prototype.computeWorkflowOptions = function () {
        if (!this.bpActivityEvent.workflowOptions) {
            this.bpActivityEvent.workflowOptions = new bp_workflow_options_1.BpWorkflowOptions();
            // this item only contains the properties choosen by the user
            var item = this.getItemFromCurrentWorkflow();
            var line = this.catalogueLines[0];
            if (!item || !line) {
                return;
            }
            // negotiate the price if no price on the line
            var priceWrapper = new price_wrapper_1.PriceWrapper(line.requiredItemLocationQuantity.price, line.requiredItemLocationQuantity.applicableTaxCategory[0].percent);
            if (!priceWrapper.hasPrice()) {
                this.bpActivityEvent.workflowOptions.negotiation.price = true;
            }
            // this item contains all the properties.
            var lineItem = line.goodsItem.item;
            // set the selected property values
            for (var i = 0; i < lineItem.additionalItemProperty.length; i++) {
                var prop = lineItem.additionalItemProperty[i];
                var key = utils_1.getPropertyKey(prop);
                var itemProp = item.additionalItemProperty[i];
                switch (prop.valueQualifier) {
                    case "STRING":
                    case "BOOLEAN":
                        if (prop.value.length > 1) {
                            for (var valIndex = 0; valIndex < prop.value.length; valIndex++) {
                                if (prop.value[valIndex].value === itemProp.value[0].value) {
                                    this.bpActivityEvent.workflowOptions.selectedValues[key] = valIndex;
                                }
                            }
                        }
                        break;
                    case "NUMBER":
                        if (prop.valueDecimal.length > 1) {
                            if (prop.valueDecimal.length > 1) {
                                for (var valIndex = 0; valIndex < prop.valueDecimal.length; valIndex++) {
                                    if (prop.valueDecimal[valIndex] === itemProp.valueDecimal[0]) {
                                        this.bpActivityEvent.workflowOptions.selectedValues[key] = valIndex;
                                    }
                                }
                            }
                        }
                        break;
                    case "QUANTITY":
                        if (prop.valueQuantity.length > 1) {
                            for (var valIndex = 0; valIndex < prop.valueQuantity.length; valIndex++) {
                                if (prop.valueQuantity[valIndex].value === itemProp.valueQuantity[0].value
                                    && prop.valueQuantity[valIndex].unitCode === itemProp.valueQuantity[0].unitCode) {
                                    this.bpActivityEvent.workflowOptions.selectedValues[key] = valIndex;
                                }
                            }
                        }
                        break;
                }
            }
        }
    };
    BPDataService.prototype.updateItemProperty = function (itemProperty) {
        if (itemProperty.valueQualifier == 'STRING') {
            var index = this.modifiedCatalogueLines[0].goodsItem.item.additionalItemProperty.findIndex(function (item) { return utils_1.selectName(item) == utils_1.selectName(itemProperty); });
            this.modifiedCatalogueLines[0].goodsItem.item.additionalItemProperty[index].value[0] = itemProperty.value[0];
        }
        else if (itemProperty.valueQualifier == 'NUMBER') {
            var index = this.modifiedCatalogueLines[0].goodsItem.item.additionalItemProperty.findIndex(function (item) { return utils_1.selectName(item) == utils_1.selectName(itemProperty); });
            this.modifiedCatalogueLines[0].goodsItem.item.additionalItemProperty[index].valueDecimal[0] = itemProperty.valueDecimal[0];
        }
        else if (itemProperty.valueQualifier == 'BOOLEAN') {
            var index = this.modifiedCatalogueLines[0].goodsItem.item.additionalItemProperty.findIndex(function (item) { return utils_1.selectName(item) == utils_1.selectName(itemProperty); });
            this.modifiedCatalogueLines[0].goodsItem.item.additionalItemProperty[index].value[0] = itemProperty.value[0];
        }
        else if (itemProperty.valueQualifier == 'QUANTITY') {
            var index = this.modifiedCatalogueLines[0].goodsItem.item.additionalItemProperty.findIndex(function (item) { return utils_1.selectName(item) == utils_1.selectName(itemProperty); });
            this.modifiedCatalogueLines[0].goodsItem.item.additionalItemProperty[index].valueQuantity[0] = itemProperty.valueQuantity[0];
        }
    };
    /**
     * Keeps only the selected value for the given attribute in the dimension array
     */
    BPDataService.prototype.updateDimension = function (attributeId, event) {
        // update catalogueLine
        var allDimensions = this.catalogueLines[0].goodsItem.item.dimension;
        var index = allDimensions.findIndex(function (dim) { return attributeId == dim.attributeID; });
        var firstDim = this.catalogueLines[0].goodsItem.item.dimension[index];
        this.catalogueLines[0].goodsItem.item.dimension[index] = this.catalogueLines[0].goodsItem.item.dimension[index + event.target.selectedIndex];
        this.catalogueLines[0].goodsItem.item.dimension[index + event.target.selectedIndex] = firstDim;
        this.catalogueLines[0].goodsItem.item.dimension = [].concat(this.catalogueLines[0].goodsItem.item.dimension);
        // update modifiedCatalogueLine
        var dimensions = this.modifiedCatalogueLines[0].goodsItem.item.dimension;
        var attIndexInModified = dimensions.findIndex(function (dim) { return attributeId == dim.attributeID; });
        dimensions[attIndexInModified] = this.catalogueLines[0].goodsItem.item.dimension[index];
        this.modifiedCatalogueLines[0].goodsItem.item.dimension = dimensions;
    };
    BPDataService = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [search_context_service_1.SearchContextService,
            preceding_bp_data_service_1.PrecedingBPDataService,
            user_service_1.UserService,
            ng2_cookies_1.CookieService,
            document_service_1.DocumentService,
            router_1.Router])
    ], BPDataService);
    return BPDataService;
}());
exports.BPDataService = BPDataService;
//# sourceMappingURL=bp-data-service.js.map