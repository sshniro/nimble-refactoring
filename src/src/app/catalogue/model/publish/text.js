"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var constants_1 = require("../constants");
var Text = /** @class */ (function () {
    function Text(value, languageID) {
        if (value === void 0) { value = null; }
        if (languageID === void 0) { languageID = constants_1.DEFAULT_LANGUAGE(); }
        this.value = value;
        this.languageID = languageID;
    }
    return Text;
}());
exports.Text = Text;
//# sourceMappingURL=text.js.map