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
var explorative_search_service_1 = require("./explorative-search.service");
var operators_1 = require("rxjs/operators");
var isNumeric_1 = require("rxjs/util/isNumeric");
var ExplorativeSearchSemanticComponent = /** @class */ (function () {
    function ExplorativeSearchSemanticComponent(expSearch, router) {
        var _this = this;
        this.expSearch = expSearch;
        this.router = router;
        // Negotiation Variables
        this.negotiationEnable = false;
        // Tab selection between Properties or References
        this.selectedTab = 'PROPS';
        this.allSelectedProperties = new Set();
        this.conceptPaths = [];
        this.propertyResults = [];
        this.dataResults = []; // All the Available Properties of the Product or Reference via API Call
        this.objResults = [];
        this.searchModel = {};
        this.searchvalue = []; // All the values for Properties via API Call
        this.valuesAreNumeric = false;
        this.disableManualFilters = true;
        this.valueResults = {}; // Store values after API Call
        this.referenceResults = {}; // Store Available References after API Call
        this.selectedProperty = {};
        this.sparqlJSON = {}; // Building the SPARQL Query upon Interaction
        this.refResultsRange = []; // Show all Available references
        this.sparqlSelectedOption = {};
        this.hiddenElement = false;
        this.infoAlert = false;
        this.updateInfoAlert = false;
        this.loadingFilter = false;
        this.emptyFilterAlert = false;
        this.disableAddPropBtn = false;
        this.propertySelectionComplete = false;
        // Autocompletion Implementation from NG-BOOTSTRAP
        this.search = function (text$) {
            return text$.pipe(operators_1.debounceTime(200), operators_1.map(function (term) { return term === '' ? []
                : _this.propertyResults.filter(function (v) { return v.translatedProperty.toLowerCase()
                    .indexOf(term.toLowerCase()) > -1; }).slice(0, 10); }));
        };
        this.formatter = function (x) { return x.translatedProperty; };
    }
    /**
     * ngOnChanges: Angular Life Cycle Hook
     * @description: When new search keyword information comes from the parent component
     */
    ExplorativeSearchSemanticComponent.prototype.ngOnChanges = function () {
        if (!this.configSPQ) {
            return;
        }
        // console.log(this.configSPQ); // DEBUG_CHECK
        // Reset Variables..
        this.tableResult = {};
        this.selectedPropertyURL = '';
        this.sparqlJSON = {};
        this.sparqlJSON['parametersIncludingPath'] = [];
        this.sparqlJSON['parameters'] = [];
        this.sparqlJSON['parametersURL'] = [];
        this.sparqlJSON['filters'] = [];
        this.sparqlJSON['parametersURL'] = [];
        this.sparqlJSON['propertySources'] = [];
        this.referenceResults = {};
        this.refResultsRange = [];
        this.conceptPaths = [];
        this.propertyResults = [];
        this.dataResults = [];
        this.objResults = [];
        this.searchvalue = [];
        this.sparqlSelectedOption = {};
        this.conceptPaths.push({
            concept: this.configSPQ['frozenConcept'],
            url: this.configSPQ['concept']
        });
        this.sparqlJSON['concept'] = this.configSPQ['concept'];
        this.sparqlJSON['language'] = this.lang;
        this.hiddenElement = false;
        // get properties
        this.getPropertiesOfConcept(this.configSPQ);
        this.infoAlert = true;
    };
    ExplorativeSearchSemanticComponent.prototype.ngOnInit = function () {
        this.sparqlJSON['parametersIncludingPath'] = [];
        this.sparqlJSON['parameters'] = [];
        this.sparqlJSON['parametersURL'] = [];
        this.sparqlJSON['filters'] = [];
        this.sparqlJSON['orangeCommandSelected'] = { name: '' };
        this.sparqlJSON['parametersURL'] = [];
        this.sparqlJSON['propertySources'] = [];
    };
    ExplorativeSearchSemanticComponent.prototype.getPropertiesOfConcept = function (inputJSON) {
        var _this = this;
        this.propertyResults = [];
        this.dataResults = [];
        this.objResults = [];
        this.expSearch.searchForProperty(inputJSON)
            .then(function (res) {
            // console.log(res); // DEBUG
            _this.propertyResults = res;
            res.filter(function (value) {
                // filter out only datatype properties from all available properties
                if (value.datatypeProperty) {
                    _this.dataResults.push(value);
                }
                else if (value.objectProperty) {
                    _this.objResults.push(value);
                }
            });
        });
    };
    ExplorativeSearchSemanticComponent.prototype.checkUserSelection = function (valSearchBar) {
        (valSearchBar.objectProperty) ? this.getReferenceValues(valSearchBar) : this.getPropertyValues(valSearchBar);
    };
    ExplorativeSearchSemanticComponent.prototype.getPropertyValues = function (inputJSON) {
        var _this = this;
        // console.log(inputJSON);
        this.loadingFilter = true;
        this.searchvalue = [];
        var dummyJSON = { 'conceptURL': this.configSPQ['concept'],
            'propertyURL': encodeURIComponent(inputJSON.propertyURL),
            'propertySource': inputJSON.propertySource };
        this.expSearch.searchForPropertyValues(dummyJSON)
            .then(function (res) {
            _this.valueResults = res;
            _this.emptyFilterAlert = false;
            _this.disableManualFilters = true;
            _this.disableAddPropBtn = false;
            _this.valueResults['allValues'].filter(function (v) {
                _this.searchvalue.push(v.includes('^') ? v.split('^')[0] : v);
            });
            _this.searchvalue.forEach(function (val) {
                _this.valuesAreNumeric = isNumeric_1.isNumeric(val);
            });
            _this.loadingFilter = false;
            if (!_this.searchvalue.length) {
                _this.emptyFilterAlert = true;
            }
        });
        this.selectedProperty = inputJSON;
    };
    ExplorativeSearchSemanticComponent.prototype.getReferenceValues = function (inputJSON, index) {
        var _this = this;
        // console.log(inputJSON);
        var dummyJSON = { 'conceptURL': this.configSPQ['concept'], 'language': this.configSPQ['language'] };
        var jsonforProperties = this.configSPQ;
        var newConcept = '';
        this.expSearch.getReferencesFromConcept(dummyJSON)
            .then(function (res) {
            //console.log(res);
            _this.referenceResults = res['allAvailableReferences'][index];
            _this.refResultsRange = _this.referenceResults['range'];
            jsonforProperties['concept'] = encodeURIComponent(_this.refResultsRange[0]['original']);
            jsonforProperties['distanceToFrozenConcept'] += 1;
            //console.log(jsonforProperties);
            _this.expSearch.searchForProperty(jsonforProperties)
                .then(function (resp) {
                // console.log(res); // DEBUG
                _this.propertyResults = [];
                _this.updateInfoAlert = true;
                _this.dataResults = [];
                _this.objResults = [];
                _this.propertyResults = resp;
                resp.filter(function (value) {
                    // filter out only datatype properties from all available properties
                    if (value.datatypeProperty) {
                        _this.dataResults.push(value);
                    }
                    else if (value.objectProperty) {
                        _this.objResults.push(value);
                    }
                });
                setTimeout(function () { return _this.updateInfoAlert = false; }, 3000);
                _this.conceptPaths.push({
                    concept: _this.refResultsRange[0]['translation'],
                    url: _this.refResultsRange[0]['original'],
                    objPropUrl: _this.referenceResults['objectPropertyURL']
                });
            });
        });
    };
    ExplorativeSearchSemanticComponent.prototype.check = function (con, i) {
        //console.log(i);
        if (i === 0) {
            var dummyJSON = this.configSPQ;
            dummyJSON['concept'] = con.url;
            dummyJSON['distanceToFrozenConcept'] = i;
            // console.log(dummyJSON);
            this.getPropertiesOfConcept(dummyJSON);
        }
        else {
            var dummyJSON = this.configSPQ;
            dummyJSON['concept'] = encodeURIComponent(con.url);
            dummyJSON['distanceToFrozenConcept'] = i;
            //console.log(dummyJSON);
            this.getPropertiesOfConcept(dummyJSON);
        }
        this.conceptPaths.length = i + 1;
        this.searchvalue = [];
    };
    ExplorativeSearchSemanticComponent.prototype.noFilterSelected = function () {
        var _this = this;
        if (this.sparqlJSON['parameters'].findIndex(function (name) { return name === _this.selectedProperty['translatedProperty']; }) > -1) {
            //console.log('already exists');
        }
        else {
            this.sparqlJSON['parameters'].push(this.selectedProperty['translatedProperty']);
            this.sparqlJSON['parametersURL'].push(encodeURIComponent(this.selectedProperty['propertyURL']));
            this.sparqlJSON['propertySources'].push(this.selectedProperty['propertySource']);
            if (this.conceptPaths.length === 1) {
                var pathJSON = {
                    urlOfProperty: encodeURIComponent(this.selectedProperty['propertyURL']),
                    path: [{ concept: this.configSPQ['concept'] }]
                };
                this.sparqlJSON['parametersIncludingPath'].push(pathJSON);
            }
            else {
                var pathJSON_1 = { urlOfProperty: encodeURIComponent(this.selectedProperty['propertyURL']), path: [] };
                this.conceptPaths.forEach(function (path) {
                    if ('objPropUrl' in path) {
                        // console.log(path['objPropUrl']);
                        pathJSON_1.path.push({
                            concept: encodeURIComponent(path.url),
                            urlOfProperty: encodeURIComponent(path.objPropUrl)
                        });
                    }
                    else {
                        pathJSON_1.path.push({ concept: encodeURIComponent(path.url) });
                    }
                });
                this.sparqlJSON['parametersIncludingPath'].push(pathJSON_1);
            }
        }
        this.propertySelectionComplete = true;
        // Update
        this.allSelectedProperties.add(this.selectedProperty['translatedProperty']);
    };
    /**
     * FILTER Handling: filterSelected
     * If User decides to select the checkbox values
     */
    ExplorativeSearchSemanticComponent.prototype.filtersSelected = function (filterValue, ev) {
        var _this = this;
        if (ev.target.checked) {
            // console.log(this.configSPQ);
            if (this.sparqlJSON['parameters'].findIndex(function (name) { return name === _this.selectedProperty['translatedProperty']; }) > -1) {
                // console.log('already exists');
            }
            else {
                this.sparqlJSON['parameters'].push(this.selectedProperty['translatedProperty']);
                this.sparqlJSON['parametersURL'].push(encodeURIComponent(this.selectedProperty['propertyURL']));
                this.sparqlJSON['propertySources'].push(this.selectedProperty['propertySource']);
            }
            if (isNumeric_1.isNumeric(filterValue)) {
                this.sparqlJSON['filters'].push({
                    property: encodeURIComponent(this.selectedProperty['propertyURL']),
                    exactValue: filterValue
                });
            }
            else {
                this.sparqlJSON['filters'].push({
                    property: encodeURIComponent(this.selectedProperty['propertyURL']),
                    exactValue: encodeURIComponent(filterValue)
                });
            }
            if (this.conceptPaths.length === 1) {
                var pathJSON_2 = {
                    urlOfProperty: encodeURIComponent(this.selectedProperty['propertyURL']),
                    path: [{ concept: this.configSPQ['concept'] }]
                };
                if (this.sparqlJSON['parametersIncludingPath'].findIndex(function (i) { return i.urlOfProperty === pathJSON_2.urlOfProperty; }) === -1) {
                    this.sparqlJSON['parametersIncludingPath'].push(pathJSON_2);
                }
            }
            else {
                var pathJSON_3 = { urlOfProperty: encodeURIComponent(this.selectedProperty['propertyURL']), path: [] };
                this.conceptPaths.forEach(function (path) {
                    if ('objPropUrl' in path) {
                        // console.log(path['objPropUrl']);
                        pathJSON_3.path.push({
                            concept: encodeURIComponent(path.url),
                            urlOfProperty: encodeURIComponent(path.objPropUrl)
                        });
                    }
                    else {
                        pathJSON_3.path.push({ concept: encodeURIComponent(path.url) });
                    }
                });
                if (this.sparqlJSON['parametersIncludingPath'].findIndex(function (i) { return i.urlOfProperty === pathJSON_3.urlOfProperty; }) === -1) {
                    this.sparqlJSON['parametersIncludingPath'].push(pathJSON_3);
                }
            }
            this.disableAddPropBtn = true;
        }
        else {
            this.sparqlJSON['filters'].splice(this.sparqlJSON['filters'].findIndex(function (fil) { return fil.exactValue === filterValue; }), 1);
        }
        // console.log(this.sparqlJSON);
        this.allSelectedProperties.add(this.selectedProperty['translatedProperty']);
    };
    ExplorativeSearchSemanticComponent.prototype.applyManualFilter = function (min, max) {
        var _this = this;
        if (!(min < -1 && max < -1)) {
            if (!this.sparqlJSON['parameters'].find(function (p) { return p === _this.selectedProperty['translatedProperty']; })) {
                this.sparqlJSON['parameters'].push(this.selectedProperty['translatedProperty']);
                this.sparqlJSON['parametersURL'].push(encodeURIComponent(this.selectedProperty['propertyURL']));
                this.sparqlJSON['propertySources'].push(this.selectedProperty['propertySource']);
                this.sparqlJSON['filters'].push({
                    property: encodeURIComponent(this.selectedProperty['propertyURL']),
                    min: min,
                    max: max
                });
                if (this.conceptPaths.length === 1) {
                    var pathJSON = {
                        urlOfProperty: encodeURIComponent(this.selectedProperty['propertyURL']),
                        path: [{ concept: this.configSPQ['concept'] }]
                    };
                    this.sparqlJSON['parametersIncludingPath'].push(pathJSON);
                }
            }
            else if (!this.sparqlJSON['filters'].length) {
                this.sparqlJSON['filters'].push({
                    property: encodeURIComponent(this.selectedProperty['propertyURL']),
                    min: min,
                    max: max
                });
            }
        }
        this.propertySelectionComplete = true;
        this.allSelectedProperties.add(this.selectedProperty['translatedProperty']);
    };
    ExplorativeSearchSemanticComponent.prototype.removeManualFilter = function (minVal) {
        var _this = this;
        var filterIndexToRemove = this.sparqlJSON['filters'].findIndex(function (p) { return p.property === encodeURIComponent(_this.selectedProperty['propertyURL']); });
        if (filterIndexToRemove > -1 && this.sparqlJSON['filters'][filterIndexToRemove]['min'] === minVal) {
            this.sparqlJSON['filters'].splice(filterIndexToRemove, 1);
        }
    };
    ExplorativeSearchSemanticComponent.prototype.removeSelection = function (name) {
        this.allSelectedProperties.delete(name);
        var tableIndexToRemove = this.tableResult['columns'].findIndex(function (i) { return i === name; });
        var propIndexToRemove = this.sparqlJSON['parameters'].findIndex(function (i) { return i === name; });
        if (tableIndexToRemove === 0 && this.tableResult['columns'].length === 1) {
            this.tableResult['uuids'] = [];
        }
        if (propIndexToRemove > -1) {
            this.tableResult['rows'].forEach(function (entry) {
                entry.splice(tableIndexToRemove, 1);
            });
            this.tableResult['columns'].splice(tableIndexToRemove, 1);
            // remove selection from SPARQL
            this.sparqlJSON['parameters'].splice(propIndexToRemove, 1);
            var removePropURL_1 = this.sparqlJSON['parameters'][propIndexToRemove];
            this.sparqlJSON['parametersURL'].splice(propIndexToRemove, 1);
            this.sparqlJSON['parametersIncludingPath'].splice(propIndexToRemove, 1);
            this.sparqlJSON['propertySources'].splice(propIndexToRemove, 1);
            var filterIndexToRemove = this.sparqlJSON['filters'].findIndex(function (el) { return el.property === removePropURL_1; });
            if (filterIndexToRemove > -1) {
                this.sparqlJSON['filters'].splice(filterIndexToRemove);
            }
        }
        if (!(this.tableResult['uuids'].length && this.tableResult['columns'].length)) {
            // if the whole tableResult is now empty
            this.tableResult['columns'] = undefined;
        }
    };
    ExplorativeSearchSemanticComponent.prototype.onSelectTab = function (event) {
        event.preventDefault();
        this.selectedTab = event.target.id;
    };
    ExplorativeSearchSemanticComponent.prototype.genTable = function () {
        var _this = this;
        this.selectedProduct = '';
        this.expSearch.getTableValues(this.sparqlJSON)
            .then(function (res) {
            _this.tableResult = res;
        });
    };
    /**
     * Negotaition rerouting
     */
    ExplorativeSearchSemanticComponent.prototype.negotiation = function () {
        // console.log(this._negotiation_catalogue_id, this._negotiation_id)
        this.router.navigate(['/product-details'], { queryParams: { catalogueId: this._negotiation_catalogue_id, id: this._negotiation_id } });
    };
    ExplorativeSearchSemanticComponent.prototype.getSparqlOptionalSelect = function (indexUUID) {
        var _this = this;
        // console.log(indexUUID);
        var optSPARQLQuery = { uuid: encodeURIComponent(this.tableResult.uuids[indexUUID].trim()), 'language': this.lang };
        // console.log(optSPARQLQuery);
        this.expSearch.getOptionalSelect(optSPARQLQuery)
            .then(function (res) {
            _this.sparqlSelectedOption = res;
            if (_this.sparqlSelectedOption['columns'].findIndex(function (i) { return i === 'ManufacturersItemIdentification'; }) >= 0 &&
                _this.sparqlSelectedOption['columns'].findIndex(function (j) { return j === 'CatalogueDocumentReference'; }) >= 0) {
                // console.log('Negotiation can exist');
                _this.negotiationEnable = true;
                var index_id = _this.sparqlSelectedOption['columns'].findIndex(function (i) { return i === 'ManufacturersItemIdentification'; });
                var index_catalogue = _this.sparqlSelectedOption['columns'].findIndex(function (i) { return i === 'CatalogueDocumentReference'; });
                _this._negotiation_id = _this.sparqlSelectedOption['rows'][0][index_id];
                _this._negotiation_catalogue_id = _this.sparqlSelectedOption['rows'][0][index_catalogue];
                // console.log(this._negotiation_catalogue_id, this._negotiation_id);
            }
            else {
                _this.negotiationEnable = false;
            }
        });
        this.hiddenElement = true;
        this.selectedProduct = indexUUID;
    };
    __decorate([
        core_1.Input(),
        __metadata("design:type", Object)
    ], ExplorativeSearchSemanticComponent.prototype, "configSPQ", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", String)
    ], ExplorativeSearchSemanticComponent.prototype, "lang", void 0);
    ExplorativeSearchSemanticComponent = __decorate([
        core_1.Component({
            selector: 'explore-search-semantic',
            templateUrl: './explorative-search-semantic.component.html',
            styleUrls: ['./explorative-search-semantic.component.css'],
            providers: [explorative_search_service_1.ExplorativeSearchService]
        })
        /**
         * Class: ExplorativeSearchSemanticComponent
         * @description: Provide Logic for building a Semantic Query Pattern for Product under Consideration
         *  It consists of buttons where the user can obtain valuable information for datatype and objecttype property
         *  under consideration. Upon Interaction with these Buttons, Accordion provides further searchable information
         *  for the properties and its values.
         */
        ,
        __metadata("design:paramtypes", [explorative_search_service_1.ExplorativeSearchService, router_1.Router])
    ], ExplorativeSearchSemanticComponent);
    return ExplorativeSearchSemanticComponent;
}());
exports.ExplorativeSearchSemanticComponent = ExplorativeSearchSemanticComponent;
//# sourceMappingURL=explorative-search-semantic.component.js.map