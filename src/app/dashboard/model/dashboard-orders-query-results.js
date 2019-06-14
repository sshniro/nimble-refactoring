"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var DashboardOrdersQueryResults = /** @class */ (function () {
    function DashboardOrdersQueryResults(orders, hasArchivedOrders, resultCount) {
        if (orders === void 0) { orders = null; }
        if (hasArchivedOrders === void 0) { hasArchivedOrders = false; }
        if (resultCount === void 0) { resultCount = 0; }
        this.orders = orders;
        this.hasArchivedOrders = hasArchivedOrders;
        this.resultCount = resultCount;
    }
    return DashboardOrdersQueryResults;
}());
exports.DashboardOrdersQueryResults = DashboardOrdersQueryResults;
//# sourceMappingURL=dashboard-orders-query-results.js.map