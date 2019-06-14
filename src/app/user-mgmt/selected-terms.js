"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * This utility class helps to convert between 2 different representations for the same information:
 *  - an array of string that represents the selected terms (in order)
 *  - a map of term -> boolean that represents which term is selected
 */
var SelectedTerms = /** @class */ (function () {
    function SelectedTerms(selectedTerms, allTerms) {
        var _this = this;
        this.selectedTerms = selectedTerms;
        this.allTerms = allTerms;
        // the map term -> boolean of selected terms
        this.selectedMap = {};
        if (selectedTerms.length > 0) {
            selectedTerms.forEach(function (term) {
                _this.selectedMap[term] = true;
            });
        }
        else {
            allTerms.forEach(function (term) {
                _this.selectedMap[term] = true;
            });
            selectedTerms.push.apply(selectedTerms, allTerms);
        }
    }
    SelectedTerms.prototype.isSelected = function (term) {
        return this.selectedMap[term] || term == "";
    };
    SelectedTerms.prototype.toggle = function (term) {
        var _this = this;
        this.selectedMap[term] = !this.selectedMap[term];
        // empty the array
        this.selectedTerms.splice(0, this.selectedTerms.length);
        // re-add the selected terms. This is done this way to make sure the order of
        // selectedTerms is preserved.
        this.allTerms.forEach(function (existing) {
            if (_this.isSelected(existing)) {
                _this.selectedTerms.push(existing);
            }
        });
    };
    return SelectedTerms;
}());
exports.SelectedTerms = SelectedTerms;
//# sourceMappingURL=selected-terms.js.map