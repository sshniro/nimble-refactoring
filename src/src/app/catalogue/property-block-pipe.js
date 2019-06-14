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
 * Created by suat on 05-Aug-17.
 */
var core_1 = require("@angular/core");
var category_service_1 = require("./category/category.service");
var publish_and_aip_service_1 = require("./publish-and-aip.service");
var utils_1 = require("../common/utils");
/**
 * Pipe to transform the custom properties and properties of selected categories for a product to property blocks to
 * be presented in the user interface.
 */
var PropertyBlockPipe = /** @class */ (function () {
    function PropertyBlockPipe(categoryService, publishStateService) {
        this.categoryService = categoryService;
        this.publishStateService = publishStateService;
        this.PROPERTY_BLOCK_FIELD_NAME = "name";
        this.PROPERTY_BLOCK_FIELD_ISCOLLAPSED = "isCollapsed";
        this.PROPERTY_BLOCK_FIELD_PROPERTIES = "properties";
        this.PROPERTY_BLOCK_FIELD_PROPERTY_DETAILS = "propertyDetails";
        this.selectedCategories = [];
        this.itemProperties = [];
        this.propertyBlocks = [];
        this.checkedProperties = [];
    }
    PropertyBlockPipe.prototype.transform = function (itemProperties, presentationMode, properties) {
        this.properties = properties;
        this.selectedCategories = this.categoryService.selectedCategories;
        this.itemProperties = itemProperties;
        this.presentationMode = presentationMode;
        this.propertyBlocks = [];
        this.checkedProperties = [];
        return this.retrievePropertyBlocks();
    };
    PropertyBlockPipe.prototype.retrievePropertyBlocks = function () {
        // custom properties belonging to the item
        if (this.properties == 'Custom') {
            this.createCustomPropertyBlock();
        }
        else {
            // all the properties included in the category
            if (this.presentationMode == 'edit') {
                this.categoryPropertyBlocks();
            }
            else {
                this.createNotCustomProperties();
            }
        }
        return this.propertyBlocks;
    };
    PropertyBlockPipe.prototype.createNotCustomProperties = function () {
        var _this = this;
        this.propertyBlocks = [];
        var _loop_1 = function (property) {
            if (property.itemClassificationCode.listID === "Custom") {
                return "continue";
            }
            else if (property.itemClassificationCode.listID === "eClass") {
                var isBaseProperty = this_1.isBaseEClassProperty(property.id);
                var blockName_1 = this_1.getBlockNameForEClass(property.itemClassificationCode.name, isBaseProperty);
                var blockIndex = this_1.propertyBlocks.findIndex(function (block) { return block[_this.PROPERTY_BLOCK_FIELD_NAME] == blockName_1; });
                if (blockIndex == -1) {
                    var eClassBlocks = this_1.createEmptyEClassPropertyBlocks(property.itemClassificationCode.name);
                    this_1.propertyBlocks.push(eClassBlocks[0]);
                    this_1.propertyBlocks.push(eClassBlocks[1]);
                    blockIndex = this_1.propertyBlocks.length - 2;
                    if (!isBaseProperty) {
                        blockIndex++;
                    }
                }
                this_1.propertyBlocks[blockIndex][this_1.PROPERTY_BLOCK_FIELD_PROPERTIES].push(property);
            }
            else {
                var blockName_2 = this_1.getBlockName(property.itemClassificationCode.name, property.itemClassificationCode.listID);
                var blockIndex = this_1.propertyBlocks.findIndex(function (block) { return block[_this.PROPERTY_BLOCK_FIELD_NAME] == blockName_2; });
                if (blockIndex == -1) {
                    var block = this_1.createEmptyPropertyBlock(property.itemClassificationCode.name, property.itemClassificationCode.listID);
                    this_1.propertyBlocks.push(block);
                    blockIndex = this_1.propertyBlocks.length - 1;
                }
                this_1.propertyBlocks[blockIndex][this_1.PROPERTY_BLOCK_FIELD_PROPERTIES].push(property);
            }
        };
        var this_1 = this;
        // put all properties into their blocks
        for (var _i = 0, _a = this.itemProperties; _i < _a.length; _i++) {
            var property = _a[_i];
            _loop_1(property);
        }
    };
    PropertyBlockPipe.prototype.categoryPropertyBlocks = function () {
        // commodity classifications
        if (this.selectedCategories != null) {
            for (var _i = 0, _a = this.selectedCategories; _i < _a.length; _i++) {
                var category = _a[_i];
                if (category.taxonomyId == 'eClass') {
                    this.createEClassPropertyBlocks(category);
                }
                else {
                    this.createPropertyBlock(category);
                }
            }
        }
    };
    PropertyBlockPipe.prototype.createCustomPropertyBlock = function () {
        var customPropertyBlock = {};
        var name = "Custom";
        customPropertyBlock[this.PROPERTY_BLOCK_FIELD_NAME] = name;
        customPropertyBlock[this.PROPERTY_BLOCK_FIELD_ISCOLLAPSED] = this.publishStateService.getCollapsedState(name);
        var customProps = [];
        for (var _i = 0, _a = this.itemProperties; _i < _a.length; _i++) {
            var property = _a[_i];
            if (property.itemClassificationCode.listID == "Custom") {
                customProps.push(property);
                this.checkedProperties.push({ propId: property.id, categoryId: "Custom" });
            }
        }
        if (customProps.length > 0) {
            customPropertyBlock[this.PROPERTY_BLOCK_FIELD_PROPERTIES] = customProps;
            this.propertyBlocks.push(customPropertyBlock);
        }
    };
    /**
     * Creates two blocks as eClass-base and eClass-specific and puts properties into those
     */
    PropertyBlockPipe.prototype.createEClassPropertyBlocks = function (category) {
        var eClassBlocks = this.createEmptyEClassPropertyBlocks(utils_1.selectPreferredName(category));
        var basePropertyBlock = eClassBlocks[0];
        var specificPropertyBlock = eClassBlocks[1];
        basePropertyBlock['isCollapsed'] = this.publishStateService.getCollapsedState(basePropertyBlock.name);
        specificPropertyBlock['isCollapsed'] = this.publishStateService.getCollapsedState(specificPropertyBlock.name);
        var baseProperties = [];
        var basePropertyDetails = [];
        var specificProperties = [];
        var specificPropertyDetails = [];
        var _loop_2 = function (property) {
            var aip = void 0;
            var index = this_2.itemProperties.findIndex(function (ip) { return ip.id == property.id && ip.itemClassificationCode.value == category.id; });
            if (index > -1) {
                aip = this_2.itemProperties[index];
            }
            else
                return "continue";
            if (!this_2.isPropertyPresentedAlready(property, category.id)) {
                if (this_2.isBaseEClassProperty(property.id)) {
                    baseProperties.push(aip);
                    basePropertyDetails.push(property);
                }
                else {
                    specificProperties.push(aip);
                    specificPropertyDetails.push(property);
                }
                this_2.checkedProperties.push({ propId: property.id, categoryId: category.id });
            }
        };
        var this_2 = this;
        for (var _i = 0, _a = category.properties; _i < _a.length; _i++) {
            var property = _a[_i];
            _loop_2(property);
        }
        basePropertyBlock[this.PROPERTY_BLOCK_FIELD_PROPERTIES] = baseProperties;
        basePropertyBlock[this.PROPERTY_BLOCK_FIELD_PROPERTY_DETAILS] = basePropertyDetails;
        specificPropertyBlock[this.PROPERTY_BLOCK_FIELD_PROPERTIES] = specificProperties;
        specificPropertyBlock[this.PROPERTY_BLOCK_FIELD_PROPERTY_DETAILS] = specificPropertyDetails;
        this.propertyBlocks.push(basePropertyBlock);
        this.propertyBlocks.push(specificPropertyBlock);
    };
    PropertyBlockPipe.prototype.createPropertyBlock = function (category) {
        var propertyBlock = this.createEmptyPropertyBlock(utils_1.selectPreferredName(category), category.taxonomyId);
        propertyBlock['isCollapsed'] = this.publishStateService.getCollapsedState(propertyBlock.name);
        this.propertyBlocks.push(propertyBlock);
        var properties = [];
        for (var _i = 0, _a = category.properties; _i < _a.length; _i++) {
            var property = _a[_i];
            if (!this.isPropertyPresentedAlready(property, category.id)) {
                properties.push(this.getItemProperty(property, category.id));
                this.checkedProperties.push({ propId: property.id, categoryId: category.id });
            }
        }
        propertyBlock['properties'] = properties;
    };
    PropertyBlockPipe.prototype.isPropertyPresentedAlready = function (property, categoryId) {
        for (var _i = 0, _a = this.checkedProperties; _i < _a.length; _i++) {
            var x = _a[_i];
            if (property.id == x.propId && categoryId == x.categoryId) {
                return true;
            }
        }
        return false;
    };
    PropertyBlockPipe.prototype.getItemProperty = function (property, categoryId) {
        for (var _i = 0, _a = this.itemProperties; _i < _a.length; _i++) {
            var aip = _a[_i];
            if (aip.id == property.id && aip.itemClassificationCode.value == categoryId) {
                return aip;
            }
        }
        console.error("Property could not be found in additional item properties: " + property.id);
    };
    PropertyBlockPipe.prototype.createEmptyEClassPropertyBlocks = function (categoryName) {
        var basePropertyBlock = {};
        basePropertyBlock[this.PROPERTY_BLOCK_FIELD_NAME] = this.getBlockNameForEClass(categoryName, true);
        basePropertyBlock[this.PROPERTY_BLOCK_FIELD_ISCOLLAPSED] = true;
        basePropertyBlock[this.PROPERTY_BLOCK_FIELD_PROPERTIES] = [];
        basePropertyBlock[this.PROPERTY_BLOCK_FIELD_PROPERTY_DETAILS] = [];
        var specificPropertyBlock = {};
        specificPropertyBlock[this.PROPERTY_BLOCK_FIELD_NAME] = this.getBlockNameForEClass(categoryName, false);
        specificPropertyBlock[this.PROPERTY_BLOCK_FIELD_ISCOLLAPSED] = true;
        specificPropertyBlock[this.PROPERTY_BLOCK_FIELD_PROPERTIES] = [];
        specificPropertyBlock[this.PROPERTY_BLOCK_FIELD_PROPERTY_DETAILS] = [];
        return [basePropertyBlock, specificPropertyBlock];
    };
    PropertyBlockPipe.prototype.createEmptyPropertyBlock = function (categoryName, taxonomyId) {
        var propertyBlock = {};
        propertyBlock[this.PROPERTY_BLOCK_FIELD_NAME] = this.getBlockName(categoryName, taxonomyId);
        propertyBlock[this.PROPERTY_BLOCK_FIELD_ISCOLLAPSED] = true;
        propertyBlock[this.PROPERTY_BLOCK_FIELD_PROPERTIES] = [];
        propertyBlock[this.PROPERTY_BLOCK_FIELD_PROPERTY_DETAILS] = [];
        return propertyBlock;
    };
    PropertyBlockPipe.prototype.getBlockNameForEClass = function (categoryName, base) {
        if (base) {
            return categoryName + " (eClass - Base)";
        }
        else {
            return categoryName + " (eClass - Specific)";
        }
    };
    PropertyBlockPipe.prototype.getBlockName = function (categoryName, taxonomyId) {
        if (categoryName != null) {
            return categoryName + " (" + taxonomyId + ")";
        }
        else {
            return "Custom";
        }
    };
    /*
     Checks whether the property is a base property common for many eClass properties

     The properties that are treated as a base property :
     0173-1#02-AAD931#005 - customs tariff number (TARIC)
     0173-1#02-AAO663#003 - GTIN
     0173-1#02-BAB392#012 - certificate/approval
     0173-1#02-AAO677#002 - Manufacturer name
     0173-1#02-AAO676#003 - product article number of manufacturer
     0173-1#02-AAO736#004 - product article number of supplier
     0173-1#02-AAO735#003 - name of supplier

     0173-1#02-AAP794#001 - Offerer/supplier
     0173-1#02-AAQ326#002 - address of additional link
     0173-1#02-BAE391#004 - Scope of performance
     0173-1#02-AAP796#004 - supplier of the identifier
     0173-1#02-BAF831#002 - Personnel qualification
     0173-1#02-AAM551#002 - Supplier product designation
     0173-1#02-AAU734#001 - Manufacturer product description
     0173-1#02-AAU733#001 - Manufacturer product order suffix
     0173-1#02-AAU732#001 - Manufacturer product root
     0173-1#02-AAU731#001 - Manufacturer product family
     0173-1#02-AAU730#001 - Supplier product description
     0173-1#02-AAU729#001 - Supplier product root
     0173-1#02-AAU728#001 - Supplier product family
     0173-1#02-AAO742#002 - Brand
     0173-1#02-AAW336#001 - Supplier product type
     0173-1#02-AAW337#001 - Supplier product order suffix
     0173-1#02-AAW338#001 - Manufacturer product designation
     0173-1#02-AAO057#002 - Product type
     */
    PropertyBlockPipe.prototype.isBaseEClassProperty = function (pid) {
        if (pid == "0173-1#02-AAD931#005" ||
            pid == "0173-1#02-AAO663#003" ||
            pid == "0173-1#02-BAB392#012" ||
            pid == "0173-1#02-AAO677#002" ||
            pid == "0173-1#02-AAO676#003" ||
            pid == "0173-1#02-AAO736#004" ||
            pid == "0173-1#02-AAO735#003" ||
            pid == "0173-1#02-AAP794#001" ||
            pid == "0173-1#02-AAQ326#002" ||
            pid == "0173-1#02-BAE391#004" ||
            pid == "0173-1#02-AAP796#004" ||
            pid == "0173-1#02-BAF831#002" ||
            pid == "0173-1#02-AAM551#002" ||
            pid == "0173-1#02-AAU734#001" ||
            pid == "0173-1#02-AAU733#001" ||
            pid == "0173-1#02-AAU732#001" ||
            pid == "0173-1#02-AAU731#001" ||
            pid == "0173-1#02-AAU730#001" ||
            pid == "0173-1#02-AAU729#001" ||
            pid == "0173-1#02-AAU728#001" ||
            pid == "0173-1#02-AAO742#002" ||
            pid == "0173-1#02-AAW336#001" ||
            pid == "0173-1#02-AAW337#001" ||
            pid == "0173-1#02-AAW338#001" ||
            pid == "0173-1#02-AAO057#002") {
            return true;
        }
        else {
            return false;
        }
    };
    PropertyBlockPipe = __decorate([
        core_1.Pipe({ name: 'propertyBlockPipe' }),
        __metadata("design:paramtypes", [category_service_1.CategoryService,
            publish_and_aip_service_1.PublishService])
    ], PropertyBlockPipe);
    return PropertyBlockPipe;
}());
exports.PropertyBlockPipe = PropertyBlockPipe;
//# sourceMappingURL=property-block-pipe.js.map