"use strict";
/**
 * Filter Functionality on Clicking A Node.
 * This component handles the filter panel that appears
 * after a node on the Diagram is clicked.
 * Parent Component for this class: explorative-search-details.component
 * Child Component for this class: none
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
var ExplorativeSearchFilterComponent = /** @class */ (function () {
    function ExplorativeSearchFilterComponent(expSearch) {
        this.expSearch = expSearch;
        this.filterSelectionUpdated = new core_1.EventEmitter();
        /*for storing array from JSON response for checkboxes*/
        this.result = [];
        /*Collection of User selections..*/
        this.userSelections = [];
    }
    /**
     * use the OnChanges LifeCycle Hook for everytime when the parent sends
     * a new filter configuration to the child
     */
    ExplorativeSearchFilterComponent.prototype.ngOnChanges = function () {
        // console.log('FilterConfig ', this.filterProperties['filterJSON']); // DEBUG Check
        this.result = [];
        this.finalSelectionJSON = { 'root': this.filterProperties['fQueryRootUrl'], 'filter': [] };
        if (this.filterProperties['filterJSON'] === {}) {
            this.userSelections = [];
        }
        for (var keyConfig in this.filterProperties['filterJSON']) {
            if (this.filterProperties['filterJSON'].hasOwnProperty(keyConfig)) {
                // store the JSON array in the result array for display
                this.result = this.filterProperties['filterJSON'][keyConfig];
                // console.log(this.result); // DEBUG
            }
        }
    };
    /**
     * checkedValues: function is triggered when the Checkboxes are checked
     * @param inp checkBox value (check HTML code for [value] attribute
     * @param status if the checkbox value is checked or not..
     */
    ExplorativeSearchFilterComponent.prototype.checkedValues = function (inp, status) {
        // if the value does not exist and the checkbox is checked.
        // insert in the userSelection array
        if (this.userSelections.indexOf(inp) === -1 && status) {
            for (var _i = 0, _a = this.result; _i < _a.length; _i++) {
                var eachResult = _a[_i];
                if (eachResult['description'] === inp) {
                    // NEED TO WORK HERE.. Must be a Array of JSON according to API input
                    // let tempArr: any[] = [];
                    // tempArr.push({'property': this.keyForConf, 'values': [eachResult['min'], eachResult['max']]});
                    this.userSelections.push({ 'property': this.filterProperties['fQuery'],
                        'values': [eachResult['min'], eachResult['max']]
                    });
                }
            }
        }
        else if (!status) {
            var index = this.userSelections.indexOf(inp);
            this.userSelections.splice(index, 1);
        }
        // console.log('Filter Area: ', this.userSelections); // DEBUG CHECK
        if (this.userSelections.length > 0) {
            this.finalSelectionJSON = { 'root': this.filterProperties['fQueryRoot'], 'filter': this.userSelections };
        }
        else {
            // console.log('FilterArea: this.userSelections', this.userSelections);
            this.finalSelectionJSON = { 'root': this.filterProperties['fQueryRoot'],
                'child': this.filterProperties['fQuery'], 'filter': [] };
        }
    };
    /**
     * getGroupVal: function handles the change in the slider values
     * With increase or decrease of the slider value
     * the `amountOfGroups` parameter of JSON changes and calls to the backend
     * are made.
     * @param eventValue: Event from the Slider
     */
    ExplorativeSearchFilterComponent.prototype.getGroupVal = function (eventValue) {
        var _this = this;
        // change the HTML display everytime the slider value changes
        this.slider.nativeElement.innerHTML = eventValue;
        // console.log(eventValue); DEBUG
        // Create a JSON for the Filter and `amountOfGroups` should be changed
        // according to the slider values.
        for (var key in this.filterProperties['filterJSON']) {
            if (this.filterProperties['filterJSON'].hasOwnProperty(key)) {
                this.filterProperties['fQuery'] = key;
            }
        }
        var filteringInput = { 'concept': encodeURIComponent(this.filterProperties['fQueryRoot'].trim()),
            'property': encodeURIComponent(this.filterProperties['fQuery'].trim()),
            'amountOfGroups': eventValue };
        // Call API everytime the slider value changes.
        this.expSearch.getPropertyValues(filteringInput)
            .then(function (res) {
            _this.result = res[_this.filterProperties['fQuery']]; // store the array in JSON response in the result array
            _this._error_detected_slider = false;
        })
            .catch(function (error) {
            //console.log(error);
            _this._error_detected_slider = true;
        });
    };
    /**
     * This function should give back the Parent Component the user's selection
     * of filter choices.
     * Try Output & EventEmitter here `maybe` to send back data to Parent (search-details.component)
     */
    ExplorativeSearchFilterComponent.prototype.submitFilter = function () {
        // console.log(Number(this.groupSelectVal)); DEBUG
        // This needs to be changed according to Backend API
        this.filterSelectionUpdated.emit(this.finalSelectionJSON);
        //console.log('FilterArea: finalSelectionJSON', this.finalSelectionJSON); // DEBUG CHECK
    };
    __decorate([
        core_1.Input(),
        __metadata("design:type", Object)
    ], ExplorativeSearchFilterComponent.prototype, "filterProperties", void 0);
    __decorate([
        core_1.Output(),
        __metadata("design:type", Object)
    ], ExplorativeSearchFilterComponent.prototype, "filterSelectionUpdated", void 0);
    __decorate([
        core_1.ViewChild('rangeVal'),
        __metadata("design:type", core_1.ElementRef)
    ], ExplorativeSearchFilterComponent.prototype, "slider", void 0);
    ExplorativeSearchFilterComponent = __decorate([
        core_1.Component({
            selector: 'search-filter',
            templateUrl: './explorative-search-filter.component.html',
            styleUrls: ['./explorative-search-filter.component.css'],
            providers: [explorative_search_service_1.ExplorativeSearchService]
        }),
        __metadata("design:paramtypes", [explorative_search_service_1.ExplorativeSearchService])
    ], ExplorativeSearchFilterComponent);
    return ExplorativeSearchFilterComponent;
}());
exports.ExplorativeSearchFilterComponent = ExplorativeSearchFilterComponent;
//# sourceMappingURL=explorative-search-filter.component.js.map