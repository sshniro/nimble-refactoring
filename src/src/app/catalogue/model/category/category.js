"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Category = /** @class */ (function () {
    function Category(id, preferredName, code, level, definition, note, remark, properties, keywords, taxonomyId, categoryUri) {
        if (preferredName === void 0) { preferredName = []; }
        if (definition === void 0) { definition = []; }
        this.id = id;
        this.preferredName = preferredName;
        this.code = code;
        this.level = level;
        this.definition = definition;
        this.note = note;
        this.remark = remark;
        this.properties = properties;
        this.keywords = keywords;
        this.taxonomyId = taxonomyId;
        this.categoryUri = categoryUri;
    }
    return Category;
}());
exports.Category = Category;
//# sourceMappingURL=category.js.map