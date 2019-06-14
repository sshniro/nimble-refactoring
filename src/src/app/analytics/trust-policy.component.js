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
var analytics_service_1 = require("./analytics.service");
var call_status_1 = require("../common/call-status");
var TrustPolicyComponent = /** @class */ (function () {
    function TrustPolicyComponent(analyticsService) {
        this.analyticsService = analyticsService;
        this.alertClosed = false;
        this.policy = null;
        this.policy_tmp = null;
        this.callStatus = new call_status_1.CallStatus();
        this.saveCallStatus = new call_status_1.CallStatus();
    }
    TrustPolicyComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.callStatus.submit();
        this.analyticsService
            .getTrustPolicy()
            .then(function (res) {
            _this.policy = res;
            if (_this.policy && _this.policy.trustAttributes && _this.policy.trustAttributes.length > 0) {
                _this.policy.trustAttributes.sort(function (a, b) { return a.attributeType.name.localeCompare(b.attributeType.name); });
            }
            _this.policy_tmp = JSON.stringify(_this.policy);
            _this.callStatus.callback("Successfully loaded trust policy", true);
        })
            .catch(function (error) {
            _this.policy = null;
            _this.policy_tmp = null;
            _this.callStatus.error("Error while loading trust policy", error);
        });
    };
    TrustPolicyComponent.prototype.initTrustPolicy = function () {
        var _this = this;
        this.saveCallStatus.submit();
        this.analyticsService
            .initTrustPolicy()
            .then(function (res) {
            _this.saveCallStatus.callback("Successfully initialized trust policy", true);
            _this.ngOnInit();
        })
            .catch(function (error) {
            _this.saveCallStatus.error("Error while initializing trust policy", error);
        });
    };
    TrustPolicyComponent.prototype.saveTrustPolicy = function () {
        var _this = this;
        this.saveCallStatus.submit();
        this.analyticsService
            .setTrustPolicy(this.policy)
            .then(function (res) {
            _this.saveCallStatus.callback("Successfully saved trust policy", true);
            _this.ngOnInit();
        })
            .catch(function (error) {
            _this.saveCallStatus.error("Error while saving trust policy", error);
        });
    };
    TrustPolicyComponent.prototype.policyUnchanged = function () {
        var comp_a = JSON.stringify(this.policy);
        var comp_b = this.policy_tmp;
        return (comp_a.localeCompare(comp_b) == 0);
    };
    TrustPolicyComponent.prototype.isLoading = function () {
        return this.callStatus.fb_submitted;
    };
    TrustPolicyComponent = __decorate([
        core_1.Component({
            selector: "trust-policy",
            templateUrl: "./trust-policy.component.html",
            styleUrls: ["./trust-policy.component.css"]
        }),
        __metadata("design:paramtypes", [analytics_service_1.AnalyticsService])
    ], TrustPolicyComponent);
    return TrustPolicyComponent;
}());
exports.TrustPolicyComponent = TrustPolicyComponent;
//# sourceMappingURL=trust-policy.component.js.map