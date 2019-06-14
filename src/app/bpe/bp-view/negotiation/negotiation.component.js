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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var bp_data_service_1 = require("../bp-data-service");
var call_status_1 = require("../../../common/call-status");
var document_service_1 = require("../document-service");
var ubl_model_utils_1 = require("../../../catalogue/model/ubl-model-utils");
var router_1 = require("@angular/router");
var bpe_service_1 = require("../../bpe.service");
var ng2_cookies_1 = require("ng2-cookies");
var NegotiationComponent = /** @class */ (function () {
    function NegotiationComponent(bpDataService, bpeService, documentService, cookieService, route) {
        this.bpDataService = bpDataService;
        this.bpeService = bpeService;
        this.documentService = documentService;
        this.cookieService = cookieService;
        this.route = route;
        this.initCallStatus = new call_status_1.CallStatus();
        this.negotiationDocumentsCallStatus = new call_status_1.CallStatus();
        this.lastOfferCalStatus = new call_status_1.CallStatus();
        this.frameContractAndTermsCallStatus = new call_status_1.CallStatus();
        this.primaryTermsSource = null;
        this.negotiationProcessList = [];
        this.negotiationDocuments = [];
        this.formerProcess = false; // true indicates that the last step of the history IS NOT negotiation
        this.sliderIndex = -1;
    }
    NegotiationComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.route.queryParams.subscribe(function (params) {
            _this.primaryTermsSource = params["termsSource"];
        });
        // subscribe to the bp change event so that we can update negotiation history when a new negotiation process is initialized with a negotiation response
        // in this case, the view is not refreshed but we have add a new negotiation history element for the new process, otherwise we lose the last history item
        this.bpActivityEventSubs = this.bpDataService.bpActivityEventObservable.subscribe(function (bpActivityEvent) {
            if (bpActivityEvent) {
                if (bpActivityEvent.processType == 'Negotiation' &&
                    bpActivityEvent.newProcess &&
                    _this.isLastStepNegotiation(bpActivityEvent)) {
                    _this.formerProcess = false;
                    _this.initializeLastOffer();
                    _this.initializeNegotiationHistory();
                }
            }
        });
        if (this.bpDataService.requestForQuotation == null) {
            this.initCallStatus.submit();
            this.bpDataService.initRfq(this.bpDataService.getCompanySettings().negotiationSettings)
                .then(function () {
                _this.initCallStatus.callback("Request for Quotation Initialized.", true);
            })
                .catch(function (error) {
                _this.initCallStatus.error("Error while initializing request for quotation.", error);
            });
        }
        this.initializeLastOffer();
        this.initialDefaultTermsAndConditionsAndFrameContract();
        this.initializeNegotiationHistory();
    };
    NegotiationComponent.prototype.ngOnDestroy = function () {
        this.bpActivityEventSubs.unsubscribe();
    };
    /**
     * Initializing methods
     */
    NegotiationComponent.prototype.initialDefaultTermsAndConditionsAndFrameContract = function () {
        return __awaiter(this, void 0, void 0, function () {
            var buyerPartyId, _a, termsAndConditions, frameContract, frameContractQuotationPromise, _b;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        if (this.bpDataService.bpActivityEvent.userRole === 'buyer') {
                            buyerPartyId = this.cookieService.get("company_id");
                        }
                        else {
                            // for sellers rfq should include buyer supplier party
                            buyerPartyId = ubl_model_utils_1.UBLModelUtils.getPartyId(this.bpDataService.requestForQuotation.buyerCustomerParty.party);
                        }
                        // retrieve default terms and conditions and frame contract
                        this.frameContractAndTermsCallStatus.submit();
                        return [4 /*yield*/, Promise.all([
                                this.bpeService.getTermsAndConditions(null, buyerPartyId, ubl_model_utils_1.UBLModelUtils.getPartyId(this.bpDataService.getCatalogueLine().goodsItem.item.manufacturerParty), null, this.bpDataService.getCatalogueLine().goodsItem.deliveryTerms.incoterms, this.bpDataService.getCompanySettings().negotiationSettings.paymentTerms[0]),
                                // retrieve frame contract
                                this.bpeService.getFrameContract(ubl_model_utils_1.UBLModelUtils.getPartyId(this.bpDataService.getCatalogueLine().goodsItem.item.manufacturerParty), buyerPartyId, this.bpDataService.requestForQuotation.requestForQuotationLine[0].lineItem.item.manufacturersItemIdentification.id)
                            ])];
                    case 1:
                        _a = _c.sent(), termsAndConditions = _a[0], frameContract = _a[1];
                        this.defaultTermsAndConditions = termsAndConditions;
                        this.frameContract = frameContract;
                        frameContractQuotationPromise = Promise.resolve(null);
                        if (frameContract != null) {
                            // load the quotation associated to the frame contract
                            frameContractQuotationPromise = this.documentService.getDocumentJsonContent(this.frameContract.quotationReference.id);
                        }
                        // retrieve the corresponding documents for the frame contract and last offer
                        _b = this;
                        return [4 /*yield*/, frameContractQuotationPromise];
                    case 2:
                        // retrieve the corresponding documents for the frame contract and last offer
                        _b.frameContractQuotation = _c.sent();
                        if (this.frameContractQuotation != null) {
                            // this check is required to prevent override the value passed via the route subscription
                            if (this.primaryTermsSource == null) {
                                this.primaryTermsSource = 'frame_contract';
                            }
                        }
                        this.frameContractAndTermsCallStatus.callback(null, true);
                        return [2 /*return*/, null];
                }
            });
        });
    };
    NegotiationComponent.prototype.initializeLastOffer = function () {
        return __awaiter(this, void 0, void 0, function () {
            var responseDocument, _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        this.lastOfferCalStatus.submit();
                        responseDocument = this.getLastOfferQuotationPromise();
                        _a = this;
                        return [4 /*yield*/, responseDocument];
                    case 1:
                        _a.lastOfferQuotation = _b.sent();
                        if (this.lastOfferQuotation != null) {
                            this.primaryTermsSource = 'last_offer';
                        }
                        this.lastOfferCalStatus.callback(null, true);
                        return [2 /*return*/, null];
                }
            });
        });
    };
    NegotiationComponent.prototype.getLastOfferQuotationPromise = function () {
        var responseDocument = Promise.resolve(null);
        if (this.isLastStepNegotiation(this.bpDataService.bpActivityEvent)) {
            var checkIndex = 0;
            // if the process is not new, then the previous step is in the 1st index i.e. [1]
            if (!this.bpDataService.bpActivityEvent.newProcess) {
                checkIndex = 1;
            }
            responseDocument = this.documentService.getResponseDocument(this.bpDataService.bpActivityEvent.processHistory[checkIndex].activityVariables);
        }
        return responseDocument;
    };
    NegotiationComponent.prototype.initializeNegotiationHistory = function () {
        this.newProcess = this.bpDataService.bpActivityEvent.newProcess;
        this.negotiationProcessList = [];
        var history = this.bpDataService.bpActivityEvent.processHistory;
        if (history && history.length > 0) {
            for (var _i = 0, history_1 = history; _i < history_1.length; _i++) {
                var processMetadata = history_1[_i];
                if (processMetadata.processType == 'Negotiation') {
                    this.negotiationProcessList.push(processMetadata);
                }
            }
            // check the last step of the history to set the formerProcess parameter
            if (history[0].processType != 'Negotiation') {
                this.formerProcess = true;
            }
            // reverse the list so that the most recent item will be at the end
            this.negotiationProcessList = this.negotiationProcessList.reverse();
        }
        // if this is a new process, put an empty object
        // just to have a correct number of elements in the negotiationProcessList array
        if (this.newProcess) {
            this.negotiationProcessList.push(null);
        }
        this.sliderIndex = this.negotiationProcessList.length - 1;
        this.fetchHistoryDocuments();
    };
    NegotiationComponent.prototype.fetchHistoryDocuments = function () {
        var _this = this;
        // check there are entries in the history
        if (this.negotiationProcessList.length <= 1) {
            return;
        }
        this.negotiationDocumentsCallStatus.submit();
        this.negotiationDocuments = [];
        var documentPromises = [];
        // the documents for the last step is already available via the BpDataService
        for (var i = 0; i < this.negotiationProcessList.length - 1; i++) {
            documentPromises.push(this.documentService.getInitialDocument(this.negotiationProcessList[i].activityVariables));
            documentPromises.push(this.documentService.getResponseDocument(this.negotiationProcessList[i].activityVariables));
        }
        Promise.all(documentPromises).then(function (responseArray) {
            for (var i = 0; i < responseArray.length; i++) {
                var documents = {};
                documents.request = responseArray[i];
                i++;
                documents.response = responseArray[i];
                _this.negotiationDocuments.push(documents);
            }
            _this.negotiationDocumentsCallStatus.callback(null, true);
        }).catch(function (error) {
            _this.negotiationDocumentsCallStatus.error("Failed to get previous negotiation documents", error);
        });
    };
    NegotiationComponent.prototype.isLoading = function () {
        return this.initCallStatus.fb_submitted;
    };
    /**
     * Template getters
     */
    NegotiationComponent.prototype.getPrimaryTermsSource = function (lastOfferQuotation) {
        var termsSource = this.primaryTermsSource;
        if (termsSource == null) {
            if (this.frameContract != null) {
                termsSource = 'frame_contract';
            }
            else {
                termsSource = 'product_defaults';
            }
        }
        else if (termsSource == 'last_offer' || termsSource == 'frame_contract') {
            if (lastOfferQuotation == null) {
                if (this.frameContract != null) {
                    termsSource = 'frame_contract';
                }
                else {
                    termsSource = 'product_defaults';
                }
            }
        }
        return termsSource;
    };
    /**
     * Internal methods
     */
    NegotiationComponent.prototype.isLastStepNegotiation = function (bpActivityEvent) {
        var checkIndex = 0;
        // if the event is emitted for an existing process, the history contains entry for that process
        // in such a case, we should check the soonest step which is available in the 1st index
        if (!bpActivityEvent.newProcess) {
            checkIndex = 1;
        }
        if (bpActivityEvent.processHistory.length > checkIndex &&
            bpActivityEvent.processHistory[checkIndex].processType == 'Negotiation') {
            return true;
        }
        return false;
    };
    NegotiationComponent = __decorate([
        core_1.Component({
            selector: 'negotiation',
            templateUrl: './negotiation.component.html'
        }),
        __metadata("design:paramtypes", [bp_data_service_1.BPDataService,
            bpe_service_1.BPEService,
            document_service_1.DocumentService,
            ng2_cookies_1.CookieService,
            router_1.ActivatedRoute])
    ], NegotiationComponent);
    return NegotiationComponent;
}());
exports.NegotiationComponent = NegotiationComponent;
//# sourceMappingURL=negotiation.component.js.map