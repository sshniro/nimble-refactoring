"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var BpActivityEvent = /** @class */ (function () {
    function BpActivityEvent(userRole, processType, containerGroupId, // identifier of the business process instance group which contains the new process being initiated
        collaborationGroupId, // identifier of the collaboration group which process instance group belongs to
        processHistory, // business processes history. if an existing business process continues, the history contains the current step also
        workflowOptions, // selected properties of the product (in the search-details page) and negotiation details (in negotiation request page)
        newProcess, // true indicates that a new process is about the to be started
        formerProcess // true indicates that the process has subsequent processes in the history
    ) {
        if (userRole === void 0) { userRole = null; }
        if (processType === void 0) { processType = null; }
        if (containerGroupId === void 0) { containerGroupId = null; }
        if (collaborationGroupId === void 0) { collaborationGroupId = null; }
        if (processHistory === void 0) { processHistory = []; }
        if (workflowOptions === void 0) { workflowOptions = null; }
        if (newProcess === void 0) { newProcess = null; }
        if (formerProcess === void 0) { formerProcess = null; } // true indicates that the process has subsequent processes in the history
        this.userRole = userRole;
        this.processType = processType;
        this.containerGroupId = containerGroupId;
        this.collaborationGroupId = collaborationGroupId;
        this.processHistory = processHistory;
        this.workflowOptions = workflowOptions;
        this.newProcess = newProcess;
        this.formerProcess = formerProcess; // true indicates that the process has subsequent processes in the history
    }
    return BpActivityEvent;
}());
exports.BpActivityEvent = BpActivityEvent;
//# sourceMappingURL=bp-start-event.js.map