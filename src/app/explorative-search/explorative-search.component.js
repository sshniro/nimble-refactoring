"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * This file is the main Angular component
 * for the explorative-search of the App.
 * For Modularity Designs all the components are in:
 * 1. explorative-search-form
 * 2. explorative-search-details
 */
var core_1 = require("@angular/core");
var ExplorativeSearchComponent = /** @class */ (function () {
    function ExplorativeSearchComponent() {
    }
    ExplorativeSearchComponent = __decorate([
        core_1.Component({
            selector: 'explore-search',
            templateUrl: './explorative-search.component.html',
            styleUrls: ['./explorative-search.component.css'],
        })
    ], ExplorativeSearchComponent);
    return ExplorativeSearchComponent;
}());
exports.ExplorativeSearchComponent = ExplorativeSearchComponent;
//# sourceMappingURL=explorative-search.component.js.map