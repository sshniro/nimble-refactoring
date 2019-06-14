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
var bpe_service_1 = require("../../bpe.service");
var call_status_1 = require("../../../common/call-status");
var router_1 = require("@angular/router");
var common_1 = require("@angular/common");
var model_utils_1 = require("../../model/model-utils");
var process_instance_input_message_1 = require("../../model/process-instance-input-message");
var item_information_request_1 = require("../../../catalogue/model/publish/item-information-request");
var item_information_response_1 = require("../../../catalogue/model/publish/item-information-response");
var document_reference_1 = require("../../../catalogue/model/publish/document-reference");
var attachment_1 = require("../../../catalogue/model/publish/attachment");
var utils_1 = require("../../../common/utils");
var ng2_cookies_1 = require("ng2-cookies");
var ubl_model_utils_1 = require("../../../catalogue/model/ubl-model-utils");
var ItemInformationResponseComponent = /** @class */ (function () {
    function ItemInformationResponseComponent(bpeService, bpDataService, location, router, cookieService, route) {
        this.bpeService = bpeService;
        this.bpDataService = bpDataService;
        this.location = location;
        this.router = router;
        this.cookieService = cookieService;
        this.route = route;
        this.callStatus = new call_status_1.CallStatus();
        this.readonly = false;
        this.requestFiles = [];
        this.responseFiles = [];
        this.isLogisticsService = false;
        this.isTransportService = false;
    }
    ItemInformationResponseComponent.prototype.ngOnInit = function () {
        // get copy of ThreadEventMetadata of the current business process
        if (!this.bpDataService.bpActivityEvent.newProcess) {
            this.processMetadata = this.bpDataService.bpActivityEvent.processHistory[0];
        }
        this.isFormerStep = this.bpDataService.bpActivityEvent.formerProcess;
        if (!this.request) {
            this.request = this.bpDataService.itemInformationRequest;
        }
        if (this.request) {
            var documents = this.request.itemInformationRequestLine[0].salesItem[0].item.itemSpecificationDocumentReference;
            this.requestFiles = documents.map(function (doc) { return doc.attachment.embeddedDocumentBinaryObject; });
        }
        if (!this.response) {
            this.response = this.bpDataService.itemInformationResponse;
        }
        if (this.response) {
            this.responseFiles = this.getResponseDocuments().map(function (doc) { return doc.attachment.embeddedDocumentBinaryObject; });
        }
        this.isTransportService = utils_1.isTransportService(this.bpDataService.getCatalogueLine());
        this.isLogisticsService = utils_1.isLogisticsService(this.bpDataService.getCatalogueLine());
    };
    /*
     * Event handlers
     */
    ItemInformationResponseComponent.prototype.onBack = function () {
        this.location.back();
    };
    ItemInformationResponseComponent.prototype.onSendResponse = function () {
        var _this = this;
        var vars = model_utils_1.ModelUtils.createProcessVariables("Item_Information_Request", ubl_model_utils_1.UBLModelUtils.getPartyId(this.bpDataService.itemInformationRequest.buyerCustomerParty.party), ubl_model_utils_1.UBLModelUtils.getPartyId(this.bpDataService.itemInformationRequest.sellerSupplierParty.party), this.cookieService.get("user_id"), this.bpDataService.itemInformationResponse, this.bpDataService);
        var piim = new process_instance_input_message_1.ProcessInstanceInputMessage(vars, this.processMetadata.processId);
        this.callStatus.submit();
        this.bpeService.continueBusinessProcess(piim).then(function () {
            _this.callStatus.callback("Information Response sent", true);
            var tab = "PUCHASES";
            if (_this.bpDataService.bpActivityEvent.userRole == "seller")
                tab = "SALES";
            _this.router.navigate(['dashboard'], { queryParams: { tab: tab } });
        }).catch(function (error) {
            _this.callStatus.error("Failed to send Information Response", error);
        });
    };
    ItemInformationResponseComponent.prototype.onRestart = function () {
        this.navigateToBusinessProcess("Item_Information_Request");
    };
    ItemInformationResponseComponent.prototype.onNextStep = function () {
        if (utils_1.isTransportService(this.bpDataService.getCatalogueLine()) || !this.bpDataService.getCompanySettings().tradeDetails.ppapCompatibilityLevel) {
            this.navigateToBusinessProcess("Negotiation");
        }
        else {
            this.navigateToBusinessProcess("Ppap");
        }
    };
    ItemInformationResponseComponent.prototype.navigateToBusinessProcess = function (targetProcess) {
        this.bpDataService.resetBpData();
        this.bpDataService.proceedNextBpStep("buyer", targetProcess);
        if (targetProcess === "Item_Information_Request") {
            this.bpDataService.resetBpData();
            this.bpDataService.initItemInformationRequest();
        }
    };
    ItemInformationResponseComponent.prototype.onSelectItemSpecificationFile = function (binaryObject) {
        var document = new document_reference_1.DocumentReference();
        var attachment = new attachment_1.Attachment();
        attachment.embeddedDocumentBinaryObject = binaryObject;
        document.attachment = attachment;
        this.response.item[0].itemSpecificationDocumentReference.push(document);
    };
    ItemInformationResponseComponent.prototype.onUnselectItemSpecificationFile = function (binaryObject) {
        var index = this.response.item[0].itemSpecificationDocumentReference.findIndex(function (doc) {
            return doc.attachment.embeddedDocumentBinaryObject === binaryObject;
        });
        if (index >= 0) {
            this.response.item[0].itemSpecificationDocumentReference.splice(index, 1);
        }
    };
    /*
     * Getters
     */
    ItemInformationResponseComponent.prototype.isResponseSent = function () {
        return this.readonly ||
            (this.processMetadata
                && this.processMetadata.processStatus === "Completed");
    };
    ItemInformationResponseComponent.prototype.getPresentationMode = function () {
        return this.isResponseSent() ? "view" : "edit";
    };
    ItemInformationResponseComponent.prototype.getResponseFile = function () {
        var docs = this.getResponseDocuments();
        return docs.length > 0 ? docs[0].attachment.embeddedDocumentBinaryObject : null;
    };
    ItemInformationResponseComponent.prototype.hasResponseFile = function () {
        return this.getResponseDocuments().length > 0;
    };
    ItemInformationResponseComponent.prototype.getResponseDocuments = function () {
        return this.response.item[0].itemSpecificationDocumentReference;
    };
    ItemInformationResponseComponent.prototype.isBuyer = function () {
        return this.bpDataService.bpActivityEvent.userRole === "buyer";
    };
    ItemInformationResponseComponent.prototype.getRequestFile = function () {
        var docs = this.getRequestDocuments();
        return docs.length > 0 ? docs[0].attachment.embeddedDocumentBinaryObject : null;
    };
    ItemInformationResponseComponent.prototype.hasRequestFile = function () {
        return this.getRequestDocuments().length > 0;
    };
    ItemInformationResponseComponent.prototype.getRequestDocuments = function () {
        return this.request.itemInformationRequestLine[0].salesItem[0].item.itemSpecificationDocumentReference;
    };
    ItemInformationResponseComponent.prototype.isLoading = function () {
        return this.callStatus.fb_submitted;
    };
    __decorate([
        core_1.Input(),
        __metadata("design:type", item_information_request_1.ItemInformationRequest)
    ], ItemInformationResponseComponent.prototype, "request", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", item_information_response_1.ItemInformationResponse)
    ], ItemInformationResponseComponent.prototype, "response", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Boolean)
    ], ItemInformationResponseComponent.prototype, "readonly", void 0);
    ItemInformationResponseComponent = __decorate([
        core_1.Component({
            selector: "item-information-response",
            templateUrl: "./item-information-response.component.html",
            styleUrls: ["./item-information-response.component.css"]
        }),
        __metadata("design:paramtypes", [bpe_service_1.BPEService,
            bp_data_service_1.BPDataService,
            common_1.Location,
            router_1.Router,
            ng2_cookies_1.CookieService,
            router_1.ActivatedRoute])
    ], ItemInformationResponseComponent);
    return ItemInformationResponseComponent;
}());
exports.ItemInformationResponseComponent = ItemInformationResponseComponent;
//# sourceMappingURL=item-information-response.component.js.map