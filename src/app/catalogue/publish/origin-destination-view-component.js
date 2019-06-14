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
var utils_1 = require("../../common/utils");
var text_1 = require("../model/publish/text");
var item_property_1 = require("../model/publish/item-property");
var constants_1 = require("../model/constants");
var OriginDestinationViewComponent = /** @class */ (function () {
    function OriginDestinationViewComponent() {
        this.regionOptions = constants_1.REGIONS;
        this.countryNames = utils_1.COUNTRY_NAMES;
        this.isAllOverTheWorldOptionSelected = false;
        this.enableRegionSelection = false;
        this.enableCountrySelection = false;
    }
    OriginDestinationViewComponent.prototype.ngOnInit = function () {
        // set the title
        this.title = utils_1.selectPreferredValue(this.itemProperty.name);
        for (var _i = 0, _a = this.itemProperty.value; _i < _a.length; _i++) {
            var address = _a[_i];
            if (address.value == "All over the world") {
                this.isAllOverTheWorldOptionSelected = true;
            }
            else if (this.regionOptions.indexOf(address.value) != -1) {
                this.enableRegionSelection = true;
            }
            else {
                this.enableCountrySelection = true;
            }
        }
    };
    OriginDestinationViewComponent.prototype.onCountrySelected = function (event) {
        this.itemProperty.value.push(new text_1.Text(event.target.value));
        // set input value to null
        event.target.value = null;
    };
    OriginDestinationViewComponent.prototype.onCountryRemoved = function (country) {
        for (var _i = 0, _a = this.itemProperty.value; _i < _a.length; _i++) {
            var address = _a[_i];
            if (address.value == country) {
                this.itemProperty.value.splice(this.itemProperty.value.indexOf(address), 1);
                break;
            }
        }
    };
    OriginDestinationViewComponent.prototype.onAllOverTheWorldOptionSelected = function (isChecked) {
        if (isChecked) {
            // remove other selected options
            this.itemProperty.value = [new text_1.Text("All over the world")];
            // disable Region and Country selection
            this.enableRegionSelection = this.enableCountrySelection = false;
        }
        else {
            for (var _i = 0, _a = this.itemProperty.value; _i < _a.length; _i++) {
                var address = _a[_i];
                if (address.value == "All over the world") {
                    this.itemProperty.value.splice(this.itemProperty.value.indexOf(address), 1);
                    break;
                }
            }
        }
    };
    // if Regions option is deselected, then remove all selected regions
    OriginDestinationViewComponent.prototype.onRegionsChecked = function (isChecked) {
        this.enableRegionSelection = isChecked;
        if (isChecked) {
            // remove selected options
            this.itemProperty.value = [];
            // disable other options
            this.enableCountrySelection = this.isAllOverTheWorldOptionSelected = false;
        }
        else {
            var addressesToBeRemoved = [];
            for (var _i = 0, _a = this.itemProperty.value; _i < _a.length; _i++) {
                var address = _a[_i];
                if (this.regionOptions.indexOf(address.value) != -1 && address.value != "All over the world") {
                    addressesToBeRemoved.push(address);
                }
            }
            for (var _b = 0, addressesToBeRemoved_1 = addressesToBeRemoved; _b < addressesToBeRemoved_1.length; _b++) {
                var address = addressesToBeRemoved_1[_b];
                this.itemProperty.value.splice(this.itemProperty.value.indexOf(address), 1);
            }
        }
    };
    OriginDestinationViewComponent.prototype.onRegionChecked = function (isChecked, option) {
        if (isChecked) {
            this.itemProperty.value.push(new text_1.Text(option));
        }
        else {
            for (var _i = 0, _a = this.itemProperty.value; _i < _a.length; _i++) {
                var address = _a[_i];
                if (address.value == option) {
                    this.itemProperty.value.splice(this.itemProperty.value.indexOf(address), 1);
                    break;
                }
            }
        }
    };
    OriginDestinationViewComponent.prototype.onCountrySelectionChanged = function (isSelected) {
        this.enableCountrySelection = isSelected;
        if (isSelected) {
            // remove selected options
            this.itemProperty.value = [];
            // disable other options
            this.enableRegionSelection = this.isAllOverTheWorldOptionSelected = false;
        }
    };
    // get the selected countries
    OriginDestinationViewComponent.prototype.getSelectedCountries = function () {
        var countries = [];
        for (var _i = 0, _a = this.itemProperty.value; _i < _a.length; _i++) {
            var address = _a[_i];
            if (this.regionOptions.indexOf(address.value) == -1 && address.value != "All over the world") {
                countries.push(address.value);
            }
        }
        return countries;
    };
    // check whether the given region option is selected or not
    OriginDestinationViewComponent.prototype.isRegionSelected = function (option) {
        for (var _i = 0, _a = this.itemProperty.value; _i < _a.length; _i++) {
            var address = _a[_i];
            if (address.value == option) {
                return true;
            }
        }
        return false;
    };
    __decorate([
        core_1.Input(),
        __metadata("design:type", item_property_1.ItemProperty)
    ], OriginDestinationViewComponent.prototype, "itemProperty", void 0);
    OriginDestinationViewComponent = __decorate([
        core_1.Component({
            selector: "origin-destination-view",
            templateUrl: "./origin-destination-view-component.html"
        }),
        __metadata("design:paramtypes", [])
    ], OriginDestinationViewComponent);
    return OriginDestinationViewComponent;
}());
exports.OriginDestinationViewComponent = OriginDestinationViewComponent;
//# sourceMappingURL=origin-destination-view-component.js.map