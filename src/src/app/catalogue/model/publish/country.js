"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Created by deniz on 16/07/17.
 */
var text_1 = require("./text");
var constants_1 = require("../constants");
var Country = /** @class */ (function () {
    function Country(name) {
        if (name === void 0) { name = new text_1.Text(null, constants_1.DEFAULT_LANGUAGE()); }
        this.name = name;
    }
    return Country;
}());
exports.Country = Country;
//# sourceMappingURL=country.js.map