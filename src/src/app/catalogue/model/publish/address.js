"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var country_1 = require("./country");
/**
 * Created by deniz on 16/07/17.
 */
var Address = /** @class */ (function () {
    function Address(cityName, region, postalZone, buildingNumber, streetName, country) {
        if (cityName === void 0) { cityName = ''; }
        if (region === void 0) { region = ''; }
        if (postalZone === void 0) { postalZone = ''; }
        if (buildingNumber === void 0) { buildingNumber = ''; }
        if (streetName === void 0) { streetName = ''; }
        if (country === void 0) { country = new country_1.Country(); }
        this.cityName = cityName;
        this.region = region;
        this.postalZone = postalZone;
        this.buildingNumber = buildingNumber;
        this.streetName = streetName;
        this.country = country;
    }
    return Address;
}());
exports.Address = Address;
//# sourceMappingURL=address.js.map