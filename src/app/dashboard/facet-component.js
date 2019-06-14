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
/**
 * Created by suat on 28-Mar-18.
 */
var FacetComponent = /** @class */ (function () {
    function FacetComponent() {
        this.dataType = "string";
        this.booleanValue = false;
        this.stringValues = [];
        this.selectedStringValues = [];
        this.filterActive = false; // true means user already selected a value for this facet, in this case we check the checkboxes
        this.loading = false;
        this.booleanValueChanged = new core_1.EventEmitter();
        this.triggerCriteriaChanged = new core_1.EventEmitter();
    }
    FacetComponent.prototype.selectStringValue = function (value) {
        var index = this.selectedStringValues.indexOf(value);
        if (index == -1) {
            this.selectedStringValues.push(value);
        }
        else {
            this.selectedStringValues.splice(index, 1);
        }
    };
    FacetComponent.prototype.noResults = function () {
        if (this.loading) {
            return false;
        }
        return this.dataType === "string" && (!this.stringValues || this.stringValues.length === 0);
    };
    __decorate([
        core_1.Input(),
        __metadata("design:type", String)
    ], FacetComponent.prototype, "title", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", String)
    ], FacetComponent.prototype, "dataType", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Boolean)
    ], FacetComponent.prototype, "booleanValue", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Array)
    ], FacetComponent.prototype, "stringValues", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Array)
    ], FacetComponent.prototype, "selectedStringValues", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Boolean)
    ], FacetComponent.prototype, "filterActive", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Boolean)
    ], FacetComponent.prototype, "loading", void 0);
    __decorate([
        core_1.Output(),
        __metadata("design:type", core_1.EventEmitter)
    ], FacetComponent.prototype, "booleanValueChanged", void 0);
    __decorate([
        core_1.Output(),
        __metadata("design:type", core_1.EventEmitter)
    ], FacetComponent.prototype, "triggerCriteriaChanged", void 0);
    FacetComponent = __decorate([
        core_1.Component({
            selector: "facet",
            templateUrl: "./facet-component.html",
            styleUrls: ["./facet-component.css"]
        })
    ], FacetComponent);
    return FacetComponent;
}());
exports.FacetComponent = FacetComponent;
//# sourceMappingURL=facet-component.js.map