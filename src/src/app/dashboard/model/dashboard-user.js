"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var DashboardUser = /** @class */ (function () {
    function DashboardUser(fullName, hasCompany, showWelcomeTab, roles) {
        if (fullName === void 0) { fullName = ""; }
        if (hasCompany === void 0) { hasCompany = false; }
        if (showWelcomeTab === void 0) { showWelcomeTab = true; }
        if (roles === void 0) { roles = []; }
        this.fullName = fullName;
        this.hasCompany = hasCompany;
        this.showWelcomeTab = showWelcomeTab;
        this.roles = roles;
    }
    return DashboardUser;
}());
exports.DashboardUser = DashboardUser;
//# sourceMappingURL=dashboard-user.js.map