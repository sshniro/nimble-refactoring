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
var product_wrapper_1 = require("../common/product-wrapper");
var bp_workflow_options_1 = require("../bpe/model/bp-workflow-options");
var utils_1 = require("../common/utils");
var ubl_model_utils_1 = require("../catalogue/model/ubl-model-utils");
var category_service_1 = require("../catalogue/category/category.service");
var catalogue_service_1 = require("../catalogue/catalogue.service");
var call_status_1 = require("../common/call-status");
var router_1 = require("@angular/router");
var ng_bootstrap_1 = require("@ng-bootstrap/ng-bootstrap");
var ProductDetailsOverviewComponent = /** @class */ (function () {
    function ProductDetailsOverviewComponent(categoryService, catalogueService, modalService, route, router) {
        this.categoryService = categoryService;
        this.catalogueService = catalogueService;
        this.modalService = modalService;
        this.route = route;
        this.router = router;
        this.compStatus = new core_1.EventEmitter();
        this.selectedImage = 0;
        this.manufacturerPartyName = null;
        this.getClassificationNamesStatus = new call_status_1.CallStatus();
        this.productCatalogueNameRetrievalStatus = new call_status_1.CallStatus();
        this.classificationNames = [];
        this.productId = "";
        this.selectPreferredValue = utils_1.selectPreferredValue;
        this.catalogueId = "";
        this.catalogueName = "";
        this.zoomedImgURL = "";
    }
    ProductDetailsOverviewComponent.prototype.ngOnInit = function () {
        var _this = this;
        if (this.wrapper) {
            this.manufacturerPartyName = ubl_model_utils_1.UBLModelUtils.getPartyDisplayName(this.wrapper.item.manufacturerParty);
        }
        /*
            Cache FurnitureOntology categories. Then, use cached categories to get correct category label according
            to the default language of the browser.
         */
        this.getClassificationNamesStatus.submit();
        var classifications = this.getClassifications();
        var categoryUris = [];
        if (classifications.length > 0) {
            for (var _i = 0, _a = this.wrapper.item.commodityClassification; _i < _a.length; _i++) {
                var classification = _a[_i];
                categoryUris.push(classification.itemClassificationCode.uri);
            }
            this.classificationNames = [];
            this.categoryService.getCategories(categoryUris).then(function (response) {
                for (var _i = 0, _a = response.result; _i < _a.length; _i++) {
                    var category = _a[_i];
                    _this.classificationNames.push(utils_1.selectNameFromLabelObject(category.label));
                }
                // sort labels
                _this.classificationNames.sort(function (c1, c2) { return c1.localeCompare(c2); });
                _this.getClassificationNamesStatus.callback(null, true);
            }).catch(function (error) {
                _this.getClassificationNamesStatus.error("Failed to get classification names", error);
            });
        }
        this.route.queryParams.subscribe(function (params) {
            if (params["id"]) {
                _this.productId = params["id"];
            }
            else {
                _this.productId = _this.wrapper.item.manufacturersItemIdentification.id;
            }
            if (params["catalogueId"]) {
                _this.catalogueId = params["catalogueId"];
            }
            else {
                _this.catalogueId = _this.wrapper.item.catalogueDocumentReference.id;
            }
            _this.productCatalogueNameRetrievalStatus.submit();
            _this.catalogueService.getCatalogueFromUuid(_this.catalogueId)
                .then(function (res) {
                _this.catalogueName = res.id;
                _this.productCatalogueNameRetrievalStatus.callback("Successfully loaded catalogue name", true);
            })
                .catch(function (err) {
                _this.productCatalogueNameRetrievalStatus.error('Failed to get product catalogue');
            });
        });
    };
    ProductDetailsOverviewComponent.prototype.getClassifications = function () {
        if (!this.wrapper) {
            return [];
        }
        return this.wrapper.item.commodityClassification
            .filter(function (c) { return c.itemClassificationCode.listID != 'Default'; });
    };
    ProductDetailsOverviewComponent.prototype.onTogglePropertyValue = function (property, valueIndex) {
        if (this.options) {
            this.options.selectedValues[utils_1.getPropertyKey(property)] = valueIndex;
        }
    };
    ProductDetailsOverviewComponent.prototype.selectName = function (ip) {
        return utils_1.selectName(ip);
    };
    ProductDetailsOverviewComponent.prototype.onSelectImage = function (index) {
        this.selectedImage = index;
        if (!this.wrapper) {
            return;
        }
        if (this.selectedImage < 0) {
            this.selectedImage = this.wrapper.item.productImage.length - 1;
        }
        // also works if productImage.length === 0
        if (this.selectedImage >= this.wrapper.item.productImage.length) {
            this.selectedImage = 0;
        }
    };
    ProductDetailsOverviewComponent.prototype.navigateImages = function (index, length) {
        if (index < 0) {
            return length - 1;
        }
        else if (index < length) {
            return index;
        }
        else if (index >= length) {
            return 0;
        }
    };
    ProductDetailsOverviewComponent.prototype.isPropertyValueSelected = function (property, valueIndex) {
        if (!this.options) {
            return false;
        }
        var selected = null;
        // if there is no selected index for the given property, we should set it to 0.
        // it is important since we will calculate price options according to the selected properties
        if (this.options.selectedValues[utils_1.getPropertyKey(property)]) {
            selected = this.options.selectedValues[utils_1.getPropertyKey(property)];
            // here, we do not need to update options.selectedValues since onTogglePropertyValue function will handle this.
        }
        else {
            selected = 0;
            this.options.selectedValues[utils_1.getPropertyKey(property)] = 0;
        }
        return valueIndex === selected;
    };
    ProductDetailsOverviewComponent.prototype.getValuesAsString = function (property) {
        return utils_1.getPropertyValuesAsStrings(property);
    };
    ProductDetailsOverviewComponent.prototype.openCompTab = function () {
        this.compStatus.emit(true);
    };
    ProductDetailsOverviewComponent.prototype.open = function (content) {
        this.zoomedImgURL = "data:" + this.wrapper.item.productImage[this.selectedImage].mimeCode + ";base64," + this.wrapper.item.productImage[this.selectedImage].value;
        this.modalService.open(content);
    };
    __decorate([
        core_1.Input(),
        __metadata("design:type", product_wrapper_1.ProductWrapper)
    ], ProductDetailsOverviewComponent.prototype, "wrapper", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", bp_workflow_options_1.BpWorkflowOptions)
    ], ProductDetailsOverviewComponent.prototype, "options", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Boolean)
    ], ProductDetailsOverviewComponent.prototype, "readonly", void 0);
    __decorate([
        core_1.Output(),
        __metadata("design:type", Object)
    ], ProductDetailsOverviewComponent.prototype, "compStatus", void 0);
    ProductDetailsOverviewComponent = __decorate([
        core_1.Component({
            selector: 'product-details-overview',
            templateUrl: './product-details-overview.component.html',
            styleUrls: ['./product-details-overview.component.css']
        }),
        __metadata("design:paramtypes", [category_service_1.CategoryService,
            catalogue_service_1.CatalogueService,
            ng_bootstrap_1.NgbModal,
            router_1.ActivatedRoute,
            router_1.Router])
    ], ProductDetailsOverviewComponent);
    return ProductDetailsOverviewComponent;
}());
exports.ProductDetailsOverviewComponent = ProductDetailsOverviewComponent;
//# sourceMappingURL=product-details-overview.component.js.map