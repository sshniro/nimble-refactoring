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
var request_for_quotation_1 = require("../../../catalogue/model/publish/request-for-quotation");
var bp_data_service_1 = require("../bp-data-service");
var bpe_service_1 = require("../../bpe.service");
var router_1 = require("@angular/router");
var quotation_1 = require("../../../catalogue/model/publish/quotation");
var negotiation_model_wrapper_1 = require("./negotiation-model-wrapper");
var constants_1 = require("../../../catalogue/model/constants");
var model_utils_1 = require("../../model/model-utils");
var process_instance_input_message_1 = require("../../model/process-instance-input-message");
var call_status_1 = require("../../../common/call-status");
var quantity_1 = require("../../../catalogue/model/publish/quantity");
var ng2_cookies_1 = require("ng2-cookies");
var discount_modal_component_1 = require("../../../product-details/discount-modal.component");
var ubl_model_utils_1 = require("../../../catalogue/model/ubl-model-utils");
var myGlobals = require("../../../globals");
var utils_1 = require("../../../common/utils");
var digital_agreement_1 = require("../../../catalogue/model/publish/digital-agreement");
var moment = require("moment");
var NegotiationResponseComponent = /** @class */ (function () {
    function NegotiationResponseComponent(bpeService, bpDataService, location, cookieService, router) {
        this.bpeService = bpeService;
        this.bpDataService = bpDataService;
        this.location = location;
        this.cookieService = cookieService;
        this.router = router;
        this.dateFormat = "YYYY-MM-DD";
        this.primaryTermsSource = 'product_defaults';
        this.readonly = false;
        this.config = myGlobals.config;
        this.CURRENCIES = constants_1.CURRENCIES;
        this.callStatus = new call_status_1.CallStatus();
        this.getPartyId = ubl_model_utils_1.UBLModelUtils.getPartyId;
        this.showFrameContractDetails = false;
        this.showNotesAndAdditionalFiles = false;
        this.showDeliveryAddress = false;
        this.showTermsAndConditions = false;
        this.showPurchaseOrder = false;
    }
    NegotiationResponseComponent.prototype.ngOnInit = function () {
        // get copy of ThreadEventMetadata of the current business process
        if (!this.bpDataService.bpActivityEvent.newProcess) {
            this.processMetadata = this.bpDataService.bpActivityEvent.processHistory[0];
        }
        this.line = this.bpDataService.getCatalogueLine();
        if (this.rfq == null) {
            this.rfq = this.bpDataService.requestForQuotation;
        }
        if (this.quotation == null) {
            this.quotation = this.bpDataService.quotation;
        }
        this.wrapper = new negotiation_model_wrapper_1.NegotiationModelWrapper(this.line, this.rfq, this.quotation, this.frameContractQuotation, this.lastOfferQuotation, this.bpDataService.getCompanySettings().negotiationSettings);
        this.wrapper.lineDiscountPriceWrapper.itemPrice.value = this.wrapper.lineDiscountPriceWrapper.discountedPricePerItem;
        this.quotationTotalPrice = new quantity_1.Quantity(this.wrapper.quotationDiscountPriceWrapper.totalPrice, this.wrapper.quotationDiscountPriceWrapper.currency);
        this.userRole = this.bpDataService.bpActivityEvent.userRole;
    };
    NegotiationResponseComponent.prototype.onBack = function () {
        this.location.back();
    };
    NegotiationResponseComponent.prototype.onRespondToQuotation = function (accepted) {
        var _this = this;
        if (!utils_1.isValidPrice(this.wrapper.quotationDiscountPriceWrapper.totalPrice)) {
            alert("Price cannot have more than 2 decimal places");
            return false;
        }
        if (accepted) {
            if (this.hasUpdatedTerms()) {
                this.quotation.documentStatusCode.name = constants_1.NEGOTIATION_RESPONSES.TERMS_UPDATED;
            }
            else {
                this.quotation.documentStatusCode.name = constants_1.NEGOTIATION_RESPONSES.ACCEPTED;
            }
        }
        else {
            this.quotation.documentStatusCode.name = constants_1.NEGOTIATION_RESPONSES.REJECTED;
        }
        this.callStatus.submit();
        var vars = model_utils_1.ModelUtils.createProcessVariables("Negotiation", ubl_model_utils_1.UBLModelUtils.getPartyId(this.bpDataService.requestForQuotation.buyerCustomerParty.party), ubl_model_utils_1.UBLModelUtils.getPartyId(this.bpDataService.requestForQuotation.sellerSupplierParty.party), this.cookieService.get("user_id"), this.quotation, this.bpDataService);
        var piim = new process_instance_input_message_1.ProcessInstanceInputMessage(vars, this.processMetadata.processId);
        this.bpeService.continueBusinessProcess(piim).then(function () {
            _this.callStatus.callback("Quotation sent", true);
            var tab = "PUCHASES";
            if (_this.bpDataService.bpActivityEvent.userRole == "seller")
                tab = "SALES";
            _this.router.navigate(['dashboard'], { queryParams: { tab: tab } });
        }).catch(function (error) {
            _this.callStatus.error("Failed to send quotation", error);
        });
    };
    NegotiationResponseComponent.prototype.onRequestNewQuotation = function () {
        this.bpDataService.initRfqWithQuotation();
        this.bpDataService.proceedNextBpStep("buyer", "Negotiation");
    };
    NegotiationResponseComponent.prototype.onAcceptAndOrder = function () {
        this.bpDataService.initOrderWithQuotation();
        this.bpDataService.proceedNextBpStep("buyer", "Order");
    };
    NegotiationResponseComponent.prototype.onTotalPriceChanged = function (totalPrice) {
        this.wrapper.quotationDiscountPriceWrapper.totalPrice = totalPrice;
    };
    /*
     * Getters and Setters
     */
    NegotiationResponseComponent.prototype.isLoading = function () {
        return false;
    };
    NegotiationResponseComponent.prototype.isDisabled = function () {
        return this.isLoading() || this.readonly;
    };
    NegotiationResponseComponent.prototype.getPresentationMode = function () {
        return this.isReadOnly() ? "view" : "edit";
    };
    NegotiationResponseComponent.prototype.isReadOnly = function () {
        return this.processMetadata == null || this.processMetadata.processStatus !== 'Started' || this.readonly;
    };
    NegotiationResponseComponent.prototype.isFrameContractPanelVisible = function () {
        return this.wrapper.rfqFrameContractDuration != null;
    };
    NegotiationResponseComponent.prototype.isDiscountIconVisibleInCustomerRequestColumn = function () {
        return this.wrapper.quotationDiscountPriceWrapper.appliedDiscounts.length > 0 &&
            this.wrapper.rfqTotalPriceString == this.wrapper.lineDiscountPriceWrapper.totalPriceString;
    };
    NegotiationResponseComponent.prototype.getContractEndDate = function () {
        var rangeUnit;
        switch (this.wrapper.newQuotationWrapper.frameContractDuration.unitCode) {
            case "year(s)":
                rangeUnit = 'y';
                break;
            case "month(s)":
                rangeUnit = 'M';
                break;
            case "week(s)":
                rangeUnit = 'w';
                break;
            case "day(s)":
                rangeUnit = 'd';
                break;
        }
        var m = moment().add(this.wrapper.newQuotationWrapper.frameContractDuration.value, rangeUnit);
        var date = m.format(this.dateFormat);
        return date;
    };
    NegotiationResponseComponent.prototype.isFormValid = function () {
        // TODO check other elements
        return this.isFrameContractDurationValid();
    };
    NegotiationResponseComponent.prototype.isSellerTermsVisible = function () {
        return !(this.quotation.documentStatusCode.name == 'Rejected' && this.isReadOnly());
    };
    /*
     * Internal Methods
     */
    NegotiationResponseComponent.prototype.hasUpdatedTerms = function () {
        if (!ubl_model_utils_1.UBLModelUtils.areQuantitiesEqual(this.wrapper.rfqDeliveryPeriod, this.wrapper.newQuotationWrapper.deliveryPeriod)) {
            return true;
        }
        if (this.wrapper.rfqIncoterms !== this.wrapper.newQuotationWrapper.incoterms) {
            return true;
        }
        if (this.wrapper.rfqPaymentMeans !== this.wrapper.newQuotationWrapper.paymentMeans) {
            return true;
        }
        if (this.wrapper.rfqPaymentTerms.paymentTerm !== this.wrapper.newQuotationWrapper.paymentTermsWrapper.paymentTerm) {
            return true;
        }
        if (this.wrapper.rfqDiscountPriceWrapper.totalPriceString !== this.wrapper.quotationDiscountPriceWrapper.totalPriceString) {
            return true;
        }
        if (!ubl_model_utils_1.UBLModelUtils.areQuantitiesEqual(this.wrapper.rfqWarranty, this.wrapper.newQuotationWrapper.warranty)) {
            return true;
        }
        if (!ubl_model_utils_1.UBLModelUtils.areQuantitiesEqual(this.wrapper.rfqFrameContractDuration, this.wrapper.newQuotationWrapper.frameContractDuration)) {
            return true;
        }
        if (ubl_model_utils_1.UBLModelUtils.areTermsAndConditionListsDifferent(this.wrapper.rfq.termOrCondition, this.wrapper.newQuotation.termOrCondition)) {
            return true;
        }
        return false;
    };
    NegotiationResponseComponent.prototype.isFrameContractDurationValid = function () {
        if (this.frameContract.digitalAgreementTerms.validityPeriod.durationMeasure.unitCode != null &&
            this.frameContract.digitalAgreementTerms.validityPeriod.durationMeasure.value != null) {
            return true;
        }
        return false;
    };
    NegotiationResponseComponent.prototype.openDiscountModal = function () {
        this.discountModal.open(this.wrapper.quotationDiscountPriceWrapper.appliedDiscounts, this.wrapper.quotationDiscountPriceWrapper.price.priceAmount.currencyID);
    };
    __decorate([
        core_1.Input(),
        __metadata("design:type", request_for_quotation_1.RequestForQuotation)
    ], NegotiationResponseComponent.prototype, "rfq", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", quotation_1.Quotation)
    ], NegotiationResponseComponent.prototype, "quotation", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", quotation_1.Quotation)
    ], NegotiationResponseComponent.prototype, "lastOfferQuotation", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", quotation_1.Quotation)
    ], NegotiationResponseComponent.prototype, "frameContractQuotation", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", digital_agreement_1.DigitalAgreement)
    ], NegotiationResponseComponent.prototype, "frameContract", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Array)
    ], NegotiationResponseComponent.prototype, "defaultTermsAndConditions", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", String)
    ], NegotiationResponseComponent.prototype, "primaryTermsSource", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Boolean)
    ], NegotiationResponseComponent.prototype, "readonly", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Boolean)
    ], NegotiationResponseComponent.prototype, "formerProcess", void 0);
    __decorate([
        core_1.ViewChild(discount_modal_component_1.DiscountModalComponent),
        __metadata("design:type", discount_modal_component_1.DiscountModalComponent)
    ], NegotiationResponseComponent.prototype, "discountModal", void 0);
    NegotiationResponseComponent = __decorate([
        core_1.Component({
            selector: "negotiation-response",
            templateUrl: "./negotiation-response.component.html",
            styleUrls: ["./negotiation-response.component.css"],
        }),
        __metadata("design:paramtypes", [bpe_service_1.BPEService,
            bp_data_service_1.BPDataService,
            common_1.Location,
            ng2_cookies_1.CookieService,
            router_1.Router])
    ], NegotiationResponseComponent);
    return NegotiationResponseComponent;
}());
exports.NegotiationResponseComponent = NegotiationResponseComponent;
//# sourceMappingURL=negotiation-response.component.js.map