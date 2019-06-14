"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var AddressSimple = /** @class */ (function () {
    function AddressSimple(cityName, region, postalCode, buildingNumber, streetName, country) {
        if (cityName === void 0) { cityName = ''; }
        if (region === void 0) { region = ''; }
        if (postalCode === void 0) { postalCode = ''; }
        if (buildingNumber === void 0) { buildingNumber = ''; }
        if (streetName === void 0) { streetName = ''; }
        if (country === void 0) { country = ''; }
        this.cityName = cityName;
        this.region = region;
        this.postalCode = postalCode;
        this.buildingNumber = buildingNumber;
        this.streetName = streetName;
        this.country = country;
    }
    return AddressSimple;
}());
exports.AddressSimple = AddressSimple;
//# sourceMappingURL=address-simple.js.map