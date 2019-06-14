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
var search_1 = require("./model/search");
var simple_search_service_1 = require("./simple-search.service");
var router_1 = require("@angular/router");
var myGlobals = require("../globals");
var search_context_service_1 = require("./search-context.service");
var operators_1 = require("rxjs/operators");
var utils_1 = require("../common/utils");
var call_status_1 = require("../common/call-status");
var constants_1 = require("../catalogue/model/constants");
var category_service_1 = require("../catalogue/category/category.service");
var constants_2 = require("../catalogue/model/constants");
var catalogue_service_1 = require("../catalogue/catalogue.service");
var SimpleSearchFormComponent = /** @class */ (function () {
    function SimpleSearchFormComponent(simpleSearchService, searchContextService, categoryService, catalogueService, route, router) {
        var _this = this;
        this.simpleSearchService = simpleSearchService;
        this.searchContextService = searchContextService;
        this.categoryService = categoryService;
        this.catalogueService = catalogueService;
        this.route = route;
        this.router = router;
        this.product_vendor = myGlobals.product_vendor;
        this.product_vendor_id = myGlobals.product_vendor_id;
        this.product_vendor_name = myGlobals.product_vendor_name;
        this.product_vendor_rating = myGlobals.product_vendor_rating;
        this.product_vendor_rating_seller = myGlobals.product_vendor_rating_seller;
        this.product_vendor_rating_fulfillment = myGlobals.product_vendor_rating_fulfillment;
        this.product_vendor_rating_delivery = myGlobals.product_vendor_rating_delivery;
        this.product_vendor_trust = myGlobals.product_vendor_trust;
        this.product_name = myGlobals.product_name;
        this.product_description = myGlobals.product_description;
        this.product_img = myGlobals.product_img;
        this.product_vendor_img = myGlobals.product_vendor_img;
        this.product_price = myGlobals.product_price;
        this.product_currency = myGlobals.product_currency;
        this.product_filter_prod = myGlobals.product_filter_prod;
        this.product_filter_comp = myGlobals.product_filter_comp;
        this.product_filter_trust = myGlobals.product_filter_trust;
        this.product_filter_mappings = myGlobals.product_filter_mappings;
        this.product_nonfilter_full = myGlobals.product_nonfilter_full;
        this.product_nonfilter_regex = myGlobals.product_nonfilter_regex;
        this.product_cat = myGlobals.product_cat;
        this.product_cat_mix = myGlobals.product_cat_mix;
        this.party_facet_field_list = myGlobals.party_facet_field_list;
        this.party_filter_main = myGlobals.party_filter_main;
        this.party_filter_trust = myGlobals.party_filter_trust;
        this.roundToTwoDecimals = utils_1.roundToTwoDecimals;
        this.item_manufacturer_id = myGlobals.item_manufacturer_id;
        this.searchIndex = myGlobals.config.defaultSearchIndex;
        this.searchIndexes = ["Products", "Categories"];
        this.searchTopic = null;
        this.CURRENCIES = constants_1.CURRENCIES;
        this.selectedCurrency = "EUR";
        this.ratingOverall = 0;
        this.ratingSeller = 0;
        this.ratingFulfillment = 0;
        this.ratingDelivery = 0;
        this.ratingTrust = 0;
        this.showCatSection = true;
        this.showProductSection = false;
        this.showCompSection = false;
        this.showTrustSection = false;
        this.showOtherSection = false;
        this.categoriesCallStatus = new call_status_1.CallStatus();
        this.companyCallStatus = new call_status_1.CallStatus();
        this.searchCallStatus = new call_status_1.CallStatus();
        this.searchDone = false;
        this.callback = false;
        this.showOther = false;
        this.size = 0;
        this.page = 1;
        this.rows = 12;
        this.start = 0;
        this.end = 0;
        this.display = "list";
        this.sort = "score desc";
        this.cat = "";
        this.catID = "";
        this.cat_level = -2;
        this.cat_levels = [];
        this.cat_other = [];
        this.cat_other_count = 0;
        this.cat_loading = true;
        this.suggestions = [];
        this.searchContext = null;
        this.model = new search_1.Search('');
        this.objToSubmit = new search_1.Search('');
        this.imageMap = {}; // keeps the images if exists for the search results
        // check whether 'p' query parameter exists or not
        this.noP = true;
        this.imgEndpoint = myGlobals.user_mgmt_endpoint + "/company-settings/image/";
        this.zoomedImgURL = "assets/empty_img.png";
        this.config = myGlobals.config;
        this.getMultilingualLabel = utils_1.selectNameFromLabelObject;
        // used to get labels of the ubl properties
        this.ublProperties = null;
        this.getSuggestions = function (text$) {
            return text$.pipe(operators_1.debounceTime(200), operators_1.distinctUntilChanged(), operators_1.switchMap(function (term) {
                return _this.simpleSearchService.getSuggestions(term, ("{LANG}_" + _this.product_name), _this.searchIndex);
            }));
        };
        this.getCompSuggestions = function (text$) {
            return text$.pipe(operators_1.debounceTime(200), operators_1.distinctUntilChanged(), operators_1.switchMap(function (term) {
                return _this.simpleSearchService.getCompSuggestions(term, (_this.product_vendor_name));
            }));
        };
    }
    SimpleSearchFormComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.route.queryParams.subscribe(function (params) {
            var q = params['q'];
            var fq = params['fq'];
            var p = params['p'];
            var rows = params['rows'];
            var sort = params['sort'];
            var cat = params['cat'];
            var catID = params['catID'];
            if (p) {
                _this.noP = false;
            }
            var searchContext = params['searchContext'];
            var sIdx = params['sIdx'];
            if (sIdx)
                _this.searchIndex = sIdx;
            else
                _this.searchIndex = myGlobals.config.defaultSearchIndex;
            var sTop = params['sTop'];
            if (sTop)
                _this.searchTopic = sTop;
            else
                _this.searchTopic = null;
            var display = params['display'];
            if (display)
                _this.display = display;
            else
                _this.display = "list";
            if (fq)
                fq = decodeURIComponent(fq).split("_SEP_");
            else
                fq = [];
            if (rows && !isNaN(rows)) {
                rows = parseInt(rows);
                _this.rows = rows;
            }
            else
                rows = 12;
            if (p && !isNaN(p)) {
                p = parseInt(p);
                _this.size = p * rows;
                _this.page = p;
            }
            else
                p = 1;
            if (sort) {
                _this.sort = sort;
            }
            else {
                sort = "score desc";
                _this.sort = sort;
            }
            if (cat) {
                _this.cat = cat;
            }
            else
                _this.cat = "";
            if (catID) {
                _this.catID = catID;
            }
            else
                _this.catID = "";
            if (searchContext == null) {
                _this.searchContextService.clearSearchContext();
            }
            else {
                _this.searchContext = searchContext;
            }
            if (q && sTop) {
                if (sTop == "prod")
                    _this.getCall(q, fq, p, rows, sort, cat, catID, sIdx, sTop);
                else if (sTop == "comp")
                    _this.getCompCall(q, fq, p, rows, sort, sTop);
            }
            else if (sTop) {
                _this.callback = false;
                _this.searchDone = false;
                _this.searchCallStatus.reset();
                //this.model.q='';
                //this.objToSubmit.q='';
                _this.model.q = '*';
                _this.objToSubmit.q = '*';
                _this.facetQuery = fq;
                _this.page = p;
                _this.rows = rows;
                _this.sort = sort;
                //this.getCatTree();
                _this.objToSubmit = utils_1.copy(_this.model);
                _this.page = 1;
                _this.get(_this.objToSubmit);
            }
            else {
                _this.callback = false;
                _this.searchDone = false;
                _this.searchCallStatus.reset();
                _this.model.q = '*';
                _this.objToSubmit.q = '*';
                _this.facetQuery = fq;
                _this.page = p;
                _this.rows = rows;
                _this.sort = sort;
            }
        });
    };
    SimpleSearchFormComponent.prototype.get = function (search) {
        this.router.navigate(['/simple-search'], {
            queryParams: {
                q: search.q,
                fq: encodeURIComponent(this.facetQuery.join('_SEP_')),
                p: this.page,
                rows: this.rows,
                display: this.display,
                sort: this.sort,
                searchContext: this.searchContext,
                cat: this.cat,
                catID: this.catID,
                sIdx: this.searchIndex,
                sTop: this.searchTopic
            }
        });
    };
    SimpleSearchFormComponent.prototype.setSearchTopic = function (sTop) {
        this.router.navigate(['/simple-search'], {
            queryParams: {
                q: "*",
                fq: encodeURIComponent(this.facetQuery.join('_SEP_')),
                p: this.page,
                rows: this.rows,
                display: this.display,
                sort: this.sort,
                searchContext: this.searchContext,
                cat: this.cat,
                catID: this.catID,
                sIdx: this.searchIndex,
                sTop: sTop
            }
        });
    };
    SimpleSearchFormComponent.prototype.setRows = function (rows) {
        this.router.navigate(['/simple-search'], {
            queryParams: {
                q: this.objToSubmit.q,
                fq: encodeURIComponent(this.facetQuery.join('_SEP_')),
                p: 1,
                rows: parseInt(rows),
                display: this.display,
                sort: this.sort,
                searchContext: this.searchContext,
                cat: this.cat,
                catID: this.catID,
                sIdx: this.searchIndex,
                sTop: this.searchTopic
            }
        });
    };
    SimpleSearchFormComponent.prototype.setDisplay = function (display) {
        this.router.navigate(['/simple-search'], {
            queryParams: {
                q: this.objToSubmit.q,
                fq: encodeURIComponent(this.facetQuery.join('_SEP_')),
                p: this.page,
                rows: this.rows,
                display: display,
                sort: this.sort,
                searchContext: this.searchContext,
                cat: this.cat,
                catID: this.catID,
                sIdx: this.searchIndex,
                sTop: this.searchTopic
            }
        });
    };
    SimpleSearchFormComponent.prototype.setSort = function (sort) {
        this.router.navigate(['/simple-search'], {
            queryParams: {
                q: this.objToSubmit.q,
                fq: encodeURIComponent(this.facetQuery.join('_SEP_')),
                p: this.page,
                rows: this.rows,
                display: this.display,
                sort: sort,
                searchContext: this.searchContext,
                cat: this.cat,
                catID: this.catID,
                sIdx: this.searchIndex,
                sTop: this.searchTopic
            }
        });
    };
    SimpleSearchFormComponent.prototype.changeSearchIndex = function (indexName) {
        if (this.searchIndex != indexName) {
            this.searchIndex = indexName;
        }
    };
    SimpleSearchFormComponent.prototype.getCatTree = function () {
        var _this = this;
        this.categoriesCallStatus.submit();
        this.simpleSearchService.get("*", [this.product_cat_mix], [""], 1, 1, "score desc", "", "", this.searchIndex)
            .then(function (res) {
            // if res.facets are null, it means that there is no product in the index
            if (res.facets == null || Object.keys(res.facets).indexOf(_this.product_cat_mix) == -1) {
                _this.categoriesCallStatus.callback("Categories loaded.", true);
            }
            else {
                // before starting to build category tree, we have to get categories to retrieve their names
                _this.buildCatTree(res.facets[_this.product_cat_mix].entry);
                //this.categoriesCallStatus.callback("Categories loaded.", true);
            }
        })
            .catch(function (error) {
            _this.categoriesCallStatus.error("Error while loading category tree.", error);
        });
    };
    SimpleSearchFormComponent.prototype.buildCatTree = function (categoryCounts) {
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
                        this.cat_loading = true;
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
                                            this.cat_levels[1].push({ "name": facet_inner, "id": facet_inner, "count": count, "preferredName": utils_1.selectNameFromLabelObject(categoryDisplayInfo[facet_inner].label) });
                                        }
                                        else if (eclass_idx % 100 == 0) {
                                            this.cat_levels[2].push({ "name": facet_inner, "id": facet_inner, "count": count, "preferredName": utils_1.selectNameFromLabelObject(categoryDisplayInfo[facet_inner].label) });
                                        }
                                        else {
                                            this.cat_levels[3].push({ "name": facet_inner, "id": facet_inner, "count": count, "preferredName": utils_1.selectNameFromLabelObject(categoryDisplayInfo[facet_inner].label) });
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
                                this.constructCategoryTree(indexCategories.result, catLevels);
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
                        this.cat_loading = false;
                        this.categoriesCallStatus.callback("Categories loaded.", true);
                        return [2 /*return*/];
                }
            });
        });
    };
    SimpleSearchFormComponent.prototype.constructCategoryTree = function (indexCategories, levels) {
        if (levels.length == 0) {
            // get root categories
            var rootCategories = [];
            for (var _i = 0, indexCategories_1 = indexCategories; _i < indexCategories_1.length; _i++) {
                var category = indexCategories_1[_i];
                if (category.allParents == null) {
                    rootCategories.push(category.uri);
                }
            }
            levels.push(rootCategories);
            this.constructCategoryTree(indexCategories, levels);
        }
        else {
            var parentCategoryUris = levels[levels.length - 1];
            var level = []; // contains all children of all the parent categories of an upper level
            var _loop_2 = function (parentCategoryUri) {
                var parentIndexCategory = indexCategories.find(function (indexCategory) { return indexCategory.uri == parentCategoryUri; });
                var children = parentIndexCategory.children;
                if (children != null) {
                    var _loop_3 = function (childCategoryUri) {
                        var childCategory = indexCategories.find(function (indexCategory) { return indexCategory.uri == childCategoryUri; });
                        if (childCategory != null) {
                            level.push(childCategoryUri);
                        }
                    };
                    for (var _i = 0, children_1 = children; _i < children_1.length; _i++) {
                        var childCategoryUri = children_1[_i];
                        _loop_3(childCategoryUri);
                    }
                }
            };
            for (var _a = 0, parentCategoryUris_1 = parentCategoryUris; _a < parentCategoryUris_1.length; _a++) {
                var parentCategoryUri = parentCategoryUris_1[_a];
                _loop_2(parentCategoryUri);
            }
            if (level.length > 0) {
                levels.push(level);
                this.constructCategoryTree(indexCategories, levels);
            }
        }
    };
    SimpleSearchFormComponent.prototype.sortCatLevels = function () {
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
    SimpleSearchFormComponent.prototype.getCatLevel = function (name) {
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
    SimpleSearchFormComponent.prototype.getCall = function (q, fq, p, rows, sort, cat, catID, sIdx, sTop) {
        var _this = this;
        this.cat_loading = true;
        this.searchDone = true;
        if (q == "*")
            this.model.q = "";
        else
            this.model.q = q;
        this.objToSubmit.q = q;
        this.facetQuery = fq;
        this.page = p;
        this.rows = rows;
        this.sort = sort;
        this.searchIndex = sIdx;
        this.searchTopic = sTop;
        this.searchCallStatus.submit();
        this.simpleSearchService.getFields()
            .then(function (res) {
            var fieldLabels = _this.getFieldNames(res);
            _this.simpleSearchService.get(q, Object.keys(fieldLabels), fq, p, rows, sort, cat, catID, _this.searchIndex)
                .then(function (res) {
                if (res.result.length == 0) {
                    _this.cat_loading = false;
                    _this.callback = true;
                    _this.searchCallStatus.callback("Search done.", true);
                    _this.response = res.result;
                    _this.size = res.totalElements;
                    _this.page = p;
                    _this.start = _this.page * _this.rows - _this.rows + 1;
                    _this.end = _this.start + res.result.length - 1;
                }
                else {
                    _this.simpleSearchService.getUblProperties(Object.keys(fieldLabels)).then(function (response) {
                        _this.facetObj = [];
                        _this.temp = [];
                        _this.manufacturerIdCountMap = new Map();
                        for (var facet in res.facets) {
                            if (facet == _this.product_cat_mix) {
                                _this.buildCatTree(res.facets[_this.product_cat_mix].entry);
                                _this.handleFacets(fieldLabels, res, p, response.result);
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
                                _this.getCompanyNameFromIds(manufacturerIds).then(function (res1) {
                                    _this.handleCompanyFacets(res1, "manufacturer.", _this.manufacturerIdCountMap);
                                    //this.cat_loading = false;
                                    _this.callback = true;
                                    _this.searchCallStatus.callback("Search done.", true);
                                    _this.temp = res.result;
                                    for (var doc in _this.temp) {
                                        if (_this.temp[doc][_this.product_img]) {
                                            var img = _this.temp[doc][_this.product_img];
                                            if (Array.isArray(img)) {
                                                _this.temp[doc][_this.product_img] = img[0];
                                            }
                                        }
                                    }
                                    _this.response = utils_1.copy(_this.temp);
                                    _this.size = res.totalElements;
                                    _this.page = p;
                                    _this.start = _this.page * _this.rows - _this.rows + 1;
                                    _this.end = _this.start + res.result.length - 1;
                                }).catch(function (error) {
                                    _this.searchCallStatus.error("Error while creating Vendor filters in the search.", error);
                                });
                                break;
                            }
                        }
                    }).catch(function (error) {
                        _this.searchCallStatus.error("Error while running search.", error);
                    });
                    _this.fetchImages(res.result, _this.product_img);
                }
            })
                .catch(function (error) {
                _this.searchCallStatus.error("Error while running search.", error);
            });
        })
            .catch(function (error) {
            _this.searchCallStatus.error("Error while running search.", error);
        });
    };
    SimpleSearchFormComponent.prototype.getCompCall = function (q, fq, p, rows, sort, sTop) {
        var _this = this;
        this.cat_loading = true;
        this.searchDone = true;
        if (q == "*")
            this.model.q = "";
        else
            this.model.q = q;
        this.objToSubmit.q = q;
        this.facetQuery = fq;
        this.page = p;
        this.rows = rows;
        this.sort = sort;
        this.searchTopic = sTop;
        this.searchCallStatus.submit();
        this.simpleSearchService.getCompFields()
            .then(function (res) {
            var fieldLabels = _this.getFieldNames(res);
            _this.simpleSearchService.getComp(q, Object.keys(fieldLabels), fq, p, rows, sort)
                .then(function (res) {
                if (res.result.length == 0) {
                    _this.cat_loading = false;
                    _this.callback = true;
                    _this.searchCallStatus.callback("Company search done.", true);
                    _this.response = res.result;
                    _this.size = res.totalElements;
                    _this.page = p;
                    _this.start = _this.page * _this.rows - _this.rows + 1;
                    _this.end = _this.start + res.result.length - 1;
                }
                else {
                    _this.simpleSearchService.getUblProperties(Object.keys(fieldLabels)).then(function (response) {
                        _this.facetObj = [];
                        _this.temp = [];
                        _this.handleFacets(fieldLabels, res, p, response.result);
                        _this.callback = true;
                        _this.searchCallStatus.callback("Company search done.", true);
                        _this.temp = res.result;
                        for (var doc in _this.temp) {
                            if (_this.temp[doc][_this.product_vendor_img]) {
                                var img = _this.temp[doc][_this.product_vendor_img];
                                if (Array.isArray(img)) {
                                    _this.temp[doc][_this.product_vendor_img] = img[0];
                                }
                            }
                        }
                        _this.response = utils_1.copy(_this.temp);
                        _this.size = res.totalElements;
                        _this.page = p;
                        _this.start = _this.page * _this.rows - _this.rows + 1;
                        _this.end = _this.start + res.result.length - 1;
                    }).catch(function (error) {
                        _this.searchCallStatus.error("Error while running company search.", error);
                    });
                }
            })
                .catch(function (error) {
                _this.searchCallStatus.error("Error while running company search.", error);
            });
        })
            .catch(function (error) {
            _this.searchCallStatus.error("Error while running company search.", error);
        });
    };
    SimpleSearchFormComponent.prototype.fetchImages = function (searchResults, field) {
        var _this = this;
        // fetch images asynchronously
        this.imageMap = {};
        var imageMap = {};
        for (var _i = 0, searchResults_1 = searchResults; _i < searchResults_1.length; _i++) {
            var result = searchResults_1[_i];
            var productImages = result[field];
            if (productImages != null && productImages.length > 0) {
                imageMap[result.uri] = productImages[0];
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
    SimpleSearchFormComponent.prototype.handleCompanyFacets = function (res, prefix, manufacturerIdCountMap) {
        //this.facetObj = [];
        this.temp = [];
        //map for name:id
        //loop through the result sent to create name:Id mapping
        var manufacturerNameIdMap = new Map();
        for (var i = 0; i < res.result.length; i++) {
            var manufacturerId = res.result[i].id;
            var manufacturerName = res.result[i].legalName;
            manufacturerNameIdMap.set(manufacturerName, manufacturerId);
        }
        for (var facet in res.facets) {
            if (this.simpleSearchService.checkField(facet)) {
                //TO DO: currently only handles manufacturer.legalName facet because there is no way to retrieve item counts related
                //to other company facets (manufacturer.ppapComplianceLevel","manufacturer.ppapDocumentType)
                if (facet == "legalName") {
                    var propertyLabel = this.getName(facet);
                    var facet_innerLabel = void 0;
                    var facet_innerCount = void 0;
                    var facetCount = 0;
                    var name_1 = prefix + res.facets[facet].fieldName;
                    var realName = prefix + res.facets[facet].fieldName;
                    var total = 0;
                    var selected = false;
                    //creating options[]
                    var options = [];
                    for (var _i = 0, _a = res.facets[facet].entry; _i < _a.length; _i++) {
                        var facet_inner = _a[_i];
                        facet_innerLabel = facet_inner.label;
                        facet_innerCount = facet_inner.count;
                        var id = manufacturerNameIdMap.get(facet_innerLabel);
                        var itemCountForManufacturer = manufacturerIdCountMap.get(id);
                        facetCount = itemCountForManufacturer;
                        if (facet_innerLabel != "" && facet_innerLabel != ":" && facet_innerLabel != ' ' && facet_innerLabel.indexOf("urn:oasis:names:specification:ubl:schema:xsd") == -1) {
                            options.push({
                                "name": facet_inner.label,
                                "realName": facet_innerLabel,
                                "count": facetCount
                            });
                            total += facetCount;
                            if (this.checkFacet(name_1, facet_inner.label))
                                selected = true;
                        }
                    }
                    options.sort(function (a, b) {
                        var a_c = a.name;
                        var b_c = b.name;
                        return a_c.localeCompare(b_c);
                    });
                    options.sort(function (a, b) {
                        return b.count - a.count;
                    });
                    this.facetObj.push({
                        "name": name_1,
                        "realName": realName,
                        "options": options,
                        "total": total,
                        "selected": selected,
                        "expanded": false
                    });
                }
                else {
                    //need to implement the logic to get the correct counts for other company facets ;
                }
            }
        }
    };
    SimpleSearchFormComponent.prototype.handleFacets = function (facetMetadata, res, p, ublProperties) {
        this.ublProperties = ublProperties;
        this.facetObj = [];
        this.temp = [];
        var index = 0;
        for (var facet in res.facets) {
            if (this.simpleSearchService.checkField(facet)) {
                var facetMetadataExists = facetMetadata[facet] != null && facetMetadata[facet].label != null;
                var propertyLabel = this.getName(facet);
                this.facetObj.push({
                    "name": facet,
                    "realName": facetMetadataExists ? utils_1.selectNameFromLabelObject(facetMetadata[facet].label) : propertyLabel,
                    "options": [],
                    "total": 0,
                    "selected": false,
                    "expanded": false
                });
                var label = void 0;
                var facet_innerLabel = void 0;
                var facet_innerCount = void 0;
                var tmp_lang = constants_2.DEFAULT_LANGUAGE();
                var atLeastOneMultilingualLabel = res.facets[facet].entry.findIndex(function (facetInner) {
                    var idx = facetInner.label.lastIndexOf("@" + constants_2.DEFAULT_LANGUAGE());
                    return (idx != -1 && idx + 3 == facetInner.label.length);
                });
                if (atLeastOneMultilingualLabel == -1) {
                    atLeastOneMultilingualLabel = res.facets[facet].entry.findIndex(function (facetInner) {
                        var idx = facetInner.label.lastIndexOf("@en");
                        return (idx != -1 && idx + 3 == facetInner.label.length);
                    });
                }
                if (atLeastOneMultilingualLabel == -1) {
                    atLeastOneMultilingualLabel = res.facets[facet].entry.findIndex(function (facetInner) {
                        var idx = facetInner.label.lastIndexOf("@");
                        return (idx != -1 && idx + 3 == facetInner.label.length);
                    });
                }
                if (atLeastOneMultilingualLabel != -1) {
                    var idx = res.facets[facet].entry[atLeastOneMultilingualLabel].label.lastIndexOf("@");
                    tmp_lang = res.facets[facet].entry[atLeastOneMultilingualLabel].label.substring(idx + 1);
                }
                for (var _i = 0, _a = res.facets[facet].entry; _i < _a.length; _i++) {
                    var facet_inner = _a[_i];
                    facet_innerLabel = facet_inner.label;
                    facet_innerCount = facet_inner.count;
                    //if(facetMetadataExists && facetMetadata[facet].dataType == 'string') {
                    if (atLeastOneMultilingualLabel != -1) {
                        var idx_1 = facet_innerLabel.lastIndexOf("@" + tmp_lang);
                        if (idx_1 != -1) {
                            facet_innerLabel = label = facet_innerLabel.substring(0, idx_1);
                        }
                        else {
                            // there is at least one label in the preferred language but this is not one of them
                            continue;
                        }
                    }
                    //}
                    if (facet_innerLabel != "" && facet_innerLabel != ":" && facet_innerLabel != ' ' && facet_innerLabel.indexOf("urn:oasis:names:specification:ubl:schema:xsd") == -1) {
                        this.facetObj[index].options.push({
                            "name": facet_inner.label,
                            "realName": facet_innerLabel,
                            "count": facet_innerCount
                        });
                        this.facetObj[index].total += facet_innerCount;
                        if (this.checkFacet(this.facetObj[index].name, facet_inner.label))
                            this.facetObj[index].selected = true;
                    }
                }
                this.facetObj[index].options.sort(function (a, b) {
                    var a_c = a.name;
                    var b_c = b.name;
                    return a_c.localeCompare(b_c);
                });
                this.facetObj[index].options.sort(function (a, b) {
                    return b.count - a.count;
                });
                index++;
                this.facetObj.sort(function (a, b) {
                    var a_c = a.name;
                    var b_c = b.name;
                    return a_c.localeCompare(b_c);
                });
                this.facetObj.sort(function (a, b) {
                    return b.total - a.total;
                });
                this.facetObj.sort(function (a, b) {
                    var ret = 0;
                    if (a.selected && !b.selected)
                        ret = -1;
                    else if (!a.selected && b.selected)
                        ret = 1;
                    return ret;
                });
            }
        }
    };
    SimpleSearchFormComponent.prototype.getFieldNames = function (fields) {
        var fieldLabes = {};
        for (var _i = 0, fields_1 = fields; _i < fields_1.length; _i++) {
            var field = fields_1[_i];
            fieldLabes[field.fieldName] = {};
            fieldLabes[field.fieldName].label = field.label;
            fieldLabes[field.fieldName].dataType = field.dataType;
        }
        return fieldLabes;
    };
    SimpleSearchFormComponent.prototype.onSubmit = function () {
        this.objToSubmit = utils_1.copy(this.model);
        this.page = 1;
        this.get(this.objToSubmit);
    };
    SimpleSearchFormComponent.prototype.callCat = function (name, id) {
        this.model.q = "*";
        this.objToSubmit = utils_1.copy(this.model);
        this.cat = name;
        this.catID = id;
        this.get(this.objToSubmit);
    };
    SimpleSearchFormComponent.prototype.getName = function (name, prefix) {
        // if it is a ubl property, then get its label from the ublProperties
        var prefName = name;
        if (prefix)
            prefName = prefix + "." + name;
        for (var _i = 0, _a = this.ublProperties; _i < _a.length; _i++) {
            var ublProperty = _a[_i];
            if (prefName == ublProperty.localName || name == ublProperty.localName) {
                return utils_1.selectNameFromLabelObject(ublProperty.label);
            }
        }
        // otherwise, use product_filter_mappings
        var ret = prefName;
        if (this.product_filter_mappings[prefName]) {
            ret = this.product_filter_mappings[prefName];
        }
        else if (this.product_filter_mappings[name]) {
            ret = this.product_filter_mappings[name];
        }
        return ret;
    };
    SimpleSearchFormComponent.prototype.checkPriceFilter = function () {
        var check = false;
        if (this.selectedCurrency && this.selectedPriceMin && this.selectedPriceMax) {
            if (this.selectedPriceMin < this.selectedPriceMax) {
                check = true;
            }
        }
        return check;
    };
    SimpleSearchFormComponent.prototype.checkTrustFilter = function () {
        var check = false;
        if (this.ratingOverall > 0 || this.ratingSeller > 0 || this.ratingFulfillment > 0 || this.ratingDelivery > 0 || this.ratingTrust > 0)
            check = true;
        return check;
    };
    SimpleSearchFormComponent.prototype.checkPriceFacet = function () {
        var found = false;
        for (var i = 0; i < this.facetQuery.length; i++) {
            var comp = this.facetQuery[i].split(":")[0];
            if (comp.localeCompare(this.lowerFirstLetter(this.selectedCurrency) + "_" + this.product_price) == 0) {
                found = true;
            }
        }
        return found;
    };
    SimpleSearchFormComponent.prototype.checkTrustFacet = function () {
        var found = false;
        for (var i = 0; i < this.facetQuery.length; i++) {
            var comp = this.facetQuery[i].split(":")[0];
            if (comp.localeCompare(this.product_vendor + "." + this.product_vendor_rating) == 0 || comp.localeCompare(this.product_vendor + "." + this.product_vendor_rating_seller) == 0 || comp.localeCompare(this.product_vendor + "." + this.product_vendor_rating_fulfillment) == 0 || comp.localeCompare(this.product_vendor + "." + this.product_vendor_rating_delivery) == 0 || comp.localeCompare(this.product_vendor + "." + this.product_vendor_trust) == 0) {
                found = true;
            }
        }
        return found;
    };
    SimpleSearchFormComponent.prototype.checkCompTrustFacet = function () {
        var found = false;
        for (var i = 0; i < this.facetQuery.length; i++) {
            var comp = this.facetQuery[i].split(":")[0];
            if (comp.localeCompare(this.product_vendor_rating) == 0 || comp.localeCompare(this.product_vendor_rating_seller) == 0 || comp.localeCompare(this.product_vendor_rating_fulfillment) == 0 || comp.localeCompare(this.product_vendor_rating_delivery) == 0 || comp.localeCompare(this.product_vendor_trust) == 0) {
                found = true;
            }
        }
        return found;
    };
    SimpleSearchFormComponent.prototype.setPriceFilter = function () {
        this.clearFacet(this.lowerFirstLetter(this.selectedCurrency) + "_" + this.product_price);
        this.setRangeWithoutQuery(this.lowerFirstLetter(this.selectedCurrency) + "_" + this.product_price, this.selectedPriceMin, this.selectedPriceMax);
        this.get(this.objToSubmit);
    };
    SimpleSearchFormComponent.prototype.setTrustFilter = function () {
        this.clearFacet(this.product_vendor_rating, this.product_vendor);
        this.clearFacet(this.product_vendor_rating_seller, this.product_vendor);
        this.clearFacet(this.product_vendor_rating_fulfillment, this.product_vendor);
        this.clearFacet(this.product_vendor_rating_delivery, this.product_vendor);
        this.clearFacet(this.product_vendor_trust, this.product_vendor);
        if (this.ratingOverall > 0)
            this.setRangeWithoutQuery(this.product_vendor_rating, this.ratingOverall, 5, this.product_vendor);
        if (this.ratingSeller > 0)
            this.setRangeWithoutQuery(this.product_vendor_rating_seller, this.ratingSeller, 5, this.product_vendor);
        if (this.ratingFulfillment > 0)
            this.setRangeWithoutQuery(this.product_vendor_rating_fulfillment, this.ratingFulfillment, 5, this.product_vendor);
        if (this.ratingDelivery > 0)
            this.setRangeWithoutQuery(this.product_vendor_rating_delivery, this.ratingDelivery, 5, this.product_vendor);
        if (this.ratingTrust > 0)
            this.setRangeWithoutQuery(this.product_vendor_trust, (this.ratingTrust / 5), 1, this.product_vendor);
        this.get(this.objToSubmit);
    };
    SimpleSearchFormComponent.prototype.setCompTrustFilter = function () {
        this.clearFacet(this.product_vendor_rating);
        this.clearFacet(this.product_vendor_rating_seller);
        this.clearFacet(this.product_vendor_rating_fulfillment);
        this.clearFacet(this.product_vendor_rating_delivery);
        this.clearFacet(this.product_vendor_trust);
        if (this.ratingOverall > 0)
            this.setRangeWithoutQuery(this.product_vendor_rating, this.ratingOverall, 5);
        if (this.ratingSeller > 0)
            this.setRangeWithoutQuery(this.product_vendor_rating_seller, this.ratingSeller, 5);
        if (this.ratingFulfillment > 0)
            this.setRangeWithoutQuery(this.product_vendor_rating_fulfillment, this.ratingFulfillment, 5);
        if (this.ratingDelivery > 0)
            this.setRangeWithoutQuery(this.product_vendor_rating_delivery, this.ratingDelivery, 5);
        if (this.ratingTrust > 0)
            this.setRangeWithoutQuery(this.product_vendor_trust, (this.ratingTrust / 5), 1);
        this.get(this.objToSubmit);
    };
    SimpleSearchFormComponent.prototype.resetPriceFilter = function () {
        this.selectedCurrency = "EUR";
        this.selectedPriceMin = null;
        this.selectedPriceMax = null;
        this.clearFacet(this.lowerFirstLetter(this.selectedCurrency) + "_" + this.product_price);
        this.get(this.objToSubmit);
    };
    SimpleSearchFormComponent.prototype.resetTrustFilter = function () {
        this.ratingOverall = 0;
        this.ratingSeller = 0;
        this.ratingFulfillment = 0;
        this.ratingDelivery = 0;
        this.ratingTrust = 0;
        this.clearFacet(this.product_vendor_rating, this.product_vendor);
        this.clearFacet(this.product_vendor_rating_seller, this.product_vendor);
        this.clearFacet(this.product_vendor_rating_fulfillment, this.product_vendor);
        this.clearFacet(this.product_vendor_rating_delivery, this.product_vendor);
        this.clearFacet(this.product_vendor_trust, this.product_vendor);
        this.get(this.objToSubmit);
    };
    SimpleSearchFormComponent.prototype.resetCompTrustFilter = function () {
        this.ratingOverall = 0;
        this.ratingSeller = 0;
        this.ratingFulfillment = 0;
        this.ratingDelivery = 0;
        this.ratingTrust = 0;
        this.clearFacet(this.product_vendor_rating);
        this.clearFacet(this.product_vendor_rating_seller);
        this.clearFacet(this.product_vendor_rating_fulfillment);
        this.clearFacet(this.product_vendor_rating_delivery);
        this.clearFacet(this.product_vendor_trust);
        this.get(this.objToSubmit);
    };
    SimpleSearchFormComponent.prototype.checkProdCat = function (name) {
        var found = false;
        if (this.product_filter_prod.indexOf(name) != -1) {
            found = true;
        }
        return found;
    };
    SimpleSearchFormComponent.prototype.checkProdCatCount = function () {
        var count = 1;
        if (this.facetObj) {
            for (var i = 0; i < this.facetObj.length; i++) {
                if (this.checkProdCat(this.facetObj[i].name)) {
                    count++;
                }
            }
        }
        return count;
    };
    SimpleSearchFormComponent.prototype.checkCompCat = function (name) {
        var found = false;
        if (this.product_filter_comp.indexOf(name) != -1) {
            found = true;
        }
        return found;
    };
    SimpleSearchFormComponent.prototype.checkCompCatCount = function () {
        var count = 0;
        if (this.facetObj) {
            for (var i = 0; i < this.facetObj.length; i++) {
                if (this.checkCompCat(this.facetObj[i].name)) {
                    count++;
                }
            }
        }
        return count;
    };
    SimpleSearchFormComponent.prototype.checkTrustCat = function (name) {
        var found = false;
        if (this.product_filter_trust.indexOf(name) != -1) {
            found = true;
        }
        return found;
    };
    SimpleSearchFormComponent.prototype.checkTrustCatCount = function () {
        var count = 0;
        if (this.facetObj) {
            for (var i = 0; i < this.facetObj.length; i++) {
                if (this.checkTrustCat(this.facetObj[i].name)) {
                    count++;
                }
            }
        }
        return count;
    };
    SimpleSearchFormComponent.prototype.checkOtherCat = function (name) {
        for (var _i = 0, _a = this.product_nonfilter_regex; _i < _a.length; _i++) {
            var nonFilter = _a[_i];
            if (name.search(nonFilter) != -1) {
                return false;
            }
        }
        return (!this.checkProdCat(name) && !this.checkCompCat(name) && !this.checkTrustCat(name));
    };
    SimpleSearchFormComponent.prototype.checkOtherCatCount = function () {
        var count = 0;
        if (this.facetObj) {
            for (var i = 0; i < this.facetObj.length; i++) {
                if (this.checkOtherCat(this.facetObj[i].name)) {
                    count++;
                }
            }
        }
        return count;
    };
    SimpleSearchFormComponent.prototype.checkCompMainCat = function (name) {
        var found = false;
        if (this.party_filter_main.indexOf(name) != -1) {
            found = true;
        }
        return found;
    };
    SimpleSearchFormComponent.prototype.checkCompMainCatCount = function () {
        var count = 0;
        if (this.facetObj) {
            for (var i = 0; i < this.facetObj.length; i++) {
                if (this.checkCompMainCat(this.facetObj[i].name)) {
                    count++;
                }
            }
        }
        return count;
    };
    SimpleSearchFormComponent.prototype.checkCompTrustCat = function (name) {
        var found = false;
        if (this.party_filter_trust.indexOf(name) != -1) {
            found = true;
        }
        return found;
    };
    SimpleSearchFormComponent.prototype.checkCompTrustCatCount = function () {
        var count = 0;
        if (this.facetObj) {
            for (var i = 0; i < this.facetObj.length; i++) {
                if (this.checkCompTrustCat(this.facetObj[i].name)) {
                    count++;
                }
            }
        }
        return count;
    };
    SimpleSearchFormComponent.prototype.clearFacet = function (outer, prefix) {
        if (prefix)
            outer = prefix + "." + outer;
        var idx = -1;
        for (var i = 0; i < this.facetQuery.length; i++) {
            var comp = this.facetQuery[i].split(":")[0];
            if (comp.localeCompare(outer) == 0) {
                idx = i;
            }
        }
        if (idx >= 0) {
            this.facetQuery.splice(idx, 1);
        }
    };
    SimpleSearchFormComponent.prototype.getFacetQueryName = function (facet) {
        var name = facet.split(":")[0];
        return this.getName(name);
    };
    SimpleSearchFormComponent.prototype.getFacetQueryValue = function (facet) {
        var value = facet.split(":")[1];
        return value;
    };
    SimpleSearchFormComponent.prototype.clearFacetQuery = function (facet) {
        this.facetQuery.splice(this.facetQuery.indexOf(facet), 1);
        this.get(this.objToSubmit);
    };
    SimpleSearchFormComponent.prototype.setFacet = function (outer, inner, prefix) {
        if (prefix)
            outer = prefix + "." + outer;
        var fq = outer + ":\"" + inner + "\"";
        if (this.facetQuery.indexOf(fq) == -1)
            this.facetQuery.push(fq);
        else
            this.facetQuery.splice(this.facetQuery.indexOf(fq), 1);
        this.get(this.objToSubmit);
    };
    SimpleSearchFormComponent.prototype.setFacetWithoutQuery = function (outer, inner, prefix) {
        if (prefix)
            outer = prefix + "." + outer;
        var fq = outer + ":\"" + inner + "\"";
        this.facetQuery.push(fq);
    };
    SimpleSearchFormComponent.prototype.setRangeWithoutQuery = function (outer, min, max, prefix) {
        if (prefix)
            outer = prefix + "." + outer;
        var fq = outer + ":[" + min + " TO " + max + "]";
        this.facetQuery.push(fq);
    };
    SimpleSearchFormComponent.prototype.setCat = function (name, id) {
        this.cat = name;
        this.catID = id;
        this.get(this.objToSubmit);
    };
    SimpleSearchFormComponent.prototype.resetFilter = function () {
        this.facetQuery = [];
        this.selectedCurrency = "EUR";
        this.selectedPriceMin = null;
        this.selectedPriceMax = null;
        this.ratingOverall = 0;
        this.ratingSeller = 0;
        this.ratingFulfillment = 0;
        this.ratingDelivery = 0;
        this.ratingTrust = 0;
        this.get(this.objToSubmit);
    };
    SimpleSearchFormComponent.prototype.checkFacet = function (outer, inner) {
        var match = false;
        var fq = outer + ":\"" + inner + "\"";
        if (this.facetQuery.indexOf(fq) != -1)
            match = true;
        return match;
    };
    /**
     * Gets the price from a price object in the form of:
     {
        "EUR": 100
      },
     * @param price
     */
    SimpleSearchFormComponent.prototype.getCurrency = function (price) {
        if (price[this.selectedCurrency])
            return this.selectedCurrency;
        if (this.selectedCurrency != "EUR" && price["EUR"])
            return "EUR";
        return Object.keys(price)[0];
    };
    SimpleSearchFormComponent.prototype.getCategoryDisplayInfo = function (categories) {
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
    SimpleSearchFormComponent.prototype.checkNaN = function (rating) {
        var nan = false;
        if (isNaN(parseFloat(rating)))
            nan = true;
        return nan;
    };
    SimpleSearchFormComponent.prototype.checkEmpty = function (obj) {
        return (Object.keys(obj).length === 0);
    };
    SimpleSearchFormComponent.prototype.calcRating = function (rating, multiplier) {
        var result = parseFloat(rating) * multiplier;
        var rounded = Math.round(result * 10) / 10;
        return rounded;
    };
    SimpleSearchFormComponent.prototype.lowerFirstLetter = function (string) {
        return string.charAt(0).toLowerCase() + string.slice(1);
    };
    SimpleSearchFormComponent.prototype.isJson = function (str) {
        try {
            JSON.parse(str);
        }
        catch (e) {
            return false;
        }
        return true;
    };
    SimpleSearchFormComponent.prototype.redirectToRating = function (event, result) {
        event.preventDefault();
        this.router.navigate(['product-details'], { queryParams: { catalogueId: result.catalogueId, id: result.manufactuerItemId, tabToOpen: "rating" } });
    };
    SimpleSearchFormComponent.prototype.getCompanyNameFromIds = function (idList) {
        var query = "";
        var length = idList.length;
        while (length--) {
            //full_url += "&fq="+encodeURIComponent(facetQuery);
            query = query + "id:" + idList[length];
            if (length != 0) {
                query = query + " OR ";
            }
        }
        return this.simpleSearchService.getCompanies(query, this.party_facet_field_list, idList);
    };
    SimpleSearchFormComponent = __decorate([
        core_1.Component({
            selector: 'simple-search-form',
            templateUrl: './simple-search-form.component.html',
            styleUrls: ['./simple-search-form.component.css']
        }),
        __metadata("design:paramtypes", [simple_search_service_1.SimpleSearchService,
            search_context_service_1.SearchContextService,
            category_service_1.CategoryService,
            catalogue_service_1.CatalogueService,
            router_1.ActivatedRoute,
            router_1.Router])
    ], SimpleSearchFormComponent);
    return SimpleSearchFormComponent;
}());
exports.SimpleSearchFormComponent = SimpleSearchFormComponent;
//# sourceMappingURL=simple-search-form.component.js.map