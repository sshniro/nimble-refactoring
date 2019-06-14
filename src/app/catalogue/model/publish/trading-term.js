"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var TradingTerm = /** @class */ (function () {
    function TradingTerm(id, description, tradingTermFormat, value) {
        if (id === void 0) { id = null; }
        if (description === void 0) { description = []; }
        if (tradingTermFormat === void 0) { tradingTermFormat = null; }
        if (value === void 0) { value = null; }
        this.id = id;
        this.description = description;
        this.tradingTermFormat = tradingTermFormat;
        this.value = value;
    }
    TradingTerm.prototype.getDescription = function (languageID) {
        for (var _i = 0, _a = this.description; _i < _a.length; _i++) {
            var pName = _a[_i];
            if (pName.languageID === languageID) {
                return pName.value;
            }
        }
    };
    return TradingTerm;
}());
exports.TradingTerm = TradingTerm;
//# sourceMappingURL=trading-term.js.map