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
var catalogue_line_1 = require("../model/publish/catalogue-line");
var track_and_trace_details_1 = require("../model/publish/track-and-trace-details");
var ProductTrackAndTraceTabComponent = /** @class */ (function () {
    function ProductTrackAndTraceTabComponent() {
    }
    ProductTrackAndTraceTabComponent.prototype.ngOnInit = function () {
        // nothing for now
        if (this.catalogueLine.goodsItem.item.trackAndTraceDetails == null) {
            this.catalogueLine.goodsItem.item.trackAndTraceDetails = new track_and_trace_details_1.TrackAndTraceDetails();
        }
    };
    __decorate([
        core_1.Input(),
        __metadata("design:type", catalogue_line_1.CatalogueLine)
    ], ProductTrackAndTraceTabComponent.prototype, "catalogueLine", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Boolean)
    ], ProductTrackAndTraceTabComponent.prototype, "disabled", void 0);
    ProductTrackAndTraceTabComponent = __decorate([
        core_1.Component({
            selector: "product-track-and-trace-tab",
            templateUrl: "./product-track-and-trace-tab.component.html"
        }),
        __metadata("design:paramtypes", [])
    ], ProductTrackAndTraceTabComponent);
    return ProductTrackAndTraceTabComponent;
}());
exports.ProductTrackAndTraceTabComponent = ProductTrackAndTraceTabComponent;
//# sourceMappingURL=product-track-and-trace-tab.component.js.map