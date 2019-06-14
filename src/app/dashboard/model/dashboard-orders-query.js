"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var constants_1 = require("../constants");
var DashboardOrdersQuery = /** @class */ (function () {
    function DashboardOrdersQuery(archived, collaborationRole, page, products, categories, partners, status, pageSize) {
        if (archived === void 0) { archived = false; }
        if (collaborationRole === void 0) { collaborationRole = "BUYER"; }
        if (page === void 0) { page = 1; }
        if (products === void 0) { products = []; }
        if (categories === void 0) { categories = []; }
        if (partners === void 0) { partners = []; }
        if (status === void 0) { status = []; }
        if (pageSize === void 0) { pageSize = constants_1.PAGE_SIZE; }
        this.archived = archived;
        this.collaborationRole = collaborationRole;
        this.page = page;
        this.products = products;
        this.categories = categories;
        this.partners = partners;
        this.status = status;
        this.pageSize = pageSize;
    }
    return DashboardOrdersQuery;
}());
exports.DashboardOrdersQuery = DashboardOrdersQuery;
//# sourceMappingURL=dashboard-orders-query.js.map