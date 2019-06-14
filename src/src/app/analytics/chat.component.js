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
var globals_1 = require("../globals");
var platform_browser_1 = require("@angular/platform-browser");
var ChatComponent = /** @class */ (function () {
    function ChatComponent(sanitizer) {
        this.sanitizer = sanitizer;
        this.chatURL = this.sanitizer.bypassSecurityTrustResourceUrl(globals_1.rocketChatEndpoint);
    }
    ChatComponent.prototype.ngOnInit = function () {
    };
    ChatComponent = __decorate([
        core_1.Component({
            selector: "chat",
            templateUrl: "./chat.component.html",
            styleUrls: ["./chat.component.css"],
        }),
        __metadata("design:paramtypes", [platform_browser_1.DomSanitizer])
    ], ChatComponent);
    return ChatComponent;
}());
exports.ChatComponent = ChatComponent;
//# sourceMappingURL=chat.component.js.map