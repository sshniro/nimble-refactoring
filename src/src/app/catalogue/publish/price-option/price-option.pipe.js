"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
/**
 * Created by suat on 28-Aug-18.
 */
var PriceOptionPipe = /** @class */ (function () {
    function PriceOptionPipe() {
    }
    /**
     * Returns the subset of price options specified by the price option category
     * in the form of {option: optionObject, index: index}
     */
    PriceOptionPipe.prototype.transform = function (allPriceOptions, priceOptionType) {
        var priceOptionsWithIndices = [];
        for (var i = 0; i < allPriceOptions.length; i++) {
            var option = allPriceOptions[i];
            if (option.typeID == priceOptionType) {
                priceOptionsWithIndices.push({ option: option, index: i });
            }
        }
        return priceOptionsWithIndices;
    };
    PriceOptionPipe = __decorate([
        core_1.Pipe({ name: 'priceOptionPipe' })
    ], PriceOptionPipe);
    return PriceOptionPipe;
}());
exports.PriceOptionPipe = PriceOptionPipe;
//# sourceMappingURL=price-option.pipe.js.map