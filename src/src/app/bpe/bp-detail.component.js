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
require("rxjs/add/operator/switchMap");
var core_1 = require("@angular/core");
var router_1 = require("@angular/router");
var common_1 = require("@angular/common");
var bp_1 = require("./model/bp");
var bp_service_1 = require("./bp.service");
var external_diagram_1 = require("./lib/external-diagram");
var BPDetailComponent = /** @class */ (function () {
    function BPDetailComponent(bpService, route, location) {
        this.bpService = bpService;
        this.route = route;
        this.location = location;
        this.isCreatePage = this.location.isCurrentPathEqualTo('/bpe/bpe-design/create');
        if (this.isCreatePage) {
            this.bp = new bp_1.BP('', '', '', '', '', []);
        }
    }
    BPDetailComponent.prototype.ngOnInit = function () {
        var _this = this;
        if (!this.isCreatePage) {
            this.route.paramMap
                .switchMap(function (params) { return _this.bpService.getBP(params.get('processID')); })
                .subscribe(function (bp) { return _this.bp = bp; });
        }
    };
    BPDetailComponent.prototype.ngAfterViewInit = function () {
        var _this = this;
        setTimeout(function () {
            _this.diagram = new external_diagram_1.ExternalDiagram();
            _this.diagram.draw_editable_diagram();
        }, 500);
    };
    BPDetailComponent.prototype.create = function () {
        var _this = this;
        this.bpService.create(this.bp)
            .subscribe(function () { return _this.goBack(); });
    };
    BPDetailComponent.prototype.update = function () {
        var _this = this;
        this.bpService.update(this.bp)
            .subscribe(function () { return _this.goBack(); });
    };
    BPDetailComponent.prototype.goBack = function () {
        this.location.back();
    };
    BPDetailComponent = __decorate([
        core_1.Component({
            selector: 'bp-detail',
            templateUrl: './bp-detail.component.html'
        }),
        __metadata("design:paramtypes", [bp_service_1.BPService,
            router_1.ActivatedRoute,
            common_1.Location])
    ], BPDetailComponent);
    return BPDetailComponent;
}());
exports.BPDetailComponent = BPDetailComponent;
//# sourceMappingURL=bp-detail.component.js.map