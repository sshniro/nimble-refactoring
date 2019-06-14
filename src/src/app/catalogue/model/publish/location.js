"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var address_1 = require("./address");
var Location = /** @class */ (function () {
    function Location(address) {
        if (address === void 0) { address = new address_1.Address(); }
        this.address = address;
    }
    return Location;
}());
exports.Location = Location;
//# sourceMappingURL=location.js.map