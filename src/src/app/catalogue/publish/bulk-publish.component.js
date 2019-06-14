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
var call_status_1 = require("../../common/call-status");
var constants_1 = require("../model/constants");
var category_service_1 = require("../category/category.service");
var catalogue_service_1 = require("../catalogue.service");
var ng2_cookies_1 = require("ng2-cookies");
var product_publish_component_1 = require("./product-publish.component");
var router_1 = require("@angular/router");
/**
 * Created by suat on 20-Mar-19.
 */
var BulkPublishComponent = /** @class */ (function () {
    function BulkPublishComponent(categoryService, catalogueService, router, cookieService) {
        this.categoryService = categoryService;
        this.catalogueService = catalogueService;
        this.router = router;
        this.cookieService = cookieService;
        this.publishStatus = new call_status_1.CallStatus();
        this.showCategoryWarning = false;
        this.uploadPublishStatus = [];
    }
    BulkPublishComponent.prototype.closeCategoryWarning = function () {
        this.showCategoryWarning = false;
    };
    BulkPublishComponent.prototype.checkMode = function (mode) {
        if (mode == "replace") {
            alert("Beware: All previously published items having the same categories specified in the template are deleted and only the new ones are added to the catalogue in replace mode!");
        }
    };
    BulkPublishComponent.prototype.downloadTemplate = function () {
        var _this = this;
        // first check whether there is at leasta one selected category
        if (this.selectCategories.length == 0) {
            this.showCategoryWarning = true;
            return;
        }
        this.publishStatus.submit();
        var userId = this.cookieService.get("user_id");
        var reader = new FileReader();
        this.catalogueService.downloadTemplate(userId, this.categoryService.selectedCategories, constants_1.DEFAULT_LANGUAGE())
            .then(function (result) {
            var link = document.createElement('a');
            link.id = 'downloadLink';
            link.href = window.URL.createObjectURL(result.content);
            link.download = result.fileName;
            document.body.appendChild(link);
            var downloadLink = document.getElementById('downloadLink');
            downloadLink.click();
            document.body.removeChild(downloadLink);
            _this.publishStatus.callback("Download completed");
        }, function (error) {
            _this.publishStatus.error("Download failed");
        });
    };
    BulkPublishComponent.prototype.uploadTemplate = function (event, uploadMode) {
        var catalogueService = this.catalogueService;
        var userId = this.cookieService.get("user_id");
        var fileList = event.target.files;
        if (fileList.length > 0) {
            // initialize one call status for each uploaded file
            this.uploadPublishStatus = [];
            this.selectedFileList = [];
            for (var i = 0; i < fileList.length; i++) {
                this.uploadPublishStatus.push(new call_status_1.CallStatus());
                this.selectedFileList.push(fileList[i]);
            }
            var self_1 = this;
            var callbackCount_1 = 0;
            var errorCount_1 = 0;
            var _loop_1 = function (i) {
                this_1.uploadPublishStatus[i].submit();
                var file = self_1.selectedFileList[i];
                reader = new FileReader();
                reader.onload = function (e) {
                    catalogueService.uploadTemplate(userId, file, uploadMode).then(function (res) {
                        self_1.uploadPublishStatus[i].callback("Uploaded " + file.name + " successfully");
                        product_publish_component_1.ProductPublishComponent.dialogBox = false;
                        self_1.resetEventWhenUploadCompletes(++callbackCount_1, self_1.selectedFileList.length, errorCount_1, event);
                    }, function (error) {
                        errorCount_1++;
                        self_1.uploadPublishStatus[i].error("Failed to upload: " + file.name, error);
                        self_1.resetEventWhenUploadCompletes(++callbackCount_1, self_1.selectedFileList.length, errorCount_1, event);
                    });
                };
                reader.readAsDataURL(self_1.selectedFileList[i]);
            };
            var this_1 = this, reader;
            for (var i = 0; i < this.selectedFileList.length; i++) {
                _loop_1(i);
            }
        }
    };
    BulkPublishComponent.prototype.resetEventWhenUploadCompletes = function (currentCount, totalCount, errorCount, event) {
        if (currentCount == totalCount) {
            event.target.value = "";
            if (errorCount == 0) {
                this.navigateToCatalogueTab();
            }
        }
    };
    BulkPublishComponent.prototype.uploadImagePackage = function (event) {
        this.publishStatus.submit();
        var catalogueService = this.catalogueService;
        var userId = this.cookieService.get("user_id");
        var fileList = event.target.files;
        if (fileList.length > 0) {
            var file_1 = fileList[0];
            var self_2 = this;
            var reader = new FileReader();
            reader.onload = function (e) {
                // reset the target value so that the same file could be chosen more than once
                event.target.value = "";
                catalogueService.uploadZipPackage(file_1).then(function (res) {
                    self_2.publishStatus.callback(res.message);
                }, function (error) {
                    self_2.publishStatus.error("Failed to upload the image package.", error);
                });
            };
            reader.readAsDataURL(file_1);
        }
    };
    BulkPublishComponent.prototype.navigateToCatalogueTab = function () {
        this.router.navigate(['dashboard'], { queryParams: { tab: "CATALOGUE" } });
    };
    __decorate([
        core_1.Input(),
        __metadata("design:type", Array)
    ], BulkPublishComponent.prototype, "selectCategories", void 0);
    BulkPublishComponent = __decorate([
        core_1.Component({
            selector: "bulk-publish",
            templateUrl: "./bulk-publish.component.html",
            styleUrls: ["./bulk-publish.component.css"]
        }),
        __metadata("design:paramtypes", [category_service_1.CategoryService,
            catalogue_service_1.CatalogueService,
            router_1.Router,
            ng2_cookies_1.CookieService])
    ], BulkPublishComponent);
    return BulkPublishComponent;
}());
exports.BulkPublishComponent = BulkPublishComponent;
//# sourceMappingURL=bulk-publish.component.js.map