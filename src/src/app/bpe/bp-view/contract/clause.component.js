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
var clause_1 = require("../../../catalogue/model/publish/clause");
var call_status_1 = require("../../../common/call-status");
var bpe_service_1 = require("../../bpe.service");
var document_clause_1 = require("../../../catalogue/model/publish/document-clause");
var document_service_1 = require("../document-service");
var ubl_model_utils_1 = require("../../../catalogue/model/ubl-model-utils");
var bp_data_service_1 = require("../bp-data-service");
var ClauseComponent = /** @class */ (function () {
    function ClauseComponent(bpeService, bpDataService, documentService) {
        this.bpeService = bpeService;
        this.bpDataService = bpDataService;
        this.documentService = documentService;
        this.clause = null;
        this.clauseDocument = null;
        this.clauseDocumentRetrievalStatus = new call_status_1.CallStatus();
        this.expanded = false;
        // default T&C for negotiation
        this.defaultTermsAndConditions = null;
    }
    ClauseComponent.prototype.ngOnInit = function () {
        var _this = this;
        if (this.clauseDocument == null) {
            this.clauseDocumentRetrievalStatus.submit();
            var documentClause_1 = this.clause;
            this.documentService.getDocumentJsonContent(documentClause_1.clauseDocumentRef.id).then(function (result) {
                _this.clauseDocument = result;
                if (documentClause_1.clauseDocumentRef.documentType === "ITEMINFORMATIONRESPONSE") {
                    // fetch the itm information request as well
                    _this.documentService.getItemInformationRequest(result)
                        .then(function (request) {
                        _this.itemInformationRequest = request;
                        _this.clauseDocumentRetrievalStatus.callback("Successfully retrieved item information request", true);
                    })
                        .catch(function (error) {
                        _this.clauseDocumentRetrievalStatus.error("Failed to retrieve item information request", error);
                    });
                }
                else if (documentClause_1.clauseDocumentRef.documentType === "QUOTATION") {
                    // fetch the itm information request as well
                    _this.documentService.getRequestForQuotation(result)
                        .then(function (request) {
                        _this.rfq = request;
                        // get T&C
                        _this.bpeService.getTermsAndConditions(null, ubl_model_utils_1.UBLModelUtils.getPartyId(_this.rfq.buyerCustomerParty.party), ubl_model_utils_1.UBLModelUtils.getPartyId(_this.rfq.sellerSupplierParty.party), null, _this.rfq.requestForQuotationLine[0].lineItem.deliveryTerms.incoterms, _this.bpDataService.getCompanySettings().negotiationSettings.paymentTerms[0]).then(function (defaultTermsAndConditions) {
                            _this.defaultTermsAndConditions = defaultTermsAndConditions;
                            _this.clauseDocumentRetrievalStatus.callback("Successfully retrieved request for quotation", true);
                        }).catch(function (error) {
                            _this.clauseDocumentRetrievalStatus.error("Failed to retrieve default T&C", error);
                        });
                    })
                        .catch(function (error) {
                        _this.clauseDocumentRetrievalStatus.error("Failed to retrieve request for quotation", error);
                    });
                }
                else {
                    _this.clauseDocumentRetrievalStatus.callback("Successfully retrieved clause document details", true);
                }
            }).catch(function (error) {
                _this.clauseDocumentRetrievalStatus.error("Failed to retrieve clause document details", error);
            });
        }
    };
    ClauseComponent.prototype.toggleExpanded = function () {
        this.expanded = !this.expanded;
    };
    ClauseComponent.prototype.getClauseName = function () {
        if (this.clause instanceof document_clause_1.DocumentClause) {
            switch (this.clause.clauseDocumentRef.documentType) {
                case "PPAPRESPONSE":
                    return "Ppap";
                case "ITEMINFORMATIONRESPONSE":
                    return "Request for Information";
                case "QUOTATION":
                    return "Negotiation";
                default:
                    return this.clause.clauseDocumentRef.documentType;
            }
        }
    };
    __decorate([
        core_1.Input(),
        __metadata("design:type", clause_1.Clause)
    ], ClauseComponent.prototype, "clause", void 0);
    ClauseComponent = __decorate([
        core_1.Component({
            selector: 'clause',
            templateUrl: './clause.component.html'
        }),
        __metadata("design:paramtypes", [bpe_service_1.BPEService,
            bp_data_service_1.BPDataService,
            document_service_1.DocumentService])
    ], ClauseComponent);
    return ClauseComponent;
}());
exports.ClauseComponent = ClauseComponent;
//# sourceMappingURL=clause.component.js.map