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
var lcpa_detail_modal_component_1 = require("./lcpa-detail-modal.component");
var life_cycle_performance_assessment_details_1 = require("../catalogue/model/publish/life-cycle-performance-assessment-details");
var catalogue_line_1 = require("../catalogue/model/publish/catalogue-line");
var lcpa_input_1 = require("../catalogue/model/publish/lcpa-input");
var ubl_model_utils_1 = require("../catalogue/model/ubl-model-utils");
var ProductLcpaTabComponent = /** @class */ (function () {
    function ProductLcpaTabComponent() {
        this.presentationMode = 'view';
        this.lcpaStatus = new core_1.EventEmitter();
        this.lcpaDetails = new life_cycle_performance_assessment_details_1.LifeCyclePerformanceAssessmentDetails();
    }
    ProductLcpaTabComponent.prototype.ngOnInit = function () {
        if (this.catalogueLine.goodsItem.item.lifeCyclePerformanceAssessmentDetails == null) {
            this.lcpaStatus.emit(true);
            this.catalogueLine.goodsItem.item.lifeCyclePerformanceAssessmentDetails = this.lcpaDetails;
        }
        else {
            this.lcpaDetails = this.catalogueLine.goodsItem.item.lifeCyclePerformanceAssessmentDetails;
            if (this.lcpaDetails.lcpainput == null) {
                this.lcpaDetails.lcpainput = new lcpa_input_1.LCPAInput();
            }
        }
    };
    ProductLcpaTabComponent.prototype.openLcpaDetailsModal = function (event) {
        // prevent navigation on clicking <a> element
        event.preventDefault();
        this.lcpaDetailModal.open();
    };
    ProductLcpaTabComponent.prototype.onDetailSpecified = function (detail) {
        this.catalogueLine.goodsItem.item.lifeCyclePerformanceAssessmentDetails.lcpainput.additionalLCPAInputDetail.push(detail);
    };
    ProductLcpaTabComponent.prototype.onDeleteDetail = function (detailIndex) {
        this.catalogueLine.goodsItem.item.lifeCyclePerformanceAssessmentDetails.lcpainput.additionalLCPAInputDetail.splice(detailIndex, 1);
    };
    ProductLcpaTabComponent.prototype.isVisible = function (quantity) {
        if (this.presentationMode == 'view') {
            if (ubl_model_utils_1.UBLModelUtils.isEmptyQuantity(quantity)) {
                return false;
            }
        }
        return true;
    };
    ProductLcpaTabComponent.prototype.isDisabled = function () {
        return this.disabled || this.presentationMode == 'view';
    };
    ProductLcpaTabComponent.prototype.isEditMode = function () {
        return this.presentationMode == 'edit';
    };
    __decorate([
        core_1.Input(),
        __metadata("design:type", catalogue_line_1.CatalogueLine)
    ], ProductLcpaTabComponent.prototype, "catalogueLine", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Boolean)
    ], ProductLcpaTabComponent.prototype, "disabled", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", String)
    ], ProductLcpaTabComponent.prototype, "presentationMode", void 0);
    __decorate([
        core_1.Output(),
        __metadata("design:type", Object)
    ], ProductLcpaTabComponent.prototype, "lcpaStatus", void 0);
    __decorate([
        core_1.ViewChild(lcpa_detail_modal_component_1.LcpaDetailModalComponent),
        __metadata("design:type", lcpa_detail_modal_component_1.LcpaDetailModalComponent)
    ], ProductLcpaTabComponent.prototype, "lcpaDetailModal", void 0);
    ProductLcpaTabComponent = __decorate([
        core_1.Component({
            selector: "product-lcpa-tab",
            templateUrl: "./product-lcpa-tab.component.html",
            styleUrls: ['./product-lcpa-tab.component.css']
        }),
        __metadata("design:paramtypes", [])
    ], ProductLcpaTabComponent);
    return ProductLcpaTabComponent;
}());
exports.ProductLcpaTabComponent = ProductLcpaTabComponent;
//# sourceMappingURL=product-lcpa-tab.component.js.map