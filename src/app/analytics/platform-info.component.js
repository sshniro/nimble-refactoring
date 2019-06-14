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
var myGlobals = require("../globals");
var PlatformInfoComponent = /** @class */ (function () {
    function PlatformInfoComponent() {
        this.config = myGlobals.config;
    }
    PlatformInfoComponent = __decorate([
        core_1.Component({
            selector: "platform-info",
            templateUrl: "./platform-info.component.html",
            styleUrls: ["./platform-info.component.css"]
        }),
        __metadata("design:paramtypes", [])
    ], PlatformInfoComponent);
    return PlatformInfoComponent;
}());
exports.PlatformInfoComponent = PlatformInfoComponent;
//# sourceMappingURL=platform-info.component.js.map