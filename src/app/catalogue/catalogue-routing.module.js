"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var router_1 = require("@angular/router");
var category_search_component_1 = require("./category/category-search.component");
var product_publish_component_1 = require("./publish/product-publish.component");
var catalogue_view_component_1 = require("./ubl-model-view/catalogue/catalogue-view.component");
var publish_deactivate_guard_service_1 = require("./publish-deactivate-guard.service");
var category_deactivate_guard_service_1 = require("./category/category-deactivate-guard.service");
var logistic_service_publish_component_1 = require("./publish/logistic-service-publish.component");
var logistic_publish_deactivate_guard_service_1 = require("./logistic-publish-deactivate-guard.service");
var routes = [
    { path: "categorysearch", component: category_search_component_1.CategorySearchComponent, canDeactivate: [category_deactivate_guard_service_1.CategoryDeactivateGuardService] },
    { path: "publish", component: product_publish_component_1.ProductPublishComponent, canDeactivate: [publish_deactivate_guard_service_1.PublishDeactivateGuardService] },
    { path: "publish-logistic", component: logistic_service_publish_component_1.LogisticServicePublishComponent, canDeactivate: [logistic_publish_deactivate_guard_service_1.LogisticPublishDeactivateGuardService] },
    { path: "catalogue", component: catalogue_view_component_1.CatalogueViewComponent }
];
var CatalogueRoutingModule = /** @class */ (function () {
    function CatalogueRoutingModule() {
    }
    CatalogueRoutingModule = __decorate([
        core_1.NgModule({
            imports: [router_1.RouterModule.forChild(routes)],
            exports: [router_1.RouterModule]
        })
    ], CatalogueRoutingModule);
    return CatalogueRoutingModule;
}());
exports.CatalogueRoutingModule = CatalogueRoutingModule;
//# sourceMappingURL=catalogue-routing.module.js.map