"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Created by suat on 05-Aug-17.
 */
var core_1 = require("@angular/core");
/**
 * Pipe to return correct data source of an item property based on its value qualifier
 */
var ItemPropertyDataSourcePipe = /** @class */ (function () {
    function ItemPropertyDataSourcePipe() {
    }
    ItemPropertyDataSourcePipe.prototype.transform = function (qualifier, itemProperty) {
        if (itemProperty.valueQualifier == "NUMBER") {
            return itemProperty.valueDecimal;
        }
        else if (itemProperty.valueQualifier == "FILE") {
            return itemProperty.valueBinary;
        }
        else {
            return itemProperty.value;
        }
    };
    ItemPropertyDataSourcePipe = __decorate([
        core_1.Pipe({ name: 'itemPropertyDataSourcePipe' })
    ], ItemPropertyDataSourcePipe);
    return ItemPropertyDataSourcePipe;
}());
exports.ItemPropertyDataSourcePipe = ItemPropertyDataSourcePipe;
//# sourceMappingURL=item-property-data-source-pipe.js.map