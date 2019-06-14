"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var PublishService = /** @class */ (function () {
    function PublishService() {
        this.publishMode = "create";
        this.publishingStarted = false;
        this.publishedProductNature = "Regular product"; // or Transportation service
        this.propertyBlockCollapsedStates = new Map();
    }
    PublishService.prototype.getCollapsedStates = function () {
        return this.propertyBlockCollapsedStates;
    };
    PublishService.prototype.getCollapsedState = function (blockName) {
        if (this.propertyBlockCollapsedStates.has(blockName)) {
            return this.propertyBlockCollapsedStates.get(blockName);
        }
        else {
            this.propertyBlockCollapsedStates.set(blockName, true);
            return true;
        }
    };
    PublishService.prototype.resetData = function () {
        this.propertyBlockCollapsedStates = new Map();
    };
    PublishService = __decorate([
        core_1.Injectable()
    ], PublishService);
    return PublishService;
}());
exports.PublishService = PublishService;
//# sourceMappingURL=publish-and-aip.service.js.map