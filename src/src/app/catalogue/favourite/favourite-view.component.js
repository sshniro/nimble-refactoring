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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var ng2_cookies_1 = require("ng2-cookies");
var catalogue_service_1 = require("../catalogue.service");
var simple_search_service_1 = require("../../simple-search/simple-search.service");
var call_status_1 = require("../../common/call-status");
var router_1 = require("@angular/router");
var publish_and_aip_service_1 = require("../publish-and-aip.service");
var category_service_1 = require("../category/category.service");
var bp_data_service_1 = require("../../bpe/bp-view/bp-data-service");
var user_service_1 = require("../../user-mgmt/user.service");
var utils_1 = require("../../common/utils");
var operators_1 = require("rxjs/operators");
var constants_1 = require("../model/constants");
var myGlobals = require("../../globals");
var search_1 = require("../../simple-search/model/search");
var FavouriteViewComponent = /** @class */ (function () {
    function FavouriteViewComponent(cookieService, publishService, simpleSearchService, catalogueService, categoryService, bpDataService, userService, route, router) {
        var _this = this;
        this.cookieService = cookieService;
        this.publishService = publishService;
        this.simpleSearchService = simpleSearchService;
        this.catalogueService = catalogueService;
        this.categoryService = categoryService;
        this.bpDataService = bpDataService;
        this.userService = userService;
        this.route = route;
        this.router = router;
        this.itemTypeResponse = [];
        this.ublProperties = null;
        // available catalogue lines with respect to the selected category
        this.catalogueLinesWRTTypes = [];
        // catalogue lines which are available to the user after search operation
        this.catalogueLinesArray = [];
        // necessary info for pagination
        this.collectionSize = 0;
        this.page = 1;
        // default
        this.pageSize = 10;
        // check whether catalogue-line-panel should be displayed for a specific catalogue line
        this.catalogueLineView = {};
        this.sortOption = null;
        this.model = new search_1.Search('');
        this.searchFavouriteCallStatus = new call_status_1.CallStatus();
        this.getCatalogueStatus = new call_status_1.CallStatus();
        this.callStatus = new call_status_1.CallStatus();
        this.deleteStatuses = [];
        this.imageMap = {};
        this.hari = false;
        this.selectedCategory = "All";
        this.searchText = "";
        this.status = 1;
        this.hasFavourite = false;
        this.indexItem = 0;
        this.favouriteIdList = [];
        this.showDetails = false;
        this.getMultilingualLabel = utils_1.selectNameFromLabelObject;
        this.CATALOGUE_LINE_SORT_OPTIONS = constants_1.CATALOGUE_LINE_SORT_OPTIONS;
        this.FAVOURITE_LINEITEM_PUT_OPTIONS = constants_1.FAVOURITE_LINEITEM_PUT_OPTIONS;
        this.product_filter_mappings = myGlobals.product_filter_mappings;
        this.item_manufacturer_id = myGlobals.item_manufacturer_id;
        this.party_facet_field_list = myGlobals.party_facet_field_list;
        this.product_img = myGlobals.product_img;
        this.product_name = myGlobals.product_name;
        this.product_price = myGlobals.product_price;
        this.product_description = myGlobals.product_description;
        this.product_cat_mix = myGlobals.product_cat_mix;
        this.config = myGlobals.config;
        this.roundToTwoDecimals = utils_1.roundToTwoDecimals;
        this.cat_level = -2;
        this.cat_levels = [];
        this.cat = "";
        this.comapanyList = {};
        this.catLineList = {};
        this.selectedCurrency = "EUR";
        this.initial = true;
        this.searchFavourite = function (text$) {
            return text$.pipe(operators_1.debounceTime(1000), operators_1.distinctUntilChanged(), operators_1.switchMap(function (term) {
                _this.catalogueLinesArray = [];
                _this.requestCatalogue(term);
                return [];
            }));
        };
    }
    FavouriteViewComponent.prototype.ngOnInit = function () {
        this.catalogueService.setEditMode(false);
        this.requestCatalogue();
        for (var i = 0; i < this.pageSize; i++) {
            this.deleteStatuses.push(new call_status_1.CallStatus());
        }
    };
    FavouriteViewComponent.prototype.selectName = function (ip) {
        return utils_1.selectName(ip);
    };
    FavouriteViewComponent.prototype.selectDescription = function (item) {
        return utils_1.selectDescription(item);
    };
    FavouriteViewComponent.prototype.checkEmpty = function (obj) {
        return (Object.keys(obj).length === 0);
    };
    FavouriteViewComponent.prototype.getCurrency = function (price) {
        if (price[this.selectedCurrency])
            return this.selectedCurrency;
        if (this.selectedCurrency != "EUR" && price["EUR"])
            return "EUR";
        return Object.keys(price)[0];
    };
    FavouriteViewComponent.prototype.requestCatalogue = function (termText) {
        var _this = this;
        var term = termText != null ? termText : this.searchText;
        this.getCatalogueStatus.submit();
        this.initial = true;
        var userId = this.cookieService.get("user_id");
        // check whether the user chose a category to filter the catalogue lines
        this.sortOption = this.sortOption == null ? constants_1.CATALOGUE_LINE_SORT_OPTIONS[0].name : this.sortOption;
        var categoryURI = this.selectedCategory == "All" ? null : this.selectedCategory;
        this.userService.getPerson(userId)
            .then(function (person) {
            _this.favouriteIdList = person.favouriteProductID;
            _this.collectionSize = person.favouriteProductID.length;
            if (_this.collectionSize > 0) {
                _this.hasFavourite = true;
                var query = "";
                var length_1 = _this.favouriteIdList.length;
                if (categoryURI != null && categoryURI != undefined) {
                    _this.initial = false;
                    query = 'commodityClassficationUri:("' + categoryURI.toString() + '") AND ';
                    if (term == null || term == "") {
                        query = query + "(";
                    }
                }
                if (term != null && term != "") {
                    _this.initial = false;
                    var querySettings = {
                        "fields": [("{LANG}_" + _this.product_name)],
                        "boosting": false,
                        "boostingFactors": {}
                    };
                    var queryRes = _this.simpleSearchService.buildQueryString(term.toString(), querySettings, true, false);
                    query = "(" + queryRes.queryStr + ") AND (";
                }
                while (length_1--) {
                    query = query + "id:" + _this.favouriteIdList[length_1];
                    if (length_1 != 0) {
                        query = query + " OR ";
                    }
                }
                if ((term != null && term != "") || ((term == null || term == "") && categoryURI != null)) {
                    query = query + ")";
                }
                _this.getCall(query);
            }
            else {
                _this.hasFavourite = false;
            }
            _this.getCatalogueStatus.callback(null, true);
        })
            .catch(function (error) {
            _this.getCatalogueStatus.error("Failed to get catalogue", error);
        });
    };
    FavouriteViewComponent.prototype.getFieldNames = function (fields) {
        var fieldLabes = {};
        for (var _i = 0, fields_1 = fields; _i < fields_1.length; _i++) {
            var field = fields_1[_i];
            fieldLabes[field.fieldName] = {};
            fieldLabes[field.fieldName].label = field.label;
            fieldLabes[field.fieldName].dataType = field.dataType;
        }
        return fieldLabes;
    };
    FavouriteViewComponent.prototype.getCategoryDisplayInfo = function (categories) {
        var labelMap = {};
        for (var _i = 0, _a = categories.result; _i < _a.length; _i++) {
            var category = _a[_i];
            labelMap[category.uri] = {};
            labelMap[category.uri].label = category.label;
            labelMap[category.uri].code = category.code;
            labelMap[category.uri].isRoot = category.allParents == null ? true : false;
        }
        return labelMap;
    };
    FavouriteViewComponent.prototype.sortCatLevels = function () {
        for (var i = 0; i < this.cat_levels.length; i++) {
            this.cat_levels[i].sort(function (a, b) {
                var a_c = a.name;
                var b_c = b.name;
                return a_c.localeCompare(b_c);
            });
            this.cat_levels[i].sort(function (a, b) {
                return b.count - a.count;
            });
        }
        this.cat_level = this.getCatLevel(this.cat);
    };
    FavouriteViewComponent.prototype.getCatLevel = function (name) {
        var level = -2;
        if (name != "")
            level = -1;
        for (var j = 0; j < this.cat_levels.length; j++) {
            for (var i = 0; i < this.cat_levels[j].length; i++) {
                var comp = this.cat_levels[j][i].name;
                if (comp.localeCompare(name) == 0) {
                    level = j;
                }
            }
        }
        return level;
    };
    FavouriteViewComponent.prototype.buildCatTree = function (categoryCounts) {
        return __awaiter(this, void 0, void 0, function () {
            var taxonomy, taxonomyPrefix, categoryUris, _i, categoryCounts_1, categoryCount, indexCategories, categoryDisplayInfo, split_idx, name, _a, categoryCounts_2, categoryCount, facet_inner, count, eclass_idx, lvl, _b, categoryCounts_3, categoryCount, count, ontology, catLevels, i, lvl, constructedLevel, _loop_1, this_1, count, ontology, _c, constructedLevel_1, uri;
            return __generator(this, function (_d) {
                switch (_d.label) {
                    case 0:
                        taxonomy = "eClass";
                        if (this.config.standardTaxonomy.localeCompare("All") != 0 && this.config.standardTaxonomy.localeCompare("eClass") != 0) {
                            taxonomy = this.config.standardTaxonomy;
                        }
                        taxonomyPrefix = "";
                        if (this.config.categoryFilter[taxonomy] && this.config.categoryFilter[taxonomy].ontologyPrefix)
                            taxonomyPrefix = this.config.categoryFilter[taxonomy].ontologyPrefix;
                        categoryUris = [];
                        for (_i = 0, categoryCounts_1 = categoryCounts; _i < categoryCounts_1.length; _i++) {
                            categoryCount = categoryCounts_1[_i];
                            categoryUris.push(categoryCount.label);
                        }
                        return [4 /*yield*/, this.categoryService.getCategories(categoryUris)];
                    case 1:
                        indexCategories = _d.sent();
                        categoryDisplayInfo = this.getCategoryDisplayInfo(indexCategories);
                        split_idx = -1;
                        name = "";
                        if (taxonomyPrefix != "") {
                            // ToDo: Remove manual distinction after search update
                            // ================================================================================
                            if (taxonomy == "eClass") {
                                this.cat_levels = [[], [], [], []];
                                for (_a = 0, categoryCounts_2 = categoryCounts; _a < categoryCounts_2.length; _a++) {
                                    categoryCount = categoryCounts_2[_a];
                                    facet_inner = categoryCount.label;
                                    count = categoryCount.count;
                                    if (facet_inner.startsWith(taxonomyPrefix)) {
                                        eclass_idx = categoryDisplayInfo[facet_inner].code;
                                        if (eclass_idx % 1000000 == 0) {
                                            this.cat_levels[0].push({ "name": facet_inner, "id": facet_inner, "count": count, "preferredName": utils_1.selectNameFromLabelObject(categoryDisplayInfo[facet_inner].label) });
                                        }
                                        else if (eclass_idx % 10000 == 0) {
                                            this.cat_levels[0].push({ "name": facet_inner, "id": facet_inner, "count": count, "preferredName": utils_1.selectNameFromLabelObject(categoryDisplayInfo[facet_inner].label) });
                                        }
                                        else if (eclass_idx % 100 == 0) {
                                            this.cat_levels[0].push({ "name": facet_inner, "id": facet_inner, "count": count, "preferredName": utils_1.selectNameFromLabelObject(categoryDisplayInfo[facet_inner].label) });
                                        }
                                        else {
                                            this.cat_levels[0].push({ "name": facet_inner, "id": facet_inner, "count": count, "preferredName": utils_1.selectNameFromLabelObject(categoryDisplayInfo[facet_inner].label) });
                                        }
                                    }
                                }
                                this.sortCatLevels();
                            }
                            else if (this.cat == "") {
                                this.cat_levels = [];
                                lvl = [];
                                for (_b = 0, categoryCounts_3 = categoryCounts; _b < categoryCounts_3.length; _b++) {
                                    categoryCount = categoryCounts_3[_b];
                                    count = categoryCount.count;
                                    ontology = categoryCount.label;
                                    if (categoryDisplayInfo[ontology] != null && ontology.indexOf(taxonomyPrefix) != -1) {
                                        split_idx = ontology.lastIndexOf("#");
                                        name = ontology.substr(split_idx + 1);
                                        if (categoryDisplayInfo[ontology].isRoot && this.config.categoryFilter[taxonomy].hiddenCategories.indexOf(name) == -1) {
                                            if (ontology.startsWith(taxonomyPrefix)) {
                                                lvl.push({ "name": ontology, "id": ontology, "count": count, "preferredName": utils_1.selectNameFromLabelObject(categoryDisplayInfo[ontology].label) });
                                            }
                                            else {
                                                lvl.push({ "name": ontology, "id": ontology, "count": count, "preferredName": ontology });
                                            }
                                        }
                                    }
                                }
                                this.cat_levels.push(lvl);
                                this.sortCatLevels();
                            }
                            else {
                                catLevels = [];
                                this.cat_levels = [];
                                for (i = 0; i < catLevels.length; i++) {
                                    lvl = [];
                                    constructedLevel = catLevels[i];
                                    _loop_1 = function (uri) {
                                        var categoryCount = categoryCounts.find(function (cat) { return cat.label == uri; });
                                        if (categoryCount != null) {
                                            count = categoryCount.count;
                                            ontology = categoryCount.label;
                                            if (categoryDisplayInfo[uri] != null && uri.indexOf(taxonomyPrefix) != -1) {
                                                split_idx = uri.lastIndexOf("#");
                                                name = uri.substr(split_idx + 1);
                                                if (this_1.config.categoryFilter[taxonomy].hiddenCategories.indexOf(name) == -1) {
                                                    if (ontology.startsWith(taxonomyPrefix)) {
                                                        lvl.push({ "name": uri, "id": uri, "count": count, "preferredName": utils_1.selectNameFromLabelObject(categoryDisplayInfo[uri].label) });
                                                    }
                                                    else {
                                                        lvl.push({ "name": uri, "id": uri, "count": count, "preferredName": name });
                                                    }
                                                }
                                            }
                                        }
                                    };
                                    this_1 = this;
                                    for (_c = 0, constructedLevel_1 = constructedLevel; _c < constructedLevel_1.length; _c++) {
                                        uri = constructedLevel_1[_c];
                                        _loop_1(uri);
                                    }
                                    this.cat_levels.push(lvl);
                                }
                                this.sortCatLevels();
                            }
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    FavouriteViewComponent.prototype.getCall = function (q) {
        var _this = this;
        this.model.q = q;
        this.searchFavouriteCallStatus.submit();
        this.simpleSearchService.getFields()
            .then(function (res) {
            var fieldLabels = _this.getFieldNames(res);
            _this.simpleSearchService.getFavouriteSearch(q, Object.keys(fieldLabels), _this.page, _this.sortOption)
                .then(function (res) {
                if (res.result.length == 0) {
                    _this.searchFavouriteCallStatus.callback("Search done.", true);
                }
                else {
                    _this.simpleSearchService.getUblProperties(Object.keys(fieldLabels)).then(function (response) {
                        _this.facetObj = [];
                        _this.temp = [];
                        _this.manufacturerIdCountMap = new Map();
                        for (var facet in res.facets) {
                            if (facet == _this.product_cat_mix) {
                                _this.buildCatTree(res.facets[_this.product_cat_mix].entry);
                                break;
                            }
                        }
                        for (var facet in res.facets) {
                            if (facet == _this.item_manufacturer_id) {
                                var facetEntries = res.facets[_this.item_manufacturer_id].entry;
                                for (var _i = 0, facetEntries_1 = facetEntries; _i < facetEntries_1.length; _i++) {
                                    var manufacturerEntry = facetEntries_1[_i];
                                    _this.manufacturerIdCountMap.set(manufacturerEntry.label, manufacturerEntry.count);
                                }
                                //getting the manufacturer ids list
                                var manufacturerIds = Array.from(_this.manufacturerIdCountMap.keys());
                                _this.temp = res.result;
                                for (var doc in _this.temp) {
                                    if (_this.temp[doc][_this.product_img]) {
                                        var img = _this.temp[doc][_this.product_img];
                                        if (Array.isArray(img)) {
                                            _this.temp[doc][_this.product_img] = img[0];
                                        }
                                    }
                                }
                                _this.itemTypeResponse = utils_1.copy(_this.temp);
                                if (_this.collectionSize > 0 && _this.itemTypeResponse.length > 0) {
                                    _this.hasFavourite = true;
                                    _this.init();
                                }
                                else {
                                    _this.hasFavourite = false;
                                }
                                break;
                            }
                        }
                        _this.fetchImages(res.result);
                        _this.searchFavouriteCallStatus.callback("Search done.", true);
                    }).catch(function (error) {
                        _this.searchFavouriteCallStatus.error("Error while running search.", error);
                    });
                }
            })
                .catch(function (error) {
                _this.searchFavouriteCallStatus.error("Error while running search.", error);
            });
        })
            .catch(function (error) {
            _this.searchFavouriteCallStatus.error("Error while running search.", error);
        });
    };
    FavouriteViewComponent.prototype.fetchImages = function (searchResults) {
        var _this = this;
        // fetch images asynchronously
        this.imageMap = {};
        var imageMap = {};
        for (var _i = 0, searchResults_1 = searchResults; _i < searchResults_1.length; _i++) {
            var result = searchResults_1[_i];
            var productImages = result.imgageUri;
            if (productImages != null && productImages.length > 0) {
                imageMap[result.uri] = productImages;
            }
        }
        var imageUris = [];
        for (var productUri in imageMap) {
            imageUris.push(imageMap[productUri]);
        }
        if (imageUris.length > 0) {
            this.catalogueService.getBinaryObjects(imageUris).then(function (images) {
                for (var _i = 0, images_1 = images; _i < images_1.length; _i++) {
                    var image = images_1[_i];
                    for (var productUri in imageMap) {
                        if (imageMap[productUri] == image.uri) {
                            _this.imageMap[productUri] = "data:" + image.mimeCode + ";base64," + image.value;
                        }
                    }
                }
            }, function (error) {
            });
        }
    };
    FavouriteViewComponent.prototype.getName = function (name, prefix) {
        // if it is a ubl property, then get its label from the ublProperties
        if (prefix)
            name = prefix + "." + name;
        for (var _i = 0, _a = this.ublProperties; _i < _a.length; _i++) {
            var ublProperty = _a[_i];
            if (name == ublProperty.localName) {
                return utils_1.selectNameFromLabelObject(ublProperty.label);
            }
        }
        // otherwise, use product_filter_mappings
        var ret = name;
        if (this.product_filter_mappings[name]) {
            ret = this.product_filter_mappings[name];
        }
        return ret;
    };
    FavouriteViewComponent.prototype.init = function () {
        var len = this.itemTypeResponse.length;
        if (!this.initial) {
            this.collectionSize = this.itemTypeResponse.length;
        }
        this.catalogueLinesArray = this.itemTypeResponse.slice();
        this.catalogueLinesWRTTypes = this.catalogueLinesArray;
        var i = 0;
        for (; i < len; i++) {
            this.catalogueLineView[this.itemTypeResponse[i].localName] = false;
        }
    };
    FavouriteViewComponent.prototype.onOpenCatalogueLine = function (e) {
        e.stopImmediatePropagation();
    };
    FavouriteViewComponent.prototype.removeFavourite = function (catalogueLine, i, status) {
        var _this = this;
        this.status = status != null ? status : this.status;
        var statuss = this.getDeleteStatus(i);
        statuss.submit();
        this.userService.putUserFavourite([catalogueLine.localName + ""], constants_1.FAVOURITE_LINEITEM_PUT_OPTIONS[0].value)
            .then(function (res) {
            _this.requestCatalogue();
            statuss.callback("Catalogue line removed", true);
        })
            .catch(function (error) {
            statuss.error("Error while removing catalogue line");
        });
    };
    FavouriteViewComponent.prototype.getDeleteStatus = function (index) {
        return this.deleteStatuses[index % this.pageSize];
    };
    FavouriteViewComponent.prototype.onRegisteredCompaniesPageChange = function (newPage) {
        if (newPage) {
            this.requestCatalogue();
        }
    };
    FavouriteViewComponent.prototype.navigateToTheSearchPage = function () {
        this.router.navigate(['/simple-search']);
    };
    FavouriteViewComponent.prototype.viewCatalogueLine = function (cat, index) {
        var _this = this;
        this.catalogueService.getCatalogueLineByHjid(cat.localName).then(function (res) {
            _this.catLineList[cat.localName] = res;
            _this.userService.getSettingsForProduct(res).then(function (res2) {
                _this.catalogueLineView[cat.localName] = true;
                _this.showDetails = true;
                _this.comapanyList[cat.localName] = res2;
            });
        });
    };
    FavouriteViewComponent = __decorate([
        core_1.Component({
            selector: 'favourite-view',
            templateUrl: './favourite-view.component.html',
            styles: ['.dropdown-toggle:after{content: initial}'],
            providers: [ng2_cookies_1.CookieService]
        }),
        __metadata("design:paramtypes", [ng2_cookies_1.CookieService,
            publish_and_aip_service_1.PublishService,
            simple_search_service_1.SimpleSearchService,
            catalogue_service_1.CatalogueService,
            category_service_1.CategoryService,
            bp_data_service_1.BPDataService,
            user_service_1.UserService,
            router_1.ActivatedRoute,
            router_1.Router])
    ], FavouriteViewComponent);
    return FavouriteViewComponent;
}());
exports.FavouriteViewComponent = FavouriteViewComponent;
//# sourceMappingURL=favourite-view.component.js.map