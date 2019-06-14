"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Created by suat on 23-Aug-17.
 */
var ProcessInstance = /** @class */ (function () {
    function ProcessInstance(processInstanceID, processID, creationDate, status) {
        if (processInstanceID === void 0) { processInstanceID = ""; }
        if (processID === void 0) { processID = ""; }
        if (creationDate === void 0) { creationDate = ""; }
        if (status === void 0) { status = ""; }
        this.processInstanceID = processInstanceID;
        this.processID = processID;
        this.creationDate = creationDate;
        this.status = status;
    }
    return ProcessInstance;
}());
exports.ProcessInstance = ProcessInstance;
//# sourceMappingURL=process-instance.js.map