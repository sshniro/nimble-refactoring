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
/**
 * Created by suat on 18-May-17.
 */
var core_1 = require("@angular/core");
var item_property_1 = require("../model/publish/item-property");
var catalogue_service_1 = require("../catalogue.service");
var bp_data_service_1 = require("../../bpe/bp-view/bp-data-service");
var property_1 = require("../model/category/property");
var forms_1 = require("@angular/forms");
var utils_1 = require("../../common/utils");
var AdditionalItemPropertyComponent = /** @class */ (function () {
    function AdditionalItemPropertyComponent(catalogueService, bpDataService) {
        this.catalogueService = catalogueService;
        this.bpDataService = bpDataService;
        this.showPropertyDetails = false;
        this.customProperty = false;
    }
    AdditionalItemPropertyComponent.prototype.openPropertyDetails = function () {
        this.showPropertyDetails = !this.showPropertyDetails;
    };
    AdditionalItemPropertyComponent.prototype.selectName = function (ip) {
        return utils_1.selectName(ip);
    };
    AdditionalItemPropertyComponent.prototype.selectDescription = function (item) {
        return utils_1.selectDescription(item);
    };
    AdditionalItemPropertyComponent.prototype.selectItemPropertyValuesAsString = function (ip) {
        return utils_1.selectItemPropertyValuesAsString(ip, null);
    };
    AdditionalItemPropertyComponent.prototype.addValueToProperty = function (aipName) {
        if (this.additionalItemProperty.valueQualifier == "STRING") {
            this.additionalItemProperty.value.push(utils_1.createText(''));
        }
        else if (this.additionalItemProperty.valueQualifier == "NUMBER") {
            var newNumber = void 0;
            this.additionalItemProperty.valueDecimal.push(newNumber);
        }
        else if (this.additionalItemProperty.valueQualifier == "FILE") {
            // not applicable
        }
    };
    AdditionalItemPropertyComponent.prototype.selectPreferredName = function (cp) {
        return utils_1.selectPreferredName(cp);
    };
    AdditionalItemPropertyComponent.prototype.ngOnInit = function () {
        if (this.additionalItemProperty.itemClassificationCode.listID == "Custom") {
            this.customProperty = true;
        }
        this.editModeSubscription = this.catalogueService.editModeObs
            .subscribe(function (editMode) {
            if (editMode == true) {
                //this.presentationMode = "edit";
            }
            else {
                //this.presentationMode = "view";
            }
        });
    };
    AdditionalItemPropertyComponent.prototype.ngOnDestroy = function () {
        this.editModeSubscription.unsubscribe();
    };
    //remove a value from displayed custom property
    AdditionalItemPropertyComponent.prototype.removeCustomValue = function (index) {
        var dataSource;
        if (this.additionalItemProperty.valueQualifier == "STRING") {
            this.additionalItemProperty.value.splice(index, 1);
            dataSource = this.additionalItemProperty.value;
        }
        else if (this.additionalItemProperty.valueQualifier == "NUMBER") {
            this.additionalItemProperty.valueDecimal.splice(index, 1);
            dataSource = this.additionalItemProperty.valueDecimal;
        }
        // if the property no longer has a value, delete it
        if (dataSource.length == 0) {
            this.deleteCustomProperty(utils_1.selectName(this.additionalItemProperty));
        }
    };
    /**
     * deletes the custom property with the given name
     */
    AdditionalItemPropertyComponent.prototype.deleteCustomProperty = function (inputVal) {
        var draftCatalogueLine = this.catalogueService.draftCatalogueLine;
        var indexCatalogue = draftCatalogueLine.goodsItem.item.additionalItemProperty.findIndex(function (p) { return utils_1.selectName(p) == inputVal; });
        draftCatalogueLine.goodsItem.item.additionalItemProperty.splice(indexCatalogue, 1);
        draftCatalogueLine.goodsItem.item.additionalItemProperty = [].concat(draftCatalogueLine.goodsItem.item.additionalItemProperty);
    };
    AdditionalItemPropertyComponent.prototype.updateNegotiationItemPropertyData = function (event) {
        var selectedIndex = event.target.selectedIndex;
        if (this.additionalItemProperty.valueQualifier == 'STRING') {
            var prevValue = this.additionalItemProperty.value[0];
            this.additionalItemProperty.value[0] = utils_1.createText(event.target.value);
            this.additionalItemProperty.value[selectedIndex] = prevValue;
        }
        else if (this.additionalItemProperty.valueQualifier == 'NUMBER') {
            var prevValue = this.additionalItemProperty.valueDecimal[0];
            this.additionalItemProperty.valueDecimal[0] = event.target.value;
            this.additionalItemProperty.valueDecimal[selectedIndex] = prevValue;
        }
        else if (this.additionalItemProperty.valueQualifier == 'BOOLEAN') {
            var prevValue = this.additionalItemProperty.value[0];
            this.additionalItemProperty.value[0] = utils_1.createText(event.target.value);
            this.additionalItemProperty.value[selectedIndex] = prevValue;
        }
        else if (this.additionalItemProperty.valueQualifier == 'QUANTITY') {
            var prevValue = this.additionalItemProperty.valueQuantity[0];
            this.additionalItemProperty.valueQuantity[0] = event.target.value;
            this.additionalItemProperty.valueQuantity[selectedIndex] = prevValue;
        }
        this.bpDataService.updateItemProperty(this.additionalItemProperty);
    };
    AdditionalItemPropertyComponent.prototype.onSelectChange = function (event) {
        var _this = this;
        var firstValue = this.additionalItemProperty.valueQuantity[0];
        this.additionalItemProperty.valueQuantity[0] = this.additionalItemProperty.valueQuantity[event.target.selectedIndex];
        this.additionalItemProperty.valueQuantity[event.target.selectedIndex] = firstValue;
        var index = this.bpDataService.modifiedCatalogueLines[0].goodsItem.item.additionalItemProperty.findIndex(function (item) { return utils_1.selectName(item) == utils_1.selectName(_this.additionalItemProperty); });
        this.bpDataService.modifiedCatalogueLines[0].goodsItem.item.additionalItemProperty[index].valueQuantity[0] = this.additionalItemProperty.valueQuantity[0];
    };
    AdditionalItemPropertyComponent.prototype.trackByIndex = function (index, item) {
        return index;
    };
    __decorate([
        core_1.Input(),
        __metadata("design:type", item_property_1.ItemProperty)
    ], AdditionalItemPropertyComponent.prototype, "additionalItemProperty", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", property_1.Property)
    ], AdditionalItemPropertyComponent.prototype, "propertyDetails", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", String)
    ], AdditionalItemPropertyComponent.prototype, "presentationMode", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", forms_1.FormGroup)
    ], AdditionalItemPropertyComponent.prototype, "parentForm", void 0);
    AdditionalItemPropertyComponent = __decorate([
        core_1.Component({
            selector: 'additional-item-property',
            templateUrl: './additional-item-property.component.html'
        }),
        __metadata("design:paramtypes", [catalogue_service_1.CatalogueService,
            bp_data_service_1.BPDataService])
    ], AdditionalItemPropertyComponent);
    return AdditionalItemPropertyComponent;
}());
exports.AdditionalItemPropertyComponent = AdditionalItemPropertyComponent;
//# sourceMappingURL=additional-item-property.component.js.map