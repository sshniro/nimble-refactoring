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
var ng2_cookies_1 = require("ng2-cookies");
var catalogue_service_1 = require("../../catalogue.service");
var call_status_1 = require("../../../common/call-status");
var router_1 = require("@angular/router");
var publish_and_aip_service_1 = require("../../publish-and-aip.service");
var category_service_1 = require("../../category/category.service");
var utils_1 = require("../../../common/utils");
var bp_data_service_1 = require("../../../bpe/bp-view/bp-data-service");
var user_service_1 = require("../../../user-mgmt/user.service");
var utils_2 = require("../../../common/utils");
var operators_1 = require("rxjs/operators");
var constants_1 = require("../../model/constants");
var catalogue_1 = require("../../model/publish/catalogue");
var CatalogueViewComponent = /** @class */ (function () {
    function CatalogueViewComponent(cookieService, publishService, catalogueService, categoryService, bpDataService, userService, route, router) {
        var _this = this;
        this.cookieService = cookieService;
        this.publishService = publishService;
        this.catalogueService = catalogueService;
        this.categoryService = categoryService;
        this.bpDataService = bpDataService;
        this.userService = userService;
        this.route = route;
        this.router = router;
        // available catalogue lines with respect to the selected category
        this.catalogueLinesWRTTypes = [];
        // catalogue lines which are available to the user after search operation
        this.catalogueLinesArray = [];
        // categories
        this.categoryNames = [];
        this.selectedCategory = "All";
        // necessary info for pagination
        this.collectionSize = 0;
        this.page = 1;
        // default
        this.pageSize = 10;
        this.addCatalogue = false;
        // check whether catalogue-line-panel should be displayed for a specific catalogue line
        this.catalogueLineView = {};
        this.selectedCatalogue = "all";
        this.catlogueId = "all";
        this.cataloguesIds = [];
        this.sortOption = null;
        this.catalogueText = "";
        this.getCatalogueStatus = new call_status_1.CallStatus();
        this.productCatalogueRetrievalStatus = new call_status_1.CallStatus();
        this.callStatus = new call_status_1.CallStatus();
        this.deleteStatuses = [];
        this.CATALOGUE_LINE_SORT_OPTIONS = constants_1.CATALOGUE_LINE_SORT_OPTIONS;
        this.searchText = "";
        this.search = function (text$) {
            return text$.pipe(operators_1.debounceTime(200), operators_1.distinctUntilChanged(), operators_1.switchMap(function (term) {
                _this.requestCatalogue();
                return [];
            }));
        };
    }
    CatalogueViewComponent.prototype.ngOnInit = function () {
        this.searchText = "";
        this.deleteStatuses = [];
        this.catalogueText = "";
        this.sortOption = null;
        this.cataloguesIds = [];
        this.catlogueId = "all";
        this.selectedCatalogue = "all";
        this.catalogueLinesWRTTypes = [];
        this.catalogueLinesArray = [];
        this.categoryNames = [];
        this.selectedCategory = "All";
        this.collectionSize = 0;
        this.page = 1;
        this.pageSize = 10;
        this.addCatalogue = false;
        this.catalogueLineView = {};
        this.getCatagloueIdsForParty();
        this.catalogueService.setEditMode(false);
        this.sortOption = this.sortOption == null ? constants_1.CATALOGUE_LINE_SORT_OPTIONS[0].name : this.sortOption;
        this.requestCatalogue();
        for (var i = 0; i < this.pageSize; i++) {
            this.deleteStatuses.push(new call_status_1.CallStatus());
        }
    };
    CatalogueViewComponent.prototype.selectName = function (ip) {
        return utils_2.selectName(ip);
    };
    CatalogueViewComponent.prototype.selectDescription = function (item) {
        return utils_2.selectDescription(item);
    };
    CatalogueViewComponent.prototype.changeCat = function () {
        this.catlogueId = this.selectedCatalogue;
        this.requestCatalogue();
    };
    CatalogueViewComponent.prototype.requestCatalogue = function () {
        var _this = this;
        this.getCatalogueStatus.submit();
        var userId = this.cookieService.get("user_id");
        // check whether the user chose a category to filter the catalogue lines
        var categoryName = this.selectedCategory == "All" ? null : this.selectedCategory;
        Promise.all([
            this.catalogueService.getCatalogueResponse(userId, categoryName, this.searchText, this.pageSize, (this.page - 1) * this.pageSize, this.sortOption, this.catlogueId),
            this.getCompanySettings(userId)
        ])
            .then(function (_a) {
            var catalogueResponse = _a[0], settings = _a[1];
            _this.catalogueResponse = catalogueResponse;
            _this.settings = settings;
            _this.init();
            _this.getCatalogueStatus.callback(null, true);
        }, function (error) {
            _this.getCatalogueStatus.error("Failed to get catalogue", error);
        });
    };
    CatalogueViewComponent.prototype.getCompanySettings = function (userId) {
        if (this.settings) {
            return Promise.resolve(this.settings);
        }
        return this.userService.getSettingsForUser(userId);
    };
    CatalogueViewComponent.prototype.init = function () {
        var len = this.catalogueResponse.catalogueLines.length;
        this.categoryNames = this.catalogueResponse.categoryNames;
        this.collectionSize = this.catalogueResponse.size;
        this.catalogueLinesArray = this.catalogueResponse.catalogueLines.slice();
        this.catalogueLinesWRTTypes = this.catalogueLinesArray;
        var i = 0;
        // Initialize catalogueLineView
        for (; i < len; i++) {
            this.catalogueLineView[this.catalogueResponse.catalogueLines[i].id] = false;
        }
    };
    CatalogueViewComponent.prototype.onDeleteCatalogue = function () {
        var _this = this;
        if (confirm("Are you sure that you want to delete your entire catalogue?")) {
            this.callStatus.submit();
            this.catalogueService.deleteCatalogue().then(function (res) {
                _this.callStatus.reset();
                _this.ngOnInit();
            }, function (error) {
                _this.callStatus.error("Failed to delete catalogue", error);
            });
        }
    };
    CatalogueViewComponent.prototype.onAddCatalogue = function () {
        var _this = this;
        var userId = this.cookieService.get("user_id");
        this.userService.getUserParty(userId).then(function (userParty) {
            var catalogue = new catalogue_1.Catalogue(_this.catalogueText, null, userParty, "", "", []);
            // add catalogue line to the end of catalogue
            _this.catalogueService.postCatalogue(catalogue)
                .then(function () {
                _this.catalogueText = "";
                _this.cancelAddingCatalogue();
                _this.ngOnInit();
            })
                .catch(function (err) {
            });
        }).catch(function (err) {
        });
    };
    CatalogueViewComponent.prototype.cancelAddingCatalogue = function () {
        this.addCatalogue = false;
    };
    CatalogueViewComponent.prototype.onAddingCatalogue = function () {
        this.addCatalogue = true;
    };
    CatalogueViewComponent.prototype.onOpenCatalogueLine = function (e) {
        e.stopImmediatePropagation();
    };
    CatalogueViewComponent.prototype.redirectToEdit = function (catalogueLine) {
        var _this = this;
        this.catalogueService.editCatalogueLine(catalogueLine);
        this.publishService.publishMode = 'edit';
        this.publishService.publishingStarted = false;
        this.categoryService.resetSelectedCategories();
        if (this.catlogueId == "all") {
            this.catalogueService.getCatalogueFromUuid(catalogueLine.goodsItem.item.catalogueDocumentReference.id)
                .then(function (res) {
                if (utils_1.isLogisticsService(catalogueLine))
                    _this.router.navigate(['catalogue/publish-logistic'], { queryParams: { cat: res.id, pg: "single" } });
                else
                    _this.router.navigate(['catalogue/publish'], { queryParams: { cat: res.id, pg: "single" } });
            })
                .catch(function (error) {
                if (utils_1.isLogisticsService(catalogueLine))
                    _this.router.navigate(['catalogue/publish-logistic'], { queryParams: { cat: 'default', pg: "single" } });
                else
                    _this.router.navigate(['catalogue/publish'], { queryParams: { cat: 'default', pg: "single" } });
            });
            ;
        }
        else {
            if (utils_1.isLogisticsService(catalogueLine))
                this.router.navigate(['catalogue/publish-logistic'], { queryParams: { cat: this.catlogueId, pg: "single" } });
            else
                this.router.navigate(['catalogue/publish'], { queryParams: { cat: this.catlogueId, pg: "single" } });
        }
    };
    CatalogueViewComponent.prototype.redirectToCopy = function (catalogueLine) {
        var _this = this;
        this.catalogueService.editCatalogueLine(catalogueLine);
        this.publishService.publishMode = 'copy';
        this.publishService.publishingStarted = false;
        this.categoryService.resetSelectedCategories();
        if (this.catlogueId == "all") {
            this.catalogueService.getCatalogueFromUuid(catalogueLine.goodsItem.item.catalogueDocumentReference.id)
                .then(function (res) {
                if (utils_1.isLogisticsService(catalogueLine))
                    _this.router.navigate(['catalogue/publish-logistic'], { queryParams: { cat: res.id, pg: "single" } });
                else
                    _this.router.navigate(['catalogue/publish'], { queryParams: { cat: res.id, pg: "single" } });
            })
                .catch(function (error) {
                if (utils_1.isLogisticsService(catalogueLine))
                    _this.router.navigate(['catalogue/publish-logistic'], { queryParams: { cat: 'default', pg: "single" } });
                else
                    _this.router.navigate(['catalogue/publish'], { queryParams: { cat: 'default', pg: "single" } });
            });
            ;
        }
        else {
            if (utils_1.isLogisticsService(catalogueLine))
                this.router.navigate(['catalogue/publish-logistic'], { queryParams: { cat: this.catlogueId, pg: "single" } });
            else
                this.router.navigate(['catalogue/publish'], { queryParams: { cat: this.catlogueId, pg: "single" } });
        }
    };
    CatalogueViewComponent.prototype.deleteCatalogueLine = function (catalogueLine, i) {
        var _this = this;
        if (confirm("Are you sure that you want to delete this catalogue item?")) {
            var status_1 = this.getDeleteStatus(i);
            status_1.submit();
            var catalogue_uuid = "";
            if (this.catalogueService.catalogueResponse.catalogueUuid === "" || this.catalogueService.catalogueResponse.catalogueUuid == null) {
                catalogue_uuid = catalogueLine.goodsItem.item.catalogueDocumentReference.id;
            }
            else {
                catalogue_uuid = this.catalogueService.catalogueResponse.catalogueUuid;
            }
            this.catalogueService.deleteCatalogueLine(catalogue_uuid, catalogueLine.id)
                .then(function (res) {
                _this.requestCatalogue();
                status_1.callback("Catalogue line deleted", true);
            })
                .catch(function (error) {
                status_1.error("Error while deleting catalogue line");
            });
        }
    };
    CatalogueViewComponent.prototype.getDeleteStatus = function (index) {
        return this.deleteStatuses[index % this.pageSize];
    };
    CatalogueViewComponent.prototype.uploadImagePackage = function (event) {
        this.callStatus.submit();
        var catalogueService = this.catalogueService;
        var fileList = event.target.files;
        if (fileList.length > 0) {
            var file_1 = fileList[0];
            var self_1 = this;
            var reader = new FileReader();
            reader.onload = function (e) {
                // reset the target value so that the same file could be chosen more than once
                event.target.value = "";
                catalogueService.uploadZipPackage(file_1).then(function (res) {
                    if (res.status == 200) {
                        self_1.callStatus.callback(null, true);
                        self_1.requestCatalogue();
                    }
                    else if (res.status == 504) {
                        self_1.callStatus.callback(res.message);
                    }
                }, function (error) {
                    self_1.callStatus.error("Failed to upload the image package.", error);
                });
            };
            reader.readAsDataURL(file_1);
        }
    };
    CatalogueViewComponent.prototype.onExportCatalogue = function () {
        var _this = this;
        this.callStatus.submit();
        this.catalogueService.exportCatalogue(this.catalogueService.catalogueResponse.catalogueUuid)
            .then(function (result) {
            var link = document.createElement('a');
            link.id = 'downloadLink';
            link.href = window.URL.createObjectURL(result.content);
            link.download = result.fileName;
            document.body.appendChild(link);
            var downloadLink = document.getElementById('downloadLink');
            downloadLink.click();
            document.body.removeChild(downloadLink);
            _this.callStatus.callback("Catalogue is exported");
        }, function (error) {
            _this.callStatus.error("Failed to export catalogue");
        });
    };
    CatalogueViewComponent.prototype.deleteAllProductImages = function () {
        var _this = this;
        if (confirm("Are you sure that you want to delete all product images inside the catalogue?")) {
            this.callStatus.submit();
            this.catalogueService.deleteAllProductImagesInsideCatalogue(this.catalogueService.catalogueResponse.catalogueUuid)
                .then(function (res) {
                _this.requestCatalogue();
                _this.callStatus.callback("Product images deleted", true);
            })
                .catch(function (error) {
                _this.callStatus.error("Error while deleting product images");
            });
        }
    };
    CatalogueViewComponent.prototype.navigateToThePublishPage = function () {
        this.router.navigate(['/catalogue/categorysearch']);
    };
    CatalogueViewComponent.prototype.navigateToBulkUploadPage = function () {
        this.router.navigate(["/catalogue/publish"], { queryParams: { pg: 'bulk', productType: 'product' } });
    };
    CatalogueViewComponent.prototype.getCatagloueIdsForParty = function () {
        var _this = this;
        this.productCatalogueRetrievalStatus.submit();
        this.catalogueService.getCatalogueIdsForParty().then(function (catalogueIds) {
            _this.cataloguesIds = catalogueIds;
            _this.productCatalogueRetrievalStatus.callback("Successfully loaded catalogueId list", true);
        }).catch(function (error) {
            _this.productCatalogueRetrievalStatus.error('Failed to get product catalogues');
        });
    };
    CatalogueViewComponent = __decorate([
        core_1.Component({
            selector: 'catalogue-view',
            templateUrl: './catalogue-view.component.html',
            styles: ['.dropdown-toggle:after{content: initial}'],
            providers: [ng2_cookies_1.CookieService]
        }),
        __metadata("design:paramtypes", [ng2_cookies_1.CookieService,
            publish_and_aip_service_1.PublishService,
            catalogue_service_1.CatalogueService,
            category_service_1.CategoryService,
            bp_data_service_1.BPDataService,
            user_service_1.UserService,
            router_1.ActivatedRoute,
            router_1.Router])
    ], CatalogueViewComponent);
    return CatalogueViewComponent;
}());
exports.CatalogueViewComponent = CatalogueViewComponent;
//# sourceMappingURL=catalogue-view.component.js.map