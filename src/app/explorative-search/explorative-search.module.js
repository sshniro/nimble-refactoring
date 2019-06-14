"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var forms_1 = require("@angular/forms");
var http_1 = require("@angular/http");
var common_1 = require("@angular/common");
var common_module_1 = require("../common/common.module");
var ng_bootstrap_1 = require("@ng-bootstrap/ng-bootstrap");
var explorative_search_routing_module_1 = require("./explorative-search-routing.module");
var explorative_search_component_1 = require("./explorative-search.component");
var explorative_search_form_component_1 = require("./explorative-search-form.component");
var explorative_search_details_component_1 = require("./explorative-search-details.component");
var explorative_search_filter_component_1 = require("./explorative-search-filter.component");
var explorative_search_semantic_component_1 = require("./explorative-search-semantic.component");
//import { ExplorativeSearchService } from './explorative-search.service';
var ExplorativeSearchModule = /** @class */ (function () {
    function ExplorativeSearchModule() {
    }
    ExplorativeSearchModule = __decorate([
        core_1.NgModule({
            imports: [
                common_1.CommonModule,
                common_module_1.AppCommonModule,
                forms_1.FormsModule,
                forms_1.ReactiveFormsModule,
                http_1.HttpModule,
                explorative_search_routing_module_1.ExplorativeSearchRoutingModule,
                ng_bootstrap_1.NgbModule.forRoot()
            ],
            declarations: [
                explorative_search_component_1.ExplorativeSearchComponent,
                explorative_search_form_component_1.ExplorativeSearchFormComponent,
                explorative_search_details_component_1.ExplorativeSearchDetailsComponent,
                explorative_search_filter_component_1.ExplorativeSearchFilterComponent,
                explorative_search_semantic_component_1.ExplorativeSearchSemanticComponent
            ],
            exports: [
                explorative_search_component_1.ExplorativeSearchComponent,
                explorative_search_form_component_1.ExplorativeSearchFormComponent,
                explorative_search_details_component_1.ExplorativeSearchDetailsComponent,
                explorative_search_filter_component_1.ExplorativeSearchFilterComponent,
                explorative_search_semantic_component_1.ExplorativeSearchSemanticComponent
            ],
            providers: [],
            entryComponents: []
        })
    ], ExplorativeSearchModule);
    return ExplorativeSearchModule;
}());
exports.ExplorativeSearchModule = ExplorativeSearchModule;
//# sourceMappingURL=explorative-search.module.js.map