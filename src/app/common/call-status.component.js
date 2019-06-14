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
/**
 * Created by suat on 29-Sep-17.
 */
var core_1 = require("@angular/core");
var call_status_1 = require("./call-status");
var CallStatusComponent = /** @class */ (function () {
    function CallStatusComponent() {
        this.closed = true;
    }
    CallStatusComponent.prototype.handleClick = function (event) {
        // if the call is still active, ignore click
        if (this.callStatus.fb_submitted == true) {
            return;
        }
        var clickedComponent = event.target;
        var inside = false;
        do {
            // null check on the element refs in case they might not be rendered at all
            if ((this.errorBox != null && clickedComponent === this.errorBox.nativeElement) ||
                (this.successBox != null && clickedComponent === this.successBox.nativeElement)) {
                inside = true;
                break;
            }
            clickedComponent = clickedComponent.parentNode;
        } while (clickedComponent);
        // if successful and outside the box, reset the status
        /*if(!inside && this.callStatus.fb_callback == true) {
            this.callStatus.reset();
        }
        if(!inside && this.callStatus.fb_errordetc == true) {
            //this.callStatus.reset();
        }*/
    };
    __decorate([
        core_1.ViewChild('errorBox'),
        __metadata("design:type", core_1.ElementRef)
    ], CallStatusComponent.prototype, "errorBox", void 0);
    __decorate([
        core_1.ViewChild('successBox'),
        __metadata("design:type", core_1.ElementRef)
    ], CallStatusComponent.prototype, "successBox", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", call_status_1.CallStatus)
    ], CallStatusComponent.prototype, "callStatus", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Boolean)
    ], CallStatusComponent.prototype, "large", void 0);
    CallStatusComponent = __decorate([
        core_1.Component({
            selector: 'call-status',
            templateUrl: './call-status.component.html',
            host: {
                '(document:click)': 'handleClick($event)',
            },
        })
    ], CallStatusComponent);
    return CallStatusComponent;
}());
exports.CallStatusComponent = CallStatusComponent;
//# sourceMappingURL=call-status.component.js.map