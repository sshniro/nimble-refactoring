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
var catalogue_line_1 = require("../../model/publish/catalogue-line");
var forms_1 = require("@angular/forms");
var binary_object_1 = require("../../model/publish/binary-object");
var utils_1 = require("../../../common/utils");
/**
 * Created by suat on 24-Oct-17.
 */
var CatalogueLineHeaderComponent = /** @class */ (function () {
    function CatalogueLineHeaderComponent() {
        this.PROPERTY_BLOCK_FIELD_NAME = "name";
        this.PROPERTY_BLOCK_FIELD_PROPERTIES = "properties";
        this.PROPERTY_BLOCK_FIELD_PROPERTY_DETAILS = "propertyDetails";
        this.propertyBlockCollapsedStates = new Map();
        // after first three custom properties,check whether the rest is visible or not
        this.showOtherCustomProperties = false;
    }
    CatalogueLineHeaderComponent.prototype.toggleCollapsed = function (blockName) {
        this.propertyBlockCollapsedStates.set(blockName, !this.propertyBlockCollapsedStates.get(blockName));
    };
    CatalogueLineHeaderComponent.prototype.trackByIndex = function (index, item) {
        return index;
    };
    CatalogueLineHeaderComponent.prototype.selectName = function (ip) {
        return utils_1.selectName(ip);
    };
    CatalogueLineHeaderComponent.prototype.selectDescription = function (item) {
        return utils_1.selectDescription(item);
    };
    CatalogueLineHeaderComponent.prototype.addImage = function (event) {
        var fileList = event.target.files;
        if (fileList.length > 0) {
            var images_1 = this.catalogueLine.goodsItem.item.productImage;
            var _loop_1 = function (i) {
                var file = fileList[i];
                var reader = new FileReader();
                reader.onload = function (e) {
                    var base64String = reader.result.split(',').pop();
                    var binaryObject = new binary_object_1.BinaryObject(base64String, file.type, file.name, "", "");
                    images_1.push(binaryObject);
                };
                reader.readAsDataURL(file);
            };
            for (var i = 0; i < fileList.length; i++) {
                _loop_1(i);
            }
        }
    };
    CatalogueLineHeaderComponent.prototype.deleteImage = function (index) {
        if (this.presentationMode == 'edit') {
            this.catalogueLine.goodsItem.item.productImage.splice(index, 1);
        }
    };
    CatalogueLineHeaderComponent.prototype.changeImage = function (index) {
        if (this.presentationMode == 'edit') {
            var x = this.catalogueLine.goodsItem.item.productImage[0];
            this.catalogueLine.goodsItem.item.productImage[0] = this.catalogueLine.goodsItem.item.productImage[index];
            this.catalogueLine.goodsItem.item.productImage[index] = x;
        }
    };
    __decorate([
        core_1.ViewChild('catalogueLineHeaderForm'),
        __metadata("design:type", forms_1.NgForm)
    ], CatalogueLineHeaderComponent.prototype, "catalogueLineHeaderForm", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", catalogue_line_1.CatalogueLine)
    ], CatalogueLineHeaderComponent.prototype, "catalogueLine", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", String)
    ], CatalogueLineHeaderComponent.prototype, "presentationMode", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", forms_1.FormGroup)
    ], CatalogueLineHeaderComponent.prototype, "parentForm", void 0);
    CatalogueLineHeaderComponent = __decorate([
        core_1.Component({
            selector: 'catalogue-line-header',
            templateUrl: './catalogue-line-header.component.html'
        })
    ], CatalogueLineHeaderComponent);
    return CatalogueLineHeaderComponent;
}());
exports.CatalogueLineHeaderComponent = CatalogueLineHeaderComponent;
//# sourceMappingURL=catalogue-line-header.component.js.map