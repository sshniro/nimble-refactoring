"use strict";
/**
 * Created by suat on 12-May-17.
 */
Object.defineProperty(exports, "__esModule", { value: true });
var Catalogue = /** @class */ (function () {
    function Catalogue(id, uuid, providerParty, issueDate, issueTime, // TODO server side handles date/time separately
        catalogueLine) {
        this.id = id;
        this.uuid = uuid;
        this.providerParty = providerParty;
        this.issueDate = issueDate;
        this.issueTime = issueTime;
        this.catalogueLine = catalogueLine;
    }
    return Catalogue;
}());
exports.Catalogue = Catalogue;
//# sourceMappingURL=catalogue.js.map