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
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var bp_data_service_1 = require("../bp-data-service");
var constants_1 = require("../../../catalogue/model/constants");
var common_1 = require("@angular/common");
var call_status_1 = require("../../../common/call-status");
var ubl_model_utils_1 = require("../../../catalogue/model/ubl-model-utils");
var bpe_service_1 = require("../../bpe.service");
var user_service_1 = require("../../../user-mgmt/user.service");
var ng2_cookies_1 = require("ng2-cookies");
var router_1 = require("@angular/router");
var customer_party_1 = require("../../../catalogue/model/publish/customer-party");
var supplier_party_1 = require("../../../catalogue/model/publish/supplier-party");
var model_utils_1 = require("../../model/model-utils");
var process_instance_input_message_1 = require("../../model/process-instance-input-message");
var negotiation_model_wrapper_1 = require("./negotiation-model-wrapper");
var utils_1 = require("../../../common/utils");
var utils_2 = require("../../../user-mgmt/utils");
var document_service_1 = require("../document-service");
var discount_modal_component_1 = require("../../../product-details/discount-modal.component");
var myGlobals = require("../../../globals");
var digital_agreement_1 = require("../../../catalogue/model/publish/digital-agreement");
var unit_service_1 = require("../../../common/unit-service");
var constants_2 = require("../../../common/constants");
var quantity_1 = require("../../../catalogue/model/publish/quantity");
var negotiation_options_1 = require("../../../catalogue/model/publish/negotiation-options");
var quotation_1 = require("../../../catalogue/model/publish/quotation");
var NegotiationRequestComponent = /** @class */ (function () {
    function NegotiationRequestComponent(bpDataService, bpeService, userService, unitService, cookieService, location, documentService, router) {
        this.bpDataService = bpDataService;
        this.bpeService = bpeService;
        this.userService = userService;
        this.unitService = unitService;
        this.cookieService = cookieService;
        this.location = location;
        this.documentService = documentService;
        this.router = router;
        this.CURRENCIES = constants_1.CURRENCIES;
        this.frameContract = new digital_agreement_1.DigitalAgreement();
        this.primaryTermsSource = 'product_defaults';
        this.frameContractDuration = new quantity_1.Quantity(); // we have a dedicated variable to keep this in order not to create an empty trading term in the rfq
        this.manufacturersTermsExistence = { 'product_defaults': true }; // a (term source -> boolean) map indicating the existence of term sources
        this.sellerId = null;
        this.buyerId = null;
        this.selectedAddressValue = "";
        this.config = myGlobals.config;
        // the copy of ThreadEventMetadata of the current business process
        this.processMetadata = null;
        /**
         * View control fields
         */
        this.showCounterOfferTerms = false;
        this.showFrameContractDetails = false;
        this.frameContractAvailable = false;
        this.showNotesAndAdditionalFiles = false;
        this.showDataMonitoring = false;
        this.showDeliveryAddress = false;
        this.showPurchaseOrder = false;
        this.showTermsAndConditions = false;
        this.callStatus = new call_status_1.CallStatus();
        this.pageInitCallStatus = new call_status_1.CallStatus();
    }
    NegotiationRequestComponent.prototype.ngOnInit = function () {
        var _this = this;
        // get copy of ThreadEventMetadata of the current business process
        this.setProcessMetadataFields(this.bpDataService.bpActivityEvent.processHistory);
        // copying the original rfq so that the updates (which might be temporary) wouldn't effect the original document
        // if the document is updated, the cached one should be updated in the document service
        this.rfq = this.bpDataService.requestForQuotation;
        this.rfqLine = this.rfq.requestForQuotationLine[0];
        this.catalogueLine = this.bpDataService.getCatalogueLine();
        this.sellerId = ubl_model_utils_1.UBLModelUtils.getPartyId(this.catalogueLine.goodsItem.item.manufacturerParty);
        this.buyerId = this.cookieService.get("company_id");
        var frameContractDuration = this.getFrameContractDurationFromRfq(this.rfq);
        // if the rfq frame contract duration is not null, we are rendering the negotiation process in which the frame contract duration is also negotiated
        if (frameContractDuration != null) {
            this.frameContractDuration = frameContractDuration;
        }
        else if (this.frameContract) {
            // initialize frame contract variables
            this.frameContractAvailable = true;
            this.manufacturersTermsExistence.frame_contract = true;
        }
        // construct wrapper with the retrieved documents
        this.wrapper = new negotiation_model_wrapper_1.NegotiationModelWrapper(this.catalogueLine, this.rfq, null, this.frameContractQuotation, this.lastOfferQuotation, this.bpDataService.getCompanySettings().negotiationSettings);
        // terms select box value should be set before computing the negotiation options
        if (this.lastOfferQuotation) {
            this.manufacturersTermsExistence.last_offer = true;
        }
        // if a new business process is created load initial terms based on the selected terms source
        // ignore negotiation options is true as they are not calculated yet
        // rfq is provided with values in onTermsSourceChange. this is done after initializing the wrapper,
        // because this method requires the wrapper
        if (!this.processMetadata) {
            this.onTermsSourceChange(this.primaryTermsSource, true);
        }
        this.wrapper.initialImmutableRfq.termOrCondition = utils_1.copy(this.defaultTermsAndConditions);
        // compute negotiation options for selecting the negotiation ticks automatically
        this.computeRfqNegotiationOptions(this.rfq);
        // if the line does not have a price enable the price negotiation
        if (!this.lineHasPrice) {
            this.rfq.negotiationOptions.price = true;
        }
        // load the terms based on the availability of the terms
        this.onTermsSourceChange(this.primaryTermsSource);
        // update the price based on the updated conditions
        // this is required to initialize the line discount wrapper with the terms from rfq
        this.onPriceConditionsChange();
        // set the flag for showing the counter terms if the presen
        if (this.processMetadata != null) {
            this.showCounterOfferTerms = true;
        }
        // get frame contract units
        this.unitService.getCachedUnitList(constants_2.frameContractDurationUnitListId).then(function (list) {
            _this.frameContractDurationUnits = list;
        });
    };
    NegotiationRequestComponent.prototype.setProcessMetadataFields = function (processHistory) {
        this.processMetadataHistory = this.bpDataService.bpActivityEvent.processHistory;
        if (!this.bpDataService.bpActivityEvent.newProcess) {
            this.processMetadata = this.bpDataService.bpActivityEvent.processHistory[0];
        }
        else {
            if (this.processMetadataHistory.length > 0 && this.processMetadataHistory[0].processType == "Negotiation") {
                this.manufacturersTermsExistence.last_offer = true;
            }
        }
    };
    NegotiationRequestComponent.prototype.computeRfqNegotiationOptions = function (rfq) {
        if (!rfq.negotiationOptions) {
            rfq.negotiationOptions = new negotiation_options_1.NegotiationOptions();
        }
        if (this.primaryTermsSource == 'product_defaults') {
            rfq.negotiationOptions.deliveryPeriod = this.wrapper.lineDeliveryPeriodString !== this.wrapper.rfqDeliveryPeriodString;
            rfq.negotiationOptions.incoterms = this.wrapper.lineIncoterms !== this.wrapper.rfqIncoterms;
            rfq.negotiationOptions.paymentMeans = this.wrapper.linePaymentMeans !== this.wrapper.rfqPaymentMeans;
            rfq.negotiationOptions.paymentTerms = this.wrapper.linePaymentTerms !== this.wrapper.rfqPaymentTermsToString;
            rfq.negotiationOptions.price = this.wrapper.lineDiscountPriceWrapper.discountedPricePerItem !== this.wrapper.rfqDiscountPriceWrapper.pricePerItem;
            rfq.negotiationOptions.warranty = this.wrapper.lineWarrantyString !== this.wrapper.rfqWarrantyString;
            rfq.negotiationOptions.termsAndConditions = ubl_model_utils_1.UBLModelUtils.areTermsAndConditionListsDifferent(this.defaultTermsAndConditions, this.wrapper.rfq.termOrCondition);
        }
        else {
            var quotationWrapper = this.wrapper.frameContractQuotationWrapper;
            if (this.primaryTermsSource == 'last_offer') {
                quotationWrapper = this.wrapper.lastOfferQuotationWrapper;
            }
            rfq.negotiationOptions.deliveryPeriod = quotationWrapper.deliveryPeriodString !== this.wrapper.rfqDeliveryPeriodString;
            rfq.negotiationOptions.incoterms = quotationWrapper.incoterms !== this.wrapper.rfqIncoterms;
            rfq.negotiationOptions.paymentMeans = quotationWrapper.paymentMeans !== this.wrapper.rfqPaymentMeans;
            rfq.negotiationOptions.paymentTerms = quotationWrapper.paymentTermsWrapper.paymentTerm !== this.wrapper.rfqPaymentTermsToString;
            rfq.negotiationOptions.price = quotationWrapper.priceWrapper.pricePerItem !== this.wrapper.rfqDiscountPriceWrapper.discountedPricePerItem;
            rfq.negotiationOptions.warranty = quotationWrapper.warrantyString !== this.wrapper.rfqWarrantyString;
            rfq.negotiationOptions.termsAndConditions = ubl_model_utils_1.UBLModelUtils.areTermsAndConditionListsDifferent(quotationWrapper.quotation.termOrCondition, this.wrapper.rfq.termOrCondition);
        }
    };
    /*
     * Event handlers
     */
    NegotiationRequestComponent.prototype.onSendRequest = function () {
        var _this = this;
        if (this.wrapper.rfqDiscountPriceWrapper.itemPrice.hasPrice()) {
            if (!utils_1.isValidPrice(this.wrapper.rfqDiscountPriceWrapper.itemPrice.price.priceAmount.value)) {
                alert("Price cannot have more than 2 decimal places");
                return;
            }
        }
        if (this.isNegotiatingAnyTerm()) {
            // create an additional trading term for the frame contract duration
            if (this.rfq.negotiationOptions.frameContractDuration && this.isFrameContractValid()) {
                this.wrapper.rfqFrameContractDuration = this.frameContractDuration;
            }
            // final check on the rfq
            var rfq_1 = utils_1.copy(this.rfq);
            if (this.bpDataService.modifiedCatalogueLines) {
                // still needed when initializing RFQ with BpDataService.initRfqWithIir() or BpDataService.initRfqWithQuotation()
                // but this is a hack, the methods above should be fixed.
                rfq_1.requestForQuotationLine[0].lineItem.item = this.bpDataService.modifiedCatalogueLines[0].goodsItem.item;
            }
            ubl_model_utils_1.UBLModelUtils.removeHjidFieldsFromObject(rfq_1);
            // send request for quotation
            this.callStatus.submit();
            var sellerParty_1;
            var buyerParty_1;
            Promise.all([
                this.userService.getParty(this.buyerId),
                this.userService.getParty(this.sellerId),
            ]).then(function (_a) {
                var buyerPartyResp = _a[0], sellerPartyResp = _a[1];
                sellerParty_1 = sellerPartyResp;
                buyerParty_1 = buyerPartyResp;
                rfq_1.buyerCustomerParty = new customer_party_1.CustomerParty(buyerParty_1);
                rfq_1.sellerSupplierParty = new supplier_party_1.SupplierParty(sellerParty_1);
                var vars = model_utils_1.ModelUtils.createProcessVariables("Negotiation", _this.buyerId, _this.sellerId, _this.cookieService.get("user_id"), rfq_1, _this.bpDataService);
                var piim = new process_instance_input_message_1.ProcessInstanceInputMessage(vars, "");
                return _this.bpeService.startBusinessProcess(piim);
            }).then(function () {
                _this.callStatus.callback("Terms sent", true);
                var tab = "PUCHASES";
                if (_this.bpDataService.bpActivityEvent.userRole == "seller")
                    tab = "SALES";
                _this.router.navigate(['dashboard'], { queryParams: { tab: tab } });
            }).catch(function (error) {
                _this.callStatus.error("Failed to send Terms", error);
            });
        }
        else {
            // set the item price, otherwise we will lose item price information
            this.bpDataService.requestForQuotation.requestForQuotationLine[0].lineItem.price.priceAmount.value = this.wrapper.rfqDiscountPriceWrapper.totalPrice / this.wrapper.rfqDiscountPriceWrapper.orderedQuantity.value;
            // just go to order page
            this.bpDataService.initOrderWithRfq();
            this.bpDataService.proceedNextBpStep("buyer", "Order");
        }
    };
    NegotiationRequestComponent.prototype.onUpdateRequest = function () {
        var _this = this;
        this.callStatus.submit();
        var rfq = utils_1.copy(this.rfq);
        this.bpeService.updateBusinessProcess(JSON.stringify(rfq), "REQUESTFORQUOTATION", this.processMetadata.processId).then(function () {
            _this.documentService.updateCachedDocument(rfq.id, rfq);
            _this.callStatus.callback("Terms updated", true);
            var tab = "PUCHASES";
            if (_this.bpDataService.bpActivityEvent.userRole == "seller")
                tab = "SALES";
            _this.router.navigate(['dashboard'], { queryParams: { tab: tab } });
        }).catch(function (error) {
            _this.callStatus.error("Failed to update Terms", error);
        });
    };
    NegotiationRequestComponent.prototype.onBack = function () {
        this.location.back();
    };
    NegotiationRequestComponent.prototype.onOrderQuantityKeyPressed = function (event) {
        var charCode = (event.which) ? event.which : event.keyCode;
        if (charCode > 31 && (charCode < 48 || charCode > 57)) {
            return false;
        }
        return true;
    };
    NegotiationRequestComponent.prototype.onOrderQuantityChange = function () {
        var _this = this;
        // quantity change must be activated in the next iteration of execution
        // otherwise, the update discount method will use the old value of the quantity
        setTimeout((function () {
            _this.onPriceConditionsChange();
        }), 0);
    };
    NegotiationRequestComponent.prototype.onTermsSourceChange = function (termSource, ignoreNegotiationOptions) {
        if (ignoreNegotiationOptions === void 0) { ignoreNegotiationOptions = false; }
        this.primaryTermsSource = termSource;
        if (termSource == 'frame_contract' || termSource == 'last_offer') {
            var quotationWrapper = this.wrapper.frameContractQuotationWrapper;
            if (termSource == 'last_offer') {
                quotationWrapper = this.wrapper.lastOfferQuotationWrapper;
            }
            if (!this.rfq.negotiationOptions.deliveryPeriod || ignoreNegotiationOptions) {
                this.wrapper.rfqDeliveryPeriod = utils_1.copy(quotationWrapper.deliveryPeriod);
            }
            if (!this.rfq.negotiationOptions.warranty || ignoreNegotiationOptions) {
                this.wrapper.rfqWarranty = utils_1.copy(quotationWrapper.warranty);
            }
            if (!this.rfq.negotiationOptions.paymentTerms || ignoreNegotiationOptions) {
                this.wrapper.rfqPaymentTerms.paymentTerm = quotationWrapper.paymentTermsWrapper.paymentTerm;
            }
            if (!this.rfq.negotiationOptions.incoterms || ignoreNegotiationOptions) {
                this.wrapper.rfqIncoterms = quotationWrapper.incoterms;
            }
            if (!this.rfq.negotiationOptions.paymentMeans || ignoreNegotiationOptions) {
                this.wrapper.rfqPaymentMeans = quotationWrapper.paymentMeans;
            }
            if (!this.rfq.negotiationOptions.price || ignoreNegotiationOptions) {
                this.wrapper.rfqDiscountPriceWrapper.itemPrice.value = utils_1.trimRedundantDecimals(quotationWrapper.priceWrapper.pricePerItem);
                this.wrapper.rfqDiscountPriceWrapper.itemPrice.currency = quotationWrapper.priceWrapper.currency;
            }
            if (!this.rfq.negotiationOptions.frameContractDuration || ignoreNegotiationOptions) {
                this.frameContractDuration = utils_1.copy(quotationWrapper.frameContractDuration);
            }
            if (!this.rfq.negotiationOptions.termsAndConditions || ignoreNegotiationOptions) {
                this.rfq.termOrCondition = utils_1.copy(quotationWrapper.quotation.termOrCondition);
            }
        }
        else if (termSource == 'product_defaults') {
            if (!this.rfq.negotiationOptions.deliveryPeriod || ignoreNegotiationOptions) {
                this.wrapper.rfqDeliveryPeriod = utils_1.copy(this.wrapper.originalLineDeliveryPeriod);
            }
            if (!this.rfq.negotiationOptions.warranty || ignoreNegotiationOptions) {
                this.wrapper.rfqWarranty = utils_1.copy(this.wrapper.originalLineWarranty);
            }
            if (!this.rfq.negotiationOptions.paymentTerms || ignoreNegotiationOptions) {
                this.wrapper.rfqPaymentTerms.paymentTerm = this.wrapper.linePaymentTerms;
            }
            if (!this.rfq.negotiationOptions.incoterms || ignoreNegotiationOptions) {
                this.wrapper.rfqIncoterms = this.wrapper.originalLineIncoterms;
            }
            if (!this.rfq.negotiationOptions.paymentMeans || ignoreNegotiationOptions) {
                this.wrapper.rfqPaymentMeans = this.wrapper.linePaymentMeans;
            }
            if (!this.rfq.negotiationOptions.price || ignoreNegotiationOptions) {
                this.onPriceConditionsChange();
                this.wrapper.rfqDiscountPriceWrapper.itemPrice.value = utils_1.trimRedundantDecimals(this.wrapper.lineDiscountPriceWrapper.pricePerItem);
                this.wrapper.rfqDiscountPriceWrapper.itemPrice.currency = this.wrapper.lineDiscountPriceWrapper.itemPrice.currency;
            }
            if (!this.rfq.negotiationOptions.termsAndConditions || ignoreNegotiationOptions) {
                this.rfq.termOrCondition = utils_1.copy(this.defaultTermsAndConditions);
            }
        }
    };
    NegotiationRequestComponent.prototype.onPriceConditionsChange = function () {
        // update the discount price wrapper with the active trading terms
        this.wrapper.lineDiscountPriceWrapper.incoterm = this.wrapper.rfqIncoterms;
        this.wrapper.lineDiscountPriceWrapper.paymentMeans = this.wrapper.rfqPaymentMeans;
        this.wrapper.lineDiscountPriceWrapper.deliveryPeriod = this.wrapper.rfqDeliveryPeriod;
        this.wrapper.lineDiscountPriceWrapper.deliveryLocation = this.wrapper.rfqDeliveryAddress;
        // get the price per item including the discount
        this.wrapper.lineDiscountPriceWrapper.itemPrice.value = this.wrapper.lineDiscountPriceWrapper.discountedPricePerItem;
        // update the rfq price only if the price is not being negotiated and the default product terms are presented
        // it does not make sense to update price based on the discounts when the terms of frame contract or last offer terms are presented
        if (!this.rfq.negotiationOptions.price && this.primaryTermsSource == 'product_defaults') {
            this.wrapper.rfqDiscountPriceWrapper.itemPrice.value = this.wrapper.lineDiscountPriceWrapper.discountedPricePerItem;
        }
    };
    /*
     * Getters and setters for the template.
     */
    NegotiationRequestComponent.prototype.isNegotiatingAnyTerm = function () {
        var priceDiffers;
        var deliveryPeriodDiffers;
        var warrantyDiffers;
        var incotermDiffers;
        var paymentTermDiffers;
        var paymentMeansDiffers;
        var frameContractDurationDiffers = false; // this is valid only in the second and subsequent steps of a negotiation process
        var termsAndConditionsDiffer;
        if (this.primaryTermsSource == 'last_offer' || this.primaryTermsSource == 'frame_contract') {
            var quotationWrapper = this.wrapper.frameContractQuotationWrapper;
            if (this.primaryTermsSource == 'last_offer') {
                quotationWrapper = this.wrapper.lastOfferQuotationWrapper;
            }
            priceDiffers = this.wrapper.rfqPricePerItemString != quotationWrapper.priceWrapper.itemPrice.pricePerItemString;
            deliveryPeriodDiffers = this.wrapper.rfqDeliveryPeriodString != quotationWrapper.deliveryPeriodString;
            warrantyDiffers = this.wrapper.rfqWarrantyString != quotationWrapper.warrantyString;
            incotermDiffers = this.wrapper.rfqIncoterms != quotationWrapper.incoterms;
            paymentTermDiffers = this.wrapper.rfqPaymentTerms.paymentTerm != quotationWrapper.paymentTermsWrapper.paymentTerm;
            paymentMeansDiffers = this.wrapper.rfqPaymentMeans != quotationWrapper.paymentMeans;
            frameContractDurationDiffers = this.wrapper.rfq.negotiationOptions.frameContractDuration &&
                utils_1.durationToString(this.frameContractDuration) != quotationWrapper.rfqFrameContractDurationString;
            termsAndConditionsDiffer = ubl_model_utils_1.UBLModelUtils.areTermsAndConditionListsDifferent(quotationWrapper.quotation.termOrCondition, this.rfq.termOrCondition);
        }
        else {
            priceDiffers = this.wrapper.rfqPricePerItemString != this.wrapper.lineDiscountPriceWrapper.discountedPricePerItemString;
            deliveryPeriodDiffers = this.wrapper.rfqDeliveryPeriodString != this.wrapper.lineDeliveryPeriodString;
            warrantyDiffers = this.wrapper.rfqWarrantyString != this.wrapper.lineWarrantyString;
            incotermDiffers = this.wrapper.rfqIncoterms != this.wrapper.lineIncoterms;
            paymentTermDiffers = this.wrapper.rfqPaymentTerms.paymentTerm != this.wrapper.linePaymentTerms;
            paymentMeansDiffers = this.wrapper.rfqPaymentMeans != this.wrapper.linePaymentMeans;
            // although the product default terms are selected, the following two conditions are calculated using the rfq itself
            frameContractDurationDiffers = this.wrapper.rfq.negotiationOptions.frameContractDuration &&
                !ubl_model_utils_1.UBLModelUtils.areQuantitiesEqual(this.frameContractDuration, this.getFrameContractDurationFromRfq(this.wrapper.initialImmutableRfq));
            termsAndConditionsDiffer = ubl_model_utils_1.UBLModelUtils.areTermsAndConditionListsDifferent(this.wrapper.initialImmutableRfq.termOrCondition, this.rfq.termOrCondition);
        }
        return priceDiffers ||
            deliveryPeriodDiffers ||
            warrantyDiffers ||
            incotermDiffers ||
            paymentTermDiffers ||
            paymentMeansDiffers ||
            frameContractDurationDiffers ||
            this.rfq.dataMonitoringRequested ||
            termsAndConditionsDiffer;
    };
    Object.defineProperty(NegotiationRequestComponent.prototype, "lineHasPrice", {
        get: function () {
            return this.wrapper.lineDiscountPriceWrapper.hasPrice();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NegotiationRequestComponent.prototype, "requestedQuantity", {
        get: function () {
            return this.rfq.requestForQuotationLine[0].lineItem.quantity.value;
        },
        set: function (quantity) {
            this.rfq.requestForQuotationLine[0].lineItem.quantity.value = quantity;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NegotiationRequestComponent.prototype, "negotiateDeliveryPeriod", {
        get: function () {
            return this.rfq.negotiationOptions.deliveryPeriod;
        },
        set: function (negotiate) {
            this.rfq.negotiationOptions.deliveryPeriod = negotiate;
            if (!negotiate) {
                this.onTermsSourceChange(this.primaryTermsSource);
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NegotiationRequestComponent.prototype, "negotiateWarranty", {
        get: function () {
            return this.rfq.negotiationOptions.warranty;
        },
        set: function (negotiate) {
            this.rfq.negotiationOptions.warranty = negotiate;
            if (!negotiate) {
                this.onTermsSourceChange(this.primaryTermsSource);
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NegotiationRequestComponent.prototype, "negotiateIncoterm", {
        get: function () {
            return this.rfq.negotiationOptions.incoterms;
        },
        set: function (negotiate) {
            this.rfq.negotiationOptions.incoterms = negotiate;
            if (!negotiate) {
                this.onTermsSourceChange(this.primaryTermsSource);
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NegotiationRequestComponent.prototype, "negotiatePaymentTerm", {
        get: function () {
            return this.rfq.negotiationOptions.paymentTerms;
        },
        set: function (negotiate) {
            this.rfq.negotiationOptions.paymentTerms = negotiate;
            if (!negotiate) {
                this.onTermsSourceChange(this.primaryTermsSource);
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NegotiationRequestComponent.prototype, "negotiatePaymentMean", {
        get: function () {
            return this.rfq.negotiationOptions.paymentMeans;
        },
        set: function (negotiate) {
            this.rfq.negotiationOptions.paymentMeans = negotiate;
            if (!negotiate) {
                this.onTermsSourceChange(this.primaryTermsSource);
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NegotiationRequestComponent.prototype, "negotiatePrice", {
        get: function () {
            return this.rfq.negotiationOptions.price;
        },
        set: function (negotiate) {
            this.rfq.negotiationOptions.price = negotiate;
            if (!negotiate) {
                this.onTermsSourceChange(this.primaryTermsSource);
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NegotiationRequestComponent.prototype, "negotiateFrameContractDuration", {
        get: function () {
            return this.rfq.negotiationOptions.frameContractDuration;
        },
        set: function (negotiate) {
            this.rfq.negotiationOptions.frameContractDuration = negotiate;
            if (!negotiate) {
                this.onTermsSourceChange(this.primaryTermsSource);
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NegotiationRequestComponent.prototype, "negotiateTermsAndConditions", {
        get: function () {
            return this.rfq.negotiationOptions.termsAndConditions;
        },
        set: function (negotiate) {
            this.rfq.negotiationOptions.termsAndConditions = negotiate;
            if (!negotiate) {
                this.onTermsSourceChange(this.primaryTermsSource);
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NegotiationRequestComponent.prototype, "selectedAddress", {
        get: function () {
            return this.selectedAddressValue;
        },
        set: function (addressStr) {
            this.selectedAddressValue = addressStr;
            if (addressStr !== "") {
                var index = Number(addressStr);
                var address = this.bpDataService.getCompanySettings().tradeDetails.deliveryTerms[index].deliveryAddress;
                var rfqAddress = this.wrapper.rfqDeliveryAddress;
                rfqAddress.buildingNumber = address.buildingNumber;
                rfqAddress.cityName = address.cityName;
                rfqAddress.region = address.region;
                rfqAddress.country.name.value = address.country;
                rfqAddress.postalZone = address.postalCode;
                rfqAddress.streetName = address.streetName;
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NegotiationRequestComponent.prototype, "addressOptions", {
        get: function () {
            var deliveryTerms = this.bpDataService.getCompanySettings().tradeDetails.deliveryTerms;
            var ret = [];
            if (deliveryTerms.length == 0 || !deliveryTerms[0].deliveryAddress || !deliveryTerms[0].deliveryAddress.streetName) {
                ret = [
                    { name: "No", value: "" }
                ];
            }
            else {
                ret = [
                    { name: "No", value: "" }
                ].concat(deliveryTerms.map(function (term, i) {
                    return { name: utils_2.addressToString(term.deliveryAddress), value: String(i) };
                }));
            }
            return ret;
        },
        enumerable: true,
        configurable: true
    });
    NegotiationRequestComponent.prototype.getPriceSteps = function () {
        return utils_1.getStepForPrice(this.catalogueLine.requiredItemLocationQuantity.price);
    };
    NegotiationRequestComponent.prototype.getMaximumQuantity = function () {
        return utils_1.getMaximumQuantityForPrice(this.catalogueLine.requiredItemLocationQuantity.price);
    };
    NegotiationRequestComponent.prototype.getQuantityUnit = function () {
        if (!this.catalogueLine) {
            return "";
        }
        return this.catalogueLine.requiredItemLocationQuantity.price.baseQuantity.unitCode || "";
    };
    NegotiationRequestComponent.prototype.isLoading = function () {
        return this.callStatus.fb_submitted;
    };
    NegotiationRequestComponent.prototype.isReadOnly = function () {
        return !!this.processMetadata && !this.processMetadata.isBeingUpdated;
    };
    NegotiationRequestComponent.prototype.isFormValid = function () {
        var formValid = !this.rfq.negotiationOptions.frameContractDuration || this.isFrameContractValid();
        formValid = formValid && this.isDeliveryPeriodValid() && this.isWarrantyPeriodValid() && this.isPriceValid();
        return formValid;
    };
    NegotiationRequestComponent.prototype.isPriceValid = function () {
        return this.wrapper.rfqDiscountPriceWrapper.itemPrice.value > 0;
    };
    NegotiationRequestComponent.prototype.isWaitingForReply = function () {
        return this.processMetadata && this.processMetadata.processStatus === "Started";
    };
    NegotiationRequestComponent.prototype.showRequestedPrice = function () {
        return this.isWaitingForReply() && !this.processMetadata.isBeingUpdated;
    };
    NegotiationRequestComponent.prototype.isFrameContractValid = function () {
        return this.frameContractDuration.value != null && this.frameContractDuration.unitCode != null;
    };
    NegotiationRequestComponent.prototype.isFrameContractDisabled = function () {
        return this.isLoading() || !this.isFrameContractInEditMode();
    };
    /**
     * Frame contract is editable when (in addition to the edit mode)
     * 1) there is not a frame contract available for the product between the trading partners
     * 2) the current request for quotation have the corresponding trading term (e.g. this might occur during a second negotiation step)
     */
    NegotiationRequestComponent.prototype.isFrameContractInEditMode = function () {
        return !this.isReadOnly() && (!this.frameContractAvailable || this.wrapper.rfqFrameContractDuration != null);
    };
    NegotiationRequestComponent.prototype.isFrameContractVisible = function () {
        return !this.frameContractAvailable || this.wrapper.rfqFrameContractDuration != null;
    };
    NegotiationRequestComponent.prototype.getDeliveryPeriodText = function () {
        var range = this.getDeliveryPeriodRange();
        if (range) {
            var unit = this.wrapper.rfqDeliveryPeriod.unitCode;
            return " (minimum: " + range.start + " " + unit + ", maximum: " + range.end + " " + unit + ")";
        }
        return "";
    };
    NegotiationRequestComponent.prototype.getDeliveryPeriodStyle = function () {
        var result = {};
        if (!this.isDeliveryPeriodValid()) {
            result["color"] = "red";
        }
        return result;
    };
    NegotiationRequestComponent.prototype.isDeliveryPeriodValid = function () {
        var range = this.getDeliveryPeriodRange();
        return !range || this.isPeriodValid(this.wrapper.rfqDeliveryPeriod.value, range);
    };
    NegotiationRequestComponent.prototype.getWarrantyPeriodText = function () {
        var range = this.getWarrantyPeriodRange();
        if (range) {
            var unit = this.wrapper.rfqWarranty.unitCode;
            return " (minimum: " + range.start + " " + unit + ", maximum: " + range.end + " " + unit + ")";
        }
        return "";
    };
    NegotiationRequestComponent.prototype.getWarrantyPeriodStyle = function () {
        var result = {};
        if (!this.isWarrantyPeriodValid()) {
            result["color"] = "red";
        }
        return result;
    };
    NegotiationRequestComponent.prototype.isWarrantyPeriodValid = function () {
        var range = this.getWarrantyPeriodRange();
        return !range || this.isPeriodValid(this.wrapper.rfqWarranty.value, range);
    };
    NegotiationRequestComponent.prototype.isFrameContractTermsChanged = function () {
        return !ubl_model_utils_1.UBLModelUtils.areQuantitiesEqual(this.wrapper.rfqDeliveryPeriod, this.wrapper.frameContractQuotationWrapper.deliveryPeriod) ||
            !ubl_model_utils_1.UBLModelUtils.areQuantitiesEqual(this.wrapper.rfqWarranty, this.wrapper.frameContractQuotationWrapper.warranty) ||
            this.wrapper.rfqPaymentTerms.paymentTerm != this.wrapper.frameContractQuotationWrapper.paymentTermsWrapper.paymentTerm ||
            this.wrapper.rfqIncoterms != this.wrapper.frameContractQuotationWrapper.incoterms ||
            this.wrapper.rfqPaymentMeans != this.wrapper.frameContractQuotationWrapper.paymentMeans ||
            !ubl_model_utils_1.UBLModelUtils.areAmountsEqual(this.wrapper.rfqDiscountPriceWrapper.itemPrice.price.priceAmount, this.wrapper.frameContractQuotationWrapper.priceWrapper.price.priceAmount) ||
            !ubl_model_utils_1.UBLModelUtils.areQuantitiesEqual(this.wrapper.rfqDiscountPriceWrapper.itemPrice.price.baseQuantity, this.wrapper.frameContractQuotationWrapper.priceWrapper.price.baseQuantity);
    };
    NegotiationRequestComponent.prototype.isManufacturersTermsSelectBoxVisible = function () {
        return this.manufacturersTermsExistence.frame_contract == true || this.manufacturersTermsExistence.last_offer == true;
    };
    NegotiationRequestComponent.prototype.getTermAndConditions = function () {
        if (this.primaryTermsSource == 'product_defaults') {
            console.log("pd");
            return this.wrapper.initialImmutableRfq.termOrCondition;
        }
        else if (this.primaryTermsSource == 'frame_contract') {
            console.log("fc");
            return this.wrapper.frameContractQuotation.termOrCondition;
        }
        else {
            console.log("lo");
            return this.wrapper.lastOfferQuotation.termOrCondition;
        }
    };
    /**
     * Internal methods
     */
    NegotiationRequestComponent.prototype.getDeliveryPeriodRange = function () {
        var unit = this.wrapper.rfqDeliveryPeriod.unitCode;
        var settings = this.wrapper.settings;
        var index = settings.deliveryPeriodUnits.indexOf(unit);
        return index >= 0 ? settings.deliveryPeriodRanges[index] : null;
    };
    NegotiationRequestComponent.prototype.getWarrantyPeriodRange = function () {
        var unit = this.wrapper.rfqWarranty.unitCode;
        var settings = this.wrapper.settings;
        var index = settings.warrantyPeriodUnits.indexOf(unit);
        return index >= 0 ? settings.warrantyPeriodRanges[index] : null;
    };
    NegotiationRequestComponent.prototype.isPeriodValid = function (value, range) {
        if (typeof value !== "number") {
            return true;
        }
        return value >= range.start && value <= range.end;
    };
    NegotiationRequestComponent.prototype.getFrameContractDurationFromRfq = function (rfq) {
        var tradingTerm = rfq.tradingTerms.find(function (tradingTerm) { return tradingTerm.id == "FRAME_CONTRACT_DURATION"; });
        if (tradingTerm != null) {
            return tradingTerm.value.valueQuantity[0];
        }
        return null;
    };
    NegotiationRequestComponent.prototype.openDiscountModal = function () {
        this.discountModal.open(this.wrapper.lineDiscountPriceWrapper.appliedDiscounts, this.wrapper.lineDiscountPriceWrapper.price.priceAmount.currencyID);
    };
    __decorate([
        core_1.Input(),
        __metadata("design:type", digital_agreement_1.DigitalAgreement)
    ], NegotiationRequestComponent.prototype, "frameContract", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", quotation_1.Quotation)
    ], NegotiationRequestComponent.prototype, "frameContractQuotation", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", quotation_1.Quotation)
    ], NegotiationRequestComponent.prototype, "lastOfferQuotation", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", String)
    ], NegotiationRequestComponent.prototype, "primaryTermsSource", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Array)
    ], NegotiationRequestComponent.prototype, "defaultTermsAndConditions", void 0);
    __decorate([
        core_1.ViewChild(discount_modal_component_1.DiscountModalComponent),
        __metadata("design:type", discount_modal_component_1.DiscountModalComponent)
    ], NegotiationRequestComponent.prototype, "discountModal", void 0);
    NegotiationRequestComponent = __decorate([
        core_1.Component({
            selector: "negotiation-request",
            templateUrl: "./negotiation-request.component.html",
            styleUrls: ["./negotiation-request.component.css"],
        }),
        __metadata("design:paramtypes", [bp_data_service_1.BPDataService,
            bpe_service_1.BPEService,
            user_service_1.UserService,
            unit_service_1.UnitService,
            ng2_cookies_1.CookieService,
            common_1.Location,
            document_service_1.DocumentService,
            router_1.Router])
    ], NegotiationRequestComponent);
    return NegotiationRequestComponent;
}());
exports.NegotiationRequestComponent = NegotiationRequestComponent;
//# sourceMappingURL=negotiation-request.component.js.map