"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var CollaborationGroup = /** @class */ (function () {
    function CollaborationGroup(id, status, name, archived, isArchiveable, associatedProcessInstanceGroups) {
        if (id === void 0) { id = ""; }
        if (name === void 0) { name = ""; }
        if (archived === void 0) { archived = false; }
        if (isArchiveable === void 0) { isArchiveable = false; }
        this.id = id;
        this.status = status;
        this.name = name;
        this.archived = archived;
        this.isArchiveable = isArchiveable;
        this.associatedProcessInstanceGroups = associatedProcessInstanceGroups;
    }
    return CollaborationGroup;
}());
exports.CollaborationGroup = CollaborationGroup;
//# sourceMappingURL=collaboration-group.js.map