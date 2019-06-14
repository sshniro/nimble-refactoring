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
var trading_term_1 = require("../model/publish/trading-term");
var text_1 = require("../model/publish/text");
var multi_type_value_1 = require("../model/publish/multi-type-value");
var PaymentTermsView = /** @class */ (function () {
    function PaymentTermsView() {
        this.initialTradingTerms = [];
    }
    PaymentTermsView.prototype.ngOnInit = function () {
        // create initial trading terms list
        this.createTradingTerms();
        // ids of the selected trading terms
        var idList = [];
        for (var _i = 0, _a = this.tradingTerms; _i < _a.length; _i++) {
            var tradingTerm = _a[_i];
            idList.push(tradingTerm.id);
        }
        for (var _b = 0, _c = this.initialTradingTerms; _b < _c.length; _b++) {
            var tradingTerm = _c[_b];
            if (idList.indexOf(tradingTerm.id) != -1) {
                continue;
            }
            this.tradingTerms.push(tradingTerm);
        }
    };
    PaymentTermsView.prototype.createTradingTerms = function () {
        this.initialTradingTerms.push(new trading_term_1.TradingTerm("Payment_In_Advance", [new text_1.Text("Payment in advance")], "PIA", new multi_type_value_1.MultiTypeValue(null, 'STRING', [new text_1.Text("false")], null, null)));
        this.initialTradingTerms.push(new trading_term_1.TradingTerm("Values_Net", [new text_1.Text("e.g.,NET 10,payment 10 days after invoice date")], "Net %s", null));
        this.initialTradingTerms.push(new trading_term_1.TradingTerm("End_of_month", [new text_1.Text("End of month")], "EOM", new multi_type_value_1.MultiTypeValue(null, 'STRING', [new text_1.Text("false")], null, null)));
        this.initialTradingTerms.push(new trading_term_1.TradingTerm("Cash_next_delivery", [new text_1.Text("Cash next delivery")], "CND", new multi_type_value_1.MultiTypeValue(null, 'STRING', [new text_1.Text("false")], null, null)));
        this.initialTradingTerms.push(new trading_term_1.TradingTerm("Cash_before_shipment", [new text_1.Text("Cash before shipment")], "CBS", new multi_type_value_1.MultiTypeValue(null, 'STRING', [new text_1.Text("false")], null, null)));
        this.initialTradingTerms.push(new trading_term_1.TradingTerm("Values_MFI", [new text_1.Text("e.g.,21 MFI,21st of the month following invoice date")], "%s MFI", null));
        this.initialTradingTerms.push(new trading_term_1.TradingTerm("Values_/NET", [new text_1.Text("e.g.,1/10 NET 30,1% discount if payment received within 10 days otherwise payment 30 days after invoice date")], "%s/%s NET %s", null));
        this.initialTradingTerms.push(new trading_term_1.TradingTerm("Cash_on_delivery", [new text_1.Text("Cash on delivery")], "COD", new multi_type_value_1.MultiTypeValue(null, 'STRING', [new text_1.Text("false")], null, null)));
        this.initialTradingTerms.push(new trading_term_1.TradingTerm("Cash_with_order", [new text_1.Text("Cash with order")], "CWO", new multi_type_value_1.MultiTypeValue(null, 'STRING', [new text_1.Text("false")], null, null)));
        this.initialTradingTerms.push(new trading_term_1.TradingTerm("Cash_in_advance", [new text_1.Text("Cash in advance")], "CIA", new multi_type_value_1.MultiTypeValue(null, 'STRING', [new text_1.Text("false")], null, null)));
    };
    PaymentTermsView.prototype.get = function (id) {
        for (var _i = 0, _a = this.tradingTerms; _i < _a.length; _i++) {
            var tradingTerm = _a[_i];
            if (tradingTerm.id == id) {
                return tradingTerm;
            }
        }
    };
    __decorate([
        core_1.Input(),
        __metadata("design:type", Array)
    ], PaymentTermsView.prototype, "tradingTerms", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", String)
    ], PaymentTermsView.prototype, "presentationMode", void 0);
    PaymentTermsView = __decorate([
        core_1.Component({
            selector: 'payment-terms-view',
            templateUrl: './payment-terms-view.html'
        })
    ], PaymentTermsView);
    return PaymentTermsView;
}());
exports.PaymentTermsView = PaymentTermsView;
//# sourceMappingURL=payment-terms-view.js.map