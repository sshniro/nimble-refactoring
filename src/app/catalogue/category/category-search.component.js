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
var category_service_1 = require("./category.service");
var ng2_cookies_1 = require("ng2-cookies");
var user_service_1 = require("../../user-mgmt/user.service");
var catalogue_service_1 = require("../catalogue.service");
var publish_and_aip_service_1 = require("../publish-and-aip.service");
var product_publish_component_1 = require("../publish/product-publish.component");
var call_status_1 = require("../../common/call-status");
var utils_1 = require("../../common/utils");
var utils_2 = require("../../common/utils");
var myGlobals = require("../../globals");
var app_component_1 = require("../../app.component");
var text_1 = require("../model/publish/text");
var operators_1 = require("rxjs/operators");
var simple_search_service_1 = require("../../simple-search/simple-search.service");
var CategorySearchComponent = /** @class */ (function () {
    function CategorySearchComponent(router, route, cookieService, userService, categoryService, simpleSearchService, catalogueService, publishService, appComponent) {
        var _this = this;
        this.router = router;
        this.route = route;
        this.cookieService = cookieService;
        this.userService = userService;
        this.categoryService = categoryService;
        this.simpleSearchService = simpleSearchService;
        this.catalogueService = catalogueService;
        this.publishService = publishService;
        this.appComponent = appComponent;
        this.selectedTab = "TREE";
        this.getCategoriesStatus = new call_status_1.CallStatus();
        this.favoriteCategoriesStatus = new call_status_1.CallStatus();
        this.recentCategoriesStatus = new call_status_1.CallStatus();
        this.addFavoriteCategoryStatus = new call_status_1.CallStatus();
        this.addRecentCategoryStatus = new call_status_1.CallStatus();
        this.getCategoryDetailsStatus = new call_status_1.CallStatus();
        this.pageRef = null;
        // It checks whether user will return publishing page or not
        this.isReturnPublish = false;
        // It checks whether user is publishing or not
        this.inPublish = false;
        this.treeView = true;
        this.parentCategories = null;
        this.selectedCategory = null;
        this.selectedCategories = [];
        this.selectedCategoryWithDetails = null;
        this.selectedCategoriesWRTLevels = [];
        this.propertyNames = ["code", "taxonomyId", "level", "definition", "note", "remark"];
        this.taxonomyId = myGlobals.config.standardTaxonomy;
        this.categoryFilter = myGlobals.config.categoryFilter;
        this.prefCats = [];
        this.recCats = [];
        this.logisticsCategory = null;
        this.showOtherProperties = null;
        this.scrollToDivId = null;
        // stores the parents of the selected category. We need this since changing parentCategories in tree view results in some problems.
        this.pathToSelectedCategories = null;
        this.getSuggestions = function (text$) {
            return text$.pipe(operators_1.debounceTime(200), operators_1.distinctUntilChanged(), operators_1.switchMap(function (term) {
                return _this.simpleSearchService.getClassSuggestions(term, ("{LANG}_label"), _this.taxonomyId == "All" ? "" : _this.categoryFilter[_this.taxonomyId].ontologyPrefix);
            }));
        };
    }
    CategorySearchComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.route.queryParams.subscribe(function (params) {
            // current page regs considered: menu, publish, null
            _this.pageRef = params["pageRef"];
            //set product type
            _this.productType = params["productType"] === "transportation" ? "transportation" : "product";
            _this.isLogistics = _this.productType === "transportation";
            // This part is necessary since only the params has changes,canDeactivate method will not be called.
            if (_this.inPublish == true && _this.pageRef == "menu") {
                if (!confirm("You will lose any changes you made, are you sure you want to quit ?")) {
                    return;
                }
            }
            // If pageRef is 'publish',then user is publishing.
            if (_this.pageRef == "publish") {
                _this.inPublish = true;
            }
            if (_this.pageRef == null || _this.pageRef == "menu") {
                // reset categories
                _this.categoryService.resetSelectedCategories();
                _this.selectedCategory = null;
                _this.selectedCategoryWithDetails = null;
                _this.pathToSelectedCategories = null;
                // reset draft catalogue line
                _this.publishService.publishingStarted = false;
                _this.publishService.publishMode = "create";
            }
            // get the favorite categories
            _this.getFavoriteCategories();
            // get the recently used categories
            _this.getRecentCategories();
            // publishing granularity: single, bulk, null
            _this.publishingGranularity = params["pg"];
            if (_this.pageRef == null) {
                _this.pageRef = "single";
            }
            // handle category query term
            _this.categoryKeyword = params["cat"];
            if (_this.categoryKeyword != null) {
                _this.getCategories();
            }
        });
        // get available taxonomy ids
        this.categoryService.getAvailableTaxonomies().then(function (taxonomyIDs) {
            _this.taxonomyIDs = ["All"];
            for (var i = 0; i < taxonomyIDs.length; i++) {
                _this.taxonomyIDs.push(taxonomyIDs[i]);
            }
            _this.getRootCategories(_this.taxonomyId == "All" ? "eClass" : _this.taxonomyId);
        });
    };
    CategorySearchComponent.prototype.onSelectTab = function (event) {
        event.preventDefault();
        if (!this.getCategoryDetailsStatus.isDisplayed())
            this.selectedTab = event.target.id;
    };
    CategorySearchComponent.prototype.getFavoriteCategories = function () {
        var _this = this;
        this.prefCats = [];
        this.favoriteCategoriesStatus.submit();
        var userId = this.cookieService.get("user_id");
        this.userService.getPrefCat(userId).then(function (res) {
            var prefCats_tmp = [];
            for (var i = 0; i < res.length; i++) {
                if (res[i].split("::")[3] == _this.productType)
                    prefCats_tmp.push(res[i]);
            }
            prefCats_tmp.sort(function (a, b) { return a.split("::")[2].localeCompare(b.split("::")[2]); });
            _this.prefCats = prefCats_tmp;
            _this.favoriteCategoriesStatus.callback("Succesfully fetched favorite categories", true);
        })
            .catch(function (error) {
            _this.favoriteCategoriesStatus.error("Error while fetching favorite categories.", error);
        });
    };
    CategorySearchComponent.prototype.getRecentCategories = function () {
        var _this = this;
        this.recCats = [];
        this.recentCategoriesStatus.submit();
        var userId = this.cookieService.get("user_id");
        this.userService.getRecCat(userId).then(function (res) {
            var recCats_tmp = [];
            for (var i = 0; i < res.length; i++) {
                if (res[i].split("::")[3] == _this.productType)
                    recCats_tmp.push(res[i]);
            }
            recCats_tmp.sort(function (a, b) { return a.split("::")[2].localeCompare(b.split("::")[2]); });
            _this.recCats = recCats_tmp;
            _this.recentCategoriesStatus.callback("Succesfully fetched recent categories", true);
        })
            .catch(function (error) {
            _this.recentCategoriesStatus.error("Error while fetching favorite categories.", error);
        });
    };
    CategorySearchComponent.prototype.findPrefCat = function (cat) {
        var cat_str = cat.id + "::" + cat.taxonomyId + "::" + utils_1.selectPreferredName(cat) + "::" + this.productType;
        var found = false;
        if (this.prefCats.indexOf(cat_str) != -1)
            found = true;
        return found;
    };
    CategorySearchComponent.prototype.removeCategoryFromFavorites = function (cat) {
        var _this = this;
        if (!this.addFavoriteCategoryStatus.isLoading()) {
            this.addFavoriteCategoryStatus.submit();
            var cat_str = cat.id + "::" + cat.taxonomyId + "::" + utils_1.selectPreferredName(cat) + "::" + this.productType;
            var userId = this.cookieService.get("user_id");
            this.userService.togglePrefCat(userId, cat_str).then(function (res) {
                var prefCats_tmp = [];
                for (var i = 0; i < res.length; i++) {
                    if (res[i].split("::")[3] == _this.productType)
                        prefCats_tmp.push(res[i]);
                }
                prefCats_tmp.sort(function (a, b) { return a.split("::")[2].localeCompare(b.split("::")[2]); });
                _this.prefCats = prefCats_tmp;
                _this.addFavoriteCategoryStatus.callback("Category removed from favorites", true);
            })
                .catch(function (error) {
                _this.addFavoriteCategoryStatus.error("Error while removing category from favorites", error);
            });
        }
    };
    CategorySearchComponent.prototype.addCategoryToFavorites = function (cat) {
        var _this = this;
        if (!this.addFavoriteCategoryStatus.isLoading()) {
            this.addFavoriteCategoryStatus.submit();
            var cat_str = cat.id + "::" + cat.taxonomyId + "::" + utils_1.selectPreferredName(cat) + "::" + this.productType;
            var userId = this.cookieService.get("user_id");
            this.userService.togglePrefCat(userId, cat_str).then(function (res) {
                var prefCats_tmp = [];
                for (var i = 0; i < res.length; i++) {
                    if (res[i].split("::")[3] == _this.productType)
                        prefCats_tmp.push(res[i]);
                }
                prefCats_tmp.sort(function (a, b) { return a.split("::")[2].localeCompare(b.split("::")[2]); });
                _this.prefCats = prefCats_tmp;
                _this.addFavoriteCategoryStatus.callback("Category added to favorites", true);
            })
                .catch(function (error) {
                _this.addFavoriteCategoryStatus.error("Error while adding category to favorites", error);
            });
        }
    };
    CategorySearchComponent.prototype.addRecentCategories = function (cat) {
        var _this = this;
        this.addRecentCategoryStatus.submit();
        var recCatPost = [];
        var timeStamp = new Date().getTime();
        for (var i = 0; i < cat.length; i++) {
            var cat_str = cat[i].id + "::" + cat[i].taxonomyId + "::" + utils_1.selectPreferredName(cat[i]) + "::" + this.productType + "::" + timeStamp;
            recCatPost.push(cat_str);
        }
        var userId = this.cookieService.get("user_id");
        this.userService.addRecCat(userId, recCatPost).then(function (res) {
            var recCats_tmp = [];
            for (var i = 0; i < res.length; i++) {
                if (res[i].split("::")[3] == _this.productType)
                    recCats_tmp.push(res[i]);
            }
            recCats_tmp.sort(function (a, b) { return a.split("::")[2].localeCompare(b.split("::")[2]); });
            _this.recCats = recCats_tmp;
            _this.addRecentCategoryStatus.callback("Categories added to recently used", true);
        })
            .catch(function (error) {
            _this.addRecentCategoryStatus.error("Error while adding categories to recently used", error);
        });
    };
    CategorySearchComponent.prototype.selectPreferredName = function (cp) {
        return utils_1.selectPreferredName(cp);
    };
    CategorySearchComponent.prototype.isDefinitionOrRemarkAvailable = function (property) {
        return (property.definition != null && property.definition.trim().length > 0) || (property.remark != null && property.remark.length > 0);
    };
    CategorySearchComponent.prototype.getPropertyDefinitionOrRemark = function (property) {
        if (property.definition != null && property.definition.trim().length > 0) {
            return property.definition;
        }
        if (property.remark != null && property.remark.length > 0) {
            return utils_1.selectPreferredValues(property.remark)[0];
        }
        return "";
    };
    CategorySearchComponent.prototype.canDeactivate = function () {
        this.inPublish = false;
        if (this.pageRef == "publish" && this.isReturnPublish == false) {
            if (!confirm("You will lose any changes you made, are you sure you want to quit ?")) {
                return false;
            }
        }
        return true;
    };
    CategorySearchComponent.prototype.onSearchCategory = function () {
        this.parentCategories = null;
        this.pathToSelectedCategories = null;
        this.selectedCategoryWithDetails = null;
        this.treeView = false;
        this.router.navigate(["/catalogue/categorysearch"], {
            queryParams: {
                pg: this.publishingGranularity,
                pageRef: this.pageRef,
                cat: this.categoryKeyword,
                productType: this.productType
            }
        });
    };
    CategorySearchComponent.prototype.toggleTreeView = function () {
        this.treeView = !this.treeView;
    };
    CategorySearchComponent.prototype.getRootCategories = function (taxonomyId) {
        var _this = this;
        this.getCategoriesStatus.submit();
        this.categoryService
            .getRootCategories(taxonomyId)
            .then(function (rootCategories) {
            _this.rootCategories = utils_2.sortCategories(rootCategories);
            _this.getCategoriesStatus.callback("Retrieved category details", true);
            if (_this.categoryFilter[taxonomyId]) {
                _this.logisticsCategory = _this.rootCategories.find(function (c) { return c.code === _this.categoryFilter[taxonomyId].logisticsCategory; });
                if (_this.logisticsCategory != null) {
                    var searchIndex = _this.findCategoryInArray(_this.rootCategories, _this.logisticsCategory);
                    _this.rootCategories.splice(searchIndex, 1);
                }
                for (var i = 0; i < _this.categoryFilter[taxonomyId].hiddenCategories.length; i++) {
                    var filterCat = _this.rootCategories.find(function (c) { return c.code === _this.categoryFilter[taxonomyId].hiddenCategories[i]; });
                    if (filterCat != null) {
                        var searchIndex = _this.findCategoryInArray(_this.rootCategories, filterCat);
                        _this.rootCategories.splice(searchIndex, 1);
                    }
                }
            }
        })
            .catch(function (error) {
            _this.getCategoriesStatus.error("Failed to retrieve category details", error);
        });
    };
    CategorySearchComponent.prototype.displayRootCategories = function (taxonomyId) {
        this.treeView = true;
        this.taxonomyId = taxonomyId;
        this.getRootCategories(this.taxonomyId == "All" ? "eClass" : this.taxonomyId);
    };
    CategorySearchComponent.prototype.getCategories = function () {
        var _this = this;
        this.getCategoriesStatus.submit();
        this.categoryService
            .getCategoriesByName(this.categoryKeyword, this.taxonomyId, this.isLogistics)
            .then(function (categories) {
            _this.parentCategories = null;
            _this.pathToSelectedCategories = null;
            _this.categories = categories;
            _this.getCategoriesStatus.callback("Successfully got search results", true);
        })
            .catch(function (error) {
            _this.getCategoriesStatus.error("Error while searching for categories", error);
        });
    };
    CategorySearchComponent.prototype.addCategoryToSelected = function (category) {
        // if no category is selected or if the selected category is already selected
        // do nothing
        if (category == null || this.findCategoryInArray(this.categoryService.selectedCategories, category) > -1) {
            return;
        }
        if (this.selectedCategoryWithDetails !== category) {
            throw new Error("Inconsistent state: can only select the details category.");
        }
        this.categoryService.addSelectedCategory(category);
        this.selectedCategories.push(category);
    };
    CategorySearchComponent.prototype.removeCategoryFromSelected = function (category) {
        var index = this.findCategoryInArray(this.categoryService.selectedCategories, category);
        if (index > -1) {
            this.categoryService.selectedCategories.splice(index, 1);
            var searchIndex = this.findCategoryInArray(this.selectedCategories, category);
            if (searchIndex > -1) {
                this.selectedCategories.splice(searchIndex, 1);
            }
        }
    };
    CategorySearchComponent.prototype.navigateToPublishingPage = function () {
        this.addRecentCategories(this.selectedCategories);
        product_publish_component_1.ProductPublishComponent.dialogBox = true;
        // set isReturnPublish in order not to show confirmation popup
        this.isReturnPublish = true;
        this.router.navigate(["catalogue/publish"], { queryParams: { pg: this.publishingGranularity, productType: this.productType } });
    };
    CategorySearchComponent.prototype.getCategoryTree = function (category, scrollToDivId) {
        var _this = this;
        if (scrollToDivId === void 0) { scrollToDivId = null; }
        this.selectedCategoryWithDetails = null;
        this.treeView = true;
        this.taxonomyId = category.taxonomyId;
        this.getCategoriesStatus.submit();
        this.categoryService
            .getParentCategories(category)
            .then(function (categories) {
            _this.categoryService
                .getCategory(category)
                .then(function (category) {
                _this.rootCategories = utils_2.sortCategories(categories.categories[0]);
                if (!scrollToDivId) {
                    _this.scrollToDivId = category.code;
                }
                else {
                    _this.scrollToDivId = scrollToDivId;
                }
                _this.selectedCategoryWithDetails = category;
                _this.selectedCategory = category;
                _this.parentCategories = categories; // parents categories
                _this.pathToSelectedCategories = _this.parentCategories;
                _this.selectedCategoriesWRTLevels = [];
                for (var _i = 0, _a = _this.parentCategories.parents; _i < _a.length; _i++) {
                    var parent_1 = _a[_i];
                    _this.selectedCategoriesWRTLevels.push(parent_1.code);
                }
                _this.getCategoriesStatus.callback(null, true);
                if (_this.treeView) {
                    setTimeout(function () {
                        utils_2.scrollToDiv(category.code);
                        document.getElementById("scrollDiv").scrollTop -= 57;
                    }, 100);
                }
            })
                .catch(function (error) {
                _this.getCategoriesStatus.error("Error while fetching category.", error);
            });
        })
            .catch(function (error) {
            _this.getCategoriesStatus.error("Error while fetching parrent category.", error);
        });
    };
    CategorySearchComponent.prototype.showAdDetails = function (cat) {
        var cat_split = cat.split("::");
        var catFull = {
            id: cat_split[0],
            preferredName: [new text_1.Text(cat_split[2])],
            code: "",
            level: 0,
            definition: [],
            note: "",
            remark: "",
            properties: [],
            keywords: [],
            taxonomyId: cat_split[1],
            categoryUri: ""
        };
        this.getCategoryDetails(catFull, true);
    };
    CategorySearchComponent.prototype.isAdSelected = function (cat) {
        if (this.selectedCategory != null && this.favSelected == true) {
            return cat.split("::")[0] === this.selectedCategory.id;
        }
        return false;
    };
    CategorySearchComponent.prototype.getCategoryDetails = function (category, fav) {
        var _this = this;
        if (!this.getCategoryDetailsStatus.isDisplayed()) {
            if (!this.selectedCategory || (this.selectedCategory && this.selectedCategory.id !== category.id)) {
                this.favSelected = fav;
                this.selectedCategory = category;
                this.selectedCategoryWithDetails = null;
                this.getCategoryDetailsStatus.submit();
                this.showOtherProperties = false;
                this.categoryService
                    .getCategory(category)
                    .then(function (category) {
                    _this.categoryService.getParentCategories(category).then(function (parentCategories) {
                        _this.pathToSelectedCategories = parentCategories;
                        _this.getCategoryDetailsStatus.callback("Retrieved details of the category", true);
                        _this.selectedCategoryWithDetails = category;
                        if (_this.treeView) {
                            setTimeout(function () {
                                utils_2.scrollToDiv(category.code);
                                document.getElementById("scrollDiv").scrollTop -= 57;
                            }, 100);
                        }
                    }).catch(function (error) {
                        _this.getCategoryDetailsStatus.error("Failed to retrieved parents of the category", error);
                    });
                })
                    .catch(function (error) {
                    _this.getCategoryDetailsStatus.error("Failed to retrieved details of the category", error);
                });
            }
        }
    };
    CategorySearchComponent.prototype.getCategoryProperty = function (propName) {
        // Type of the definition field is Text[]. Therefore, we have to use selectPreferredValues method
        // to get proper value of this category property
        if (propName == "definition") {
            return utils_1.selectPreferredValues(this.selectedCategoryWithDetails[propName])[0];
        }
        return String(this.selectedCategoryWithDetails[propName]);
    };
    CategorySearchComponent.prototype.getPropertyType = function (property) {
        return utils_1.sanitizeDataTypeName(property.dataType);
    };
    CategorySearchComponent.prototype.findCategoryInArray = function (categoryArray, category) {
        return categoryArray.findIndex(function (c) { return c.id == category.id; });
    };
    CategorySearchComponent.prototype.changeTaxonomyId = function (taxonomyId) {
        if (this.taxonomyId != taxonomyId) {
            this.parentCategories = null;
            this.pathToSelectedCategories = null;
            this.selectedCategory = null;
            this.selectedCategoryWithDetails = null;
            this.taxonomyId = taxonomyId;
            if (this.categoryKeyword) {
                this.getCategories();
            }
            if (this.selectedTab == "TREE") {
                this.getRootCategories(this.taxonomyId == "All" ? "eClass" : this.taxonomyId);
            }
        }
    };
    CategorySearchComponent.prototype.scrollToDiv = function (divId, event) {
        //this.scrollToDivId = divId;
        // if treeView is false,firstly we have to switch to tree view
        if (!this.getCategoryDetailsStatus.isDisplayed()) {
            if (!this.treeView) {
                this.getCategoryTree(this.selectedCategoryWithDetails, divId);
            }
            else {
                utils_2.scrollToDiv(divId);
                document.getElementById("scrollDiv").scrollTop -= 57;
            }
        }
    };
    CategorySearchComponent = __decorate([
        core_1.Component({
            selector: "category-search",
            templateUrl: "./category-search.component.html",
            styleUrls: ["./category-search.component.css"]
        }),
        __metadata("design:paramtypes", [router_1.Router,
            router_1.ActivatedRoute,
            ng2_cookies_1.CookieService,
            user_service_1.UserService,
            category_service_1.CategoryService,
            simple_search_service_1.SimpleSearchService,
            catalogue_service_1.CatalogueService,
            publish_and_aip_service_1.PublishService,
            app_component_1.AppComponent])
    ], CategorySearchComponent);
    return CategorySearchComponent;
}());
exports.CategorySearchComponent = CategorySearchComponent;
//# sourceMappingURL=category-search.component.js.map