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
var ng2_cookies_1 = require("ng2-cookies");
var common_1 = require("@angular/common");
var router_1 = require("@angular/router");
var bp_data_service_1 = require("../bp-data-service");
var call_status_1 = require("../../../common/call-status");
var search_context_service_1 = require("../../../simple-search/search-context.service");
var bpe_service_1 = require("../../bpe.service");
var user_service_1 = require("../../../user-mgmt/user.service");
var ubl_model_utils_1 = require("../../../catalogue/model/ubl-model-utils");
var model_utils_1 = require("../../model/model-utils");
var process_instance_input_message_1 = require("../../model/process-instance-input-message");
var utils_1 = require("../../../common/utils");
var document_service_1 = require("../document-service");
var TransportExecutionPlanComponent = /** @class */ (function () {
    function TransportExecutionPlanComponent(bpDataService, searchContextService, cookieService, userService, bpeService, location, router, documentService, route) {
        this.bpDataService = bpDataService;
        this.searchContextService = searchContextService;
        this.cookieService = cookieService;
        this.userService = userService;
        this.bpeService = bpeService;
        this.location = location;
        this.router = router;
        this.documentService = documentService;
        this.route = route;
        this.updatingProcess = false;
        this.contractCallStatus = new call_status_1.CallStatus();
        this.callStatus = new call_status_1.CallStatus();
    }
    TransportExecutionPlanComponent.prototype.ngOnInit = function () {
        var _this = this;
        // get copy of ThreadEventMetadata of the current business process
        if (!this.bpDataService.bpActivityEvent.newProcess) {
            this.processMetadata = this.bpDataService.bpActivityEvent.processHistory[0];
        }
        this.formerProcess = this.bpDataService.bpActivityEvent.formerProcess;
        if (!this.bpDataService.transportExecutionPlanRequest) {
            if (this.searchContextService.getAssociatedProcessMetadata() != null) {
                this.bpDataService.initTransportExecutionPlanRequestWithOrder().then(function (response) {
                    _this.init();
                });
            }
            else {
                this.bpDataService.initTransportExecutionPlanRequest();
                this.init();
            }
        }
        else {
            this.init();
        }
    };
    TransportExecutionPlanComponent.prototype.init = function () {
        var _this = this;
        this.request = this.bpDataService.transportExecutionPlanRequest;
        this.itemName = utils_1.selectPreferredValue(this.request.consignment[0].consolidatedShipment[0].goodsItem[0].item.name);
        this.response = this.bpDataService.transportExecutionPlan;
        this.productOrder = this.bpDataService.productOrder;
        this.userRole = this.bpDataService.bpActivityEvent.userRole;
        if (this.processMetadata && this.processMetadata.isBeingUpdated) {
            this.updatingProcess = true;
        }
        if (this.request.transportContract == null && this.bpDataService.precedingProcessId != null) {
            this.contractCallStatus.submit();
            this.bpeService.constructContractForProcess(this.bpDataService.precedingProcessId).then(function (contract) {
                _this.request.transportContract = contract;
                _this.contractCallStatus.callback("Contract constructed", true);
            })
                .catch(function (error) {
                _this.contractCallStatus.error("Error while getting contract.", error);
            });
        }
    };
    TransportExecutionPlanComponent.prototype.isLoading = function () {
        return this.callStatus.fb_submitted;
    };
    TransportExecutionPlanComponent.prototype.isStarted = function () {
        return this.processMetadata && !this.processMetadata.isBeingUpdated && this.processMetadata.processStatus === "Started";
    };
    TransportExecutionPlanComponent.prototype.isFinished = function () {
        return this.processMetadata && this.processMetadata.processStatus === "Completed";
    };
    TransportExecutionPlanComponent.prototype.isRequestDisabled = function () {
        return this.isLoading() || this.isStarted() || this.isFinished();
    };
    TransportExecutionPlanComponent.prototype.getRequestPresentationMode = function () {
        return this.isFinished() ? "view" : "edit";
    };
    TransportExecutionPlanComponent.prototype.isResponseDisabled = function () {
        return this.isLoading() || this.isFinished();
    };
    TransportExecutionPlanComponent.prototype.onBack = function () {
        this.location.back();
    };
    TransportExecutionPlanComponent.prototype.onSendRequest = function () {
        var _this = this;
        this.callStatus.submit();
        var transportationExecutionPlanRequest = utils_1.copy(this.bpDataService.transportExecutionPlanRequest);
        // final check on the transportationExecutionPlanRequest
        transportationExecutionPlanRequest.mainTransportationService = this.bpDataService.modifiedCatalogueLines[0].goodsItem.item;
        ubl_model_utils_1.UBLModelUtils.removeHjidFieldsFromObject(transportationExecutionPlanRequest);
        // first initialize the seller and buyer parties.
        // once they are fetched continue with starting the ordering process
        var sellerId = ubl_model_utils_1.UBLModelUtils.getPartyId(this.bpDataService.getCatalogueLine().goodsItem.item.manufacturerParty);
        var buyerId = this.cookieService.get("company_id");
        Promise.all([
            this.userService.getParty(buyerId),
            this.userService.getParty(sellerId)
        ])
            .then(function (_a) {
            var buyerParty = _a[0], sellerParty = _a[1];
            transportationExecutionPlanRequest.transportUserParty = buyerParty;
            transportationExecutionPlanRequest.transportServiceProviderParty = sellerParty;
            var vars = model_utils_1.ModelUtils.createProcessVariables("Transport_Execution_Plan", buyerId, sellerId, _this.cookieService.get("user_id"), transportationExecutionPlanRequest, _this.bpDataService);
            var piim = new process_instance_input_message_1.ProcessInstanceInputMessage(vars, "");
            return _this.bpeService.startBusinessProcess(piim);
        })
            .then(function () {
            _this.callStatus.callback("Transport Execution Plan sent", true);
            var tab = "PUCHASES";
            if (_this.bpDataService.bpActivityEvent.userRole == "seller")
                tab = "SALES";
            _this.router.navigate(['dashboard'], { queryParams: { tab: tab } });
        })
            .catch(function (error) {
            _this.callStatus.error("Failed to send Transport Execution Plan", error);
        });
    };
    TransportExecutionPlanComponent.prototype.onUpdateRequest = function () {
        var _this = this;
        this.callStatus.submit();
        var transportationExecutionPlanRequest = utils_1.copy(this.bpDataService.transportExecutionPlanRequest);
        this.bpeService.updateBusinessProcess(JSON.stringify(transportationExecutionPlanRequest), "TRANSPORTEXECUTIONPLANREQUEST", this.processMetadata.processId)
            .then(function () {
            _this.documentService.updateCachedDocument(transportationExecutionPlanRequest.id, transportationExecutionPlanRequest);
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
    TransportExecutionPlanComponent.prototype.onSendResponse = function (accepted) {
        var _this = this;
        this.response.documentStatusCode.name = accepted ? "Accepted" : "Rejected";
        var vars = model_utils_1.ModelUtils.createProcessVariables("Transport_Execution_Plan", ubl_model_utils_1.UBLModelUtils.getPartyId(this.bpDataService.transportExecutionPlan.transportUserParty), ubl_model_utils_1.UBLModelUtils.getPartyId(this.bpDataService.transportExecutionPlan.transportServiceProviderParty), this.cookieService.get("user_id"), this.bpDataService.transportExecutionPlan, this.bpDataService);
        var piim = new process_instance_input_message_1.ProcessInstanceInputMessage(vars, this.processMetadata.processId);
        this.callStatus.submit();
        this.bpeService.continueBusinessProcess(piim)
            .then(function (res) {
            _this.callStatus.callback("Transport Execution Plan sent", true);
            _this.router.navigate(["dashboard"]);
        }).catch(function (error) {
            _this.callStatus.error("Failed to send Transport Execution Plan", error);
        });
    };
    TransportExecutionPlanComponent.prototype.onDispatchAdvice = function () {
        this.bpDataService.proceedNextBpStep("seller", "Fulfilment");
    };
    TransportExecutionPlanComponent = __decorate([
        core_1.Component({
            selector: "transport-execution-plan",
            templateUrl: "./transport-execution-plan.component.html"
        }),
        __metadata("design:paramtypes", [bp_data_service_1.BPDataService,
            search_context_service_1.SearchContextService,
            ng2_cookies_1.CookieService,
            user_service_1.UserService,
            bpe_service_1.BPEService,
            common_1.Location,
            router_1.Router,
            document_service_1.DocumentService,
            router_1.ActivatedRoute])
    ], TransportExecutionPlanComponent);
    return TransportExecutionPlanComponent;
}());
exports.TransportExecutionPlanComponent = TransportExecutionPlanComponent;
//# sourceMappingURL=transport-execution-plan.component.js.map