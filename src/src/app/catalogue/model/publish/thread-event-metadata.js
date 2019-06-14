"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// TODO move this class to an appropriate package under BP directory
var ThreadEventMetadata = /** @class */ (function () {
    function ThreadEventMetadata(processType, presentableProcessType, processId, startTime, tradingPartner, product, correspondent, processStatus, content, activityVariables, buyer, isRated, isBeingUpdated, // It's true only while the process instance is being updated.
        status, statusText, actionText, formerStep) {
        if (isBeingUpdated === void 0) { isBeingUpdated = false; }
        this.processType = processType;
        this.presentableProcessType = presentableProcessType;
        this.processId = processId;
        this.startTime = startTime;
        this.tradingPartner = tradingPartner;
        this.product = product;
        this.correspondent = correspondent;
        this.processStatus = processStatus;
        this.content = content;
        this.activityVariables = activityVariables;
        this.buyer = buyer;
        this.isRated = isRated;
        this.isBeingUpdated = isBeingUpdated;
        this.status = status;
        this.statusText = statusText;
        this.actionText = actionText;
        this.formerStep = formerStep;
    }
    return ThreadEventMetadata;
}());
exports.ThreadEventMetadata = ThreadEventMetadata;
//# sourceMappingURL=thread-event-metadata.js.map