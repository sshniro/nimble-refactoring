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
var data_channel_routing_module_1 = require("./data-channel-routing.module");
var channel_details_component_1 = require("./channel-details.component");
var DataChannelModule = /** @class */ (function () {
    function DataChannelModule() {
    }
    DataChannelModule = __decorate([
        core_1.NgModule({
            imports: [
                common_1.CommonModule,
                common_module_1.AppCommonModule,
                forms_1.FormsModule,
                http_1.HttpModule,
                forms_1.ReactiveFormsModule,
                data_channel_routing_module_1.DataChannelRoutingModule,
                ng_bootstrap_1.NgbModule.forRoot()
            ],
            declarations: [
                channel_details_component_1.ChannelDetailsComponent
            ],
            exports: [
                channel_details_component_1.ChannelDetailsComponent
            ],
            providers: []
        })
    ], DataChannelModule);
    return DataChannelModule;
}());
exports.DataChannelModule = DataChannelModule;
//# sourceMappingURL=data-channel.module.js.map