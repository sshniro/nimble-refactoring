"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Created by deniz on 16/07/17.
 */
var DocumentReference = /** @class */ (function () {
    function DocumentReference(id, documentType, attachment) {
        if (id === void 0) { id = null; }
        if (documentType === void 0) { documentType = null; }
        if (attachment === void 0) { attachment = null; }
        this.id = id;
        this.documentType = documentType;
        this.attachment = attachment;
    }
    return DocumentReference;
}());
exports.DocumentReference = DocumentReference;
//# sourceMappingURL=document-reference.js.map