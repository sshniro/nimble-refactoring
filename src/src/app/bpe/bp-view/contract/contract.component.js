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
var contract_1 = require("../../../catalogue/model/publish/contract");
var ContractComponent = /** @class */ (function () {
    function ContractComponent() {
        this.contract = null;
        this.showQuotation = false;
        this.showClauses = false;
    }
    __decorate([
        core_1.Input(),
        __metadata("design:type", contract_1.Contract)
    ], ContractComponent.prototype, "contract", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Boolean)
    ], ContractComponent.prototype, "showQuotation", void 0);
    ContractComponent = __decorate([
        core_1.Component({
            selector: 'contract',
            templateUrl: './contract.component.html',
            styleUrls: ["./contract.component.css"]
        })
    ], ContractComponent);
    return ContractComponent;
}());
exports.ContractComponent = ContractComponent;
//# sourceMappingURL=contract.component.js.map