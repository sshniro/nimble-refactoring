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
var d3 = require("d3");
var explorative_search_service_1 = require("./explorative-search.service");
var router_1 = require("@angular/router");
// Leaf class for Radial Tidy Tree
var Leaf = /** @class */ (function () {
    function Leaf() {
        this.children = [];
    }
    return Leaf;
}());
exports.Leaf = Leaf;
var ExplorativeSearchDetailsComponent = /** @class */ (function () {
    // BackEnd Service + Modal Service declared here
    function ExplorativeSearchDetailsComponent(expSearch, router) {
        this.expSearch = expSearch;
        this.router = router;
        this.config = {}; // this comes from `explorative-search-form.component` (Parent)
        this.hiddenElement = false; // to hide the graph or table
        /*Parameters that will be passed to `explorative-search-filter.component (Child)*/
        this.arrayPassedToChild = []; // this is passed to the child NOW
        this.filterFromChildExists = false; // to check if the there is a filter to display or not
        this.tableJSON = {
            parametersIncludingPath: [],
            parameters: [],
            parametersURL: [],
            filters: [],
            language: '',
            propertySources: []
        };
        this._backUpPaths = {};
        this.negotiationEnable = false;
        this.introAlert = false;
        this.rerenderAlert = false;
        this.emptySPARQLTable = false;
        this._error_detected_getProperties = false;
        this._error_detected_getLogicalView = false;
        this._error_detected_getSPARQLSelect = false;
        this._error_detected_getTableValues = false;
        this._warning_table_results = false;
        this._warning_selection = false;
    }
    /**
     * using OnChanges LifeCycle Hook for incoming Configuration
     * from the Parent Component
     */
    ExplorativeSearchDetailsComponent.prototype.ngOnChanges = function () {
        if (!this.config) {
            return;
        }
        // console.log(this.config['viewStructure']); // DEBUG -CHECK
        // Reset Selections for New Diagram.. Usually when the user clicks the button about the product..
        this.tableResult = {};
        this.filterJSON = {};
        this.filterQueryRoot = '';
        this.filterQueryRootUrl = '';
        this.filterQuery = '';
        this.nodeFilterName = '';
        this.mergedNodeName = '';
        // reset errors/warnings too since this is a fresh start.
        this._error_detected_getSPARQLSelect = false;
        this._error_detected_getTableValues = false;
        this._error_detected_getProperties = false;
        this._error_detected_getLogicalView = false;
        this._warning_table_results = false;
        this._warning_selection = false;
        this.rerenderAlert = false;
        this.hiddenElement = false;
        this.arrayPassedToChild = [];
        this.tableJSON = {
            parametersIncludingPath: [],
            parameters: [],
            parametersURL: [],
            filters: [],
            language: '',
            propertySources: []
        };
        this.sparqlSelectedOption = {};
        d3.selectAll('svg > *').remove();
        this.ngAfterViewInit();
    };
    /**
     * AfterViewInit LifeCycle Hook for diagram initialization for d3js
     */
    ExplorativeSearchDetailsComponent.prototype.ngAfterViewInit = function () {
        var self = this;
        var svg = d3.select('svg'), width = +svg.attr('width'), height = +svg.attr('height'), g = svg.append('g').attr('transform', 'translate(' + (width / 3 + 240) + ',' + (height / 3 + 140) + ')');
        var tree = d3.tree()
            .size([2 * Math.PI, 375])
            .separation(function (a, b) { return (a.parent === b.parent ? 1 : 2) / a.depth; });
        var root = tree(d3.hierarchy(this.parse_node(this.config['viewStructure'])));
        this.root = root;
        var link = g.selectAll('.link')
            .data(root.links())
            .enter().append('path')
            .attr('id', function (d) { return d['source']['data']['id']; })
            .attr('class', 'link')
            .attr('d', d3.linkRadial()
            .angle(function (d) { return d['x']; })
            .radius(function (d) { return d['y']; }));
        var node = g.selectAll('.node')
            .data(root.descendants())
            .enter().append('g')
            .attr('id', function (d) { return d['data']['id']; })
            .attr('class', function (d) { return 'node' + (d.children ? ' node--internal' : ' node--leaf'); })
            .attr('transform', function (d) { return 'translate(' + radialPoint(d.x, d.y) + ')'; })
            .on('click', click)
            .on('dblclick', dblclick);
        node.append('circle')
            .attr('r', 5)
            .style('fill', function (d) {
            if (d.depth === 0) {
                return '#999';
            }
            else {
                return d.data.color;
            }
        });
        node.append('text')
            .attr('dy', '0.31em')
            .attr('x', function (d) { return d.x < Math.PI === !d.children ? 6 : -6; })
            .attr('text-anchor', function (d) { return d.x < Math.PI === !d.children ? 'start' : 'end'; })
            .attr('transform', function (d) {
            return 'rotate(' + (d.x < Math.PI ? d.x - Math.PI / 2 : d.x + Math.PI / 2) * 180 / Math.PI + ')';
        })
            .text(function (d) { return d.data['name']; });
        // If the graph is rerendered make sure to add Dashed Lines to from root to the merged Node
        if (this.rerenderAlert) {
            // console.log(this.mergedNodeName);
            link.style('stroke-dasharray', function (d) {
                if (d['target']['data']['name'] === self.mergedNodeName) {
                    return ('10,3');
                }
                else {
                    return undefined;
                }
            });
        }
        function radialPoint(x, y) {
            return [(y = +y) * Math.cos(x -= Math.PI / 2), y * Math.sin(x)];
        }
        /*
        Single Click Event on the Radial Tidy Tree
         */
        function click(d) {
            if (d.depth === 1 && d.data.objectPropertySource !== '') {
                // console.log('objectproperty directly connected to root');
                // console.log('do nothing');
            }
            else {
                d3.select(this).select('circle').transition()
                    .duration(1000)
                    .attr('r', 6);
                self.removePropertyFilter(d);
            }
        }
        /*
        Double Click Event on the Radial Tidy Tree
         */
        function dblclick(d) {
            if (d.depth === 1 && d.data.objectPropertySource !== '') {
                // console.log('objectproperty directly connected to root');
                // console.log('do nothing');
            }
            else {
                // console.log(d.data); // DEBUG_Check
                // console.log(d.parent); // DEBUG_Check
                d3.select(this).select('circle').transition()
                    .duration(1000)
                    .attr('r', 16);
                self.obtainProperties(d);
            }
        }
    };
    /**
     * Single Click on the Node to remove it from the Selections
     * @param nodeToRemove
     */
    ExplorativeSearchDetailsComponent.prototype.removePropertyFilter = function (nodeToRemove) {
        // console.log(nodeToRemove.data.url);
        var indexToRemove = this.arrayPassedToChild.findIndex(function (node) { return node.fName === nodeToRemove.data.name; });
        if (indexToRemove === 0) {
            this.tableResult = {};
            this.arrayPassedToChild.splice(indexToRemove, 1);
            this.tableJSON['parametersIncludingPath'].splice(indexToRemove, 1);
            this.tableJSON['parameters'].splice(indexToRemove, 1);
            this.tableJSON['parametersURL'].splice(indexToRemove, 1);
            this.tableJSON['propertySources'].splice(indexToRemove, 1);
        }
        else if (indexToRemove > -1) {
            // console.log('removing property', indexToRemove);
            this.arrayPassedToChild.splice(indexToRemove, 1);
            this.tableJSON['parametersIncludingPath'].splice(indexToRemove, 1);
            this.tableJSON['parameters'].splice(indexToRemove, 1);
            this.tableJSON['parametersURL'].splice(indexToRemove, 1);
            this.tableJSON['propertySources'].splice(indexToRemove, 1);
        }
        var fIndex = this.tableJSON['filters'].findIndex(function (node) { return node.property === encodeURIComponent(nodeToRemove.data.url); });
        if (fIndex > -1) {
            this.tableJSON['filters'].splice(fIndex, 1);
        }
        if (this.filterFromChildExists) {
            this.filterFromChildExists = !this.filterFromChildExists;
        }
    };
    /**
     * Double Click Event on node checks type of node and its state and performs operations respectively
     * @param nodeInfo: D3 Information of the double-clicked node
     */
    ExplorativeSearchDetailsComponent.prototype.obtainProperties = function (nodeInfo) {
        var _this = this;
        var self = this;
        var _jsonForFilter = { 'concept': '', 'property': '', 'amountOfGroups': 3, 'language': this.lang,
            'propertySource': '' };
        var jsonFilterForEachChild = { 'fName': '', 'fQuery': '', 'fQueryRoot': '', 'fQueryRootUrl': '' };
        var pathForSparqlJson = { 'urlOfProperty': '', path: [] };
        // console.log(nodeInfo); // DEBUG-Check
        if (nodeInfo.depth === 1 && nodeInfo.data.objectPropertySource === '' && nodeInfo.data.color === 'green') {
            //  CASE: 1 direct datatype properties to root
            // console.log('dataproperty directly connected to the root');
            _jsonForFilter.concept = encodeURIComponent(nodeInfo.parent.data.url);
            _jsonForFilter.property = encodeURIComponent(nodeInfo.data.url);
            _jsonForFilter.propertySource = nodeInfo.data.propertySource;
            jsonFilterForEachChild['fName'] = nodeInfo.data.name;
            jsonFilterForEachChild['fQuery'] = nodeInfo.data.url;
            jsonFilterForEachChild['fQueryRoot'] = nodeInfo.parent.data.name;
            jsonFilterForEachChild['fQueryRootUrl'] = nodeInfo.parent.data.url;
            // console.log(_jsonForFilter);
            this.expSearch.getPropertyValues(_jsonForFilter)
                .then(function (res) {
                // console.log(res, typeof(res));
                if (Object.keys(res).length !== 0) {
                    _this.filterJSON = res;
                    jsonFilterForEachChild['filterJSON'] = _this.filterJSON;
                    _this.filterFromChildExists = true;
                }
                else {
                    _this.filterFromChildExists = false;
                }
            });
            // Pass information to render filter (semantic-filter.component)
            setTimeout(function () {
                _this.tableJSON['language'] = _this.lang;
                _this.arrayPassedToChild.push(jsonFilterForEachChild);
                // console.log(this.arrayPassedToChild);
                pathForSparqlJson.path.push({ 'concept': _jsonForFilter.concept });
                pathForSparqlJson.urlOfProperty = _jsonForFilter.property;
                _this.tableJSON['parametersIncludingPath'].push(pathForSparqlJson);
                _this.tableJSON['concept'] = _jsonForFilter.concept;
                _this.tableJSON['parameters'].push(nodeInfo.data.name);
                _this.tableJSON['parametersURL'].push(encodeURIComponent(nodeInfo.data.url));
                _this.tableJSON['propertySources'].push(nodeInfo.data.propertySource);
            }, 1000);
        }
        else if (nodeInfo.depth > 1 && nodeInfo.data.objectPropertySource === '' && nodeInfo.data.color === 'green') {
            // CASE: 2 Datatype Property to an Object Property clicked
            // console.log('dataprop -> objectproperty dir -> root');
            if (nodeInfo.parent.data.name.indexOf('/') > -1) {
                // Case: 2A if the immediate Parent node is rerendered to a merged node
                var ancestors = nodeInfo.ancestors();
                var rootNode_1 = ancestors.pop();
                // console.log('rerender');
                this._backUpPaths['path'].push({ concept: encodeURIComponent(nodeInfo.parent.data.url),
                    urlOfProperty: encodeURIComponent(nodeInfo.parent.data.objectPropertySource)
                });
                this._backUpPaths['urlOfProperty'] = encodeURIComponent(nodeInfo.data.url);
                // console.log(this._backUpPaths);
                _jsonForFilter.concept = encodeURIComponent(nodeInfo.parent.data.url);
                _jsonForFilter.property = encodeURIComponent(nodeInfo.data.url);
                _jsonForFilter.propertySource = nodeInfo.data.propertySource;
                jsonFilterForEachChild['fName'] = nodeInfo.data.name;
                jsonFilterForEachChild['fQuery'] = nodeInfo.data.url;
                jsonFilterForEachChild['fQueryRoot'] = nodeInfo.parent.data.name;
                jsonFilterForEachChild['fQueryRootUrl'] = nodeInfo.parent.data.url;
                // console.log(_jsonForFilter);
                this.expSearch.getPropertyValues(_jsonForFilter)
                    .then(function (res) {
                    // console.log(res, typeof(res));
                    if (Object.keys(res).length !== 0) {
                        _this.filterJSON = res;
                        jsonFilterForEachChild['filterJSON'] = _this.filterJSON;
                    }
                });
                setTimeout(function () {
                    _this.tableJSON['language'] = _this.lang;
                    _this.arrayPassedToChild.push(jsonFilterForEachChild);
                    _this.tableJSON['parametersIncludingPath'].push(_this._backUpPaths);
                    _this.tableJSON['concept'] = encodeURIComponent(rootNode_1.data.url);
                    _this.tableJSON['parameters'].push(nodeInfo.data.name);
                    _this.tableJSON['parametersURL'].push(encodeURIComponent(nodeInfo.data.url));
                    _this.tableJSON['propertySources'].push(nodeInfo.data.propertySource);
                }, 1000);
            }
            else {
                // CASE: 2B Not a rerendered graph and has normal immediate parent
                var ancestors = nodeInfo.ancestors();
                var rootNode_2 = ancestors.pop();
                pathForSparqlJson.path.push({ concept: encodeURIComponent(rootNode_2.data.url) });
                pathRec(ancestors);
                // console.log(pathForSparqlJson); //DEBUG-Check
                _jsonForFilter.concept = encodeURIComponent(nodeInfo.parent.data.url);
                _jsonForFilter.property = encodeURIComponent(nodeInfo.data.url);
                _jsonForFilter.propertySource = nodeInfo.data.propertySource;
                jsonFilterForEachChild['fName'] = nodeInfo.data.name;
                jsonFilterForEachChild['fQuery'] = nodeInfo.data.url;
                jsonFilterForEachChild['fQueryRoot'] = nodeInfo.parent.data.name;
                jsonFilterForEachChild['fQueryRootUrl'] = nodeInfo.parent.data.url;
                // console.log(_jsonForFilter);
                this.expSearch.getPropertyValues(_jsonForFilter)
                    .then(function (res) {
                    // console.log(res, typeof(res));
                    if (Object.keys(res).length !== 0) {
                        _this.filterJSON = res;
                        jsonFilterForEachChild['filterJSON'] = _this.filterJSON;
                    }
                });
                setTimeout(function () {
                    _this.tableJSON['language'] = _this.lang;
                    _this.arrayPassedToChild.push(jsonFilterForEachChild);
                    // console.log(this.arrayPassedToChild);
                    // pathForSparqlJson.path.push({'concept': _jsonForFilter.concept});
                    // pathForSparqlJson.urlOfProperty = _jsonForFilter.property;
                    _this.tableJSON['parametersIncludingPath'].push(pathForSparqlJson);
                    _this.tableJSON['concept'] = encodeURIComponent(rootNode_2.data.url);
                    _this.tableJSON['parameters'].push(nodeInfo.data.name);
                    _this.tableJSON['parametersURL'].push(encodeURIComponent(nodeInfo.data.url));
                    _this.tableJSON['propertySources'].push(nodeInfo.data.propertySource);
                }, 1000);
            }
        }
        else if (nodeInfo.depth > 1 && nodeInfo.data.objectPropertySource !== '' && nodeInfo.data.color === 'red') {
            // CASE 3: Need to rerender the graph and obtain a traversed property
            // console.log('objprop -> objprop -> root');
            // console.log(nodeInfo.ancestors());
            var ancestors = nodeInfo.ancestors();
            var rootNode = ancestors.pop();
            pathForSparqlJson.path.push({ concept: encodeURIComponent(rootNode.data.url) });
            pathRec(ancestors);
            // console.log(pathForSparqlJson); // Debug-Check
            this._backUpPaths = pathForSparqlJson;
            askExtension();
        }
        /**
         * Create a JSON Query to provide a rerendering of the diagram
         */
        function askExtension() {
            var newJSON = {};
            newJSON['concept'] = nodeInfo.data.url;
            newJSON['conceptURIPath'] = [];
            self.config['completeStructure']['objectproperties'][nodeInfo.parent.data.url]['objectproperties'][nodeInfo.data.url]['conceptURIPath'].forEach(function (u) {
                newJSON['conceptURIPath'].push(u);
            });
            newJSON['language'] = self.lang;
            newJSON['stepRange'] = 1;
            newJSON['frozenConcept'] = self.config['completeStructure']['objectproperties'][nodeInfo.parent.data.url]['frozenConcept'];
            newJSON['distanceToFrozenConcept'] = nodeInfo.depth;
            newJSON['oldJsonLogicalView'] = self.config['completeStructure'];
            newJSON['currentSelections'] = [];
            self.tableJSON['parametersURL'].forEach(function (u) {
                newJSON['currentSelections'].push([encodeURIComponent(u)]);
            });
            // console.log('newJSON', newJSON); // Debug-Check
            self.expSearch.getLogicalView(newJSON)
                .then(function (res) {
                // console.log(res['viewStructure']);
                self.config = res;
            });
            setTimeout(function () {
                d3.selectAll('svg > *').remove();
                self.mergedNodeName = nodeInfo.parent.data.name + '/' + nodeInfo.data.name;
                self.ngAfterViewInit();
                // console.log(nodeInfo.parent.data.name + '/' + nodeInfo.data.name);
            }, 1000);
            self.rerenderAlert = true;
        }
        /*
        Recursion function to make SPARQL Paths for the JSON to be sent to the backend
         */
        function pathRec(ances) {
            if (ances.length !== 1) {
                var immediateParent = ances.pop();
                pathForSparqlJson.path.push({ concept: encodeURIComponent(immediateParent.data.url),
                    urlOfProperty: encodeURIComponent(immediateParent.data.objectPropertySource)
                });
                pathRec(ances);
            }
            pathForSparqlJson.urlOfProperty = encodeURIComponent(ances[0].data.url);
        }
    };
    /**
     * Event from the `semantic-filter.component` child
     * @param ev
     */
    ExplorativeSearchDetailsComponent.prototype.handleFilterSelectionUpdated = function (ev) {
        var _loop_1 = function (eachFilterObtained) {
            var targetProperty = encodeURIComponent(eachFilterObtained.property);
            var indexForInsertion = this_1.tableJSON['parametersURL'].findIndex(function (ind) { return ind === targetProperty; });
            // console.log('index', indexForInsertion);
            if (indexForInsertion > -1) {
                this_1.tableJSON['filters'].splice(indexForInsertion, 0, {
                    'property': encodeURIComponent(eachFilterObtained['property']),
                    'min': eachFilterObtained['values'][0],
                    'max': eachFilterObtained['values'][1]
                });
            }
        };
        var this_1 = this;
        // console.log(ev); // DEBUG-Check
        for (var _i = 0, _a = ev.filter; _i < _a.length; _i++) {
            var eachFilterObtained = _a[_i];
            _loop_1(eachFilterObtained);
        }
    };
    /**
     * Send the JSON Structure to be processed by SPARQL and obtain results
     */
    ExplorativeSearchDetailsComponent.prototype.genTable = function () {
        var _this = this;
        this.selectedProduct = ''; // remove highlighted row from previous click
        this.expSearch.getTableValues(this.tableJSON)
            .then(function (res) {
            _this.tableResult = res;
            if (!_this.tableResult['rows'].length) {
                _this.emptySPARQLTable = true;
            }
        });
    };
    /**
     * Get More information about the results obtained from SPARQL.
     * @param indexUUID Index number of the row in which the 'More' button was pressed
     */
    ExplorativeSearchDetailsComponent.prototype.getSparqlOptionalSelect = function (indexUUID) {
        var _this = this;
        // console.log(indexUUID); // DEBUG-Check
        var optSPARQLQuery = { uuid: encodeURIComponent(this.tableResult.uuids[indexUUID].trim()), 'language': this.lang };
        // console.log(optSPARQLQuery); // DEBUG-Check
        this.expSearch.getOptionalSelect(optSPARQLQuery)
            .then(function (res) {
            _this.sparqlSelectedOption = res;
            if (_this.sparqlSelectedOption['columns'].findIndex(function (i) { return i === 'ManufacturersItemIdentification'; }) >= 0 &&
                _this.sparqlSelectedOption['columns'].findIndex(function (j) { return j === 'CatalogueDocumentReference'; }) >= 0) {
                // Check for ID and Catalogue ID. Enable Negotiation Button only if these two exist
                // console.log('Negotiation can exist');
                _this.negotiationEnable = true;
                var index_id = _this.sparqlSelectedOption['columns'].findIndex(function (i) { return i === 'ManufacturersItemIdentification'; });
                var index_catalogue = _this.sparqlSelectedOption['columns'].findIndex(function (i) { return i === 'CatalogueDocumentReference'; });
                _this._negotiation_id = _this.sparqlSelectedOption['rows'][0][index_id];
                _this._negotiation_catalogue_id = _this.sparqlSelectedOption['rows'][0][index_catalogue];
                // console.log(this._negotiation_catalogue_id, this._negotiation_id); // DEBUG-Check
            }
            else {
                _this.negotiationEnable = false;
            }
        });
        this.hiddenElement = true;
        this.selectedProduct = indexUUID;
    };
    /**
     * Routing within the platform to Negotiation process
     */
    ExplorativeSearchDetailsComponent.prototype.negotiation = function () {
        this.router.navigate(['/product-details'], { queryParams: { catalogueId: this._negotiation_catalogue_id, id: this._negotiation_id } });
    };
    /**
     * Recursion Method to flatten the incoming JSON Response from the Server
     * @param jsonVal: usually the configuration from the parent component
     * @returns {any} returns complete node for the rendering
     */
    ExplorativeSearchDetailsComponent.prototype.parse_node = function (jsonVal) {
        // create new leaf for the diagram
        var node = new Leaf();
        // extraction of all essential information
        node.name = jsonVal.concept.translatedURL;
        node.url = jsonVal.concept.url;
        node.conceptSource = jsonVal.concept.conceptSource;
        node.objectPropertySource = jsonVal.objectPropertySource;
        node.color = (jsonVal.objectPropertySource) ? 'red' : 'green';
        // adding datatype properties
        for (var _i = 0, _a = jsonVal['dataproperties']; _i < _a.length; _i++) {
            var datProp = _a[_i];
            node.children.push({
                name: datProp['translatedURL'], url: datProp['url'],
                color: 'green', conceptSource: datProp['conceptSource'], propertySource: datProp['propertySource'],
                objectPropertySource: '',
                children: []
            });
        }
        // adding object properties
        for (var objKey in jsonVal['objectproperties']) {
            if (jsonVal['objectproperties'].hasOwnProperty(objKey)) {
                // recursion..
                node.children.push(this.parse_node(jsonVal['objectproperties'][objKey]));
            }
        }
        // return the node configuration
        return {
            name: node.name,
            url: node.url, color: node.color,
            conceptSource: node.conceptSource,
            propertySource: node.propertySource,
            objectPropertySource: node.objectPropertySource,
            children: node.children
        };
    };
    __decorate([
        core_1.Input(),
        __metadata("design:type", Object)
    ], ExplorativeSearchDetailsComponent.prototype, "config", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", String)
    ], ExplorativeSearchDetailsComponent.prototype, "lang", void 0);
    ExplorativeSearchDetailsComponent = __decorate([
        core_1.Component({
            selector: 'explore-search-details',
            templateUrl: './explorative-search-details.component.html',
            styleUrls: ['./explorative-search-details.component.css'],
            providers: [explorative_search_service_1.ExplorativeSearchService],
            encapsulation: core_1.ViewEncapsulation.None
        }),
        __metadata("design:paramtypes", [explorative_search_service_1.ExplorativeSearchService, router_1.Router])
    ], ExplorativeSearchDetailsComponent);
    return ExplorativeSearchDetailsComponent;
}());
exports.ExplorativeSearchDetailsComponent = ExplorativeSearchDetailsComponent;
//# sourceMappingURL=explorative-search-details.component.js.map