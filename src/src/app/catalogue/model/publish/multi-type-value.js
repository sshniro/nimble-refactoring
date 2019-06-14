"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var text_1 = require("./text");
var MultiTypeValue = /** @class */ (function () {
    function MultiTypeValue(name, valueQualifier, // could be STRING, NUMBER, QUANTITY or CODE
        value, valueQuantity, valueDecimal, valueCode) {
        if (name === void 0) { name = new text_1.Text(); }
        if (valueQualifier === void 0) { valueQualifier = 'QUANTITY'; }
        if (value === void 0) { value = []; }
        if (valueQuantity === void 0) { valueQuantity = []; }
        if (valueDecimal === void 0) { valueDecimal = []; }
        if (valueCode === void 0) { valueCode = []; }
        this.name = name;
        this.valueQualifier = valueQualifier;
        this.value = value;
        this.valueQuantity = valueQuantity;
        this.valueDecimal = valueDecimal;
        this.valueCode = valueCode;
    }
    return MultiTypeValue;
}());
exports.MultiTypeValue = MultiTypeValue;
//# sourceMappingURL=multi-type-value.js.map