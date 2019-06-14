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
var router_1 = require("@angular/router");
var bp_service_1 = require("./bp.service");
var BPsComponent = /** @class */ (function () {
    function BPsComponent(bpService, router) {
        this.bpService = bpService;
        this.router = router;
    }
    BPsComponent.prototype.getBPs = function () {
        var _this = this;
        this.bpService
            .getBPs()
            .subscribe(function (bps) { return _this.bps = bps; });
    };
    BPsComponent.prototype.delete = function (bp) {
        var _this = this;
        this.bpService
            .delete(bp.processID)
            .subscribe(function () {
            _this.bps = _this.bps.filter(function (h) { return h !== bp; });
        });
    };
    BPsComponent.prototype.ngOnInit = function () {
        this.getBPs();
    };
    BPsComponent.prototype.edit = function (bp) {
        this.router.navigate(['bpe/bpe-design/detail', bp.processID]);
    };
    BPsComponent.prototype.configure = function (bp) {
        this.router.navigate(['bpe/bpe-design/configure', bp.processID]);
    };
    BPsComponent.prototype.create = function () {
        this.router.navigate(['bpe/bpe-design/create']);
    };
    BPsComponent = __decorate([
        core_1.Component({
            selector: 'my-bps',
            templateUrl: './bps.component.html'
        }),
        __metadata("design:paramtypes", [bp_service_1.BPService,
            router_1.Router])
    ], BPsComponent);
    return BPsComponent;
}());
exports.BPsComponent = BPsComponent;
//# sourceMappingURL=bps.component.js.map