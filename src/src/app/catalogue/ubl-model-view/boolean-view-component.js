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
 * Created by suat on 22-Sep-17.
 */
var BooleanViewComponent = /** @class */ (function () {
    function BooleanViewComponent() {
        this.valueChanged = new core_1.EventEmitter();
        // the definition of the property
        this.definition = null;
    }
    Object.defineProperty(BooleanViewComponent.prototype, "value", {
        get: function () {
            return this.valueObj;
        },
        set: function (val) {
            this.valueObj = val;
            this.valueChanged.emit(val);
        },
        enumerable: true,
        configurable: true
    });
    __decorate([
        core_1.Input(),
        __metadata("design:type", String)
    ], BooleanViewComponent.prototype, "presentationMode", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", String)
    ], BooleanViewComponent.prototype, "propName", void 0);
    __decorate([
        core_1.Output(),
        __metadata("design:type", Object)
    ], BooleanViewComponent.prototype, "valueChanged", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", String)
    ], BooleanViewComponent.prototype, "definition", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Object),
        __metadata("design:paramtypes", [Object])
    ], BooleanViewComponent.prototype, "value", null);
    BooleanViewComponent = __decorate([
        core_1.Component({
            selector: 'boolean-view',
            templateUrl: './boolean-view.component.html'
        })
    ], BooleanViewComponent);
    return BooleanViewComponent;
}());
exports.BooleanViewComponent = BooleanViewComponent;
//# sourceMappingURL=boolean-view-component.js.map