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
var router_1 = require("@angular/router");
var ppap_response_1 = require("../../../catalogue/model/publish/ppap-response");
var ppap_1 = require("../../../catalogue/model/publish/ppap");
var common_1 = require("@angular/common");
var document_service_1 = require("../document-service");
var PpapDocumentDownloadComponent = /** @class */ (function () {
    function PpapDocumentDownloadComponent(bpDataService, bpeService, route, location, documentService) {
        this.bpDataService = bpDataService;
        this.bpeService = bpeService;
        this.route = route;
        this.location = location;
        this.documentService = documentService;
        this.ppapDocuments = [];
        this.documents = {};
        this.keys = [];
        this.requestedDocuments = [];
    }
    PpapDocumentDownloadComponent.prototype.ngOnInit = function () {
        var _this = this;
        if (!this.ppapResponse) {
            this.route.queryParams.subscribe(function (params) {
                var processid = params['pid'];
                _this.bpeService.getProcessDetailsHistory(processid).then(function (task) {
                    return Promise.all([
                        _this.documentService.getInitialDocument(task),
                        _this.documentService.getResponseDocument(task)
                    ]).then(function (_a) {
                        var initialDocument = _a[0], responseDocument = _a[1];
                        _this.ppap = initialDocument;
                        _this.ppapResponse = responseDocument;
                        _this.initFromPpap();
                    });
                });
            });
        }
        else {
            if (!this.ppap) {
                throw new Error("ppap must be set if ppapResponse is set.");
            }
            this.initFromPpap();
        }
    };
    PpapDocumentDownloadComponent.prototype.initFromPpap = function () {
        this.notesBuyer = this.ppap.note;
        this.additionalDocumentsBuyer = this.ppap.additionalDocumentReference;
        this.ppapDocuments = this.ppapResponse.requestedDocument;
        for (var i = 0; i < this.ppapDocuments.length; i++) {
            if (!(this.ppapDocuments[i].documentType in this.documents)) {
                this.documents[this.ppapDocuments[i].documentType] = [
                    this.ppapDocuments[i].attachment.embeddedDocumentBinaryObject
                ];
            }
            else {
                this.documents[this.ppapDocuments[i].documentType].push(this.ppapDocuments[i].attachment.embeddedDocumentBinaryObject);
            }
        }
        this.notes = this.ppapResponse.note;
        this.additionalDocuments = this.ppapResponse.additionalDocumentReference;
        this.keys = Object.keys(this.documents);
        this.requestedDocuments = this.ppap.documentType;
    };
    PpapDocumentDownloadComponent.prototype.isBuyer = function () {
        return this.bpDataService.bpActivityEvent.userRole === "buyer";
    };
    PpapDocumentDownloadComponent.prototype.onBack = function () {
        this.location.back();
    };
    PpapDocumentDownloadComponent.prototype.onNextStep = function () {
        var _this = this;
        this.bpDataService.resetBpData();
        this.bpDataService.initRfq(null).then(function () {
            _this.bpDataService.proceedNextBpStep(_this.bpDataService.bpActivityEvent.userRole, "Negotiation");
        });
    };
    PpapDocumentDownloadComponent.prototype.downloadFile = function (key) {
        var binaryObjects = this.documents[key];
        for (var j = 0; j < binaryObjects.length; j++) {
            var binaryString = window.atob(binaryObjects[j].value);
            var binaryLen = binaryString.length;
            var bytes = new Uint8Array(binaryLen);
            for (var i = 0; i < binaryLen; i++) {
                bytes[i] = binaryString.charCodeAt(i);
            }
            var a = document.createElement("a");
            document.body.appendChild(a);
            var blob = new Blob([bytes], { type: binaryObjects[j].mimeCode });
            var url = window.URL.createObjectURL(blob);
            a.href = url;
            a.download = binaryObjects[j].fileName;
            a.click();
            window.URL.revokeObjectURL(url);
        }
    };
    __decorate([
        core_1.Input(),
        __metadata("design:type", Boolean)
    ], PpapDocumentDownloadComponent.prototype, "formerProcess", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", ppap_response_1.PpapResponse)
    ], PpapDocumentDownloadComponent.prototype, "ppapResponse", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", ppap_1.Ppap)
    ], PpapDocumentDownloadComponent.prototype, "ppap", void 0);
    PpapDocumentDownloadComponent = __decorate([
        core_1.Component({
            selector: "ppap-document-download",
            templateUrl: "./ppap-document-download.component.html",
            styleUrls: ["./ppap-document-download.component.css"]
        }),
        __metadata("design:paramtypes", [bp_data_service_1.BPDataService,
            bpe_service_1.BPEService,
            router_1.ActivatedRoute,
            common_1.Location,
            document_service_1.DocumentService])
    ], PpapDocumentDownloadComponent);
    return PpapDocumentDownloadComponent;
}());
exports.PpapDocumentDownloadComponent = PpapDocumentDownloadComponent;
//# sourceMappingURL=ppap-document-download.component.js.map