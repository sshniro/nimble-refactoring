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
var ubl_model_utils_1 = require("../model/ubl-model-utils");
var common_1 = require("@angular/common");
var publish_and_aip_service_1 = require("../publish-and-aip.service");
var catalogue_service_1 = require("../catalogue.service");
var user_service_1 = require("../../user-mgmt/user.service");
var ng2_cookies_1 = require("ng2-cookies");
var category_service_1 = require("../category/category.service");
var call_status_1 = require("../../common/call-status");
var utils_1 = require("../../common/utils");
var attachment_1 = require("../model/publish/attachment");
var document_reference_1 = require("../model/publish/document-reference");
var transportation_service_1 = require("../model/publish/transportation-service");
var catalogue_1 = require("../model/publish/catalogue");
var myGlobals = require("../../globals");
var logistic_publishing_service_1 = require("./logistic-publishing.service");
var LogisticServicePublishComponent = /** @class */ (function () {
    function LogisticServicePublishComponent(categoryService, catalogueService, publishStateService, userService, route, router, location, cookieService, logisticPublishingService) {
        this.categoryService = categoryService;
        this.catalogueService = catalogueService;
        this.publishStateService = publishStateService;
        this.userService = userService;
        this.route = route;
        this.router = router;
        this.location = location;
        this.cookieService = cookieService;
        this.logisticPublishingService = logisticPublishingService;
        this.config = myGlobals.config;
        // check whether product id conflict exists or not
        this.sameIdError = false;
        // the value of the erroneousID
        this.erroneousID = "";
        this.submitted = false;
        this.callback = false;
        this.error_detc = false;
        // represents the logistic service in 'edit' and 'copy' publish modes
        this.catalogueLine = null;
        // check whether changing publish-mode to 'create' is necessary or not
        this.changePublishModeCreate = false;
        this.publishStatus = new call_status_1.CallStatus();
        this.publishingGranularity = "single";
        this.callStatus = new call_status_1.CallStatus();
        // selected tab
        this.selectedTabSinglePublish = "TRANSPORT";
        // whether we need to show all tabs or not
        this.singleTabForLogisticServices = false;
        // publish mode of each logistic services
        this.logisticPublishMode = null;
        // catalogue lines of each logistic services
        this.logisticCatalogueLines = null;
        // this is the object which is taken from the catalog service and it gives us the logistic service-category uri pairs for each taxonomy id
        this.logisticRelatedServices = null;
        // available logistics services
        this.availableLogisticsServices = [];
        this.dialogBox = true;
        // furniture ontology categories which are used to represent Logistic Services
        this.furnitureOntologyLogisticCategories = null;
        this.showRoadTransportService = false;
        this.showMaritimeTransportService = false;
        this.showAirTransportService = false;
        this.showRailTransportService = false;
    }
    LogisticServicePublishComponent.prototype.ngOnInit = function () {
        var _this = this;
        var userId = this.cookieService.get("user_id");
        this.callStatus.submit();
        Promise.all([
            this.userService.getUserParty(userId),
            this.logisticPublishingService.getCachedLogisticRelatedServices(this.config.standardTaxonomy)
        ]).then(function (_a) {
            var party = _a[0], logisticRelatedServices = _a[1];
            _this.logisticRelatedServices = logisticRelatedServices;
            var keys = Object.keys(_this.logisticRelatedServices);
            // get category uris for logistic services
            var eClassCategoryUris = keys.indexOf("eClass") != -1 ? _this.getCategoryUrisForTaxonomyId("eClass") : null;
            var furnitureOntologyCategoryUris = keys.indexOf("FurnitureOntology") != -1 ? _this.getCategoryUrisForTaxonomyId("FurnitureOntology") : null;
            return Promise.all([
                Promise.resolve(party),
                _this.catalogueService.getCatalogueResponse(userId),
                _this.userService.getCompanyNegotiationSettingsForParty(ubl_model_utils_1.UBLModelUtils.getPartyId(party)),
                eClassCategoryUris ? _this.categoryService.getCategoriesForIds(new Array(eClassCategoryUris.length).fill("eClass"), eClassCategoryUris) : Promise.resolve(null),
                furnitureOntologyCategoryUris ? _this.categoryService.getCategoriesForIds(new Array(furnitureOntologyCategoryUris.length).fill("FurnitureOntology"), furnitureOntologyCategoryUris) : Promise.resolve(null)
            ]).then(function (_a) {
                var party = _a[0], catalogueResponse = _a[1], settings = _a[2], eClassLogisticCategories = _a[3], furnitureOntologyLogisticCategories = _a[4];
                // set furniture ontology logistic categories
                _this.furnitureOntologyLogisticCategories = furnitureOntologyLogisticCategories;
                _this.initView(party, catalogueResponse, settings, eClassLogisticCategories);
                _this.publishStateService.publishingStarted = true;
                _this.callStatus.callback("Successfully initialized.", true);
            })
                .catch(function (error) {
                _this.callStatus.error("Error while initializing the publish view.", error);
            });
        });
        this.route.queryParams.subscribe(function (params) {
            // handle publishing granularity: single, bulk, null
            _this.publishingGranularity = params['pg'];
            if (_this.publishingGranularity == null) {
                _this.publishingGranularity = 'single';
            }
        });
    };
    LogisticServicePublishComponent.prototype.getCategoryUrisForTaxonomyId = function (taxonomyId) {
        var serviceCategoryUriMap = this.logisticRelatedServices[taxonomyId];
        var categoryUris = [];
        for (var _i = 0, _a = Object.keys(serviceCategoryUriMap); _i < _a.length; _i++) {
            var key = _a[_i];
            categoryUris.push(serviceCategoryUriMap[key]);
        }
        return categoryUris;
    };
    LogisticServicePublishComponent.prototype.populateLogisticPublishMode = function () {
        this.logisticPublishMode = new Map();
        for (var _i = 0, _a = this.availableLogisticsServices; _i < _a.length; _i++) {
            var serviceType = _a[_i];
            this.logisticPublishMode.set(serviceType, this.publishStateService.publishMode);
        }
    };
    LogisticServicePublishComponent.prototype.getServiceTypesFromLogisticsCatalogueLines = function () {
        var numberOfCatalogueLines = this.logisticCatalogueLines.size;
        var iterator = this.logisticCatalogueLines.keys();
        for (var i = 0; i < numberOfCatalogueLines; i++) {
            this.availableLogisticsServices.push(iterator.next().value);
        }
    };
    // switching between tabs
    LogisticServicePublishComponent.prototype.onSelectTabSinglePublish = function (event) {
        event.preventDefault();
        this.selectedTabSinglePublish = event.target.id;
    };
    LogisticServicePublishComponent.prototype.onSelectTab = function (event) {
        event.preventDefault();
        if (event.target.id === "singleUpload") {
            this.publishingGranularity = "single";
        }
        else {
            this.publishingGranularity = "bulk";
        }
    };
    LogisticServicePublishComponent.prototype.isLoading = function () {
        return this.publishStatus.fb_submitted;
    };
    LogisticServicePublishComponent.prototype.canDeactivate = function () {
        if (this.changePublishModeCreate) {
            this.publishStateService.publishMode = 'create';
            this.publishStateService.publishingStarted = false;
        }
        if (this.dialogBox) {
            var x = confirm("You will lose any changes you made, are you sure you want to quit ?");
            if (x) {
                this.publishStateService.publishMode = 'create';
                this.publishStateService.publishingStarted = false;
            }
            return x;
        }
        this.dialogBox = true;
        return true;
    };
    LogisticServicePublishComponent.prototype.initView = function (userParty, catalogueResponse, settings, eClassLogisticCategories) {
        this.companyNegotiationSettings = settings;
        this.catalogueService.setEditMode(true);
        this.publishStateService.resetData();
        // Following "if" block is executed when redirected by an "edit" button
        // "else" block is executed when redirected by "publish" tab
        this.publishMode = this.publishStateService.publishMode;
        if (this.publishMode == 'edit' || this.publishMode == 'copy') {
            if (this.publishMode == 'copy') {
                var newId = ubl_model_utils_1.UBLModelUtils.generateUUID();
                this.catalogueService.draftCatalogueLine.id = newId;
                this.catalogueService.draftCatalogueLine.goodsItem.id = newId;
                this.catalogueService.draftCatalogueLine.goodsItem.item.manufacturersItemIdentification.id = newId;
                this.catalogueService.draftCatalogueLine = utils_1.removeHjids(this.catalogueService.draftCatalogueLine);
            }
            this.catalogueLine = this.catalogueService.draftCatalogueLine;
            // add missing additional item properties to catalogue line
            this.addMissingAdditionalItemProperties(this.catalogueLine);
            if (this.catalogueLine == null) {
                this.publishStateService.publishMode = 'create';
                this.router.navigate(['catalogue/publish-logistic']);
                return;
            }
            // show only one tab
            this.singleTabForLogisticServices = true;
            this.selectedTabSinglePublish = this.getSelectedTabForLogisticServices();
            this.availableLogisticsServices.push(this.selectedTabSinglePublish);
        }
        else {
            // new publishing is the first entry to the publishing page
            // i.e. publishing from scratch
            if (this.publishStateService.publishingStarted == false) {
                this.logisticCatalogueLines = ubl_model_utils_1.UBLModelUtils.createCatalogueLinesForLogistics(catalogueResponse.catalogueUuid, userParty, settings, this.logisticRelatedServices, eClassLogisticCategories, this.furnitureOntologyLogisticCategories);
                this.getServiceTypesFromLogisticsCatalogueLines();
                this.populateLogisticPublishMode();
            }
        }
    };
    // this method is used to add missing additional item properties to catalogue line in 'edit' mode
    LogisticServicePublishComponent.prototype.addMissingAdditionalItemProperties = function (catalogueLine) {
        if (this.furnitureOntologyLogisticCategories) {
            var category = null;
            for (var _i = 0, _a = catalogueLine.goodsItem.item.commodityClassification; _i < _a.length; _i++) {
                var commodityClassification = _a[_i];
                for (var _b = 0, _c = this.furnitureOntologyLogisticCategories; _b < _c.length; _b++) {
                    var logisticCategory = _c[_b];
                    if (commodityClassification.itemClassificationCode.uri == logisticCategory.categoryUri) {
                        category = logisticCategory;
                        break;
                    }
                }
            }
            // add missing additional item properties to catalogue line
            for (var _d = 0, _e = category.properties; _d < _e.length; _d++) {
                var property = _e[_d];
                var missing = true;
                for (var _f = 0, _g = catalogueLine.goodsItem.item.additionalItemProperty; _f < _g.length; _f++) {
                    var itemProperty = _g[_f];
                    if (itemProperty.uri == property.uri) {
                        missing = false;
                        break;
                    }
                }
                if (missing) {
                    catalogueLine.goodsItem.item.additionalItemProperty.push(ubl_model_utils_1.UBLModelUtils.createAdditionalItemProperty(property, category));
                }
            }
        }
    };
    // getters
    LogisticServicePublishComponent.prototype.getLogisticCatalogueLine = function (serviceType) {
        if (this.publishMode == 'create') {
            return this.logisticCatalogueLines.get(serviceType);
        }
        return this.catalogueLine;
    };
    LogisticServicePublishComponent.prototype.getSelectedTabForLogisticServices = function () {
        var serviceCategoryMap;
        if (this.config.standardTaxonomy == "All" || this.config.standardTaxonomy == "FurnitureOntology") {
            serviceCategoryMap = this.logisticRelatedServices["FurnitureOntology"];
        }
        else {
            serviceCategoryMap = this.logisticRelatedServices["eClass"];
        }
        for (var _i = 0, _a = this.catalogueLine.goodsItem.item.commodityClassification; _i < _a.length; _i++) {
            var commodityClassification = _a[_i];
            var serviceTypes = Object.keys(serviceCategoryMap);
            for (var _b = 0, serviceTypes_1 = serviceTypes; _b < serviceTypes_1.length; _b++) {
                var serviceType = serviceTypes_1[_b];
                if (commodityClassification.itemClassificationCode.uri == serviceCategoryMap[serviceType]) {
                    return serviceType;
                }
            }
        }
    };
    LogisticServicePublishComponent.prototype.getButtonLabel = function (serviceType, exit) {
        if (exit === void 0) { exit = false; }
        if (this.publishStateService.publishMode === "edit")
            return exit ? "Save & Exit" : "Save & Continue";
        else if (this.publishStateService.publishMode === "copy")
            return exit ? "Publish & Exit" : "Publish & Continue";
        if (serviceType == "TRANSPORT") {
            if (this.logisticPublishMode.get('ROADTRANSPORT') === 'edit' || this.logisticPublishMode.get('MARITIMETRANSPORT') === 'edit' || this.logisticPublishMode.get('AIRTRANSPORT') === 'edit' || this.logisticPublishMode.get('RAILTRANSPORT') === 'edit')
                return exit ? "Save & Exit" : "Save & Continue";
        }
        else if (this.logisticPublishMode.get(serviceType) === 'edit')
            return exit ? "Save & Exit" : "Save & Continue";
        return exit ? "Publish & Exit" : "Publish & Continue";
    };
    LogisticServicePublishComponent.prototype.isProductIdEditable = function (serviceType) {
        // handling of 'edit' and 'copy' publish modes
        if (this.publishStateService.publishMode === 'edit') {
            return false;
        }
        else if (this.publishStateService.publishMode === 'copy') {
            return true;
        }
        // handling of 'create' publish mode
        return this.logisticPublishMode.get(serviceType) == 'create';
    };
    LogisticServicePublishComponent.prototype.getBinaryObjectsForLogisticService = function (serviceType) {
        var binaryObjects = [];
        if (this.publishStateService.publishMode == 'create') {
            binaryObjects = this.logisticCatalogueLines.get(serviceType).goodsItem.item.itemSpecificationDocumentReference.map(function (doc) { return doc.attachment.embeddedDocumentBinaryObject; });
        }
        else {
            binaryObjects = this.catalogueLine.goodsItem.item.itemSpecificationDocumentReference.map(function (doc) { return doc.attachment.embeddedDocumentBinaryObject; });
        }
        return binaryObjects;
    };
    LogisticServicePublishComponent.prototype.getProductTypeProperty = function (serviceType) {
        var item = this.getLogisticCatalogueLine(serviceType).goodsItem.item;
        for (var _i = 0, _a = item.additionalItemProperty; _i < _a.length; _i++) {
            var property = _a[_i];
            if (property.uri == "http://www.aidimme.es/FurnitureSectorOntology.owl#managedProductType") {
                return property;
            }
        }
    };
    LogisticServicePublishComponent.prototype.getIndustrySpecializationProperty = function (serviceType) {
        var item = this.getLogisticCatalogueLine(serviceType).goodsItem.item;
        for (var _i = 0, _a = item.additionalItemProperty; _i < _a.length; _i++) {
            var property = _a[_i];
            if (property.uri == "http://www.aidimme.es/FurnitureSectorOntology.owl#industrySpecialization") {
                return property;
            }
        }
    };
    LogisticServicePublishComponent.prototype.getLogisticProperties = function (serviceType) {
        var properties = [];
        var item = this.getLogisticCatalogueLine(serviceType).goodsItem.item;
        for (var _i = 0, _a = item.additionalItemProperty; _i < _a.length; _i++) {
            var property = _a[_i];
            if (property.uri != "http://www.aidimme.es/FurnitureSectorOntology.owl#industrySpecialization" && property.uri != "http://www.aidimme.es/FurnitureSectorOntology.owl#managedProductType"
                && property.uri != "http://www.aidimme.es/FurnitureSectorOntology.owl#originTransport" && property.uri != 'http://www.aidimme.es/FurnitureSectorOntology.owl#destinationTransport' && property.itemClassificationCode.listID != 'Custom') {
                properties.push(property);
            }
        }
        return properties;
    };
    LogisticServicePublishComponent.prototype.getProductTypeForLogistic = function (serviceType) {
        var item = this.getLogisticCatalogueLine(serviceType).goodsItem.item;
        for (var _i = 0, _a = item.additionalItemProperty; _i < _a.length; _i++) {
            var itemProperty = _a[_i];
            if (itemProperty.uri == "http://www.aidimme.es/FurnitureSectorOntology.owl#managedProductType") {
                return itemProperty.value;
            }
        }
    };
    LogisticServicePublishComponent.prototype.getIndustrySpecializationForLogistics = function (serviceType) {
        var item = this.getLogisticCatalogueLine(serviceType).goodsItem.item;
        for (var _i = 0, _a = item.additionalItemProperty; _i < _a.length; _i++) {
            var itemProperty = _a[_i];
            if (itemProperty.uri == 'http://www.aidimme.es/FurnitureSectorOntology.owl#industrySpecialization') {
                return itemProperty.value;
            }
        }
    };
    LogisticServicePublishComponent.prototype.getOriginAddressForLogistics = function (serviceType) {
        var item = this.getLogisticCatalogueLine(serviceType).goodsItem.item;
        for (var _i = 0, _a = item.additionalItemProperty; _i < _a.length; _i++) {
            var itemProperty = _a[_i];
            if (itemProperty.uri == "http://www.aidimme.es/FurnitureSectorOntology.owl#originTransport") {
                return itemProperty;
            }
        }
    };
    LogisticServicePublishComponent.prototype.getDestinationAddressForLogistics = function (serviceType) {
        var item = this.getLogisticCatalogueLine(serviceType).goodsItem.item;
        for (var _i = 0, _a = item.additionalItemProperty; _i < _a.length; _i++) {
            var itemProperty = _a[_i];
            if (itemProperty.uri == "http://www.aidimme.es/FurnitureSectorOntology.owl#destinationTransport") {
                return itemProperty;
            }
        }
    };
    // methods to select/unselect files for Transport logistic services
    LogisticServicePublishComponent.prototype.onSelectFileForLogisticService = function (binaryObject, serviceType) {
        var document = new document_reference_1.DocumentReference();
        var attachment = new attachment_1.Attachment();
        attachment.embeddedDocumentBinaryObject = binaryObject;
        document.attachment = attachment;
        if (this.publishStateService.publishMode == 'create') {
            this.logisticCatalogueLines.get(serviceType).goodsItem.item.itemSpecificationDocumentReference.push(document);
        }
        else {
            this.catalogueLine.goodsItem.item.itemSpecificationDocumentReference.push(document);
        }
    };
    LogisticServicePublishComponent.prototype.onUnSelectFileForLogisticService = function (binaryObject, serviceType) {
        if (this.publishStateService.publishMode == 'create') {
            var i = this.logisticCatalogueLines.get(serviceType).goodsItem.item.itemSpecificationDocumentReference.findIndex(function (doc) { return doc.attachment.embeddedDocumentBinaryObject === binaryObject; });
            if (i >= 0) {
                this.logisticCatalogueLines.get(serviceType).goodsItem.item.itemSpecificationDocumentReference.splice(i, 1);
            }
        }
        else {
            var i = this.catalogueLine.goodsItem.item.itemSpecificationDocumentReference.findIndex(function (doc) { return doc.attachment.embeddedDocumentBinaryObject === binaryObject; });
            if (i >= 0) {
                this.catalogueLine.goodsItem.item.itemSpecificationDocumentReference.splice(i, 1);
            }
        }
    };
    // methods used to validate catalogue lines
    LogisticServicePublishComponent.prototype.isValidCatalogueLineForLogistics = function () {
        if (this.publishMode == 'create') {
            if (this.selectedTabSinglePublish == 'TRANSPORT') {
                if (this.logisticCatalogueLines.has("ROADTRANSPORT")) {
                    if (this.itemHasName(this.logisticCatalogueLines.get("ROADTRANSPORT").goodsItem.item)) {
                        return true;
                    }
                }
                if (this.logisticCatalogueLines.has("MARITIMETRANSPORT")) {
                    if (this.itemHasName(this.logisticCatalogueLines.get("MARITIMETRANSPORT").goodsItem.item)) {
                        return true;
                    }
                }
                if (this.logisticCatalogueLines.has("AIRTRANSPORT")) {
                    if (this.itemHasName(this.logisticCatalogueLines.get("AIRTRANSPORT").goodsItem.item)) {
                        return true;
                    }
                }
                if (this.logisticCatalogueLines.has("RAILTRANSPORT")) {
                    if (this.itemHasName(this.logisticCatalogueLines.get("RAILTRANSPORT").goodsItem.item)) {
                        return true;
                    }
                }
            }
            else {
                if (this.itemHasName(this.logisticCatalogueLines.get(this.selectedTabSinglePublish).goodsItem.item)) {
                    return true;
                }
            }
            return false;
        }
        return this.isValidCatalogueLine();
    };
    LogisticServicePublishComponent.prototype.isValidCatalogueLine = function () {
        // must have a name
        return this.itemHasName(this.catalogueLine.goodsItem.item);
    };
    LogisticServicePublishComponent.prototype.itemHasName = function (item) {
        return item.name[0] && item.name[0].value !== "";
    };
    // Removes empty properties from catalogueLines about to be sent
    LogisticServicePublishComponent.prototype.removeEmptyProperties = function (catalogueLine) {
        // Make deep copy of catalogue line so we can remove empty fields without disturbing UI model
        // This is required because there is no redirect after publish action
        var catalogueLineCopy = utils_1.copy(catalogueLine);
        if (catalogueLineCopy.goodsItem.item.lifeCyclePerformanceAssessmentDetails != null) {
            if (!ubl_model_utils_1.UBLModelUtils.isFilledLCPAInput(catalogueLineCopy.goodsItem.item.lifeCyclePerformanceAssessmentDetails)) {
                catalogueLineCopy.goodsItem.item.lifeCyclePerformanceAssessmentDetails.lcpainput = null;
            }
            if (!ubl_model_utils_1.UBLModelUtils.isFilledLCPAOutput(catalogueLineCopy.goodsItem.item.lifeCyclePerformanceAssessmentDetails)) {
                catalogueLineCopy.goodsItem.item.lifeCyclePerformanceAssessmentDetails.lcpaoutput = null;
            }
        }
        // splice out properties that are unfilled
        var properties = catalogueLineCopy.goodsItem.item.additionalItemProperty;
        var propertiesToBeSpliced = [];
        for (var _i = 0, properties_1 = properties; _i < properties_1.length; _i++) {
            var property = properties_1[_i];
            var valueQualifier = property.valueQualifier.toLocaleLowerCase();
            if (valueQualifier == "int" ||
                valueQualifier == "double" ||
                valueQualifier == "number") {
                property.valueDecimal = property.valueDecimal.filter(function (el) {
                    return (el != null && el.toString() != "");
                });
                if (property.valueDecimal.length == 0 || property.valueDecimal[0] == undefined) {
                    propertiesToBeSpliced.push(property);
                }
            }
            else if (valueQualifier == "file") {
                if (property.valueBinary.length == 0) {
                    propertiesToBeSpliced.push(property);
                }
            }
            else if (valueQualifier.toLowerCase() == 'quantity') {
                if (property.valueQuantity.length == 0 || !property.valueQuantity[0].value) {
                    propertiesToBeSpliced.push(property);
                }
            }
            else {
                if (property.value.length == 0 || property.value[0].value == '') {
                    propertiesToBeSpliced.push(property);
                }
            }
        }
        for (var _a = 0, propertiesToBeSpliced_1 = propertiesToBeSpliced; _a < propertiesToBeSpliced_1.length; _a++) {
            var property = propertiesToBeSpliced_1[_a];
            properties.splice(properties.indexOf(property), 1);
        }
        return catalogueLineCopy;
    };
    LogisticServicePublishComponent.prototype.copyMissingAdditionalItemPropertiesAndAddresses = function (catalogueLine) {
        var productType = this.getProductTypeForLogistic('TRANSPORT');
        var industrySpecialization = this.getIndustrySpecializationForLogistics('TRANSPORT');
        var originAddress = this.getOriginAddressForLogistics('TRANSPORT');
        var destinationAddress = this.getDestinationAddressForLogistics('TRANSPORT');
        for (var _i = 0, _a = catalogueLine.goodsItem.item.additionalItemProperty; _i < _a.length; _i++) {
            var itemProperty = _a[_i];
            if (itemProperty.uri == 'http://www.aidimme.es/FurnitureSectorOntology.owl#managedProductType') {
                itemProperty.value = productType;
            }
            else if (itemProperty.uri == 'http://www.aidimme.es/FurnitureSectorOntology.owl#industrySpecialization') {
                itemProperty.value = industrySpecialization;
            }
            else if (itemProperty.uri == "http://www.aidimme.es/FurnitureSectorOntology.owl#originTransport") {
                itemProperty.value = originAddress.value;
            }
            else if (itemProperty.uri == "http://www.aidimme.es/FurnitureSectorOntology.owl#destinationTransport") {
                itemProperty.value = destinationAddress.value;
            }
        }
    };
    // publish or save
    LogisticServicePublishComponent.prototype.onPublish = function (exitThePage) {
        if (this.publishStateService.publishMode === 'edit' || this.publishStateService.publishMode === 'copy') {
            if (this.publishStateService.publishMode === 'edit') {
                // update existing service
                this.saveEditedProduct(exitThePage, [this.catalogueLine]);
            }
            else {
                // publish the new service
                this.publish([this.catalogueLine], exitThePage);
            }
        }
        else {
            if (this.selectedTabSinglePublish == "TRANSPORT") {
                var transportServiceCatalogueLines = [];
                var transportServicePublishModes = [];
                if (this.logisticCatalogueLines.has("ROADTRANSPORT")) {
                    this.copyMissingAdditionalItemPropertiesAndAddresses(this.logisticCatalogueLines.get("ROADTRANSPORT"));
                    transportServiceCatalogueLines.push(this.logisticCatalogueLines.get("ROADTRANSPORT"));
                    transportServicePublishModes.push(this.logisticPublishMode.get("ROADTRANSPORT"));
                }
                if (this.logisticCatalogueLines.has("MARITIMETRANSPORT")) {
                    this.copyMissingAdditionalItemPropertiesAndAddresses(this.logisticCatalogueLines.get("MARITIMETRANSPORT"));
                    transportServiceCatalogueLines.push(this.logisticCatalogueLines.get("MARITIMETRANSPORT"));
                    transportServicePublishModes.push(this.logisticPublishMode.get("MARITIMETRANSPORT"));
                }
                if (this.logisticCatalogueLines.has("AIRTRANSPORT")) {
                    this.copyMissingAdditionalItemPropertiesAndAddresses(this.logisticCatalogueLines.get("AIRTRANSPORT"));
                    transportServiceCatalogueLines.push(this.logisticCatalogueLines.get("AIRTRANSPORT"));
                    transportServicePublishModes.push(this.logisticPublishMode.get("AIRTRANSPORT"));
                }
                if (this.logisticCatalogueLines.has("RAILTRANSPORT")) {
                    this.copyMissingAdditionalItemPropertiesAndAddresses(this.logisticCatalogueLines.get("RAILTRANSPORT"));
                    transportServiceCatalogueLines.push(this.logisticCatalogueLines.get("RAILTRANSPORT"));
                    transportServicePublishModes.push(this.logisticPublishMode.get("RAILTRANSPORT"));
                }
                var validCatalogueLinesToBePublished = [];
                var validCatalogueLinesToBeUpdated = [];
                for (var i = 0; i < transportServiceCatalogueLines.length; i++) {
                    if (this.itemHasName(transportServiceCatalogueLines[i].goodsItem.item)) {
                        // be sure that its transportation service details is not null
                        transportServiceCatalogueLines[i].goodsItem.item.transportationServiceDetails = new transportation_service_1.TransportationService();
                        if (transportServicePublishModes[i] == 'edit') {
                            validCatalogueLinesToBeUpdated.push(transportServiceCatalogueLines[i]);
                        }
                        else {
                            validCatalogueLinesToBePublished.push(transportServiceCatalogueLines[i]);
                        }
                    }
                }
                if (validCatalogueLinesToBePublished.length > 0) {
                    this.publish(validCatalogueLinesToBePublished, exitThePage);
                }
                if (validCatalogueLinesToBeUpdated.length > 0) {
                    this.saveEditedProduct(exitThePage, validCatalogueLinesToBeUpdated);
                }
            }
            else {
                if (this.logisticPublishMode.get(this.selectedTabSinglePublish) === "create" || this.logisticPublishMode.get(this.selectedTabSinglePublish) === "copy") {
                    // publish new service
                    this.publish([this.logisticCatalogueLines.get(this.selectedTabSinglePublish)], exitThePage);
                }
                else {
                    // update the existing service
                    this.saveEditedProduct(exitThePage, [this.logisticCatalogueLines.get(this.selectedTabSinglePublish)]);
                }
            }
        }
    };
    LogisticServicePublishComponent.prototype.publish = function (catalogueLines, exitThePage) {
        var _this = this;
        this.publishStatus.submit();
        var splicedCatalogueLines = [];
        // remove unused properties from catalogueLine
        for (var _i = 0, catalogueLines_1 = catalogueLines; _i < catalogueLines_1.length; _i++) {
            var catalogueLine = catalogueLines_1[_i];
            splicedCatalogueLines.push(this.removeEmptyProperties(catalogueLine));
        }
        if (this.catalogueService.catalogueResponse.catalogueUuid == null) {
            var userId = this.cookieService.get("user_id");
            this.userService.getUserParty(userId).then(function (userParty) {
                // create the catalogue
                var catalogue = new catalogue_1.Catalogue("default", null, userParty, "", "", []);
                // add catalogue lines to the end of catalogue
                for (var _i = 0, splicedCatalogueLines_1 = splicedCatalogueLines; _i < splicedCatalogueLines_1.length; _i++) {
                    var catalogueLine = splicedCatalogueLines_1[_i];
                    catalogue.catalogueLine.push(catalogueLine);
                }
                _this.catalogueService.postCatalogue(catalogue)
                    .then(function () { return _this.onSuccessfulPublish(exitThePage, splicedCatalogueLines); })
                    .catch(function (err) {
                    _this.onFailedPublish(err);
                });
            }).catch(function (err) {
                _this.onFailedPublish(err);
            });
        }
        else {
            var _loop_1 = function (catalogueLine) {
                this_1.catalogueService.addCatalogueLine(this_1.catalogueService.catalogueResponse.catalogueUuid, JSON.stringify(catalogueLine))
                    .then(function () {
                    _this.onSuccessfulPublish(exitThePage, [catalogueLine]);
                })
                    .catch(function (err) { return _this.onFailedPublish(err); });
            };
            var this_1 = this;
            // TODO: create a service to add multiple catalogue lines
            for (var _a = 0, splicedCatalogueLines_2 = splicedCatalogueLines; _a < splicedCatalogueLines_2.length; _a++) {
                var catalogueLine = splicedCatalogueLines_2[_a];
                _loop_1(catalogueLine);
            }
        }
    };
    // Should be called on save
    LogisticServicePublishComponent.prototype.saveEditedProduct = function (exitThePage, catalogueLines) {
        var _this = this;
        this.error_detc = false;
        this.callback = false;
        this.submitted = true;
        this.publishStatus.submit();
        var splicedCatalogueLines = [];
        // remove unused properties from catalogueLine
        for (var _i = 0, catalogueLines_2 = catalogueLines; _i < catalogueLines_2.length; _i++) {
            var catalogueLine = catalogueLines_2[_i];
            splicedCatalogueLines.push(this.removeEmptyProperties(catalogueLine));
        }
        var _loop_2 = function (catalogueLine) {
            this_2.catalogueService.updateCatalogueLine(this_2.catalogueService.catalogueResponse.catalogueUuid, JSON.stringify(catalogueLine))
                .then(function () { return _this.onSuccessfulPublish(exitThePage, [catalogueLine]); })
                .then(function () { return _this.changePublishModeToCreate(); })
                .catch(function (err) {
                _this.onFailedPublish(err);
            });
        };
        var this_2 = this;
        // TODO: create a service to update multiple catalogue lines
        for (var _a = 0, splicedCatalogueLines_3 = splicedCatalogueLines; _a < splicedCatalogueLines_3.length; _a++) {
            var catalogueLine = splicedCatalogueLines_3[_a];
            _loop_2(catalogueLine);
        }
    };
    // changes publishMode to create
    LogisticServicePublishComponent.prototype.changePublishModeToCreate = function () {
        this.changePublishModeCreate = true;
    };
    LogisticServicePublishComponent.prototype.onFailedPublish = function (err) {
        this.publishStatus.error(err);
        this.submitted = false;
        this.error_detc = true;
        if (err.status == 406) {
            this.sameIdError = true;
            this.erroneousID = this.catalogueLine.id;
        }
        else {
            this.sameIdError = false;
        }
    };
    // catalogueLineId is the id of catalogue line created or edited
    LogisticServicePublishComponent.prototype.onSuccessfulPublish = function (exitThePage, catalogueLines) {
        var _this = this;
        var catalogueLineIds = catalogueLines.map(function (catalogueLine) { return catalogueLine.id; });
        var userId = this.cookieService.get("user_id");
        this.userService.getUserParty(userId).then(function (party) {
            _this.catalogueService.getCatalogueResponse(userId).then(function (catalogueResponse) {
                _this.catalogueService.getCatalogueLines(catalogueResponse.catalogueUuid, catalogueLineIds).then(function (catalogueLines) {
                    // go to the dashboard - catalogue tab
                    if (exitThePage) {
                        _this.catalogueLine = ubl_model_utils_1.UBLModelUtils.createCatalogueLine(catalogueResponse.catalogueUuid, party, _this.companyNegotiationSettings);
                        // since every changes is saved,we do not need a dialog box
                        _this.dialogBox = false;
                        _this.router.navigate(['dashboard'], {
                            queryParams: {
                                tab: "CATALOGUE",
                            }
                        });
                    }
                    else {
                        if (_this.publishStateService.publishMode == 'create') {
                            for (var _i = 0, catalogueLines_3 = catalogueLines; _i < catalogueLines_3.length; _i++) {
                                var catalogueLine = catalogueLines_3[_i];
                                for (var _a = 0, _b = _this.availableLogisticsServices; _a < _b.length; _a++) {
                                    var serviceType = _b[_a];
                                    if (catalogueLine.id == _this.logisticCatalogueLines.get(serviceType).id) {
                                        // add missing additional item properties
                                        _this.addMissingAdditionalItemProperties(catalogueLine);
                                        _this.logisticCatalogueLines.set(serviceType, catalogueLine);
                                        _this.logisticPublishMode.set(serviceType, 'edit');
                                        break;
                                    }
                                }
                            }
                            // be sure that each logistics catalogue line has a reference to the catalogue
                            for (var _c = 0, _d = _this.availableLogisticsServices; _c < _d.length; _c++) {
                                var serviceType = _d[_c];
                                _this.logisticCatalogueLines.get(serviceType).goodsItem.item.catalogueDocumentReference.id = catalogueResponse.catalogueUuid;
                            }
                        }
                        else {
                            // since there is only one catalogue line
                            _this.catalogueLine = catalogueLines[0];
                            // add missing additional item properties
                            _this.addMissingAdditionalItemProperties(_this.catalogueLine);
                            // we need to change publish mode to 'edit' since we published the product/service
                            _this.publishStateService.publishMode = "edit";
                        }
                    }
                    _this.catalogueService.draftCatalogueLine = _this.catalogueLine;
                    _this.publishStatus.callback("Successfully Submitted", true);
                    _this.submitted = false;
                    _this.callback = true;
                    _this.error_detc = false;
                }).
                    catch(function (error) {
                    _this.publishStatus.error("Error while publishing product", error);
                });
            })
                .catch(function (error) {
                _this.publishStatus.error("Error while publishing product", error);
            });
        })
            .catch(function (error) {
            _this.publishStatus.error("Error while publishing product", error);
        });
    };
    LogisticServicePublishComponent.prototype.onBack = function () {
        this.location.back();
    };
    LogisticServicePublishComponent = __decorate([
        core_1.Component({
            selector: "logistic-service-publish",
            templateUrl: "./logistic-service-publish.component.html",
            styleUrls: ["./logistic-service-publish.component.css"]
        }),
        __metadata("design:paramtypes", [category_service_1.CategoryService,
            catalogue_service_1.CatalogueService,
            publish_and_aip_service_1.PublishService,
            user_service_1.UserService,
            router_1.ActivatedRoute,
            router_1.Router,
            common_1.Location,
            ng2_cookies_1.CookieService,
            logistic_publishing_service_1.LogisticPublishingService])
    ], LogisticServicePublishComponent);
    return LogisticServicePublishComponent;
}());
exports.LogisticServicePublishComponent = LogisticServicePublishComponent;
//# sourceMappingURL=logistic-service-publish.component.js.map