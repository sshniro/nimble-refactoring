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
var common_1 = require("@angular/common");
var router_1 = require("@angular/router");
var ng2_cookies_1 = require("ng2-cookies");
var bp_data_service_1 = require("../bp-data-service");
var call_status_1 = require("../../../common/call-status");
var constants_1 = require("../../../catalogue/model/constants");
var ubl_model_utils_1 = require("../../../catalogue/model/ubl-model-utils");
var utils_1 = require("../../../common/utils");
var payment_terms_wrapper_1 = require("../payment-terms-wrapper");
var user_service_1 = require("../../../user-mgmt/user.service");
var customer_party_1 = require("../../../catalogue/model/publish/customer-party");
var supplier_party_1 = require("../../../catalogue/model/publish/supplier-party");
var model_utils_1 = require("../../model/model-utils");
var process_instance_input_message_1 = require("../../model/process-instance-input-message");
var bpe_service_1 = require("../../bpe.service");
var discount_price_wrapper_1 = require("../../../common/discount-price-wrapper");
var text_1 = require("../../../catalogue/model/publish/text");
var TransportNegotiationRequestComponent = /** @class */ (function () {
    function TransportNegotiationRequestComponent(bpDataService, bpeService, cookieService, userService, location, router) {
        this.bpDataService = bpDataService;
        this.bpeService = bpeService;
        this.cookieService = cookieService;
        this.userService = userService;
        this.location = location;
        this.router = router;
        this.selectedTab = "OVERVIEW";
        this.updatingProcess = false;
        this.callStatus = new call_status_1.CallStatus();
        this.INCOTERMS = constants_1.INCOTERMS;
        this.PAYMENT_MEANS = constants_1.PAYMENT_MEANS;
        this.PAYMENT_TERMS = ubl_model_utils_1.UBLModelUtils.getDefaultPaymentTermsAsStrings();
        this.CURRENCIES = constants_1.CURRENCIES;
    }
    TransportNegotiationRequestComponent.prototype.ngOnInit = function () {
        // get copy of ThreadEventMetadata of the current business process
        if (!this.bpDataService.bpActivityEvent.newProcess) {
            this.processMetadata = this.bpDataService.bpActivityEvent.processHistory[0];
        }
        this.rfq = this.bpDataService.requestForQuotation;
        this.validateRfq();
        this.rfqPrice = new discount_price_wrapper_1.DiscountPriceWrapper(this.rfq.requestForQuotationLine[0].lineItem.price, this.rfq.requestForQuotationLine[0].lineItem.price, this.bpDataService.getCatalogueLine().requiredItemLocationQuantity.applicableTaxCategory[0].percent);
        //this.rfqPrice.quotationLinePriceWrapper = new ItemPriceWrapper(this.rfq.requestForQuotationLine[0].lineItem.price);
        this.rfqPaymentTerms = new payment_terms_wrapper_1.PaymentTermsWrapper(this.rfq.paymentTerms);
        if (this.processMetadata && this.processMetadata.isBeingUpdated) {
            this.updatingProcess = true;
        }
    };
    // be sure that rfq has all necessary fields to start a bp
    TransportNegotiationRequestComponent.prototype.validateRfq = function () {
        // special terms
        if (this.rfq.requestForQuotationLine[0].lineItem.deliveryTerms.specialTerms == null || this.rfq.requestForQuotationLine[0].lineItem.deliveryTerms.specialTerms.length == 0) {
            this.rfq.requestForQuotationLine[0].lineItem.deliveryTerms.specialTerms.push(new text_1.Text(""));
        }
    };
    TransportNegotiationRequestComponent.prototype.isDisabled = function () {
        return this.isWaitingForReply() || this.callStatus.fb_submitted;
    };
    TransportNegotiationRequestComponent.prototype.isWaitingForReply = function () {
        return !!this.processMetadata && !this.processMetadata.isBeingUpdated;
    };
    TransportNegotiationRequestComponent.prototype.onSelectTab = function (event) {
        event.preventDefault();
        this.selectedTab = event.target.id;
    };
    TransportNegotiationRequestComponent.prototype.onBack = function () {
        this.location.back();
    };
    TransportNegotiationRequestComponent.prototype.onSendRequest = function () {
        var _this = this;
        // send request for quotation
        this.callStatus.submit();
        var rfq = utils_1.copy(this.bpDataService.requestForQuotation);
        //console.log(rfq);
        var sellerId;
        // final check on the rfq
        if (this.bpDataService.modifiedCatalogueLines) {
            // still needed when initializing RFQ with BpDataService.initRfqWithIir() or BpDataService.initRfqWithQuotation()
            // but this is a hack, the methods above should be fixed.
            rfq.requestForQuotationLine[0].lineItem.item = this.bpDataService.modifiedCatalogueLines[0].goodsItem.item;
            sellerId = ubl_model_utils_1.UBLModelUtils.getPartyId(this.bpDataService.modifiedCatalogueLines[0].goodsItem.item.manufacturerParty);
        }
        else {
            sellerId = ubl_model_utils_1.UBLModelUtils.getPartyId(this.bpDataService.getCatalogueLine().goodsItem.item.manufacturerParty);
        }
        ubl_model_utils_1.UBLModelUtils.removeHjidFieldsFromObject(rfq);
        //first initialize the seller and buyer parties.
        //once they are fetched continue with starting the ordering process
        var buyerId = this.cookieService.get("company_id");
        Promise.all([
            this.userService.getParty(buyerId),
            this.userService.getParty(sellerId)
        ])
            .then(function (_a) {
            var buyerParty = _a[0], sellerParty = _a[1];
            rfq.buyerCustomerParty = new customer_party_1.CustomerParty(buyerParty);
            rfq.sellerSupplierParty = new supplier_party_1.SupplierParty(sellerParty);
            var vars = model_utils_1.ModelUtils.createProcessVariables("Negotiation", buyerId, sellerId, _this.cookieService.get("user_id"), rfq, _this.bpDataService);
            var piim = new process_instance_input_message_1.ProcessInstanceInputMessage(vars, "");
            return _this.bpeService.startBusinessProcess(piim);
        })
            .then(function () {
            _this.callStatus.callback("Terms sent", true);
            var tab = "PUCHASES";
            if (_this.bpDataService.bpActivityEvent.userRole == "seller")
                tab = "SALES";
            _this.router.navigate(['dashboard'], { queryParams: { tab: tab } });
        })
            .catch(function (error) {
            _this.callStatus.error("Failed to send Terms", error);
        });
    };
    TransportNegotiationRequestComponent.prototype.onUpdateRequest = function () {
        var _this = this;
        this.callStatus.submit();
        var rfq = utils_1.copy(this.bpDataService.requestForQuotation);
        // final check on the rfq
        if (this.bpDataService.modifiedCatalogueLines) {
            // still needed when initializing RFQ with BpDataService.initRfqWithIir() or BpDataService.initRfqWithQuotation()
            // but this is a hack, the methods above should be fixed.
            rfq.requestForQuotationLine[0].lineItem.item = this.bpDataService.modifiedCatalogueLines[0].goodsItem.item;
        }
        this.bpeService.updateBusinessProcess(JSON.stringify(rfq), "REQUESTFORQUOTATION", this.processMetadata.processId)
            .then(function () {
            _this.callStatus.callback("Terms updated", true);
            var tab = "PUCHASES";
            if (_this.bpDataService.bpActivityEvent.userRole == "seller")
                tab = "SALES";
            _this.router.navigate(['dashboard'], { queryParams: { tab: tab } });
        })
            .catch(function (error) {
            _this.callStatus.error("Failed to update Terms", error);
        });
    };
    TransportNegotiationRequestComponent = __decorate([
        core_1.Component({
            selector: "transport-negotiation-request",
            templateUrl: "./transport-negotiation-request.component.html"
        }),
        __metadata("design:paramtypes", [bp_data_service_1.BPDataService,
            bpe_service_1.BPEService,
            ng2_cookies_1.CookieService,
            user_service_1.UserService,
            common_1.Location,
            router_1.Router])
    ], TransportNegotiationRequestComponent);
    return TransportNegotiationRequestComponent;
}());
exports.TransportNegotiationRequestComponent = TransportNegotiationRequestComponent;
//# sourceMappingURL=transport-negotiation-request.component.js.map