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
var lunr = require("lunr");
var publish_and_aip_service_1 = require("../publish-and-aip.service");
var forms_1 = require("@angular/forms");
var ubl_model_utils_1 = require("../model/ubl-model-utils");
var call_status_1 = require("../../common/call-status");
var utils_1 = require("../../common/utils");
var quantity_1 = require("../model/publish/quantity");
var category_service_1 = require("../category/category.service");
var catalogue_service_1 = require("../catalogue.service");
var user_service_1 = require("../../user-mgmt/user.service");
var router_1 = require("@angular/router");
var ng2_cookies_1 = require("ng2-cookies");
var binary_object_1 = require("../model/publish/binary-object");
var utils_2 = require("../../common/utils");
var product_wrapper_1 = require("../../common/product-wrapper");
var edit_property_modal_component_1 = require("./edit-property-modal.component");
var common_1 = require("@angular/common");
var Observable_1 = require("rxjs/Observable");
var Subject_1 = require("rxjs/Subject");
require("rxjs/add/observable/fromPromise");
require("rxjs/add/observable/interval");
require("rxjs/add/operator/takeUntil");
var constants_1 = require("../model/constants");
var myGlobals = require("../../globals");
var text_1 = require("../model/publish/text");
var catalogue_1 = require("../model/publish/catalogue");
var unit_service_1 = require("../../common/unit-service");
var ProductPublishComponent = /** @class */ (function () {
    function ProductPublishComponent(categoryService, catalogueService, publishStateService, userService, route, router, location, cookieService, unitService, modalService) {
        this.categoryService = categoryService;
        this.catalogueService = catalogueService;
        this.publishStateService = publishStateService;
        this.userService = userService;
        this.route = route;
        this.router = router;
        this.location = location;
        this.cookieService = cookieService;
        this.unitService = unitService;
        this.modalService = modalService;
        this.publishStatus = new call_status_1.CallStatus();
        this.publishingGranularity = "single";
        this.productCategoryRetrievalStatus = new call_status_1.CallStatus();
        this.productCatalogueRetrievalStatus = new call_status_1.CallStatus();
        this.ngUnsubscribe = new Subject_1.Subject();
        /*
         * Values for Single only
         */
        this.catalogueLine = null;
        this.productWrapper = null;
        this.selectedProperties = {};
        this.categoryProperties = {};
        this.selectedPropertiesUpdates = {};
        this.categoryModalPropertyKeyword = "";
        this.selectedCatalogue = "default";
        this.catlogueId = "default";
        this.customProperties = [];
        this.cataloguesIds = [];
        this.selectedCatalogueuuid = "";
        this.callStatus = new call_status_1.CallStatus();
        // placeholder for the custom property
        this.newProperty = ubl_model_utils_1.UBLModelUtils.createAdditionalItemProperty(null, null);
        // form model to be provided as root model to the inner components used in publishing
        this.publishForm = new forms_1.FormGroup({});
        this.submitted = false;
        this.callback = false;
        this.error_detc = false;
        // check whether product id conflict exists or not
        this.sameIdError = false;
        // the value of the erroneousID
        this.erroneousID = "";
        this.config = myGlobals.config;
        this.json = JSON;
        // used to add a new property which has a unit
        this.quantity = new quantity_1.Quantity(null, null);
        // check whether changing publish-mode to 'create' is necessary or not
        this.changePublishModeCreate = false;
        // whether we need to show dimensions or not
        this.showDimensions = false;
        // dimensions of the item
        this.multiValuedDimensions = null;
        // dimensions retrieved from the unit service
        this.dimensions = [];
        // dimensions' units retrieved from the unit service
        this.dimensionUnits = [];
        this.selectedTabSinglePublish = "DETAILS";
        this.languages = constants_1.LANGUAGES;
    }
    ProductPublishComponent_1 = ProductPublishComponent;
    ProductPublishComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.selectedCategories = this.categoryService.selectedCategories;
        this.getCatagloueIdsForParty();
        var userId = this.cookieService.get("user_id");
        this.callStatus.submit();
        this.userService.getUserParty(userId).then(function (party) {
            return Promise.all([
                Promise.resolve(party),
                _this.catalogueService.getCatalogueResponse(userId),
                _this.userService.getCompanyNegotiationSettingsForParty(ubl_model_utils_1.UBLModelUtils.getPartyId(party)),
                _this.unitService.getCachedUnitList("dimensions"),
                _this.unitService.getCachedUnitList("length_quantity")
            ]);
        })
            .then(function (_a) {
            var party = _a[0], catalogueResponse = _a[1], settings = _a[2], dimensions = _a[3], dimensionUnits = _a[4];
            // set dimensions and units lists
            _this.dimensions = dimensions;
            _this.dimensionUnits = dimensionUnits;
            _this.initView(party, catalogueResponse, settings);
            _this.publishStateService.publishingStarted = true;
            _this.callStatus.callback("Successfully initialized.", true);
        })
            .catch(function (error) {
            _this.callStatus.error("Error while initializing the publish view.", error);
        });
        this.route.queryParams.subscribe(function (params) {
            // handle publishing granularity: single, bulk, null
            _this.publishingGranularity = params['pg'];
            if (_this.publishingGranularity == null) {
                _this.publishingGranularity = 'single';
            }
            var catalogueId = params['cat'];
            if (catalogueId != null) {
                _this.selectedCatalogue = catalogueId;
            }
        });
        this.selectedCatalogueuuid = this.catalogueService.catalogueResponse.catalogueUuid;
    };
    ProductPublishComponent.prototype.ngOnDestroy = function () {
        this.ngUnsubscribe.next();
    };
    ProductPublishComponent.prototype.selectPreferredName = function (cp) {
        return utils_2.selectPreferredName(cp);
    };
    ProductPublishComponent.prototype.changeCat = function () {
        var _this = this;
        this.catlogueId = this.selectedCatalogue;
        this.catalogueService.getCatalogueFromId(this.catlogueId).then(function (catalogue) {
            _this.selectedCatalogueuuid = catalogue.uuid;
        }).catch(function (err) {
            _this.selectedCatalogueuuid = _this.catalogueService.catalogueResponse.catalogueUuid;
        });
    };
    /*
     * Event Handlers
     */
    ProductPublishComponent.prototype.onSelectTab = function (event) {
        event.preventDefault();
        if (event.target.id === "singleUpload") {
            this.publishingGranularity = "single";
        }
        else {
            this.publishingGranularity = "bulk";
        }
    };
    ProductPublishComponent.prototype.onSelectTabSinglePublish = function (event) {
        event.preventDefault();
        this.selectedTabSinglePublish = event.target.id;
    };
    /**
     * deselect a category
     * 1) remove the property from additional item properties
     * 2) remove the category from the selected categories
     * 3) remove the corresponding commodity classification from the item
     */
    ProductPublishComponent.prototype.onRemoveCategory = function (category) {
        var index = this.categoryService.selectedCategories.findIndex(function (c) { return c.id === category.id; });
        if (index > -1) {
            this.catalogueLine.goodsItem.item.additionalItemProperty = this.catalogueLine.goodsItem.item.additionalItemProperty.filter(function (el) {
                return el.itemClassificationCode.value !== category.id;
            });
            this.categoryService.selectedCategories.splice(index, 1);
            this.recomputeSelectedProperties();
        }
        var i = this.catalogueLine.goodsItem.item.commodityClassification.findIndex(function (c) { return c.itemClassificationCode.value === category.id; });
        if (i > -1) {
            this.catalogueLine.goodsItem.item.commodityClassification.splice(i, 1);
        }
    };
    ProductPublishComponent.prototype.onAddCategory = function (event, dismissModal) {
        if (event) {
            event.preventDefault();
        }
        if (dismissModal) {
            dismissModal("add category");
        }
        ProductPublishComponent_1.dialogBox = false;
        this.router.navigate(['catalogue/categorysearch'], { queryParams: { pageRef: "publish", pg: this.publishingGranularity, productType: this.productType } });
    };
    ProductPublishComponent.prototype.onAddCustomProperty = function (event, dismissModal) {
        event.preventDefault();
        dismissModal("add property");
        var property = ubl_model_utils_1.UBLModelUtils.createAdditionalItemProperty(null, null);
        //this.catalogueLine.goodsItem.item.additionalItemProperty.push(property);
        this.editPropertyModal.open(property, null, this.catalogueLine.goodsItem.item.additionalItemProperty);
    };
    ProductPublishComponent.prototype.onRemoveProperty = function (property) {
        var properties = this.catalogueLine.goodsItem.item.additionalItemProperty;
        if (utils_2.isCustomProperty(property)) {
            var index = properties.indexOf(property);
            if (index >= 0) {
                properties.splice(index, 1);
            }
        }
        else {
            var key_1 = utils_2.getPropertyKey(property);
            this.catalogueLine.goodsItem.item.additionalItemProperty = properties.filter(function (prop) {
                return key_1 !== utils_2.getPropertyKey(prop);
            });
        }
    };
    ProductPublishComponent.prototype.onBack = function () {
        this.location.back();
    };
    ProductPublishComponent.prototype.onPublish = function (exitThePage) {
        if (this.catalogueLine.requiredItemLocationQuantity.price.priceAmount.value != null) {
            if (!utils_1.isValidPrice(this.catalogueLine.requiredItemLocationQuantity.price.priceAmount.value)) {
                alert("Price cannot have more than 2 decimal places");
                return false;
            }
        }
        if (this.publishStateService.publishMode === "create" || this.publishStateService.publishMode === "copy") {
            // publish new product
            this.publishProduct(exitThePage);
        }
        else {
            // remove unused properties from catalogueLine
            var splicedCatalogueLine = this.removeEmptyProperties(this.catalogueLine);
            // nullify the transportation service details if a regular product is being published
            this.checkProductNature(splicedCatalogueLine);
            // update existing product
            this.saveEditedProduct(exitThePage, [splicedCatalogueLine]);
        }
    };
    ProductPublishComponent.prototype.isLoading = function () {
        return (this.publishStatus.fb_submitted || this.isProductCategoriesLoading());
    };
    ProductPublishComponent.prototype.isProductCategoriesLoading = function () {
        return this.productCategoryRetrievalStatus.fb_submitted;
    };
    ProductPublishComponent.prototype.hasSelectedProperties = function () {
        return this.catalogueLine.goodsItem.item.additionalItemProperty.length > 0;
    };
    ProductPublishComponent.prototype.isCustomProperty = function (property) {
        return utils_2.isCustomProperty(property);
    };
    ProductPublishComponent.prototype.getCategoryProperties = function (category) {
        var code = category.code;
        if (!this.categoryProperties[code]) {
            this.categoryProperties[code] = utils_2.sortProperties(category.properties.slice());
        }
        return this.categoryProperties[code];
    };
    ProductPublishComponent.prototype.isCategoryPropertySelected = function (category, property) {
        var key = utils_2.getPropertyKey(property);
        var selectedProp = this.selectedProperties[key];
        return selectedProp.selected;
    };
    ProductPublishComponent.prototype.selectAllProperties = function (category, event) {
        if (event) {
            event.preventDefault();
        }
        var properties = this.getCategoryProperties(category);
        for (var _i = 0, properties_1 = properties; _i < properties_1.length; _i++) {
            var property = properties_1[_i];
            if (!this.isCategoryPropertySelected(category, property))
                this.onToggleCategoryPropertySelected(category, property);
        }
    };
    ProductPublishComponent.prototype.selectNoProperties = function (category, event) {
        if (event) {
            event.preventDefault();
        }
        var properties = this.getCategoryProperties(category);
        for (var _i = 0, properties_2 = properties; _i < properties_2.length; _i++) {
            var property = properties_2[_i];
            if (this.isCategoryPropertySelected(category, property))
                this.onToggleCategoryPropertySelected(category, property);
        }
    };
    ProductPublishComponent.prototype.getPropertyType = function (property) {
        return utils_2.sanitizeDataTypeName(property.dataType);
    };
    ProductPublishComponent.prototype.isValidCatalogueLine = function () {
        // must have a name
        return this.itemHasName(this.catalogueLine.goodsItem.item);
    };
    ProductPublishComponent.prototype.itemHasName = function (item) {
        return item.name[0] && item.name[0].value !== "";
    };
    ProductPublishComponent.prototype.addItemNameDescription = function () {
        var newItemName = new text_1.Text("", constants_1.DEFAULT_LANGUAGE());
        var newItemDescription = new text_1.Text("", constants_1.DEFAULT_LANGUAGE());
        this.catalogueLine.goodsItem.item.name.push(newItemName);
        this.catalogueLine.goodsItem.item.description.push(newItemDescription);
    };
    ProductPublishComponent.prototype.recomputeSelectedProperties = function () {
        var oldSelectedProps = this.selectedProperties;
        this.selectedProperties = {};
        var newSelectedProps = this.selectedProperties;
        for (var _i = 0, _a = this.selectedCategories; _i < _a.length; _i++) {
            var category = _a[_i];
            if (category.properties) {
                for (var _b = 0, _c = category.properties; _b < _c.length; _b++) {
                    var property = _c[_b];
                    var key = utils_2.getPropertyKey(property);
                    if (!this.selectedProperties[key]) {
                        var oldProp = oldSelectedProps[key];
                        this.selectedProperties[key] = {
                            categories: [],
                            properties: [],
                            lunrSearchId: null,
                            key: key,
                            selected: oldProp && oldProp.selected,
                            preferredName: property.preferredName,
                            shortName: property.shortName
                        };
                    }
                    var newProp = this.selectedProperties[key];
                    newProp.properties.push(property);
                    newProp.categories.push(category);
                }
            }
        }
        this.lunrIndex = lunr(function () {
            var _this = this;
            this.field("preferredName");
            this.field("shortName");
            this.ref("key");
            Object.keys(newSelectedProps).forEach(function (key) {
                _this.add(newSelectedProps[key]);
            });
        });
    };
    ProductPublishComponent.prototype.toggleDimensionCard = function () {
        this.showDimensions = !this.showDimensions;
    };
    ProductPublishComponent.prototype.onAddDimension = function (attributeId) {
        this.productWrapper.addDimension(attributeId);
        // update dimensions
        this.multiValuedDimensions = this.productWrapper.getDimensionMultiValue();
    };
    ProductPublishComponent.prototype.onRemoveDimension = function (attributeId, quantity) {
        this.productWrapper.removeDimension(attributeId, quantity);
        // update dimensions
        this.multiValuedDimensions = this.productWrapper.getDimensionMultiValue();
    };
    ProductPublishComponent.prototype.getProductProperties = function () {
        return this.productWrapper.getAllUniqueProperties();
    };
    ProductPublishComponent.prototype.getPrettyName = function (property) {
        return utils_2.sanitizePropertyName(utils_2.selectName(property));
    };
    ProductPublishComponent.prototype.getValuesAsString = function (property) {
        return utils_2.getPropertyValuesAsStrings(property);
    };
    ProductPublishComponent.prototype.onAddValue = function (property) {
        switch (property.valueQualifier) {
            case "INT":
            case "DOUBLE":
            case "NUMBER":
                property.valueDecimal.push(0);
                break;
            case "QUANTITY":
                property.valueQuantity.push(new quantity_1.Quantity(0, ""));
                break;
            case "STRING":
                property.value.push(utils_2.createText(''));
                break;
            default:
        }
    };
    ProductPublishComponent.prototype.onRemoveValue = function (property, index) {
        switch (property.valueQualifier) {
            case "INT":
            case "DOUBLE":
            case "NUMBER":
                property.valueDecimal.splice(index, 1);
                break;
            case "QUANTITY":
                property.valueQuantity.splice(index, 1);
                break;
            case "STRING":
                property.value.splice(index, 1);
                break;
            default:
        }
    };
    ProductPublishComponent.prototype.addEmptyValuesToProperty = function (property) {
        if (property.value.length === 0) {
            if (property.valueQualifier == "BOOLEAN") {
                property.value.push(utils_2.createText('false'));
            }
            else {
                property.value.push(utils_2.createText(''));
            }
        }
        if (property.valueDecimal.length === 0) {
            property.valueDecimal.push(0);
        }
        if (property.valueQuantity.length === 0) {
            property.valueQuantity.push(new quantity_1.Quantity());
        }
    };
    ProductPublishComponent.prototype.getDefinition = function (property) {
        var key = utils_2.getPropertyKey(property);
        var selProp = this.selectedProperties[key];
        if (!selProp) {
            return "No definition.";
        }
        for (var _i = 0, _a = selProp.properties; _i < _a.length; _i++) {
            var prop = _a[_i];
            if (prop.definition && prop.definition !== "") {
                return prop.definition;
            }
        }
        return "No definition.";
    };
    ProductPublishComponent.prototype.getValues = function (property) {
        var values = utils_2.getPropertyValues(property);
        this.addEmptyValuesToProperty(property);
        return values;
    };
    ProductPublishComponent.prototype.setValue = function (property, i, event) {
        property.value[i].value = event.target.value;
    };
    ProductPublishComponent.prototype.setBooleanValue = function (property, i, event) {
        if (event.target.checked)
            property.value[i].value = "true";
        else
            property.value[i].value = "false";
    };
    ProductPublishComponent.prototype.setValueDecimal = function (property, i, event) {
        property.valueDecimal[i] = event.target.value;
    };
    ProductPublishComponent.prototype.onEditProperty = function (property) {
        var key = utils_2.getPropertyKey(property);
        this.editPropertyModal.open(property, this.selectedProperties[key], null);
    };
    ProductPublishComponent.prototype.showCategoriesModal = function (categoriesModal, event) {
        var _this = this;
        event.preventDefault();
        this.categoryModalPropertyKeyword = "";
        this.modalService.open(categoriesModal).result.then(function () {
            var properties = _this.catalogueLine.goodsItem.item.additionalItemProperty;
            Object.keys(_this.selectedPropertiesUpdates).forEach(function (key) {
                var selected = _this.selectedPropertiesUpdates[key];
                var property = _this.selectedProperties[key];
                if (selected) {
                    // add property if not there
                    for (var i = 0; i < property.properties.length; i++) {
                        var prop = property.properties[i];
                        var category = property.categories[i];
                        properties.push(ubl_model_utils_1.UBLModelUtils.createAdditionalItemProperty(prop, category));
                    }
                }
                else {
                    // remove property if there
                    properties = properties.filter(function (value) {
                        var propKey = utils_2.getPropertyKey(value);
                        return propKey !== key;
                    });
                    _this.catalogueLine.goodsItem.item.additionalItemProperty = properties;
                }
            });
            _this.selectedPropertiesUpdates = {};
        }, function () {
            _this.selectedPropertiesUpdates = {};
        });
    };
    ProductPublishComponent.prototype.onToggleCategoryPropertySelected = function (category, property) {
        var key = utils_2.getPropertyKey(property);
        var selectedProp = this.selectedProperties[key];
        selectedProp.selected = !selectedProp.selected;
        this.selectedPropertiesUpdates[key] = selectedProp.selected;
    };
    ProductPublishComponent.prototype.onFilterPropertiesInCategoryModal = function () {
        var _this = this;
        this.currentLunrSearchId = ubl_model_utils_1.UBLModelUtils.generateUUID();
        this.lunrIndex.search("*" + this.categoryModalPropertyKeyword + "*").forEach(function (result) {
            _this.selectedProperties[result.ref].lunrSearchId = _this.currentLunrSearchId;
        });
    };
    ProductPublishComponent.prototype.isPropertyFilteredIn = function (property) {
        if (this.categoryModalPropertyKeyword === "") {
            return true;
        }
        var key = utils_2.getPropertyKey(property);
        return this.selectedProperties[key].lunrSearchId === this.currentLunrSearchId;
    };
    /*
     * Other Stuff
     */
    ProductPublishComponent.prototype.canDeactivate = function () {
        if (this.changePublishModeCreate) {
            this.publishStateService.publishMode = 'create';
            this.publishStateService.publishingStarted = false;
        }
        if (ProductPublishComponent_1.dialogBox) {
            var x = confirm("You will lose any changes you made, are you sure you want to quit ?");
            if (x) {
                this.publishStateService.publishMode = 'create';
                this.publishStateService.publishingStarted = false;
            }
            return x;
        }
        ProductPublishComponent_1.dialogBox = true;
        return true;
    };
    ProductPublishComponent.prototype.initView = function (userParty, catalogueResponse, settings) {
        var _this = this;
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
                this.catalogueService.draftCatalogueLine = utils_2.removeHjids(this.catalogueService.draftCatalogueLine);
            }
            this.catalogueLine = this.catalogueService.draftCatalogueLine;
            if (this.catalogueLine == null) {
                this.publishStateService.publishMode = 'create';
                this.router.navigate(['catalogue/publish']);
                return;
            }
            this.productWrapper = new product_wrapper_1.ProductWrapper(this.catalogueLine, settings);
            // Get categories of item to edit
            if (this.publishStateService.publishingStarted == false) {
                var classificationCodes = [];
                for (var _i = 0, _a = this.catalogueLine.goodsItem.item.commodityClassification; _i < _a.length; _i++) {
                    var classification = _a[_i];
                    classificationCodes.push(classification.itemClassificationCode);
                }
                if (classificationCodes.length > 0) {
                    // temporarily store publishing started variable as it will be used inside the following callback
                    this.productCategoryRetrievalStatus.submit();
                    Observable_1.Observable.fromPromise(this.categoryService.getCategoriesByIds(classificationCodes))
                        .takeUntil(this.ngUnsubscribe)
                        .catch(function (err) {
                        _this.productCategoryRetrievalStatus.error('Failed to get product categories');
                        return Observable_1.Observable.throw(err);
                    })
                        .subscribe(function (categories) {
                        // upon navigating from the catalogue view, classification codes are set as selected categories
                        for (var _i = 0, categories_1 = categories; _i < categories_1.length; _i++) {
                            var category = categories_1[_i];
                            _this.categoryService.selectedCategories.push(category);
                        }
                        utils_2.sortCategories(_this.categoryService.selectedCategories);
                        if (_this.categoryService.selectedCategories != []) {
                            for (var _a = 0, _b = _this.categoryService.selectedCategories; _a < _b.length; _a++) {
                                var category = _b[_a];
                                var newCategory = _this.isNewCategory(category);
                                if (newCategory) {
                                    _this.updateItemWithNewCategory(category);
                                }
                            }
                        }
                        _this.recomputeSelectedProperties();
                        _this.ngUnsubscribe.complete();
                        _this.productCategoryRetrievalStatus.callback('Retrieved product categories', true);
                    });
                }
            }
            else {
                for (var _b = 0, _c = this.categoryService.selectedCategories; _b < _c.length; _b++) {
                    var category = _c[_b];
                    var newCategory = this.isNewCategory(category);
                    if (newCategory) {
                        this.updateItemWithNewCategory(category);
                    }
                }
            }
        }
        else {
            // new publishing is the first entry to the publishing page
            // i.e. publishing from scratch
            if (this.publishStateService.publishingStarted == false) {
                this.catalogueLine = ubl_model_utils_1.UBLModelUtils.createCatalogueLine(catalogueResponse.catalogueUuid, userParty, settings, this.dimensions);
                this.catalogueService.draftCatalogueLine = this.catalogueLine;
            }
            else {
                this.catalogueLine = this.catalogueService.draftCatalogueLine;
            }
            if (this.catalogueLine) {
                if (this.catalogueLine.goodsItem.item.name.length == 0)
                    this.addItemNameDescription();
                this.productWrapper = new product_wrapper_1.ProductWrapper(this.catalogueLine, settings);
                for (var _d = 0, _e = this.categoryService.selectedCategories; _d < _e.length; _d++) {
                    var category = _e[_d];
                    var newCategory = this.isNewCategory(category);
                    if (newCategory) {
                        this.updateItemWithNewCategory(category);
                    }
                }
            }
        }
        // call this function with dimension unit list to be sure that item will have some dimension
        this.multiValuedDimensions = this.productWrapper.getDimensionMultiValue(true, this.dimensions);
        this.recomputeSelectedProperties();
    };
    ProductPublishComponent.prototype.updateItemWithNewCategory = function (category) {
        this.catalogueLine.goodsItem.item.commodityClassification.push(ubl_model_utils_1.UBLModelUtils.createCommodityClassification(category));
    };
    // should be called on publish new product
    ProductPublishComponent.prototype.publishProduct = function (exitThePage) {
        // remove unused properties from catalogueLine
        var splicedCatalogueLine = this.removeEmptyProperties(this.catalogueLine);
        // nullify the transportation service details if a regular product is being published
        this.checkProductNature(splicedCatalogueLine);
        this.publish([splicedCatalogueLine], exitThePage);
    };
    ProductPublishComponent.prototype.publish = function (catalogueLines, exitThePage) {
        var _this = this;
        this.publishStatus.submit();
        if (this.catalogueService.catalogueResponse.catalogueUuid == null) {
            var userId = this.cookieService.get("user_id");
            this.userService.getUserParty(userId).then(function (userParty) {
                // create the catalogue
                var catalogue = new catalogue_1.Catalogue("default", null, userParty, "", "", []);
                // add catalogue lines to the end of catalogue
                for (var _i = 0, catalogueLines_1 = catalogueLines; _i < catalogueLines_1.length; _i++) {
                    var catalogueLine = catalogueLines_1[_i];
                    catalogue.catalogueLine.push(catalogueLine);
                }
                _this.catalogueService.postCatalogue(catalogue)
                    .then(function () { return _this.onSuccessfulPublish(exitThePage, catalogueLines); })
                    .catch(function (err) {
                    _this.onFailedPublish(err);
                });
            }).catch(function (err) {
                _this.onFailedPublish(err);
            });
        }
        else {
            var catalogueId = this.catlogueId;
            this.catalogueService.getCatalogueFromId(catalogueId).then(function (catalogue) {
                var _loop_1 = function (catalogueLine) {
                    catalogueLine.goodsItem.item.catalogueDocumentReference.id = catalogue.uuid;
                    _this.catalogueService.addCatalogueLine(catalogue.uuid, JSON.stringify(catalogueLine))
                        .then(function () {
                        _this.onSuccessfulPublish(exitThePage, [catalogueLine]);
                    })
                        .catch(function (err) { return _this.onFailedPublish(err); });
                };
                // TODO: create a service to add multiple catalogue lines
                for (var _i = 0, catalogueLines_2 = catalogueLines; _i < catalogueLines_2.length; _i++) {
                    var catalogueLine = catalogueLines_2[_i];
                    _loop_1(catalogueLine);
                }
            })
                .catch(function (err) {
                _this.onFailedPublish(err);
            });
        }
    };
    // Should be called on save
    ProductPublishComponent.prototype.saveEditedProduct = function (exitThePage, catalogueLines) {
        var _this = this;
        this.error_detc = false;
        this.callback = false;
        this.submitted = true;
        this.publishStatus.submit();
        this.getCatalogueUUid().then(function (catalogue) {
            _this.selectedCatalogueuuid = catalogue.uuid;
            var _loop_2 = function (catalogueLine) {
                _this.catalogueService.updateCatalogueLine(_this.selectedCatalogueuuid, JSON.stringify(catalogueLine))
                    .then(function () { return _this.onSuccessfulPublish(exitThePage, [catalogueLine]); })
                    .then(function () { return _this.changePublishModeToCreate(); })
                    .catch(function (err) {
                    _this.onFailedPublish(err);
                });
            };
            // TODO: create a service to update multiple catalogue lines
            for (var _i = 0, catalogueLines_3 = catalogueLines; _i < catalogueLines_3.length; _i++) {
                var catalogueLine = catalogueLines_3[_i];
                _loop_2(catalogueLine);
            }
        }).catch(function (err) {
            _this.onFailedPublish(err);
        });
    };
    ProductPublishComponent.prototype.getCatalogueUUid = function () {
        this.catlogueId = this.selectedCatalogue;
        return this.catalogueService.getCatalogueFromId(this.catlogueId);
    };
    // changes publishMode to create
    ProductPublishComponent.prototype.changePublishModeToCreate = function () {
        this.changePublishModeCreate = true;
    };
    ProductPublishComponent.prototype.checkProductNature = function (catalogueLine) {
        if (this.publishStateService.publishedProductNature == 'Regular product') {
            catalogueLine.goodsItem.item.transportationServiceDetails = null;
        }
    };
    // Removes empty properties from catalogueLines about to be sent
    ProductPublishComponent.prototype.removeEmptyProperties = function (catalogueLine) {
        // Make deep copy of catalogue line so we can remove empty fields without disturbing UI model
        // This is required because there is no redirect after publish action
        var catalogueLineCopy = utils_2.copy(catalogueLine);
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
        for (var _i = 0, properties_3 = properties; _i < properties_3.length; _i++) {
            var property = properties_3[_i];
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
    // catalogueLineId is the id of catalogue line created or edited
    ProductPublishComponent.prototype.onSuccessfulPublish = function (exitThePage, catalogueLines) {
        var _this = this;
        var catalogueLineIds = catalogueLines.map(function (catalogueLine) { return catalogueLine.id; });
        var userId = this.cookieService.get("user_id");
        this.userService.getUserParty(userId).then(function (party) {
            _this.catalogueService.getCatalogueFromId(_this.catlogueId).then(function (catalogueResponse) {
                _this.catalogueService.getCatalogueLines(catalogueResponse.uuid, catalogueLineIds).then(function (catalogueLines) {
                    // go to the dashboard - catalogue tab
                    if (exitThePage) {
                        _this.catalogueLine = ubl_model_utils_1.UBLModelUtils.createCatalogueLine(catalogueResponse.uuid, party, _this.companyNegotiationSettings, _this.dimensions);
                        // since every changes is saved,we do not need a dialog box
                        ProductPublishComponent_1.dialogBox = false;
                        // avoid category duplication
                        _this.categoryService.resetSelectedCategories();
                        _this.publishStateService.resetData();
                        _this.router.navigate(['dashboard'], {
                            queryParams: {
                                tab: "CATALOGUE",
                            }
                        });
                    }
                    else {
                        // since there is only one catalogue line
                        _this.catalogueLine = catalogueLines[0];
                        // we need to change publish mode to 'edit' since we published the product/service
                        _this.publishStateService.publishMode = "edit";
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
    ProductPublishComponent.prototype.onFailedPublish = function (err) {
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
    ProductPublishComponent.prototype.onValueTypeChange = function (event) {
        if (event.target.value == "Text") {
            this.newProperty.valueQualifier = "STRING";
        }
        else if (event.target.value == "Number") {
            this.newProperty.valueQualifier = "NUMBER";
        }
        else if (event.target.value == "Image" || event.target.value == "File") {
            this.newProperty.valueQualifier = "FILE";
        }
        else if (event.target.value == "Quantity") {
            this.newProperty.valueQualifier = "QUANTITY";
        }
        else if (event.target.value == "Boolean") {
            this.newProperty.valueQualifier = "BOOLEAN";
        }
    };
    ProductPublishComponent.prototype.fileChange = function (event) {
        var fileList = event.target.files;
        if (fileList.length > 0) {
            var binaryObjects_1 = this.newProperty.valueBinary;
            var _loop_3 = function (i) {
                var file = fileList[i];
                var reader = new FileReader();
                reader.onload = function (e) {
                    var base64String = reader.result.split(',').pop();
                    var binaryObject = new binary_object_1.BinaryObject(base64String, file.type, file.name, "", "");
                    binaryObjects_1.push(binaryObject);
                };
                reader.readAsDataURL(file);
            };
            for (var i = 0; i < fileList.length; i++) {
                _loop_3(i);
            }
        }
    };
    ProductPublishComponent.prototype.addImage = function (event) {
        var fileList = event.target.files;
        if (fileList.length > 0) {
            var binaryObjects_2 = this.newProperty.valueBinary;
            var _loop_4 = function (i) {
                var file = fileList[i];
                var reader = new FileReader();
                reader.onload = function (e) {
                    var base64String = reader.result.split(',').pop();
                    var binaryObject = new binary_object_1.BinaryObject(base64String, file.type, file.name, "", "");
                    binaryObjects_2.push(binaryObject);
                };
                reader.readAsDataURL(file);
            };
            for (var i = 0; i < fileList.length; i++) {
                _loop_4(i);
            }
        }
    };
    /**
     * Adds the new property to the end of existing custom properties. Processes the value arrays of the property;
     * keeps only the relevant array based on the value qualifier and removes the empty values
     */
    ProductPublishComponent.prototype.addCustomProperty = function () {
        if (this.newProperty.valueQualifier == "BOOLEAN") {
            var filledValues = [];
            for (var _i = 0, _a = this.newProperty.value; _i < _a.length; _i++) {
                var val = _a[_i];
                if (val.value != "") {
                    filledValues.push(val);
                }
            }
            this.newProperty.value = filledValues;
            this.newProperty.valueDecimal = [];
            this.newProperty.valueBinary = [];
            this.newProperty.valueQuantity = [];
        }
        else if (this.newProperty.valueQualifier == "QUANTITY") {
            this.newProperty.value = [];
            this.newProperty.valueDecimal = [];
            this.newProperty.valueBinary = [];
            this.newProperty.valueQuantity = [this.quantity];
        }
        else if (this.newProperty.valueQualifier == "STRING") {
            var filledValues = [];
            for (var _b = 0, _c = this.newProperty.value; _b < _c.length; _b++) {
                var val = _c[_b];
                if (val.value != "") {
                    filledValues.push(val);
                }
            }
            this.newProperty.value = filledValues;
            this.newProperty.valueDecimal = [];
            this.newProperty.valueBinary = [];
            this.newProperty.valueQuantity = [];
        }
        else if (this.newProperty.valueQualifier == "NUMBER") {
            var filledValues = [];
            for (var _d = 0, _e = this.newProperty.valueDecimal; _d < _e.length; _d++) {
                var val = _e[_d];
                if (val != undefined && val != null && val.toString() != "") {
                    filledValues.push(val);
                }
            }
            this.newProperty.valueDecimal = filledValues;
            this.newProperty.value = [];
            this.newProperty.valueBinary = [];
            this.newProperty.valueQuantity = [];
        }
        else if (this.newProperty.valueQualifier == "FILE") {
            this.newProperty.value = [];
            this.newProperty.valueDecimal = [];
            this.newProperty.valueQuantity = [];
        }
        // add the custom property to the end of existing custom properties
        var i = 0;
        for (i = 0; i < this.catalogueLine.goodsItem.item.additionalItemProperty.length; i++) {
            if (this.catalogueLine.goodsItem.item.additionalItemProperty[i].itemClassificationCode.listID != "Custom") {
                break;
            }
        }
        this.catalogueLine.goodsItem.item.additionalItemProperty.splice(i, 0, this.newProperty);
        this.catalogueLine.goodsItem.item.additionalItemProperty = [].concat(this.catalogueLine.goodsItem.item.additionalItemProperty);
        // reset the custom property view
        this.newProperty = ubl_model_utils_1.UBLModelUtils.createAdditionalItemProperty(null, null);
        this.quantity = new quantity_1.Quantity(null, null);
        this.propertyValueType.nativeElement.selectedIndex = 0;
    };
    // Product id is not editable when publish mode is 'edit'
    ProductPublishComponent.prototype.isProductIdEditable = function () {
        return this.publishStateService.publishMode != 'edit';
    };
    /**
     * Used to establish the two-way binding on the additional values of custom properties
     */
    ProductPublishComponent.prototype.trackByIndex = function (index, item) {
        return index;
    };
    ProductPublishComponent.prototype.addValueToProperty = function () {
        if (this.newProperty.valueQualifier == 'STRING') {
            var text = utils_2.createText('');
            this.newProperty.value.push(text);
        }
        else if (this.newProperty.valueQualifier == 'NUMBER') {
            var newNumber = void 0;
            this.newProperty.valueDecimal.push(newNumber);
        }
    };
    ProductPublishComponent.prototype.removeValueFromProperty = function (valueIndex) {
        if (this.newProperty.valueQualifier == 'STRING') {
            this.newProperty.value.splice(valueIndex, 1);
        }
        else if (this.newProperty.valueQualifier == 'NUMBER') {
            this.newProperty.valueDecimal.splice(valueIndex, 1);
        }
    };
    ProductPublishComponent.prototype.isNewCategory = function (category) {
        for (var _i = 0, _a = this.catalogueLine.goodsItem.item.commodityClassification; _i < _a.length; _i++) {
            var commodityClassification = _a[_i];
            if (category.id == commodityClassification.itemClassificationCode.value) {
                return false;
            }
        }
        return true;
    };
    ProductPublishComponent.prototype.handleError = function (error) {
        return Promise.reject(error.message || error);
    };
    ProductPublishComponent.prototype.getCatagloueIdsForParty = function () {
        var _this = this;
        this.productCatalogueRetrievalStatus.submit();
        this.catalogueService.getCatalogueIdsForParty().then(function (catalogueIds) {
            _this.cataloguesIds = catalogueIds;
            _this.productCatalogueRetrievalStatus.callback("Successfully loaded catalogueId list", true);
        }).catch(function (error) {
            _this.productCatalogueRetrievalStatus.error('Failed to get product catalogues');
        });
    };
    // check whether dialogBox is necessary or not during navigation
    ProductPublishComponent.dialogBox = true;
    __decorate([
        core_1.ViewChild(edit_property_modal_component_1.EditPropertyModalComponent),
        __metadata("design:type", edit_property_modal_component_1.EditPropertyModalComponent)
    ], ProductPublishComponent.prototype, "editPropertyModal", void 0);
    __decorate([
        core_1.ViewChild('propertyValueType'),
        __metadata("design:type", core_1.ElementRef)
    ], ProductPublishComponent.prototype, "propertyValueType", void 0);
    ProductPublishComponent = ProductPublishComponent_1 = __decorate([
        core_1.Component({
            selector: "product-publish",
            templateUrl: "./product-publish.component.html",
            styleUrls: ["./product-publish.component.css"]
        }),
        __metadata("design:paramtypes", [category_service_1.CategoryService,
            catalogue_service_1.CatalogueService,
            publish_and_aip_service_1.PublishService,
            user_service_1.UserService,
            router_1.ActivatedRoute,
            router_1.Router,
            common_1.Location,
            ng2_cookies_1.CookieService,
            unit_service_1.UnitService,
            ng_bootstrap_1.NgbModal])
    ], ProductPublishComponent);
    return ProductPublishComponent;
    var ProductPublishComponent_1;
}());
exports.ProductPublishComponent = ProductPublishComponent;
//# sourceMappingURL=product-publish.component.js.map