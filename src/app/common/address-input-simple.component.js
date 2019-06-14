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
var address_simple_1 = require("../catalogue/model/publish/address-simple");
var operators_1 = require("rxjs/operators");
var utils_1 = require("./utils");
var AddressInputSimpleComponent = /** @class */ (function () {
    function AddressInputSimpleComponent() {
        this.address = new address_simple_1.AddressSimple();
        this.disabled = false;
        this.required = false;
        this.getSuggestions = function (text$) {
            return text$.pipe(operators_1.debounceTime(50), operators_1.distinctUntilChanged(), operators_1.map(function (term) { return utils_1.getCountrySuggestions(term); }));
        };
    }
    AddressInputSimpleComponent.prototype.ngOnInit = function () {
    };
    __decorate([
        core_1.Input(),
        __metadata("design:type", address_simple_1.AddressSimple)
    ], AddressInputSimpleComponent.prototype, "address", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Boolean)
    ], AddressInputSimpleComponent.prototype, "disabled", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Boolean)
    ], AddressInputSimpleComponent.prototype, "required", void 0);
    AddressInputSimpleComponent = __decorate([
        core_1.Component({
            selector: "address-input-simple",
            templateUrl: "./address-input-simple.component.html",
            styleUrls: ["./address-input-simple.component.css"]
        }),
        __metadata("design:paramtypes", [])
    ], AddressInputSimpleComponent);
    return AddressInputSimpleComponent;
}());
exports.AddressInputSimpleComponent = AddressInputSimpleComponent;
//# sourceMappingURL=address-input-simple.component.js.map