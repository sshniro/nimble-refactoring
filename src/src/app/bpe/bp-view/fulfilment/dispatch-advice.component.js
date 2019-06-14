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
var bpe_service_1 = require("../../bpe.service");
var process_instance_input_message_1 = require("../../model/process-instance-input-message");
var ubl_model_utils_1 = require("../../../catalogue/model/ubl-model-utils");
var model_utils_1 = require("../../model/model-utils");
var bp_data_service_1 = require("../bp-data-service");
var call_status_1 = require("../../../common/call-status");
var router_1 = require("@angular/router");
var utils_1 = require("../../../common/utils");
var common_1 = require("@angular/common");
var activity_variable_parser_1 = require("../activity-variable-parser");
var quantity_1 = require("../../../catalogue/model/publish/quantity");
var document_service_1 = require("../document-service");
var ng2_cookies_1 = require("ng2-cookies");
var DispatchAdviceComponent = /** @class */ (function () {
    function DispatchAdviceComponent(bpeService, bpDataService, location, router, cookieService, documentService) {
        this.bpeService = bpeService;
        this.bpDataService = bpDataService;
        this.location = location;
        this.router = router;
        this.cookieService = cookieService;
        this.documentService = documentService;
        this.callStatus = new call_status_1.CallStatus();
        this.initiatingDispatchAdvice = new call_status_1.CallStatus();
    }
    DispatchAdviceComponent.prototype.ngOnInit = function () {
        // get copy of ThreadEventMetadata of the current business process
        if (!this.bpDataService.bpActivityEvent.newProcess) {
            this.processMetadata = this.bpDataService.bpActivityEvent.processHistory[0];
        }
        if (this.bpDataService.despatchAdvice == null) {
            this.initDispatchAdvice();
        }
        else {
            this.dispatchAdvice = this.bpDataService.despatchAdvice;
        }
    };
    DispatchAdviceComponent.prototype.initDispatchAdvice = function () {
        return __awaiter(this, void 0, void 0, function () {
            var processInstanceGroup, details, _i, _a, id, _b, _c, tepExists, negoExists, catalogueDocRef, manuItemId, handlingInst, carrierName, carrierContact, endDate, deliveredQuantity, _d, details_1, processDetails, processType, initialDoc, response, res, tep, res, nego;
            return __generator(this, function (_e) {
                switch (_e.label) {
                    case 0:
                        this.initiatingDispatchAdvice.submit();
                        return [4 /*yield*/, this.bpeService.getProcessInstanceGroup(this.bpDataService.bpActivityEvent.containerGroupId)];
                    case 1:
                        processInstanceGroup = _e.sent();
                        details = [];
                        _i = 0, _a = processInstanceGroup.processInstanceIDs;
                        _e.label = 2;
                    case 2:
                        if (!(_i < _a.length)) return [3 /*break*/, 5];
                        id = _a[_i];
                        _c = (_b = details).push;
                        return [4 /*yield*/, Promise.all([
                                this.bpeService.getLastActivityForProcessInstance(id),
                                this.bpeService.getProcessDetailsHistory(id)
                            ])];
                    case 3:
                        _c.apply(_b, [_e.sent()]);
                        _e.label = 4;
                    case 4:
                        _i++;
                        return [3 /*break*/, 2];
                    case 5:
                        details = details.sort(function (a, b) {
                            var a_comp = a[0].startTime;
                            var b_comp = b[0].startTime;
                            return b_comp.localeCompare(a_comp);
                        });
                        tepExists = false;
                        negoExists = false;
                        catalogueDocRef = "";
                        manuItemId = "";
                        handlingInst = null;
                        carrierName = null;
                        carrierContact = null;
                        endDate = null;
                        deliveredQuantity = new quantity_1.Quantity();
                        _d = 0, details_1 = details;
                        _e.label = 6;
                    case 6:
                        if (!(_d < details_1.length)) return [3 /*break*/, 10];
                        processDetails = details_1[_d];
                        processType = activity_variable_parser_1.ActivityVariableParser.getProcessType(processDetails[1]);
                        return [4 /*yield*/, this.documentService.getInitialDocument(processDetails[1])];
                    case 7:
                        initialDoc = _e.sent();
                        return [4 /*yield*/, this.documentService.getResponseDocument(processDetails[1])];
                    case 8:
                        response = _e.sent();
                        if (!tepExists && processType == "Transport_Execution_Plan") {
                            res = response;
                            if (res.documentStatusCode.name == "Accepted") {
                                tepExists = true;
                                tep = initialDoc;
                                if (tep.consignment[0].consolidatedShipment[0].handlingInstructions.length > 0) {
                                    handlingInst = tep.consignment[0].consolidatedShipment[0].handlingInstructions[0];
                                }
                                carrierName = ubl_model_utils_1.UBLModelUtils.getPartyDisplayName(tep.transportServiceProviderParty);
                                endDate = tep.serviceStartTimePeriod.endDate;
                                if (tep.transportServiceProviderParty.contact) {
                                    carrierContact = tep.transportServiceProviderParty.contact.telephone;
                                }
                                catalogueDocRef = tep.mainTransportationService.catalogueDocumentReference.id;
                                manuItemId = tep.mainTransportationService.manufacturersItemIdentification.id;
                            }
                        }
                        if (!negoExists && processType == "Negotiation") {
                            res = response;
                            nego = initialDoc;
                            // check whether this negotiation is correct one or not
                            if (res.documentStatusCode.name == "Accepted" &&
                                nego.requestForQuotationLine[0].lineItem.item.manufacturersItemIdentification.id == manuItemId &&
                                nego.requestForQuotationLine[0].lineItem.item.catalogueDocumentReference.id == catalogueDocRef) {
                                negoExists = true;
                                deliveredQuantity.value = nego.requestForQuotationLine[0].lineItem.delivery[0].shipment.totalTransportHandlingUnitQuantity.value;
                                deliveredQuantity.unitCode = nego.requestForQuotationLine[0].lineItem.delivery[0].shipment.totalTransportHandlingUnitQuantity.unitCode;
                            }
                        }
                        if (tepExists && negoExists) {
                            return [3 /*break*/, 10];
                        }
                        _e.label = 9;
                    case 9:
                        _d++;
                        return [3 /*break*/, 6];
                    case 10:
                        this.bpDataService.initDispatchAdvice(handlingInst, carrierName, carrierContact, deliveredQuantity, endDate);
                        this.dispatchAdvice = this.bpDataService.despatchAdvice;
                        this.initiatingDispatchAdvice.callback("Dispatch Advice initiated", true);
                        return [2 /*return*/];
                }
            });
        });
    };
    /*
     * Event Handlers
     */
    DispatchAdviceComponent.prototype.onBack = function () {
        this.location.back();
    };
    DispatchAdviceComponent.prototype.onSendDispatchAdvice = function () {
        var _this = this;
        var dispatchAdvice = utils_1.copy(this.dispatchAdvice);
        ubl_model_utils_1.UBLModelUtils.removeHjidFieldsFromObject(dispatchAdvice);
        var vars = model_utils_1.ModelUtils.createProcessVariables("Fulfilment", ubl_model_utils_1.UBLModelUtils.getPartyId(dispatchAdvice.despatchSupplierParty.party), ubl_model_utils_1.UBLModelUtils.getPartyId(dispatchAdvice.deliveryCustomerParty.party), this.cookieService.get("user_id"), dispatchAdvice, this.bpDataService);
        var piim = new process_instance_input_message_1.ProcessInstanceInputMessage(vars, "");
        this.callStatus.submit();
        this.bpeService.startBusinessProcess(piim)
            .then(function (res) {
            _this.callStatus.callback("Dispatch Advice sent", true);
            var tab = "PUCHASES";
            if (_this.bpDataService.bpActivityEvent.userRole == "seller")
                tab = "SALES";
            _this.router.navigate(['dashboard'], { queryParams: { tab: tab } });
        })
            .catch(function (error) {
            _this.callStatus.error("Failed to send Dispatch Advice", error);
        });
    };
    DispatchAdviceComponent.prototype.onUpdateDispatchAdvice = function () {
        var _this = this;
        this.callStatus.submit();
        var dispatchAdvice = utils_1.copy(this.bpDataService.despatchAdvice);
        this.bpeService.updateBusinessProcess(JSON.stringify(dispatchAdvice), "DESPATCHADVICE", this.processMetadata.processId)
            .then(function () {
            _this.documentService.updateCachedDocument(dispatchAdvice.id, dispatchAdvice);
            _this.callStatus.callback("Dispatch Advice updated", true);
            var tab = "PURCHASES";
            if (_this.bpDataService.bpActivityEvent.userRole == "seller")
                tab = "SALES";
            _this.router.navigate(['dashboard'], { queryParams: { tab: tab } });
        })
            .catch(function (error) {
            _this.callStatus.error("Failed to update Dispatch Advice", error);
        });
    };
    /*
     * Getters & Setters
     */
    DispatchAdviceComponent.prototype.isLoading = function () {
        return this.callStatus.fb_submitted;
    };
    DispatchAdviceComponent.prototype.isReadOnly = function () {
        return !!this.processMetadata && !this.processMetadata.isBeingUpdated;
    };
    DispatchAdviceComponent = __decorate([
        core_1.Component({
            selector: 'dispatch-advice',
            templateUrl: './dispatch-advice.component.html'
        }),
        __metadata("design:paramtypes", [bpe_service_1.BPEService,
            bp_data_service_1.BPDataService,
            common_1.Location,
            router_1.Router,
            ng2_cookies_1.CookieService,
            document_service_1.DocumentService])
    ], DispatchAdviceComponent);
    return DispatchAdviceComponent;
}());
exports.DispatchAdviceComponent = DispatchAdviceComponent;
//# sourceMappingURL=dispatch-advice.component.js.map