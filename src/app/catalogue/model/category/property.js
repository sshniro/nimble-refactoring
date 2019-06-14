"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Property = /** @class */ (function () {
    function Property(id, preferredName, shortName, definition, note, remark, preferredSymbol, unit, iecCategory, attributeType, dataType, synonyms, values, uri) {
        if (preferredName === void 0) { preferredName = []; }
        if (remark === void 0) { remark = []; }
        this.id = id;
        this.preferredName = preferredName;
        this.shortName = shortName;
        this.definition = definition;
        this.note = note;
        this.remark = remark;
        this.preferredSymbol = preferredSymbol;
        this.unit = unit;
        this.iecCategory = iecCategory;
        this.attributeType = attributeType;
        this.dataType = dataType;
        this.synonyms = synonyms;
        this.values = values;
        this.uri = uri;
    }
    return Property;
}());
exports.Property = Property;
//# sourceMappingURL=property.js.map