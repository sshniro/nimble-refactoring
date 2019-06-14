"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var attachment_1 = require("../model/publish/attachment");
var document_reference_1 = require("../model/publish/document-reference");
var NoteFileViewComponent = /** @class */ (function () {
    function NoteFileViewComponent() {
        this.readonly = true;
        this.firstCol = "col-3";
        this.secondCol = null; // negotiation request
        this.thirdCol = null; // special case for negotiation response
        this.lastCol = "col-9";
    }
    NoteFileViewComponent.prototype.ngOnInit = function () {
        if (this.documents) {
            this.files = this.documents.filter(function (doc) { return doc.attachment != null; }).map(function (doc) { return doc.attachment.embeddedDocumentBinaryObject; });
        }
        if (this.requestDocuments) {
            this.requestFiles = this.requestDocuments.filter(function (doc) { return doc.attachment != null; }).map(function (doc) { return doc.attachment.embeddedDocumentBinaryObject; });
        }
    };
    NoteFileViewComponent.prototype.onRemoveNote = function (index) {
        this.notes.splice(index, 1);
    };
    NoteFileViewComponent.prototype.onAddNote = function () {
        this.notes.push("");
    };
    NoteFileViewComponent.prototype.setNote = function (index, event) {
        this.notes[index] = event.target.value;
    };
    NoteFileViewComponent.prototype.onSelectFile = function (binaryObject) {
        var document = new document_reference_1.DocumentReference();
        var attachment = new attachment_1.Attachment();
        attachment.embeddedDocumentBinaryObject = binaryObject;
        document.attachment = attachment;
        this.documents.push(document);
    };
    NoteFileViewComponent.prototype.onUnSelectFile = function (binaryObject) {
        var index = this.documents.findIndex(function (doc) { return doc.attachment.embeddedDocumentBinaryObject === binaryObject; });
        if (index >= 0) {
            this.documents.splice(index, 1);
        }
    };
    __decorate([
        core_1.Input(),
        __metadata("design:type", Array)
    ], NoteFileViewComponent.prototype, "notes", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Array)
    ], NoteFileViewComponent.prototype, "requestNotes", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Boolean)
    ], NoteFileViewComponent.prototype, "readonly", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", String)
    ], NoteFileViewComponent.prototype, "label", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", String)
    ], NoteFileViewComponent.prototype, "firstCol", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", String)
    ], NoteFileViewComponent.prototype, "secondCol", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", String)
    ], NoteFileViewComponent.prototype, "thirdCol", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", String)
    ], NoteFileViewComponent.prototype, "lastCol", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Array)
    ], NoteFileViewComponent.prototype, "documents", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Array)
    ], NoteFileViewComponent.prototype, "requestDocuments", void 0);
    NoteFileViewComponent = __decorate([
        core_1.Component({
            selector: 'note-file-view',
            templateUrl: './note-file-view.component.html'
        })
    ], NoteFileViewComponent);
    return NoteFileViewComponent;
}());
exports.NoteFileViewComponent = NoteFileViewComponent;
//# sourceMappingURL=note-file-view.component.js.map