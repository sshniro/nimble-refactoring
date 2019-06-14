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
var bps_component_1 = require("./bps.component");
var bp_detail_component_1 = require("./bp-detail.component");
var bp_configure_component_1 = require("./bp-configure.component");
var product_bp_options_component_1 = require("./bp-view/product-bp-options.component");
var routes = [
    { path: 'bpe-design/detail/:processID', component: bp_detail_component_1.BPDetailComponent },
    { path: 'bpe-design/create', component: bp_detail_component_1.BPDetailComponent },
    { path: 'bpe-design', component: bps_component_1.BPsComponent },
    { path: 'bpe-design/configure/:processID', component: bp_configure_component_1.BPConfigureComponent },
    { path: 'bpe-exec', component: product_bp_options_component_1.ProductBpOptionsComponent }
];
var BPERoutingModule = /** @class */ (function () {
    function BPERoutingModule() {
    }
    BPERoutingModule = __decorate([
        core_1.NgModule({
            imports: [router_1.RouterModule.forChild(routes)],
            exports: [router_1.RouterModule]
        })
    ], BPERoutingModule);
    return BPERoutingModule;
}());
exports.BPERoutingModule = BPERoutingModule;
//# sourceMappingURL=bpe-routing.module.js.map