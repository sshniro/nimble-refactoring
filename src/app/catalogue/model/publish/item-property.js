"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ItemProperty = /** @class */ (function () {
    function ItemProperty(id, name, 
        // value bir dil icin birden fazla deger olabilir. Yani su sekilde olacak (ornegin name = [ color , renk ]):
        // value = [ tr:kirmizi, tr:mavi, en:red, en: blue ]
        value, valueDecimal, valueQuantity, valueBinary, valueQualifier, itemClassificationCode, uri) {
        if (name === void 0) { name = []; }
        if (value === void 0) { value = []; }
        this.id = id;
        this.name = name;
        this.value = value;
        this.valueDecimal = valueDecimal;
        this.valueQuantity = valueQuantity;
        this.valueBinary = valueBinary;
        this.valueQualifier = valueQualifier;
        this.itemClassificationCode = itemClassificationCode;
        this.uri = uri;
    }
    return ItemProperty;
}());
exports.ItemProperty = ItemProperty;
//# sourceMappingURL=item-property.js.map