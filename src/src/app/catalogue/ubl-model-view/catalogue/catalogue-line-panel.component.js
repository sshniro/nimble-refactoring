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
var catalogue_service_1 = require("../../catalogue.service");
var router_1 = require("@angular/router");
var publish_and_aip_service_1 = require("../../publish-and-aip.service");
var category_service_1 = require("../../category/category.service");
var product_wrapper_1 = require("../../../common/product-wrapper");
var company_negotiation_settings_1 = require("../../../user-mgmt/model/company-negotiation-settings");
var utils_1 = require("../../../common/utils");
var company_settings_1 = require("../../../user-mgmt/model/company-settings");
var utils_2 = require("../../../common/utils");
var CatalogueLinePanelComponent = /** @class */ (function () {
    function CatalogueLinePanelComponent(catalogueService, categoryService, publishService, router) {
        this.catalogueService = catalogueService;
        this.categoryService = categoryService;
        this.publishService = publishService;
        this.router = router;
        // check whether catalogue-line-panel should be displayed
        this.show = false;
        this.showChange = new core_1.EventEmitter();
        this.catalogueLineDeleted = new core_1.EventEmitter();
    }
    CatalogueLinePanelComponent.prototype.selectItemName = function (item) {
        return utils_2.selectName(item);
    };
    CatalogueLinePanelComponent.prototype.ngOnInit = function () {
        this.productWrapper = new product_wrapper_1.ProductWrapper(this.catalogueLine, new company_negotiation_settings_1.CompanyNegotiationSettings());
    };
    CatalogueLinePanelComponent.prototype.redirectToEdit = function () {
        this.catalogueService.editCatalogueLine(this.catalogueLine);
        this.publishService.publishMode = 'edit';
        this.publishService.publishingStarted = false;
        this.categoryService.resetSelectedCategories();
        if (utils_1.isLogisticsService(this.catalogueLine))
            this.router.navigate(['catalogue/publish-logistic'], { queryParams: { pg: "single" } });
        else
            this.router.navigate(['catalogue/publish'], { queryParams: { pg: "single" } });
    };
    CatalogueLinePanelComponent.prototype.deleteCatalogueLine = function () {
        this.catalogueLineDeleted.next(null);
    };
    __decorate([
        core_1.Input(),
        __metadata("design:type", catalogue_line_1.CatalogueLine)
    ], CatalogueLinePanelComponent.prototype, "catalogueLine", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", company_settings_1.CompanySettings)
    ], CatalogueLinePanelComponent.prototype, "settings", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", String)
    ], CatalogueLinePanelComponent.prototype, "presentationMode", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Object)
    ], CatalogueLinePanelComponent.prototype, "show", void 0);
    __decorate([
        core_1.Output(),
        __metadata("design:type", Object)
    ], CatalogueLinePanelComponent.prototype, "showChange", void 0);
    __decorate([
        core_1.Output(),
        __metadata("design:type", Object)
    ], CatalogueLinePanelComponent.prototype, "catalogueLineDeleted", void 0);
    CatalogueLinePanelComponent = __decorate([
        core_1.Component({
            selector: 'catalogue-line-panel',
            templateUrl: './catalogue-line-panel.component.html'
        }),
        __metadata("design:paramtypes", [catalogue_service_1.CatalogueService,
            category_service_1.CategoryService,
            publish_and_aip_service_1.PublishService,
            router_1.Router])
    ], CatalogueLinePanelComponent);
    return CatalogueLinePanelComponent;
}());
exports.CatalogueLinePanelComponent = CatalogueLinePanelComponent;
//# sourceMappingURL=catalogue-line-panel.component.js.map