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
var ng_bootstrap_1 = require("@ng-bootstrap/ng-bootstrap");
var multi_type_value_1 = require("../catalogue/model/publish/multi-type-value");
var quantity_1 = require("../catalogue/model/publish/quantity");
var text_1 = require("../catalogue/model/publish/text");
var LcpaDetailModalComponent = /** @class */ (function () {
    function LcpaDetailModalComponent(modalService) {
        this.modalService = modalService;
        this.valueAdded = new core_1.EventEmitter();
        this.lcpaInputDetail = new multi_type_value_1.MultiTypeValue();
        this.presentationMode = "edit";
        this.valueQualifiers = [
            { name: "Text", value: "STRING" },
            { name: "Quantity", value: "QUANTITY" },
        ];
    }
    LcpaDetailModalComponent.prototype.open = function () {
        this.lcpaInputDetail = new multi_type_value_1.MultiTypeValue();
        this.lcpaInputDetail.valueQuantity.push(new quantity_1.Quantity());
        this.lcpaInputDetail.valueDecimal.push(undefined);
        this.lcpaInputDetail.value.push(new text_1.Text());
        this.modalService.open(this.modal);
    };
    LcpaDetailModalComponent.prototype.addDetail = function (c) {
        this.valueAdded.emit(this.lcpaInputDetail);
        c();
    };
    __decorate([
        core_1.ViewChild("modal"),
        __metadata("design:type", core_1.ElementRef)
    ], LcpaDetailModalComponent.prototype, "modal", void 0);
    __decorate([
        core_1.Output(),
        __metadata("design:type", Object)
    ], LcpaDetailModalComponent.prototype, "valueAdded", void 0);
    LcpaDetailModalComponent = __decorate([
        core_1.Component({
            selector: "lcpa-detail-modal",
            templateUrl: "./lcpa-detail-modal.component.html"
        }),
        __metadata("design:paramtypes", [ng_bootstrap_1.NgbModal])
    ], LcpaDetailModalComponent);
    return LcpaDetailModalComponent;
}());
exports.LcpaDetailModalComponent = LcpaDetailModalComponent;
//# sourceMappingURL=lcpa-detail-modal.component.js.map