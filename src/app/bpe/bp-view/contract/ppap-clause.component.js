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
var ppap_response_1 = require("../../../catalogue/model/publish/ppap-response");
var PpapClauseComponent = /** @class */ (function () {
    function PpapClauseComponent() {
    }
    PpapClauseComponent.prototype.ngOnInit = function () {
    };
    PpapClauseComponent.prototype.downloadFile = function (doc, event) {
        event.preventDefault();
        var binaryString = window.atob(doc.attachment.embeddedDocumentBinaryObject.value);
        var binaryLen = binaryString.length;
        var bytes = new Uint8Array(binaryLen);
        for (var i = 0; i < binaryLen; i++) {
            var ascii = binaryString.charCodeAt(i);
            bytes[i] = ascii;
        }
        var a = document.createElement("a");
        document.body.appendChild(a);
        var blob = new Blob([bytes], { type: doc.attachment.embeddedDocumentBinaryObject.mimeCode });
        var url = window.URL.createObjectURL(blob);
        a.href = url;
        a.download = doc.attachment.embeddedDocumentBinaryObject.fileName;
        a.click();
        window.URL.revokeObjectURL(url);
    };
    __decorate([
        core_1.Input(),
        __metadata("design:type", ppap_response_1.PpapResponse)
    ], PpapClauseComponent.prototype, "ppapResponse", void 0);
    PpapClauseComponent = __decorate([
        core_1.Component({
            selector: 'ppap-clause',
            templateUrl: './ppap-clause.component.html'
        }),
        __metadata("design:paramtypes", [])
    ], PpapClauseComponent);
    return PpapClauseComponent;
}());
exports.PpapClauseComponent = PpapClauseComponent;
//# sourceMappingURL=ppap-clause.component.js.map