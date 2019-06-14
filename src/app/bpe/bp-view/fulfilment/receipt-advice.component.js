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
var bpe_service_1 = require("../../bpe.service");
var bp_data_service_1 = require("../bp-data-service");
var router_1 = require("@angular/router");
var model_utils_1 = require("../../model/model-utils");
var process_instance_input_message_1 = require("../../model/process-instance-input-message");
var common_1 = require("@angular/common");
var ng2_cookies_1 = require("ng2-cookies");
var ubl_model_utils_1 = require("../../../catalogue/model/ubl-model-utils");
/**
 * Created by suat on 20-Sep-17.
 */
var ReceiptAdviceComponent = /** @class */ (function () {
    function ReceiptAdviceComponent(bpeService, bpDataService, location, cookieService, router) {
        this.bpeService = bpeService;
        this.bpDataService = bpDataService;
        this.location = location;
        this.cookieService = cookieService;
        this.router = router;
        this.callStatus = new call_status_1.CallStatus();
    }
    ReceiptAdviceComponent.prototype.ngOnInit = function () {
        // get copy of ThreadEventMetadata of the current business process
        if (!this.bpDataService.bpActivityEvent.newProcess) {
            this.processMetadata = this.bpDataService.bpActivityEvent.processHistory[0];
        }
        this.receiptAdvice = this.bpDataService.receiptAdvice;
        this.dispatchAdvice = this.bpDataService.despatchAdvice;
        this.userRole = this.bpDataService.bpActivityEvent.userRole;
    };
    /*
     * Event Handlers
     */
    ReceiptAdviceComponent.prototype.onBack = function () {
        this.location.back();
    };
    ReceiptAdviceComponent.prototype.onSendReceiptAdvice = function () {
        var _this = this;
        var vars = model_utils_1.ModelUtils.createProcessVariables("Fulfilment", ubl_model_utils_1.UBLModelUtils.getPartyId(this.bpDataService.receiptAdvice.despatchSupplierParty.party), ubl_model_utils_1.UBLModelUtils.getPartyId(this.bpDataService.receiptAdvice.deliveryCustomerParty.party), this.cookieService.get("user_id"), this.bpDataService.receiptAdvice, this.bpDataService);
        var piim = new process_instance_input_message_1.ProcessInstanceInputMessage(vars, this.processMetadata.processId);
        this.callStatus.submit();
        this.bpeService.continueBusinessProcess(piim)
            .then(function (res) {
            _this.callStatus.callback("Receipt Advice sent", true);
            var tab = "PUCHASES";
            if (_this.bpDataService.bpActivityEvent.userRole == "seller")
                tab = "SALES";
            _this.router.navigate(['dashboard'], { queryParams: { tab: tab } });
        }).catch(function (error) {
            _this.callStatus.error("Failed to send Receipt Advice", error);
        });
    };
    /*
     * Getters & Setters
     */
    ReceiptAdviceComponent.prototype.isLoading = function () {
        return this.callStatus.fb_submitted;
    };
    ReceiptAdviceComponent.prototype.isReadOnly = function () {
        return this.userRole === "seller" || this.processMetadata.processStatus == "Completed";
    };
    ReceiptAdviceComponent = __decorate([
        core_1.Component({
            selector: "receipt-advice",
            templateUrl: "./receipt-advice.component.html",
            styleUrls: ["./receipt-advice.component.css"]
        }),
        __metadata("design:paramtypes", [bpe_service_1.BPEService,
            bp_data_service_1.BPDataService,
            common_1.Location,
            ng2_cookies_1.CookieService,
            router_1.Router])
    ], ReceiptAdviceComponent);
    return ReceiptAdviceComponent;
}());
exports.ReceiptAdviceComponent = ReceiptAdviceComponent;
//# sourceMappingURL=receipt-advice.component.js.map