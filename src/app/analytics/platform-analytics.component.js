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
var analytics_service_1 = require("./analytics.service");
var call_status_1 = require("../common/call-status");
var simple_search_service_1 = require("../simple-search/simple-search.service");
var category_service_1 = require("../catalogue/category/category.service");
var myGlobals = require("../globals");
var utils_1 = require("../common/utils");
var PlatformAnalyticsComponent = /** @class */ (function () {
    function PlatformAnalyticsComponent(analyticsService, simpleSearchService, categoryService) {
        this.analyticsService = analyticsService;
        this.simpleSearchService = simpleSearchService;
        this.categoryService = categoryService;
        this.user_count = -1;
        this.comp_count = -1;
        this.bp_count = -1;
        this.trade_count = -1;
        this.green_perc = 0;
        this.yellow_perc = 0;
        this.red_perc = 0;
        this.green_perc_str = "0%";
        this.yellow_perc_str = "0%";
        this.red_perc_str = "0%";
        this.trade_green_perc = 0;
        this.trade_yellow_perc = 0;
        this.trade_red_perc = 0;
        this.trade_green_perc_str = "0%";
        this.trade_yellow_perc_str = "0%";
        this.trade_red_perc_str = "0%";
        this.cat_loading = true;
        this.cat_levels = [];
        this.cat_level = -2;
        this.cat = "";
        this.product_count = 0;
        this.service_count = 0;
        this.loadedps = false;
        this.callStatus = new call_status_1.CallStatus();
        this.categoriesCallStatus = new call_status_1.CallStatus();
        this.product_cat_mix = myGlobals.product_cat_mix;
        this.getMultilingualLabel = utils_1.selectNameFromLabelObject;
        this.config = myGlobals.config;
    }
    PlatformAnalyticsComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.callStatus.submit();
        this.getCatTree();
        this.analyticsService
            .getPlatAnalytics()
            .then(function (res) {
            _this.callStatus.callback("Successfully loaded platform analytics", true);
            _this.user_count = res.identity.totalUsers;
            _this.comp_count = res.identity.totalCompanies;
            _this.bp_count = Math.round(res.businessProcessCount.state.approved + res.businessProcessCount.state.waiting + res.businessProcessCount.state.denied);
            _this.green_perc = Math.round((res.businessProcessCount.state.approved * 100) / _this.bp_count);
            _this.green_perc_str = _this.green_perc + "%";
            _this.yellow_perc = Math.round((res.businessProcessCount.state.waiting * 100) / _this.bp_count);
            _this.yellow_perc_str = _this.yellow_perc + "%";
            _this.red_perc = 100 - _this.green_perc - _this.yellow_perc;
            _this.red_perc_str = _this.red_perc + "%";
            _this.trade_count = Math.round(res.tradingVolume.approved + res.tradingVolume.waiting + res.tradingVolume.denied);
            _this.trade_green_perc = Math.round((res.tradingVolume.approved * 100) / _this.trade_count);
            _this.trade_green_perc_str = _this.trade_green_perc + "%";
            _this.trade_yellow_perc = Math.round((res.tradingVolume.waiting * 100) / _this.trade_count);
            _this.trade_yellow_perc_str = _this.trade_yellow_perc + "%";
            _this.trade_red_perc = 100 - _this.trade_green_perc - _this.trade_yellow_perc;
            _this.trade_red_perc_str = _this.trade_red_perc + "%";
        })
            .catch(function (error) {
            _this.callStatus.error("Error while loading platform analytics", error);
        });
    };
    PlatformAnalyticsComponent.prototype.isLoading = function () {
        return this.callStatus.fb_submitted;
    };
    PlatformAnalyticsComponent.prototype.getCatTree = function () {
        var _this = this;
        this.categoriesCallStatus.submit();
        this.simpleSearchService.get("*", [this.product_cat_mix], [""], 1, 1, "score desc", "", "", myGlobals.config.defaultSearchIndex)
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
    PlatformAnalyticsComponent.prototype.buildCatTree = function (categoryCounts) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
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
                                    }
                                }
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
                            }
                        }
                        this.cat_levels[0].forEach(function (catele) {
                            if (catele.preferredName != null && catele.preferredName != '') {
                                if (catele.preferredName.toLowerCase().indexOf("service") >= 0) {
                                    _this.service_count = _this.service_count + catele.count;
                                }
                                else {
                                    _this.product_count = _this.product_count + catele.count;
                                }
                            }
                        });
                        this.loadedps = true;
                        this.cat_loading = false;
                        this.categoriesCallStatus.callback("Categories loaded.", true);
                        return [2 /*return*/];
                }
            });
        });
    };
    PlatformAnalyticsComponent.prototype.getCategoryDisplayInfo = function (categories) {
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
    PlatformAnalyticsComponent = __decorate([
        core_1.Component({
            selector: "platform-analytics",
            templateUrl: "./platform-analytics.component.html",
            styleUrls: ["./platform-analytics.component.css"]
        }),
        __metadata("design:paramtypes", [analytics_service_1.AnalyticsService,
            simple_search_service_1.SimpleSearchService,
            category_service_1.CategoryService])
    ], PlatformAnalyticsComponent);
    return PlatformAnalyticsComponent;
}());
exports.PlatformAnalyticsComponent = PlatformAnalyticsComponent;
//# sourceMappingURL=platform-analytics.component.js.map