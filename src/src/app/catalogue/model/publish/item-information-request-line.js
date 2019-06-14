"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var sales_item_1 = require("./sales-item");
var ItemInformationRequestLine = /** @class */ (function () {
    function ItemInformationRequestLine(salesItem) {
        if (salesItem === void 0) { salesItem = [new sales_item_1.SalesItem()]; }
        this.salesItem = salesItem;
    }
    return ItemInformationRequestLine;
}());
exports.ItemInformationRequestLine = ItemInformationRequestLine;
//# sourceMappingURL=item-information-request-line.js.map