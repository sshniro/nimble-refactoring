"use strict";
/**
 * This file takes care of the Search button and delete Button
 * Search button: upon clicking the keyword response is fetched
 * from server and displayed on the HTML page.
 *
 * Delete button: appears once the checkbox beside the keyword is checked
 * upon clicking it the content and the keyword itself are removed from
 * the HTML file
 *
 * Parent for this class: explorative-search.component
 * Child for this class: explorative-search-details.component
 */
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
var explorative_search_service_1 = require("./explorative-search.service");
var search_1 = require("./model/search");
var ng2_cookies_1 = require("ng2-cookies");
/**
 * Array for storing incoming HTTP responses
 * FORMAT: [{keyword: val1, response: someResponse1},
 *  {keyword: val2, response: someResponse2} ..
 * ]
 * A JSON list of searched Keywords and their respective responses
 */
exports.OUTPUT = [];
var ExplorativeSearchFormComponent = /** @class */ (function () {
    function ExplorativeSearchFormComponent(expSearch, cookieService) {
        this.expSearch = expSearch;
        this.cookieService = cookieService;
        // checkbox for every keyword in Search History
        // remember: the variable name is same as in the HTML file
        this.loading = false;
        this.loading_query = false;
        this.cbInput = true;
        this.langInput = true;
        this.language = 'ENGLISH'; // default search in english
        this.availableLanguages = {};
        // Use the stored data which might further
        // data visualization
        // remember: the variable `Output` is the same as in the HTML file
        this.Output = exports.OUTPUT;
        // For response which constitutes more than one option..
        this.showMore = [];
        // when unchecked in search history, do not show respective keywords
        this.showParticularKeyword = [];
        this._error_detected_kw = false;
        this._error_detected_query = false;
        this._warning_kw = false;
        this.activeTabName = 'sqp';
        this.conceptName = '';
        this.conceptURL = '';
        this.conceptSource = '';
        this.model = new search_1.Search('');
        this._user_id = this.cookieService.get('user_id');
    }
    ExplorativeSearchFormComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.showMore = new Array(this.Output.length);
        this.showMore.fill(false);
        this.showParticularKeyword = new Array(this.Output.length);
        this.showParticularKeyword.fill(false);
        this.expSearch.getLanguageSupport()
            .then(function (res) { return _this.availableLanguages = res; });
    };
    /**
     * Search: will get a HTTP response from the server (HTTP GET)
     *          of the keyword which user inputs.
     * @param inputVal string obtained from the input bar of the HTML file
     * @param inpLang string which language the user queries
     */
    ExplorativeSearchFormComponent.prototype.Search = function (inputVal, inpLang) {
        var _this = this;
        if (!inpLang) {
            // default is english
            inpLang = this.language;
        }
        this.language = inpLang;
        inputVal = inputVal.trim(); // trim whitespaces
        if (!inputVal) {
            return;
        } // if no input; do nothing
        // Let the Service do its fetching of data from server
        // console.log(lang)
        this.loading = true;
        this.expSearch.searchData(inputVal, this.language, this._user_id)
            .then(function (res) {
            // push the data in to List
            // console.log(res);
            if (res['conceptOverview'].length !== 0) {
                // only then push
                _this.Output.push({ kw: inputVal, resp: res });
                _this._warning_kw = false;
            }
            else {
                _this._warning_kw = true;
            }
            _this._error_detected_kw = false;
            _this.loading = false;
        })
            .catch(function (error) {
            // console.log(error);
            _this._error_detected_kw = true;
            _this.loading = false;
        });
        // console.log('OUTPUT', this.Output);
    };
    /**
     * deleteKW: if the checkbox(cbInput) is checked then the delete button
     * will appear. On clicking the delete button remove the data from the
     * Output List.
     * @param inputVal string of the selected keyword to be removed
     */
    ExplorativeSearchFormComponent.prototype.deleteKW = function (inputVal) {
        // find the matching keyword in the List Output
        var index = this.Output.findIndex(function (op) { return op.kw === inputVal; });
        if (index > -1) {
            // remove the whole entry from the list
            this.Output.splice(index, 1);
            // remove its visibility values too
            this.showParticularKeyword.splice(index, 1);
        }
    };
    /**
     * hideKW: if unchecked the resultant keywords should be hidden
     * @param inputIndex index number of the output keyword that needs to hidden
     */
    ExplorativeSearchFormComponent.prototype.hideKW = function (inputIndex) {
        //console.log(this.cbInput);
        if (inputIndex > -1) {
            this.showParticularKeyword[inputIndex] = !this.showParticularKeyword[inputIndex];
        }
    };
    /**
     * getQuery: for the when the user will click a specific keyword button
     * the parameter will be sent as JSON request to get the Visualization values
     * @param inputVal the name of the Button clicked by the User
     */
    ExplorativeSearchFormComponent.prototype.getQuery = function (inputVal, urlVal) {
        var _this = this;
        this.loading_query = true;
        // console.log(inputVal);
        this.conceptName = urlVal;
        this.conceptURL = inputVal;
        for (var _i = 0, _a = this.Output; _i < _a.length; _i++) {
            var eachOutput = _a[_i];
            var index = eachOutput.resp['conceptOverview'].findIndex(function (op) { return op.translatedURL === urlVal; });
            if (index > -1) {
                // console.log(eachOutput.resp['conceptOverview'][index]['conceptSource']);
                this.conceptSource = eachOutput.resp['conceptOverview'][index]['conceptSource'];
            }
        }
        // HTTP GET to backend Server for visualization
        // create a JSON request for the queried button
        var temp = { 'concept': inputVal.trim(), 'stepRange': 2, 'frozenConcept': inputVal.trim(),
            'language': this.language, 'distanceToFrozenConcept': 0,
            'conceptURIPath': [inputVal.trim()],
            'conceptSource': this.conceptSource
        };
        // console.log(JSON.stringify(temp)); // Debug: check
        // get the requested query
        this.expSearch.getLogicalView(temp)
            .then(function (res) {
            // console.log(res);
            // this.visData = new Array();
            if (_this.activeTabName === 'sqp') {
                _this.SQPConfig = { 'concept': encodeURIComponent(_this.conceptURL), 'stepRange': 1, 'language': _this.language,
                    frozenConcept: _this.conceptName, 'distanceToFrozenConcept': 0, 'conceptURIPath': [],
                    'currenSelections': [],
                    conceptSource: _this.conceptSource
                };
            }
            _this.visData = res;
            _this.loading_query = false;
            // console.log(this.visData);
            _this._error_detected_query = false;
        })
            .catch(function (error) {
            //console.log(error);
            _this._error_detected_query = true;
        });
    };
    ExplorativeSearchFormComponent.prototype.previousStateRestore = function () {
        if (!this.visData || !this.language) {
            this.visData = JSON.parse(localStorage.getItem('prevVisData'));
            this.language = localStorage.getItem('prevLanguage');
        }
    };
    ExplorativeSearchFormComponent.prototype.previousStateStore = function () {
        localStorage.setItem('prevVisData', JSON.stringify(this.visData));
        localStorage.setItem('prevLanguage', this.language);
    };
    ExplorativeSearchFormComponent.prototype.activeTab = function ($event) {
        // console.log($event.activeId);
        this.activeTabName = $event.nextId;
    };
    ExplorativeSearchFormComponent = __decorate([
        core_1.Component({
            selector: 'explore-search-form',
            templateUrl: './explorative-search-form.component.html',
            styleUrls: ['./explorative-search-form.component.css'],
            providers: [
                explorative_search_service_1.ExplorativeSearchService,
                ng2_cookies_1.CookieService
            ]
        }),
        __metadata("design:paramtypes", [explorative_search_service_1.ExplorativeSearchService,
            ng2_cookies_1.CookieService])
    ], ExplorativeSearchFormComponent);
    return ExplorativeSearchFormComponent;
}());
exports.ExplorativeSearchFormComponent = ExplorativeSearchFormComponent;
//# sourceMappingURL=explorative-search-form.component.js.map