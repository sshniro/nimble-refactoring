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
var call_status_1 = require("../../../common/call-status");
var bp_data_service_1 = require("../bp-data-service");
var common_1 = require("@angular/common");
var payment_terms_wrapper_1 = require("../payment-terms-wrapper");
var router_1 = require("@angular/router");
var utils_1 = require("../../../common/utils");
var ubl_model_utils_1 = require("../../../catalogue/model/ubl-model-utils");
var user_service_1 = require("../../../user-mgmt/user.service");
var ng2_cookies_1 = require("ng2-cookies");
var customer_party_1 = require("../../../catalogue/model/publish/customer-party");
var supplier_party_1 = require("../../../catalogue/model/publish/supplier-party");
var model_utils_1 = require("../../model/model-utils");
var process_instance_input_message_1 = require("../../model/process-instance-input-message");
var bpe_service_1 = require("../../bpe.service");
var price_wrapper_1 = require("../../../common/price-wrapper");
var search_context_service_1 = require("../../../simple-search/search-context.service");
var epc_codes_1 = require("../../../data-channel/model/epc-codes");
var epc_service_1 = require("../epc-service");
var document_service_1 = require("../document-service");
var myGlobals = require("../../../globals");
/**
 * Created by suat on 20-Sep-17.
 */
var OrderComponent = /** @class */ (function () {
    function OrderComponent(bpDataService, userService, bpeService, cookieService, searchContextService, epcService, location, router, documentService) {
        this.bpDataService = bpDataService;
        this.userService = userService;
        this.bpeService = bpeService;
        this.cookieService = cookieService;
        this.searchContextService = searchContextService;
        this.epcService = epcService;
        this.location = location;
        this.router = router;
        this.documentService = documentService;
        this.config = myGlobals.config;
        this.initEpcCodesCallStatus = new call_status_1.CallStatus();
        this.saveEpcCodesCallStatus = new call_status_1.CallStatus();
        this.initCallStatus = new call_status_1.CallStatus();
        this.submitCallStatus = new call_status_1.CallStatus();
        this.fetchDataMonitoringStatus = new call_status_1.CallStatus();
        this.getPartyId = ubl_model_utils_1.UBLModelUtils.getPartyId;
        this.showPurchaseOrder = false;
    }
    OrderComponent.prototype.ngOnInit = function () {
        var _this = this;
        // get copy of ThreadEventMetadata of the current business process
        if (!this.bpDataService.bpActivityEvent.newProcess) {
            this.processMetadata = this.bpDataService.bpActivityEvent.processHistory[0];
        }
        this.formerProcess = this.bpDataService.bpActivityEvent.formerProcess;
        if (this.bpDataService.order == null) {
            this.router.navigate(['dashboard']);
        }
        this.order = this.bpDataService.order;
        this.address = this.order.orderLine[0].lineItem.deliveryTerms.deliveryLocation.address;
        this.paymentTermsWrapper = new payment_terms_wrapper_1.PaymentTermsWrapper(this.order.paymentTerms);
        this.userRole = this.bpDataService.bpActivityEvent.userRole;
        this.orderResponse = this.bpDataService.orderResponse;
        this.priceWrapper = new price_wrapper_1.PriceWrapper(this.order.orderLine[0].lineItem.price, this.bpDataService.getCatalogueLine().requiredItemLocationQuantity.applicableTaxCategory[0].percent, this.order.orderLine[0].lineItem.quantity);
        // null check is for checking whether a new order is initialized
        // preceding process id check is for checking whether there is any preceding process before the order
        var sellerId = ubl_model_utils_1.UBLModelUtils.getPartyId(this.order.orderLine[0].lineItem.item.manufacturerParty);
        var buyerId = this.cookieService.get("company_id");
        this.initCallStatus.submit();
        if (this.getNonTermAndConditionContract() == null && this.bpDataService.precedingProcessId != null) {
            Promise.all([
                this.bpeService.constructContractForProcess(this.bpDataService.precedingProcessId),
                this.userService.getParty(buyerId),
                this.userService.getParty(sellerId),
                this.isDataMonitoringDemanded(),
            ])
                .then(function (_a) {
                var contract = _a[0], buyerParty = _a[1], sellerParty = _a[2], dataMonitoringDemanded = _a[3];
                _this.buyerParty = buyerParty;
                _this.sellerParty = sellerParty;
                _this.dataMonitoringDemanded = dataMonitoringDemanded;
                _this.order.contract.push(contract);
                return _this.isDataMonitoringDemanded();
            })
                .then(function (dataMonitoringDemanded) {
                _this.dataMonitoringDemanded = dataMonitoringDemanded;
                _this.initCallStatus.callback("Initialized", true);
            })
                .catch(function (error) {
                _this.initCallStatus.error("Error while initializing", error);
            });
        }
        else {
            Promise.all([
                this.userService.getParty(buyerId),
                this.userService.getParty(sellerId),
                this.isDataMonitoringDemanded(),
            ]).then(function (_a) {
                var buyerParty = _a[0], sellerParty = _a[1], dataMonitoringDemanded = _a[2];
                _this.buyerParty = buyerParty;
                _this.sellerParty = sellerParty;
                _this.dataMonitoringDemanded = dataMonitoringDemanded;
                _this.initCallStatus.callback("Initialized", true);
            })
                .catch(function (error) {
                _this.initCallStatus.error("Error while initializing", error);
            });
        }
        this.initializeEPCCodes();
    };
    // retrieve the order contract which is not the Term and Condition contract
    OrderComponent.prototype.getNonTermAndConditionContract = function () {
        if (this.order.contract) {
            for (var _i = 0, _a = this.order.contract; _i < _a.length; _i++) {
                var contract = _a[_i];
                for (var _b = 0, _c = contract.clause; _b < _c.length; _b++) {
                    var clause = _c[_b];
                    if (clause.type) {
                        return clause;
                    }
                }
            }
        }
        return null;
    };
    OrderComponent.prototype.getTermAndConditionClauses = function () {
        if (this.order.contract) {
            for (var _i = 0, _a = this.order.contract; _i < _a.length; _i++) {
                var contract = _a[_i];
                for (var _b = 0, _c = contract.clause; _b < _c.length; _b++) {
                    var clause = _c[_b];
                    if (!clause.type) {
                        return contract.clause;
                    }
                }
            }
        }
        return null;
    };
    OrderComponent.prototype.trackByFn = function (index) {
        return index;
    };
    /*
     * Event Handlers
     */
    OrderComponent.prototype.onBack = function () {
        this.location.back();
    };
    OrderComponent.prototype.onOrder = function () {
        var _this = this;
        this.submitCallStatus.submit();
        var order = utils_1.copy(this.bpDataService.order);
        // final check on the order
        order.orderLine[0].lineItem.item = this.bpDataService.modifiedCatalogueLines[0].goodsItem.item;
        ubl_model_utils_1.UBLModelUtils.removeHjidFieldsFromObject(order);
        order.anticipatedMonetaryTotal.payableAmount.value = this.priceWrapper.totalPrice;
        order.anticipatedMonetaryTotal.payableAmount.currencyID = this.priceWrapper.currency;
        //first initialize the seller and buyer parties.
        //once they are fetched continue with starting the ordering process
        var buyerId = this.cookieService.get("company_id");
        order.buyerCustomerParty = new customer_party_1.CustomerParty(this.buyerParty);
        var sellerId = ubl_model_utils_1.UBLModelUtils.getPartyId(this.bpDataService.getCatalogueLine().goodsItem.item.manufacturerParty);
        order.sellerSupplierParty = new supplier_party_1.SupplierParty(this.sellerParty);
        var vars = model_utils_1.ModelUtils.createProcessVariables("Order", buyerId, sellerId, this.cookieService.get("user_id"), order, this.bpDataService);
        var piim = new process_instance_input_message_1.ProcessInstanceInputMessage(vars, "");
        this.bpeService.startBusinessProcess(piim)
            .then(function (res) {
            _this.submitCallStatus.callback("Order placed", true);
            var tab = "PUCHASES";
            if (_this.bpDataService.bpActivityEvent.userRole == "seller")
                tab = "SALES";
            _this.router.navigate(['dashboard'], { queryParams: { tab: tab } });
        }).catch(function (error) {
            _this.submitCallStatus.error("Failed to send Order", error);
        });
    };
    OrderComponent.prototype.onOrderUpdate = function () {
        var _this = this;
        this.submitCallStatus.submit();
        var order = utils_1.copy(this.bpDataService.order);
        this.bpeService.updateBusinessProcess(JSON.stringify(order), "ORDER", this.processMetadata.processId)
            .then(function () {
            _this.documentService.updateCachedDocument(order.id, order);
            _this.submitCallStatus.callback("Order updated", true);
            var tab = "PUCHASES";
            if (_this.bpDataService.bpActivityEvent.userRole == "seller")
                tab = "SALES";
            _this.router.navigate(['dashboard'], { queryParams: { tab: tab } });
        })
            .catch(function (error) {
            _this.submitCallStatus.error("Failed to update Order", error);
        });
    };
    OrderComponent.prototype.onRespondToOrder = function (accepted) {
        var _this = this;
        this.bpDataService.orderResponse.acceptedIndicator = accepted;
        var vars = model_utils_1.ModelUtils.createProcessVariables("Order", ubl_model_utils_1.UBLModelUtils.getPartyId(this.bpDataService.order.buyerCustomerParty.party), ubl_model_utils_1.UBLModelUtils.getPartyId(this.bpDataService.order.sellerSupplierParty.party), this.cookieService.get("user_id"), this.bpDataService.orderResponse, this.bpDataService);
        var piim = new process_instance_input_message_1.ProcessInstanceInputMessage(vars, this.processMetadata.processId);
        this.submitCallStatus.submit();
        this.bpeService.continueBusinessProcess(piim)
            .then(function (res) {
            _this.submitCallStatus.callback("Order Response placed", true);
            var tab = "PUCHASES";
            if (_this.bpDataService.bpActivityEvent.userRole == "seller")
                tab = "SALES";
            _this.router.navigate(['dashboard'], { queryParams: { tab: tab } });
        }).catch(function (error) {
            _this.submitCallStatus.error("Failed to send Order Response", error);
        });
    };
    OrderComponent.prototype.onDownloadContact = function () {
        var _this = this;
        this.submitCallStatus.submit();
        this.bpeService.downloadContractBundle(this.order.id)
            .then(function (result) {
            var link = document.createElement('a');
            link.id = 'downloadLink';
            link.href = window.URL.createObjectURL(result.content);
            link.download = result.fileName;
            document.body.appendChild(link);
            var downloadLink = document.getElementById('downloadLink');
            downloadLink.click();
            document.body.removeChild(downloadLink);
            _this.submitCallStatus.callback("Bundle successfully downloaded.", true);
        }, function (error) {
            _this.submitCallStatus.error("Error while downloading bundle.", error);
        });
    };
    OrderComponent.prototype.onDispatchOrder = function () {
        this.bpDataService.proceedNextBpStep(this.userRole, "Fulfilment");
    };
    OrderComponent.prototype.onSearchTransportService = function () {
        this.searchContextService.setSearchContext('Transport Service Provider', 'Order', this.processMetadata, this.bpDataService.bpActivityEvent.containerGroupId);
        this.router.navigate(['simple-search'], {
            queryParams: {
                searchContext: 'orderbp',
                q: '*',
                cat: 'Transport Service',
                catID: 'nimble:category:TransportService'
            }
        });
    };
    OrderComponent.prototype.onDeleteEpcCode = function (i) {
        this.epcCodes.codes.splice(i, 1);
    };
    OrderComponent.prototype.onSaveEpcCodes = function () {
        var _this = this;
        this.saveEpcCodesCallStatus.submit();
        // remove empty codes
        var selectedEpcCodes = [];
        for (var _i = 0, _a = this.epcCodes.codes; _i < _a.length; _i++) {
            var code = _a[_i];
            if (code) {
                selectedEpcCodes.push(code);
            }
        }
        var codes = new epc_codes_1.EpcCodes(this.order.id, selectedEpcCodes);
        this.epcService.registerEpcCodes(codes)
            .then(function () {
            _this.savedEpcCodes = codes;
            _this.saveEpcCodesCallStatus.callback("EPC Codes are saved.", true);
        }).catch(function (error) {
            _this.saveEpcCodesCallStatus.error("Failed to save EPC Codes.", error);
        });
    };
    OrderComponent.prototype.onAddEpcCode = function () {
        this.epcCodes.codes.push("");
    };
    OrderComponent.prototype.areEpcCodesDirty = function () {
        if (!this.epcCodes || !this.savedEpcCodes) {
            return false;
        }
        var codes = this.epcCodes.codes;
        var saved = this.savedEpcCodes.codes;
        if (codes.length !== saved.length) {
            return true;
        }
        for (var i = 0; i < saved.length; i++) {
            if (codes[i] !== saved[i]) {
                return true;
            }
        }
        return false;
    };
    /*
     * Getters & Setters
     */
    OrderComponent.prototype.isBuyer = function () {
        return this.userRole === "buyer";
    };
    OrderComponent.prototype.isSeller = function () {
        return this.userRole === "seller";
    };
    OrderComponent.prototype.isReady = function () {
        return !this.initCallStatus.isDisplayed() && !!this.order;
    };
    OrderComponent.prototype.isLoading = function () {
        return this.submitCallStatus.fb_submitted;
    };
    OrderComponent.prototype.isOrderCompleted = function () {
        return this.processMetadata && this.processMetadata.processStatus === "Completed";
    };
    OrderComponent.prototype.isOrderRejected = function () {
        return this.isOrderCompleted() && !this.bpDataService.orderResponse.acceptedIndicator;
    };
    OrderComponent.prototype.isReadOnly = function () {
        if (this.userRole === "buyer") {
            return !!this.processMetadata && !this.processMetadata.isBeingUpdated;
        }
        return this.isOrderCompleted();
    };
    OrderComponent.prototype.getQuantityText = function () {
        return utils_1.quantityToString(this.order.orderLine[0].lineItem.quantity);
    };
    OrderComponent.prototype.getTotalPriceText = function () {
        return this.priceWrapper.totalPriceString;
    };
    OrderComponent.prototype.getDeliveryPeriodText = function () {
        var qty = this.getLineItem().delivery[0].requestedDeliveryPeriod.durationMeasure;
        return qty.value + " " + qty.unitCode;
    };
    OrderComponent.prototype.getWarrantyPeriodText = function () {
        var warranty = this.getLineItem().warrantyValidityPeriod.durationMeasure;
        if (!warranty || !warranty.unitCode || !warranty.value) {
            return "None";
        }
        return warranty.value + " " + warranty.unitCode;
    };
    OrderComponent.prototype.getIncoterm = function () {
        return this.getLineItem().deliveryTerms.incoterms;
    };
    OrderComponent.prototype.getPaymentMeans = function () {
        return this.order.paymentMeans.paymentMeansCode.name;
    };
    OrderComponent.prototype.getLineItem = function () {
        return this.order.orderLine[0].lineItem;
    };
    OrderComponent.prototype.trackAndTraceDetailsExists = function () {
        var tnt = this.order.orderLine[0].lineItem.item.trackAndTraceDetails;
        if (tnt && (tnt.masterURL || tnt.eventURL || tnt.productionProcessTemplate)) {
            return true;
        }
        return false;
    };
    /*
     *
     */
    OrderComponent.prototype.initializeEPCCodes = function () {
        var _this = this;
        if (this.processMetadata
            && this.processMetadata.processStatus == 'Completed'
            && this.bpDataService.orderResponse
            && this.bpDataService.orderResponse.acceptedIndicator
            && this.trackAndTraceDetailsExists()) {
            this.initEpcCodesCallStatus.submit();
            this.epcService.getEpcCodes(this.order.id).then(function (res) {
                _this.epcCodes = res;
                if (_this.epcCodes.codes.length == 0) {
                    _this.epcCodes.codes.push("");
                }
                _this.epcCodes.codes.sort();
                _this.savedEpcCodes = utils_1.copy(_this.epcCodes);
                _this.initEpcCodesCallStatus.callback("EPC Codes initialized", true);
            }).catch(function (error) {
                if (error.status && error.status == 404) {
                    _this.epcCodes = new epc_codes_1.EpcCodes(_this.order.id, [""]);
                    _this.savedEpcCodes = new epc_codes_1.EpcCodes(_this.order.id, [""]);
                    _this.initEpcCodesCallStatus.callback("EPC Codes initialized", true);
                }
                else {
                    _this.initEpcCodesCallStatus.error("Error while initializing EPC Codes", error);
                }
            });
        }
    };
    OrderComponent.prototype.isDataMonitoringDemanded = function () {
        var _this = this;
        var docClause = null;
        if (this.order.contract && this.order.contract.length > 0) {
            for (var _i = 0, _a = this.order.contract[0].clause; _i < _a.length; _i++) {
                var clause = _a[_i];
                var clauseCopy = JSON.parse(JSON.stringify(clause));
                if (clauseCopy.clauseDocumentRef) {
                    docClause = clause;
                    if (docClause.clauseDocumentRef.documentType === "QUOTATION") {
                        break;
                    }
                }
            }
        }
        if (docClause) {
            this.fetchDataMonitoringStatus.submit();
            return this.documentService.getDocumentJsonContent(docClause.clauseDocumentRef.id).then(function (result) {
                _this.fetchDataMonitoringStatus.callback("Successfully fetched data monitoring service", true);
                var q = result;
                return q.dataMonitoringPromised;
            })
                .catch(function (error) {
                _this.fetchDataMonitoringStatus.error("Error while fetching data monitoring service", error);
                throw error;
            });
        }
        return Promise.resolve(false);
    };
    OrderComponent.prototype.getOrderContract = function () {
        var orderContract = null;
        if (this.order.contract) {
            for (var _i = 0, _a = this.order.contract; _i < _a.length; _i++) {
                var contract = _a[_i];
                for (var _b = 0, _c = contract.clause; _b < _c.length; _b++) {
                    var clause = _c[_b];
                    if (clause.type) {
                        orderContract = contract;
                        break;
                    }
                }
            }
        }
        return orderContract;
    };
    OrderComponent = __decorate([
        core_1.Component({
            selector: "order",
            templateUrl: "./order.component.html",
            styleUrls: ["./order.component.css"]
        }),
        __metadata("design:paramtypes", [bp_data_service_1.BPDataService,
            user_service_1.UserService,
            bpe_service_1.BPEService,
            ng2_cookies_1.CookieService,
            search_context_service_1.SearchContextService,
            epc_service_1.EpcService,
            common_1.Location,
            router_1.Router,
            document_service_1.DocumentService])
    ], OrderComponent);
    return OrderComponent;
}());
exports.OrderComponent = OrderComponent;
//# sourceMappingURL=order.component.js.map