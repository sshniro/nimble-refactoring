"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
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
var catalogue_line_1 = require("../../model/publish/catalogue-line");
var myGlobals = require("../../../globals");
var forms_1 = require("@angular/forms");
var child_form_1 = require("../../child-form");
var publish_and_aip_service_1 = require("../../publish-and-aip.service");
var CatalogueLineViewComponent = /** @class */ (function (_super) {
    __extends(CatalogueLineViewComponent, _super);
    function CatalogueLineViewComponent(publishService) {
        var _this = _super.call(this) || this;
        _this.publishService = publishService;
        _this.fromSearchDetails = false;
        _this.openBpOptionsEvent = new core_1.EventEmitter();
        _this.selectedTab = "Product Details";
        _this.partyRole = "";
        _this.regularProductDetailsForm = new forms_1.FormGroup({});
        _this.transportationServiceDetailsForm = new forms_1.FormGroup({});
        _this.debug = myGlobals.debug;
        return _this;
    }
    CatalogueLineViewComponent.prototype.ngOnInit = function () {
        this.addToParentForm('productDetails', this.regularProductDetailsForm);
        if (this.catalogueLine.goodsItem.item.transportationServiceDetails != null) {
            this.changePartyRole('Transport Service Provider');
        }
    };
    CatalogueLineViewComponent.prototype.ngOnDestroy = function () {
        this.removeFromParentForm('productDetails');
        this.removeFromParentForm('transportationServiceDetails');
    };
    CatalogueLineViewComponent.prototype.changePartyRole = function (role) {
        this.partyRole = role;
        if (role == 'Manufacturer') {
            this.removeFromParentForm('transportationServiceDetails');
            this.addToParentForm('productDetails', this.regularProductDetailsForm);
            this.publishService.publishedProductNature = 'Regular product';
        }
        else if (role == 'Transport Service Provider') {
            this.removeFromParentForm('productDetails');
            this.addToParentForm('transportationServiceDetails', this.transportationServiceDetailsForm);
            this.publishService.publishedProductNature = 'Transportation service';
        }
    };
    __decorate([
        core_1.Input(),
        __metadata("design:type", catalogue_line_1.CatalogueLine)
    ], CatalogueLineViewComponent.prototype, "catalogueLine", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", String)
    ], CatalogueLineViewComponent.prototype, "presentationMode", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", forms_1.FormGroup)
    ], CatalogueLineViewComponent.prototype, "parentForm", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Boolean)
    ], CatalogueLineViewComponent.prototype, "fromSearchDetails", void 0);
    __decorate([
        core_1.Output(),
        __metadata("design:type", core_1.EventEmitter)
    ], CatalogueLineViewComponent.prototype, "openBpOptionsEvent", void 0);
    CatalogueLineViewComponent = __decorate([
        core_1.Component({
            selector: 'catalogue-line-view',
            templateUrl: './catalogue-line-view.component.html'
        })
        // Component that displays information for individual catalogue lines in the Catalogue page
        ,
        __metadata("design:paramtypes", [publish_and_aip_service_1.PublishService])
    ], CatalogueLineViewComponent);
    return CatalogueLineViewComponent;
}(child_form_1.ChildForm));
exports.CatalogueLineViewComponent = CatalogueLineViewComponent;
//# sourceMappingURL=catalogue-line-view.component.js.map