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
var bpe_service_1 = require("../../bpe.service");
var user_service_1 = require("../../../user-mgmt/user.service");
var ng2_cookies_1 = require("ng2-cookies");
var bp_data_service_1 = require("../bp-data-service");
var customer_party_1 = require("../../../catalogue/model/publish/customer-party");
var supplier_party_1 = require("../../../catalogue/model/publish/supplier-party");
var ubl_model_utils_1 = require("../../../catalogue/model/ubl-model-utils");
var model_utils_1 = require("../../model/model-utils");
var process_instance_input_message_1 = require("../../model/process-instance-input-message");
var call_status_1 = require("../../../common/call-status");
var router_1 = require("@angular/router");
var common_1 = require("@angular/common");
var utils_1 = require("../../../common/utils");
var document_service_1 = require("../document-service");
var PpapDocumentSelectComponent = /** @class */ (function () {
    function PpapDocumentSelectComponent(bpeService, bpDataService, userService, cookieService, route, router, documentService, location) {
        this.bpeService = bpeService;
        this.bpDataService = bpDataService;
        this.userService = userService;
        this.cookieService = cookieService;
        this.route = route;
        this.router = router;
        this.documentService = documentService;
        this.location = location;
        this.callStatus = new call_status_1.CallStatus();
        /** The ppap level ,goes from 0 (level 1) to 4 (level 5). */
        this.level = 0;
        /** All available Ppap documents and if they should be checked for each level. */
        this.DOCUMENTS = [
            { name: "Design Documentation", levels: [false, true, true, true, true] },
            { name: "Engineering Change Documentation", levels: [false, true, true, true, true] },
            { name: "Customer Engineering Approval", levels: [false, false, true, false, true] },
            { name: "Design Failure Mode and Effects Analysis", levels: [false, false, true, false, true] },
            { name: "Process Flow Diagram", levels: [false, false, true, false, true] },
            { name: "Process Failure Mode and Effects Analysis", levels: [false, false, true, false, true] },
            { name: "Control Plan", levels: [false, false, true, false, true] },
            { name: "Measurement System Analysis Studies", levels: [false, false, true, false, true] },
            { name: "Dimensional Results", levels: [false, true, true, true, true] },
            { name: "Records of Material / Performance Tests", levels: [false, true, true, true, true] },
            { name: "Initial Process Studies", levels: [false, false, true, false, true] },
            { name: "Qualified Laboratory Documentation", levels: [false, true, true, true, true] },
            { name: "Appearance Approval Report", levels: [true, true, true, true, true] },
            { name: "Sample Production Parts", levels: [false, true, true, true, true] },
            { name: "Master Sample", levels: [false, false, false, true, true] },
            { name: "Checking Aids", levels: [false, false, false, true, true] },
            { name: "Customer Specific Requirements", levels: [false, false, false, true, false] },
            { name: "Part Submission Warrant", levels: [true, true, true, true, true] }
        ];
        /** The note. */
        this.notes = [''];
        /** The currently selected additional documents*/
        this.additionalDocuments = [];
        /** Whether the definition of PPAP is visible or not. */
        this.showDetails = false;
    }
    PpapDocumentSelectComponent.prototype.ngOnInit = function () {
        var _this = this;
        // get copy of ThreadEventMetadata of the current business process
        if (!this.bpDataService.bpActivityEvent.newProcess) {
            this.processMetadata = this.bpDataService.bpActivityEvent.processHistory[0];
        }
        this.computeSelectedDocuments();
        this.route.queryParams.subscribe(function (params) {
            if (params["pid"] && _this.processMetadata) {
                _this.level = 0;
                _this.resetSelectedDocumens();
                _this.ppap = _this.bpDataService.ppap;
                _this.notes = _this.ppap.note;
                _this.additionalDocuments = _this.ppap.additionalDocumentReference;
                _this.ppap.documentType.forEach(function (name) {
                    var index = _this.DOCUMENTS.findIndex(function (doc) { return doc.name === name; });
                    if (index >= 0) {
                        _this.selectedDocuments[index] = true;
                    }
                });
            }
        });
    };
    PpapDocumentSelectComponent.prototype.isRequestSent = function () {
        return !!this.processMetadata && !this.processMetadata.isBeingUpdated;
    };
    PpapDocumentSelectComponent.prototype.isLoading = function () {
        return this.callStatus.fb_submitted;
    };
    PpapDocumentSelectComponent.prototype.areAllDocumentsAvailable = function () {
        for (var i = 0; i < this.selectedDocuments.length; i++) {
            if (this.selectedDocuments[i]) {
                var name_1 = this.DOCUMENTS[i].name;
                if (!this.isDocumentAvailable(name_1)) {
                    return false;
                }
            }
        }
        return true;
    };
    PpapDocumentSelectComponent.prototype.isDocumentAvailable = function (name) {
        return !!this.getCertificate(name);
    };
    PpapDocumentSelectComponent.prototype.onDownload = function (name) {
        var certificate = this.getCertificate(name);
        if (!certificate) {
            return;
        }
        this.userService.downloadCert(certificate.id);
    };
    PpapDocumentSelectComponent.prototype.getCertificate = function (name) {
        var settings = this.bpDataService.getCompanySettings();
        for (var _i = 0, _a = settings.certificates; _i < _a.length; _i++) {
            var certificate = _a[_i];
            if (certificate.type === name) {
                return certificate;
            }
        }
        return null;
    };
    PpapDocumentSelectComponent.prototype.onBack = function () {
        this.location.back();
    };
    PpapDocumentSelectComponent.prototype.onSkip = function () {
        var _this = this;
        this.bpDataService.resetBpData();
        this.bpDataService.initRfq(this.bpDataService.getCompanySettings().negotiationSettings).then(function () {
            _this.bpDataService.proceedNextBpStep(_this.bpDataService.bpActivityEvent.userRole, "Negotiation");
        });
    };
    PpapDocumentSelectComponent.prototype.onSendRequest = function () {
        var _this = this;
        this.ppap = ubl_model_utils_1.UBLModelUtils.createPpap([]);
        this.ppap.note = this.notes;
        this.ppap.additionalDocumentReference = this.additionalDocuments;
        this.ppap.documentType = this.DOCUMENTS.filter(function (_, i) { return _this.selectedDocuments[i]; }).map(function (doc) { return doc.name; });
        this.ppap.lineItem.item = utils_1.copy(this.bpDataService.modifiedCatalogueLines[0].goodsItem.item);
        ubl_model_utils_1.UBLModelUtils.removeHjidFieldsFromObject(this.ppap);
        var sellerId = ubl_model_utils_1.UBLModelUtils.getPartyId(this.bpDataService.getCatalogueLine().goodsItem.item.manufacturerParty);
        var buyerId = this.cookieService.get("company_id");
        this.callStatus.submit();
        this.userService.getParty(buyerId).then(function (buyerParty) {
            _this.ppap.buyerCustomerParty = new customer_party_1.CustomerParty(buyerParty);
            _this.userService.getParty(sellerId).then(function (sellerParty) {
                _this.ppap.sellerSupplierParty = new supplier_party_1.SupplierParty(sellerParty);
                var vars = model_utils_1.ModelUtils.createProcessVariables("Ppap", buyerId, sellerId, _this.cookieService.get("user_id"), _this.ppap, _this.bpDataService);
                var piim = new process_instance_input_message_1.ProcessInstanceInputMessage(vars, "");
                _this.bpeService
                    .startBusinessProcess(piim)
                    .then(function () {
                    _this.callStatus.callback("Ppap request sent", true);
                    _this.router.navigate(["dashboard"]);
                })
                    .catch(function (error) {
                    _this.callStatus.error("Failed to send Ppap request", error);
                });
            })
                .catch(function (error) {
                _this.callStatus.error("Failed to send Ppap request", error);
            });
        })
            .catch(function (error) {
            _this.callStatus.error("Failed to send Ppap request", error);
        });
    };
    PpapDocumentSelectComponent.prototype.onUpdateRequest = function () {
        var _this = this;
        this.callStatus.submit();
        var ppap = utils_1.copy(this.bpDataService.ppap);
        ppap.note = this.notes;
        ppap.additionalDocumentReference = this.additionalDocuments;
        ppap.documentType = this.DOCUMENTS.filter(function (_, i) { return _this.selectedDocuments[i]; }).map(function (doc) { return doc.name; });
        this.bpeService.updateBusinessProcess(JSON.stringify(ppap), "PPAPREQUEST", this.processMetadata.processId)
            .then(function () {
            _this.documentService.updateCachedDocument(ppap.id, ppap);
            _this.callStatus.callback("Ppap request updated", true);
            var tab = "PUCHASES";
            if (_this.bpDataService.bpActivityEvent.userRole == "seller")
                tab = "SALES";
            _this.router.navigate(['dashboard'], { queryParams: { tab: tab } });
        })
            .catch(function (error) {
            _this.callStatus.error("Failed to update Ppap request", error);
        });
    };
    PpapDocumentSelectComponent.prototype.resetSelectedDocumens = function () {
        this.selectedDocuments = this.DOCUMENTS.map(function () { return false; });
    };
    PpapDocumentSelectComponent.prototype.computeSelectedDocuments = function () {
        var _this = this;
        this.selectedDocuments = this.DOCUMENTS.map(function (doc) { return doc.levels[_this.level]; });
    };
    __decorate([
        core_1.Input(),
        __metadata("design:type", Boolean)
    ], PpapDocumentSelectComponent.prototype, "formerProcess", void 0);
    PpapDocumentSelectComponent = __decorate([
        core_1.Component({
            selector: "ppap-document-select",
            templateUrl: "./ppap-document-select.component.html",
            styleUrls: ["./ppap-document-select.component.css"]
        }),
        __metadata("design:paramtypes", [bpe_service_1.BPEService,
            bp_data_service_1.BPDataService,
            user_service_1.UserService,
            ng2_cookies_1.CookieService,
            router_1.ActivatedRoute,
            router_1.Router,
            document_service_1.DocumentService,
            common_1.Location])
    ], PpapDocumentSelectComponent);
    return PpapDocumentSelectComponent;
}());
exports.PpapDocumentSelectComponent = PpapDocumentSelectComponent;
//# sourceMappingURL=ppap-document-select.component.js.map