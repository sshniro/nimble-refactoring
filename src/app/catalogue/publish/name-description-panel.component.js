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
var text_1 = require("../model/publish/text");
var constants_1 = require("../model/constants");
var ng_bootstrap_1 = require("@ng-bootstrap/ng-bootstrap");
var binary_object_1 = require("../model/publish/binary-object");
var NameDescriptionPanelComponent = /** @class */ (function () {
    function NameDescriptionPanelComponent(modalService) {
        this.modalService = modalService;
    }
    NameDescriptionPanelComponent.prototype.ngOnInit = function () {
    };
    NameDescriptionPanelComponent.prototype.addItemNameDescription = function () {
        var newItemName = new text_1.Text("", constants_1.DEFAULT_LANGUAGE());
        var newItemDescription = new text_1.Text("", constants_1.DEFAULT_LANGUAGE());
        this.catalogueLine.goodsItem.item.name.push(newItemName);
        this.catalogueLine.goodsItem.item.description.push(newItemDescription);
    };
    NameDescriptionPanelComponent.prototype.deleteItemNameDescription = function (index) {
        this.catalogueLine.goodsItem.item.name.splice(index, 1);
        this.catalogueLine.goodsItem.item.description.splice(index, 1);
    };
    NameDescriptionPanelComponent.prototype.onRemoveImage = function (index) {
        this.catalogueLine.goodsItem.item.productImage.splice(index, 1);
    };
    NameDescriptionPanelComponent.prototype.onClickImageRecommendations = function (content) {
        this.modalService.open(content);
    };
    NameDescriptionPanelComponent.prototype.onAddImage = function (event) {
        var fileList = event.target.files;
        if (fileList.length > 0) {
            var images_1 = this.catalogueLine.goodsItem.item.productImage;
            var _loop_1 = function (i) {
                var file = fileList[i];
                var filesize = parseInt(((file.size / 1024) / 1024).toFixed(4));
                if (filesize <= 5) {
                    var reader_1 = new FileReader();
                    reader_1.onload = function (e) {
                        var base64String = reader_1.result.split(',').pop();
                        var binaryObject = new binary_object_1.BinaryObject(base64String, file.type, file.name, "", "");
                        images_1.push(binaryObject);
                    };
                    reader_1.readAsDataURL(file);
                }
                else {
                    alert("Maximum allowed filesize: 5 MB");
                }
            };
            for (var i = 0; i < fileList.length; i++) {
                _loop_1(i);
            }
        }
    };
    /**
     * Input is bound to the manufacturersItemIdentification.id . Copy it to the line id
     */
    NameDescriptionPanelComponent.prototype.onLineIdChange = function () {
        this.catalogueLine.id = this.catalogueLine.goodsItem.item.manufacturersItemIdentification.id;
    };
    __decorate([
        core_1.Input(),
        __metadata("design:type", Object)
    ], NameDescriptionPanelComponent.prototype, "catalogueLine", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Object)
    ], NameDescriptionPanelComponent.prototype, "productIdEditable", void 0);
    NameDescriptionPanelComponent = __decorate([
        core_1.Component({
            selector: "name-description-panel",
            templateUrl: "./name-description-panel.component.html",
            styleUrls: ["./name-description-panel.component.css"]
        }),
        __metadata("design:paramtypes", [ng_bootstrap_1.NgbModal])
    ], NameDescriptionPanelComponent);
    return NameDescriptionPanelComponent;
}());
exports.NameDescriptionPanelComponent = NameDescriptionPanelComponent;
//# sourceMappingURL=name-description-panel.component.js.map