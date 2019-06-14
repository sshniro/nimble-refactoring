"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var clause_1 = require("./clause");
var DataMonitoringClause = /** @class */ (function (_super) {
    __extends(DataMonitoringClause, _super);
    function DataMonitoringClause(channelID) {
        if (channelID === void 0) { channelID = null; }
        var _this = _super.call(this) || this;
        _this.channelID = channelID;
        return _this;
    }
    return DataMonitoringClause;
}(clause_1.Clause));
exports.DataMonitoringClause = DataMonitoringClause;
//# sourceMappingURL=data-monitoring-clause.js.map