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
 * The service intends to keep the from(delivery) and to addresses that are used during the instantiation of the business processes.
 * The values are first initialized with the preferred values and then updated based on the user activities on UI.
 *
 * Created by suat on 08-Jun-18.
 */
var PrecedingBPDataService = /** @class */ (function () {
    function PrecedingBPDataService() {
    }
    PrecedingBPDataService = __decorate([
        core_1.Injectable()
    ], PrecedingBPDataService);
    return PrecedingBPDataService;
}());
exports.PrecedingBPDataService = PrecedingBPDataService;
//# sourceMappingURL=preceding-bp-data-service.js.map