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
var simple_search_routing_module_1 = require("./simple-search-routing.module");
// ToDo: Get rid of these dependencies
var catalogue_module_1 = require("../catalogue/catalogue.module");
var bpe_module_1 = require("../bpe/bpe.module");
var simple_search_component_1 = require("./simple-search.component");
var simple_search_form_component_1 = require("./simple-search-form.component");
var SimpleSearchModule = /** @class */ (function () {
    function SimpleSearchModule() {
    }
    SimpleSearchModule = __decorate([
        core_1.NgModule({
            imports: [
                common_1.CommonModule,
                common_module_1.AppCommonModule,
                forms_1.FormsModule,
                forms_1.ReactiveFormsModule,
                http_1.HttpModule,
                simple_search_routing_module_1.SimpleSearchRoutingModule,
                catalogue_module_1.CatalogueModule,
                bpe_module_1.BPEModule,
                ng_bootstrap_1.NgbModule.forRoot()
            ],
            declarations: [
                simple_search_component_1.SimpleSearchComponent,
                simple_search_form_component_1.SimpleSearchFormComponent
            ],
            exports: [
                simple_search_component_1.SimpleSearchComponent,
                simple_search_form_component_1.SimpleSearchFormComponent
            ],
            providers: []
        })
    ], SimpleSearchModule);
    return SimpleSearchModule;
}());
exports.SimpleSearchModule = SimpleSearchModule;
//# sourceMappingURL=simple-search.module.js.map