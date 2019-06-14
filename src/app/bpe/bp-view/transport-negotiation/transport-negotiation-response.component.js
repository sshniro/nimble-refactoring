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
var router_1 = require("@angular/router");
var common_1 = require("@angular/common");
var bp_data_service_1 = require("../bp-data-service");
var call_status_1 = require("../../../common/call-status");
var request_for_quotation_1 = require("../../../catalogue/model/publish/request-for-quotation");
var quotation_1 = require("../../../catalogue/model/publish/quotation");
var constants_1 = require("../../../catalogue/model/constants");
var ubl_model_utils_1 = require("../../../catalogue/model/ubl-model-utils");
var payment_terms_wrapper_1 = require("../payment-terms-wrapper");
var model_utils_1 = require("../../model/model-utils");
var process_instance_input_message_1 = require("../../model/process-instance-input-message");
var bpe_service_1 = require("../../bpe.service");
var ng2_cookies_1 = require("ng2-cookies");
var discount_price_wrapper_1 = require("../../../common/discount-price-wrapper");
var TransportNegotiationResponseComponent = /** @class */ (function () {
    function TransportNegotiationResponseComponent(bpeService, bpDataService, location, cookieService, router) {
        this.bpeService = bpeService;
        this.bpDataService = bpDataService;
        this.location = location;
        this.cookieService = cookieService;
        this.router = router;
        this.readonly = false;
        this.selectedTab = "OVERVIEW";
        this.callStatus = new call_status_1.CallStatus();
        this.INCOTERMS = constants_1.INCOTERMS;
        this.PAYMENT_MEANS = constants_1.PAYMENT_MEANS;
        this.PAYMENT_TERMS = ubl_model_utils_1.UBLModelUtils.getDefaultPaymentTermsAsStrings();
        this.CURRENCIES = constants_1.CURRENCIES;
    }
    TransportNegotiationResponseComponent.prototype.ngOnInit = function () {
        // get copy of ThreadEventMetadata of the current business process
        if (!this.bpDataService.bpActivityEvent.newProcess) {
            this.processMetadata = this.bpDataService.bpActivityEvent.processHistory[0];
        }
        this.formerProcess = this.bpDataService.bpActivityEvent.formerProcess;
        if (!this.rfq) {
            this.rfq = this.bpDataService.requestForQuotation;
        }
        this.rfqPrice = new discount_price_wrapper_1.DiscountPriceWrapper(this.rfq.requestForQuotationLine[0].lineItem.price, this.rfq.requestForQuotationLine[0].lineItem.price, this.bpDataService.modifiedCatalogueLines[0].requiredItemLocationQuantity.applicableTaxCategory[0].percent);
        //this.rfqPrice.quotationLinePriceWrapper = new ItemPriceWrapper(this.rfq.requestForQuotationLine[0].lineItem.price);
        this.rfqPaymentTerms = new payment_terms_wrapper_1.PaymentTermsWrapper(this.rfq.paymentTerms);
        if (!this.quotation) {
            this.quotation = this.bpDataService.quotation;
        }
        this.quotationPrice = new discount_price_wrapper_1.DiscountPriceWrapper(this.quotation.quotationLine[0].lineItem.price, this.quotation.quotationLine[0].lineItem.price, this.bpDataService.modifiedCatalogueLines[0].requiredItemLocationQuantity.applicableTaxCategory[0].percent);
        //this.quotationPrice.quotationLinePriceWrapper = new ItemPriceWrapper(this.quotation.quotationLine[0].lineItem.price);
        this.quotationPaymentTerms = new payment_terms_wrapper_1.PaymentTermsWrapper(this.quotation.paymentTerms);
        this.userRole = this.bpDataService.bpActivityEvent.userRole;
    };
    TransportNegotiationResponseComponent.prototype.isDisabled = function () {
        return this.isResponseSent() || this.isLoading() || this.readonly;
    };
    TransportNegotiationResponseComponent.prototype.isLoading = function () {
        return this.callStatus.fb_submitted;
    };
    TransportNegotiationResponseComponent.prototype.onSelectTab = function (event) {
        event.preventDefault();
        this.selectedTab = event.target.id;
    };
    TransportNegotiationResponseComponent.prototype.isReadOnly = function () {
        return this.isResponseSent() || this.isLoading();
    };
    TransportNegotiationResponseComponent.prototype.isResponseSent = function () {
        return this.processMetadata && this.processMetadata.processStatus !== 'Started';
    };
    TransportNegotiationResponseComponent.prototype.onBack = function () {
        this.location.back();
    };
    TransportNegotiationResponseComponent.prototype.onRespondToQuotation = function (accepted) {
        var _this = this;
        if (accepted) {
            this.quotation.documentStatusCode.name = constants_1.NEGOTIATION_RESPONSES.ACCEPTED;
        }
        else {
            this.quotation.documentStatusCode.name = constants_1.NEGOTIATION_RESPONSES.REJECTED;
        }
        var vars = model_utils_1.ModelUtils.createProcessVariables("Negotiation", ubl_model_utils_1.UBLModelUtils.getPartyId(this.bpDataService.requestForQuotation.buyerCustomerParty.party), ubl_model_utils_1.UBLModelUtils.getPartyId(this.bpDataService.requestForQuotation.sellerSupplierParty.party), this.cookieService.get("user_id"), this.quotation, this.bpDataService);
        var piim = new process_instance_input_message_1.ProcessInstanceInputMessage(vars, this.processMetadata.processId);
        this.callStatus.submit();
        this.bpeService.continueBusinessProcess(piim)
            .then(function (res) {
            _this.callStatus.callback("Quotation sent", true);
            var tab = "PUCHASES";
            if (_this.bpDataService.bpActivityEvent.userRole == "seller")
                tab = "SALES";
            _this.router.navigate(['dashboard'], { queryParams: { tab: tab } });
        })
            .catch(function (error) {
            _this.callStatus.error("Failed to send quotation", error);
        });
    };
    TransportNegotiationResponseComponent.prototype.onRequestNewQuotation = function () {
        this.bpDataService.initRfqWithQuotation();
        this.bpDataService.proceedNextBpStep("buyer", "Negotiation");
    };
    TransportNegotiationResponseComponent.prototype.onAcceptAndOrder = function () {
        this.bpDataService.initTransportExecutionPlanRequestWithQuotation();
        this.bpDataService.proceedNextBpStep(this.userRole, 'Transport_Execution_Plan');
    };
    __decorate([
        core_1.Input(),
        __metadata("design:type", request_for_quotation_1.RequestForQuotation)
    ], TransportNegotiationResponseComponent.prototype, "rfq", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", quotation_1.Quotation)
    ], TransportNegotiationResponseComponent.prototype, "quotation", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Boolean)
    ], TransportNegotiationResponseComponent.prototype, "readonly", void 0);
    TransportNegotiationResponseComponent = __decorate([
        core_1.Component({
            selector: "transport-negotiation-response",
            templateUrl: "./transport-negotiation-response.component.html",
            styleUrls: ["./transport-negotiation-response.component.css"]
        }),
        __metadata("design:paramtypes", [bpe_service_1.BPEService,
            bp_data_service_1.BPDataService,
            common_1.Location,
            ng2_cookies_1.CookieService,
            router_1.Router])
    ], TransportNegotiationResponseComponent);
    return TransportNegotiationResponseComponent;
}());
exports.TransportNegotiationResponseComponent = TransportNegotiationResponseComponent;
//# sourceMappingURL=transport-negotiation-response.component.js.map