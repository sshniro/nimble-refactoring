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
var ng2_cookies_1 = require("ng2-cookies");
var user_service_1 = require("../../../user-mgmt/user.service");
var call_status_1 = require("../../../common/call-status");
var router_1 = require("@angular/router");
var common_1 = require("@angular/common");
var document_reference_1 = require("../../../catalogue/model/publish/document-reference");
var attachment_1 = require("../../../catalogue/model/publish/attachment");
var ubl_model_utils_1 = require("../../../catalogue/model/ubl-model-utils");
var customer_party_1 = require("../../../catalogue/model/publish/customer-party");
var supplier_party_1 = require("../../../catalogue/model/publish/supplier-party");
var model_utils_1 = require("../../model/model-utils");
var process_instance_input_message_1 = require("../../model/process-instance-input-message");
var utils_1 = require("../../../common/utils");
var document_service_1 = require("../document-service");
/**
 * Created by suat on 19-Nov-17.
 */
var ItemInformationRequestComponent = /** @class */ (function () {
    function ItemInformationRequestComponent(bpeService, bpDataService, userService, cookieService, location, documentService, router) {
        this.bpeService = bpeService;
        this.bpDataService = bpDataService;
        this.userService = userService;
        this.cookieService = cookieService;
        this.location = location;
        this.documentService = documentService;
        this.router = router;
        this.callStatus = new call_status_1.CallStatus();
    }
    ItemInformationRequestComponent.prototype.ngOnInit = function () {
        // get copy of ThreadEventMetadata of the current business process
        if (!this.bpDataService.bpActivityEvent.newProcess) {
            this.processMetadata = this.bpDataService.bpActivityEvent.processHistory[0];
        }
        this.request = this.bpDataService.itemInformationRequest;
        var documents = this.request.itemInformationRequestLine[0].salesItem[0].item.itemSpecificationDocumentReference;
        this.files = documents.map(function (doc) { return doc.attachment.embeddedDocumentBinaryObject; });
    };
    ItemInformationRequestComponent.prototype.onBack = function () {
        this.location.back();
    };
    ItemInformationRequestComponent.prototype.isRequestSent = function () {
        return !!this.processMetadata && !this.processMetadata.isBeingUpdated;
    };
    ItemInformationRequestComponent.prototype.getPresentationMode = function () {
        return this.isRequestSent() ? "view" : "edit";
    };
    ItemInformationRequestComponent.prototype.onSkip = function () {
        var _this = this;
        this.bpDataService.resetBpData();
        if (utils_1.isTransportService(this.bpDataService.getCatalogueLine()) || !this.bpDataService.getCompanySettings().tradeDetails.ppapCompatibilityLevel) {
            // skip ppap
            this.bpDataService.initRfq(this.bpDataService.getCompanySettings().negotiationSettings).then(function () {
                _this.bpDataService.proceedNextBpStep(_this.bpDataService.bpActivityEvent.userRole, "Negotiation");
            });
        }
        else {
            this.bpDataService.initPpap([]);
            this.bpDataService.proceedNextBpStep(this.bpDataService.bpActivityEvent.userRole, "Ppap");
        }
    };
    ItemInformationRequestComponent.prototype.onSendRequest = function () {
        var _this = this;
        this.callStatus.submit();
        var itemInformationRequest = utils_1.copy(this.bpDataService.itemInformationRequest);
        // final check on the order
        itemInformationRequest.itemInformationRequestLine[0].salesItem[0].item = this.bpDataService.modifiedCatalogueLines[0].goodsItem.item;
        ubl_model_utils_1.UBLModelUtils.removeHjidFieldsFromObject(itemInformationRequest);
        //first initialize the seller and buyer parties.
        //once they are fetched continue with starting the ordering process
        var sellerId = ubl_model_utils_1.UBLModelUtils.getPartyId(this.bpDataService.getCatalogueLine().goodsItem.item.manufacturerParty);
        var buyerId = this.cookieService.get("company_id");
        Promise.all([
            this.userService.getParty(buyerId),
            this.userService.getParty(sellerId)
        ])
            .then(function (_a) {
            var buyerParty = _a[0], sellerParty = _a[1];
            itemInformationRequest.buyerCustomerParty = new customer_party_1.CustomerParty(buyerParty);
            itemInformationRequest.sellerSupplierParty = new supplier_party_1.SupplierParty(sellerParty);
            var vars = model_utils_1.ModelUtils.createProcessVariables("Item_Information_Request", buyerId, sellerId, _this.cookieService.get("user_id"), itemInformationRequest, _this.bpDataService);
            var piim = new process_instance_input_message_1.ProcessInstanceInputMessage(vars, "");
            return _this.bpeService.startBusinessProcess(piim);
        })
            .then(function () {
            _this.callStatus.callback("Item Information Request sent", true);
            var tab = "PUCHASES";
            if (_this.bpDataService.bpActivityEvent.userRole == "seller")
                tab = "SALES";
            _this.router.navigate(['dashboard'], { queryParams: { tab: tab } });
        })
            .catch(function (error) {
            _this.callStatus.error("Failed to send Item Information Request", error);
        });
    };
    ItemInformationRequestComponent.prototype.onUpdateRequest = function () {
        var _this = this;
        this.callStatus.submit();
        var itemInformationRequest = utils_1.copy(this.bpDataService.itemInformationRequest);
        this.bpeService.updateBusinessProcess(JSON.stringify(itemInformationRequest), "ITEMINFORMATIONREQUEST", this.processMetadata.processId)
            .then(function () {
            _this.documentService.updateCachedDocument(itemInformationRequest.id, itemInformationRequest);
            _this.callStatus.callback("Item Information Request updated", true);
            var tab = "PUCHASES";
            if (_this.bpDataService.bpActivityEvent.userRole == "seller")
                tab = "SALES";
            _this.router.navigate(['dashboard'], { queryParams: { tab: tab } });
        })
            .catch(function (error) {
            _this.callStatus.error("Failed to update Item Information Request", error);
        });
    };
    ItemInformationRequestComponent.prototype.onSelectItemSpecificationFile = function (binaryObject) {
        var documents = this.getRequestDocuments();
        var document = new document_reference_1.DocumentReference();
        var attachment = new attachment_1.Attachment();
        attachment.embeddedDocumentBinaryObject = binaryObject;
        document.attachment = attachment;
        documents.push(document);
    };
    ItemInformationRequestComponent.prototype.onUnselectItemSpecificationFile = function (binaryObject) {
        var documents = this.getRequestDocuments();
        var index = documents.findIndex(function (doc) { return doc.attachment.embeddedDocumentBinaryObject === binaryObject; });
        if (index >= 0) {
            documents.splice(index, 1);
        }
    };
    ItemInformationRequestComponent.prototype.getDataSheetFileClasses = function () {
        return {
            "no-document": !this.hasUploadedDocument(),
            disabled: this.isLoading() || this.isRequestSent()
        };
    };
    ItemInformationRequestComponent.prototype.getDataSheetFileName = function () {
        var docs = this.getRequestDocuments();
        return docs.length > 0 ? docs[0].attachment.embeddedDocumentBinaryObject.fileName : "Choose a file...";
    };
    ItemInformationRequestComponent.prototype.getRequestDocuments = function () {
        return this.request.itemInformationRequestLine[0].salesItem[0].item.itemSpecificationDocumentReference;
    };
    ItemInformationRequestComponent.prototype.hasUploadedDocument = function () {
        return this.getRequestDocuments().length > 0;
    };
    ItemInformationRequestComponent.prototype.isLoading = function () {
        return this.callStatus.fb_submitted;
    };
    ItemInformationRequestComponent.prototype.isEmpty = function () {
        var empty = true;
        if (this.request.note.length > 1 || (this.request.note.length == 1 && this.request.note[0] != ""))
            empty = false;
        else if (this.request.additionalDocumentReference.length > 0)
            empty = false;
        else if (this.getRequestDocuments().length > 0)
            empty = false;
        return empty;
    };
    ItemInformationRequestComponent = __decorate([
        core_1.Component({
            selector: "item-information-request",
            templateUrl: "./item-information-request.component.html",
            styleUrls: ["./item-information-request.component.css"]
        }),
        __metadata("design:paramtypes", [bpe_service_1.BPEService,
            bp_data_service_1.BPDataService,
            user_service_1.UserService,
            ng2_cookies_1.CookieService,
            common_1.Location,
            document_service_1.DocumentService,
            router_1.Router])
    ], ItemInformationRequestComponent);
    return ItemInformationRequestComponent;
}());
exports.ItemInformationRequestComponent = ItemInformationRequestComponent;
//# sourceMappingURL=item-information-request.component.js.map