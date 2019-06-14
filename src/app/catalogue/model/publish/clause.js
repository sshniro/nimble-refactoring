"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Clause = /** @class */ (function () {
    function Clause(id, type, content, tradingTerms) {
        if (id === void 0) { id = null; }
        if (type === void 0) { type = null; }
        if (content === void 0) { content = []; }
        if (tradingTerms === void 0) { tradingTerms = []; }
        this.id = id;
        this.type = type;
        this.content = content;
        this.tradingTerms = tradingTerms;
    }
    return Clause;
}());
exports.Clause = Clause;
//# sourceMappingURL=clause.js.map