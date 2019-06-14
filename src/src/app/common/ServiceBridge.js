"use strict";
/**
 * Created by suat on 17-Apr-19.
 */
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * This class is created to pass a global service instance to regular classes. The described fields must be instantiated via the Angular DI mechanism.
 */
var ServiceBridge = /** @class */ (function () {
    function ServiceBridge() {
    }
    Object.defineProperty(ServiceBridge, "unitService", {
        get: function () {
            if (this._unitService == null) {
                throw new Error("Unit service is not initialized yet");
            }
            return this._unitService;
        },
        set: function (value) {
            this._unitService = value;
        },
        enumerable: true,
        configurable: true
    });
    return ServiceBridge;
}());
exports.ServiceBridge = ServiceBridge;
//# sourceMappingURL=ServiceBridge.js.map