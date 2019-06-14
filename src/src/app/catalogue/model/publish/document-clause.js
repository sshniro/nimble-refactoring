"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var clause_1 = require("./clause");
var DocumentClause = /** @class */ (function (_super) {
    __extends(DocumentClause, _super);
    function DocumentClause(clauseDocumentRef) {
        if (clauseDocumentRef === void 0) { clauseDocumentRef = null; }
        var _this = _super.call(this) || this;
        _this.clauseDocumentRef = clauseDocumentRef;
        return _this;
    }
    return DocumentClause;
}(clause_1.Clause));
exports.DocumentClause = DocumentClause;
//# sourceMappingURL=document-clause.js.map