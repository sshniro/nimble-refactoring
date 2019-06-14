"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Created by suat on 01-Jun-17.
 */
var contact_1 = require("./contact");
var Person = /** @class */ (function () {
    function Person(id, firstName, familyName, contact, favouriteProductID) {
        if (id === void 0) { id = null; }
        if (firstName === void 0) { firstName = null; }
        if (familyName === void 0) { familyName = null; }
        if (contact === void 0) { contact = new contact_1.Contact(); }
        if (favouriteProductID === void 0) { favouriteProductID = ['']; }
        this.id = id;
        this.firstName = firstName;
        this.familyName = familyName;
        this.contact = contact;
        this.favouriteProductID = favouriteProductID;
    }
    return Person;
}());
exports.Person = Person;
//# sourceMappingURL=person.js.map