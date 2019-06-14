"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var negotiation_options_1 = require("../../catalogue/model/publish/negotiation-options");
var BpWorkflowOptions = /** @class */ (function () {
    function BpWorkflowOptions(selectedValues, quantity, negotiation) {
        if (selectedValues === void 0) { selectedValues = {}; }
        if (quantity === void 0) { quantity = 1; }
        if (negotiation === void 0) { negotiation = new negotiation_options_1.NegotiationOptions(); }
        this.selectedValues = selectedValues;
        this.quantity = quantity;
        this.negotiation = negotiation;
    }
    return BpWorkflowOptions;
}());
exports.BpWorkflowOptions = BpWorkflowOptions;
//# sourceMappingURL=bp-workflow-options.js.map