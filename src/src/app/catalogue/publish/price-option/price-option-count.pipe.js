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
var PriceOptionCountPipe = /** @class */ (function () {
    function PriceOptionCountPipe() {
    }
    /**
     * Returns the count of price options specified by the price option category
     */
    PriceOptionCountPipe.prototype.transform = function (priceOptions, priceOptionType) {
        var count = 0;
        for (var _i = 0, priceOptions_1 = priceOptions; _i < priceOptions_1.length; _i++) {
            var option = priceOptions_1[_i];
            if (option.typeID == priceOptionType) {
                count++;
            }
        }
        return count;
    };
    PriceOptionCountPipe = __decorate([
        core_1.Pipe({ name: 'priceOptionCountPipe' })
    ], PriceOptionCountPipe);
    return PriceOptionCountPipe;
}());
exports.PriceOptionCountPipe = PriceOptionCountPipe;
//# sourceMappingURL=price-option-count.pipe.js.map