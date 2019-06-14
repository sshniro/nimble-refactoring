"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var credentials_1 = require("./credentials");
var user_1 = require("./user");
var UserRegistration = /** @class */ (function () {
    function UserRegistration() {
    }
    UserRegistration.initEmpty = function () {
        var ur = new UserRegistration();
        ur.user = new user_1.User('', '', '', '', '', '', '', '', '');
        ur.credentials = new credentials_1.Credentials('', '');
        return ur;
    };
    return UserRegistration;
}());
exports.UserRegistration = UserRegistration;
//# sourceMappingURL=user-registration.js.map