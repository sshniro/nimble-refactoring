"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ubl_model_utils_1 = require("../../catalogue/model/ubl-model-utils");
/**
 * Created by suat on 24-Oct-17.
 */
var ActivityVariableParser = /** @class */ (function () {
    function ActivityVariableParser() {
    }
    ActivityVariableParser.getProcessType = function (processVariables) {
        return processVariables[0]["processDefinitionKey"];
    };
    ActivityVariableParser.getTradingPartnerName = function (initialDocument, partyId, processType) {
        if (initialDocument.buyerPartyId == partyId) {
            return ubl_model_utils_1.UBLModelUtils.getPartyDisplayNameForPartyName(initialDocument.sellerPartyName);
        }
        else {
            return ubl_model_utils_1.UBLModelUtils.getPartyDisplayNameForPartyName(initialDocument.buyerPartyName);
        }
    };
    ActivityVariableParser.getUserRole = function (processType, initialDocument, partyId) {
        var buyerId = initialDocument.buyerPartyId;
        var role = buyerId == partyId ? 'buyer' : 'seller';
        return role;
    };
    return ActivityVariableParser;
}());
exports.ActivityVariableParser = ActivityVariableParser;
//# sourceMappingURL=activity-variable-parser.js.map