"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var process_variables_1 = require("./process-variables");
var ubl_model_utils_1 = require("../../catalogue/model/ubl-model-utils");
/**
 * Created by suat on 23-Aug-17.
 */
var ModelUtils = /** @class */ (function () {
    function ModelUtils() {
    }
    ModelUtils.createProcessVariables = function (processId, initiatorId, responderId, creatorUserID, content, bpDataService) {
        ubl_model_utils_1.UBLModelUtils.removeHjidFieldsFromObject(content);
        var vars = new process_variables_1.ProcessVariables(processId, initiatorId, responderId, content.id, creatorUserID, bpDataService.relatedProducts, bpDataService.relatedProductCategories, JSON.stringify(content));
        return vars;
    };
    return ModelUtils;
}());
exports.ModelUtils = ModelUtils;
//# sourceMappingURL=model-utils.js.map