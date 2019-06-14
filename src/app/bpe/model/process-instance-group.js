"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Created by suat on 05-Mar-18.
 */
var ProcessInstanceGroup = /** @class */ (function () {
    function ProcessInstanceGroup(id, status, name, partyID, processInstanceIDs, archived, collaborationRole, associatedGroups) {
        if (id === void 0) { id = ""; }
        if (partyID === void 0) { partyID = ""; }
        if (archived === void 0) { archived = false; }
        if (collaborationRole === void 0) { collaborationRole = ""; }
        this.id = id;
        this.status = status;
        this.name = name;
        this.partyID = partyID;
        this.processInstanceIDs = processInstanceIDs;
        this.archived = archived;
        this.collaborationRole = collaborationRole;
        this.associatedGroups = associatedGroups;
    }
    return ProcessInstanceGroup;
}());
exports.ProcessInstanceGroup = ProcessInstanceGroup;
//# sourceMappingURL=process-instance-group.js.map