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
var process_instance_input_message_1 = require("../../model/process-instance-input-message");
var model_utils_1 = require("../../model/model-utils");
var call_status_1 = require("../../../common/call-status");
var router_1 = require("@angular/router");
var ubl_model_utils_1 = require("../../../catalogue/model/ubl-model-utils");
var document_reference_1 = require("../../../catalogue/model/publish/document-reference");
var attachment_1 = require("../../../catalogue/model/publish/attachment");
var common_1 = require("@angular/common");
var document_service_1 = require("../document-service");
var ng2_cookies_1 = require("ng2-cookies");
var PpapDocumentUploadComponent = /** @class */ (function () {
    function PpapDocumentUploadComponent(bpDataService, bpeService, route, router, location, cookieService, documentService) {
        this.bpDataService = bpDataService;
        this.bpeService = bpeService;
        this.route = route;
        this.router = router;
        this.location = location;
        this.cookieService = cookieService;
        this.documentService = documentService;
        this.documents = [];
        this.ppapResponse = null;
        this.ppapDocuments = [];
        this.notesToSend = [''];
        this.additionalDocumentsToSend = [];
        this.binaryObjects = [];
        this.callStatus = new call_status_1.CallStatus();
        // check whether 'Send Response' button is clicked
        this.submitted = false;
    }
    PpapDocumentUploadComponent.prototype.ngOnInit = function () {
        var _this = this;
        // get copy of ThreadEventMetadata of the current business process
        if (!this.bpDataService.bpActivityEvent.newProcess) {
            this.processMetadata = this.bpDataService.bpActivityEvent.processHistory[0];
        }
        this.route.queryParams.subscribe(function (params) {
            _this.processid = params['pid'];
            _this.bpeService.getProcessDetailsHistory(_this.processid).then(function (task) {
                _this.documentService.getInitialDocument(task).then(function (initialDocument) {
                    _this.ppap = initialDocument;
                    var i = 0;
                    _this.documents = [];
                    for (; i < _this.ppap.documentType.length; i++) {
                        _this.documents.push(_this.ppap.documentType[i]);
                    }
                    _this.notes = _this.ppap.note;
                    _this.additionalDocuments = _this.ppap.additionalDocumentReference;
                });
            });
        });
    };
    PpapDocumentUploadComponent.prototype.onSelectFile = function (documentName, binaryObject) {
        var document = this.binaryObjects.find(function (obj) { return obj.documentName === documentName; });
        if (!document) {
            document = { documentName: documentName, documents: [] };
            this.binaryObjects.push(document);
        }
        document.documents.push(binaryObject);
    };
    PpapDocumentUploadComponent.prototype.onClearFile = function (documentName, binaryObject) {
        var document = this.binaryObjects.find(function (obj) { return obj.documentName === documentName; });
        if (!document) {
            return;
        }
        var index = document.documents.indexOf(binaryObject);
        if (index >= 0) {
            document.documents.splice(index, 1);
        }
    };
    PpapDocumentUploadComponent.prototype.onBack = function () {
        this.location.back();
    };
    PpapDocumentUploadComponent.prototype.isSent = function (document) {
        for (var i = 0; i < this.binaryObjects.length; i++) {
            if (document === this.binaryObjects[i].documentName) {
                return true;
            }
        }
        return false;
    };
    PpapDocumentUploadComponent.prototype.isLoading = function () {
        return this.callStatus.fb_submitted;
    };
    PpapDocumentUploadComponent.prototype.responseToPpapRequest = function (acceptedIndicator) {
        var _this = this;
        this.submitted = true;
        for (var i = 0; i < this.binaryObjects.length; i++) {
            for (var j = 0; j < this.binaryObjects[i].documents.length; j++) {
                var attachment = new attachment_1.Attachment(this.binaryObjects[i].documents[j]);
                var documentRef = new document_reference_1.DocumentReference(ubl_model_utils_1.UBLModelUtils.generateUUID(), this.binaryObjects[i].documentName, attachment);
                this.ppapDocuments.push(documentRef);
            }
        }
        this.ppapResponse = ubl_model_utils_1.UBLModelUtils.createPpapResponse(this.ppap, acceptedIndicator);
        if (this.ppapDocuments.length == 0) {
            this.ppapResponse.requestedDocument = [];
        }
        else {
            this.ppapResponse.requestedDocument = this.ppapDocuments;
        }
        this.ppapResponse.note = this.notesToSend;
        this.ppapResponse.additionalDocumentReference = this.additionalDocumentsToSend;
        var vars = model_utils_1.ModelUtils.createProcessVariables("Ppap", ubl_model_utils_1.UBLModelUtils.getPartyId(this.ppap.buyerCustomerParty.party), ubl_model_utils_1.UBLModelUtils.getPartyId(this.ppap.sellerSupplierParty.party), this.cookieService.get("user_id"), this.ppapResponse, this.bpDataService);
        var piim = new process_instance_input_message_1.ProcessInstanceInputMessage(vars, this.processMetadata.processId);
        this.callStatus.submit();
        this.bpeService.continueBusinessProcess(piim).then(function (res) {
            _this.callStatus.callback("Ppap Response placed", true);
            var tab = "PUCHASES";
            if (_this.bpDataService.bpActivityEvent.userRole == "seller")
                tab = "SALES";
            _this.router.navigate(['dashboard'], { queryParams: { tab: tab } });
        }).catch(function (error) {
            _this.submitted = false;
            (function (error) { return _this.callStatus.error("Failed to send Ppap Response", error); });
        });
    };
    __decorate([
        core_1.Input(),
        __metadata("design:type", Boolean)
    ], PpapDocumentUploadComponent.prototype, "formerProcess", void 0);
    PpapDocumentUploadComponent = __decorate([
        core_1.Component({
            selector: "ppap-document-upload",
            templateUrl: "./ppap-document-upload.component.html",
            styleUrls: ["./ppap-document-upload.component.css"]
        }),
        __metadata("design:paramtypes", [bp_data_service_1.BPDataService,
            bpe_service_1.BPEService,
            router_1.ActivatedRoute,
            router_1.Router,
            common_1.Location,
            ng2_cookies_1.CookieService,
            document_service_1.DocumentService])
    ], PpapDocumentUploadComponent);
    return PpapDocumentUploadComponent;
}());
exports.PpapDocumentUploadComponent = PpapDocumentUploadComponent;
//# sourceMappingURL=ppap-document-upload.component.js.map