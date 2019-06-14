"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * The query parameters exactly as they appear in the dashboard's URL.
 */
var DashboardQueryParameters = /** @class */ (function () {
    function DashboardQueryParameters(tab, arch, pg, prd, cat, prt, sts) {
        if (tab === void 0) { tab = null; }
        if (arch === void 0) { arch = false; }
        if (pg === void 0) { pg = 1; }
        if (prd === void 0) { prd = ""; }
        if (cat === void 0) { cat = ""; }
        if (prt === void 0) { prt = ""; }
        if (sts === void 0) { sts = ""; }
        this.tab = tab;
        this.arch = arch;
        this.pg = pg;
        this.prd = prd;
        this.cat = cat;
        this.prt = prt;
        this.sts = sts;
    }
    return DashboardQueryParameters;
}());
exports.DashboardQueryParameters = DashboardQueryParameters;
//# sourceMappingURL=dashboard-query-parameters.js.map