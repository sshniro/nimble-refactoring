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
var binary_object_1 = require("../catalogue/model/publish/binary-object");
var catalogue_service_1 = require("../catalogue/catalogue.service");
var FileInputComponent = /** @class */ (function () {
    function FileInputComponent(catalogueService) {
        this.catalogueService = catalogueService;
        this.visible = true;
        this.disabled = false;
        this.presentationMode = "edit";
        this.labelClass = "col-3";
        this.labelMainClass = "";
        this.rowClass = "";
        this.placeholder = "Choose a file...";
        this.small = false;
        this.accept = "*/*";
        this.multiple = false;
        this.maxSize = 1;
        this.onSelectFile = new core_1.EventEmitter();
        this.onClearFile = new core_1.EventEmitter();
        this.onRemovingEmit = new core_1.EventEmitter();
        this.binaryObjects = [];
    }
    FileInputComponent.prototype.ngOnInit = function () {
        if (!this.valueClass) {
            this.valueClass = this.label ? "col-9" : "col-12";
        }
    };
    FileInputComponent.prototype.onChooseFile = function (event) {
        var fileList = event.target.files;
        var file = fileList.length > 0 ? fileList[0] : null;
        // reset the input
        event.target.value = "";
        if (file) {
            var filesize = parseInt(((file.size / 1024) / 1024).toFixed(4));
            if (filesize < this.maxSize) {
                var reader_1 = new FileReader();
                var self_1 = this;
                reader_1.onload = function () {
                    var base64String = reader_1.result.split(',').pop();
                    var binaryObject = new binary_object_1.BinaryObject(base64String, file.type, file.name, "", "");
                    self_1.binaryObjects.push(binaryObject);
                    self_1.onSelectFile.emit(binaryObject);
                };
                reader_1.readAsDataURL(file);
            }
            else {
                alert("Maximum allowed filesize: " + this.maxSize + " MB");
            }
        }
    };
    FileInputComponent.prototype.onRemoveFile = function (index) {
        var removed = this.binaryObjects.splice(index, 1);
        if (removed.length > 0) {
            this.onClearFile.emit(removed[0]);
            this.onRemovingEmit.emit(true);
        }
    };
    FileInputComponent.prototype.onDownloadFile = function (file, event) {
        event.preventDefault();
        this.catalogueService.getBinaryObject(file.uri).then(function (binaryObject) {
            var binaryString = window.atob(binaryObject.value);
            var binaryLen = binaryString.length;
            var bytes = new Uint8Array(binaryLen);
            for (var i = 0; i < binaryLen; i++) {
                var ascii = binaryString.charCodeAt(i);
                bytes[i] = ascii;
            }
            var a = document.createElement("a");
            document.body.appendChild(a);
            var blob = new Blob([bytes], { type: binaryObject.mimeCode });
            var url = window.URL.createObjectURL(blob);
            a.href = url;
            a.download = binaryObject.fileName;
            a.click();
            window.URL.revokeObjectURL(url);
        }).catch(function (error) {
            console.error("Failed to download the file", error);
        });
    };
    FileInputComponent.prototype.getFileClasses = function () {
        return {
            "no-file": true,
            disabled: this.disabled
        };
    };
    FileInputComponent.prototype.isShowingInput = function () {
        return this.presentationMode === 'edit'
            && (this.multiple || this.binaryObjects.length === 0);
    };
    __decorate([
        core_1.Input(),
        __metadata("design:type", Boolean)
    ], FileInputComponent.prototype, "visible", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Boolean)
    ], FileInputComponent.prototype, "disabled", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", String)
    ], FileInputComponent.prototype, "presentationMode", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", String)
    ], FileInputComponent.prototype, "label", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", String)
    ], FileInputComponent.prototype, "definition", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", String)
    ], FileInputComponent.prototype, "labelClass", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", String)
    ], FileInputComponent.prototype, "labelMainClass", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", String)
    ], FileInputComponent.prototype, "rowClass", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", String)
    ], FileInputComponent.prototype, "valueClass", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", String)
    ], FileInputComponent.prototype, "placeholder", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Boolean)
    ], FileInputComponent.prototype, "small", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", String)
    ], FileInputComponent.prototype, "accept", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Boolean)
    ], FileInputComponent.prototype, "multiple", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Number)
    ], FileInputComponent.prototype, "maxSize", void 0);
    __decorate([
        core_1.Output(),
        __metadata("design:type", core_1.EventEmitter)
    ], FileInputComponent.prototype, "onSelectFile", void 0);
    __decorate([
        core_1.Output(),
        __metadata("design:type", core_1.EventEmitter)
    ], FileInputComponent.prototype, "onClearFile", void 0);
    __decorate([
        core_1.Output(),
        __metadata("design:type", core_1.EventEmitter)
    ], FileInputComponent.prototype, "onRemovingEmit", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Array)
    ], FileInputComponent.prototype, "binaryObjects", void 0);
    FileInputComponent = __decorate([
        core_1.Component({
            selector: "file-input",
            templateUrl: "./file-input.component.html",
            styleUrls: ["./file-input.component.css"],
        }),
        __metadata("design:paramtypes", [catalogue_service_1.CatalogueService])
    ], FileInputComponent);
    return FileInputComponent;
}());
exports.FileInputComponent = FileInputComponent;
//# sourceMappingURL=file-input.component.js.map