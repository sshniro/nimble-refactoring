"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function addressToString(address) {
    var num = address.buildingNumber ? " " + address.buildingNumber : "";
    var region = address.region ? " (" + address.region + ")" : "";
    return "" + address.streetName + num + ", " + address.postalCode + " " + address.cityName + region + ", " + address.country;
}
exports.addressToString = addressToString;
//# sourceMappingURL=utils.js.map