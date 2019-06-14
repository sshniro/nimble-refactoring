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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var bp_data_service_1 = require("../bpe/bp-view/bp-data-service");
var process_instance_group_1 = require("../bpe/model/process-instance-group");
var thread_event_metadata_1 = require("../catalogue/model/publish/thread-event-metadata");
var bpe_service_1 = require("../bpe/bpe.service");
var bp_start_event_1 = require("../catalogue/model/publish/bp-start-event");
var bpURLParams_1 = require("../catalogue/model/publish/bpURLParams");
var ThreadEventComponent = /** @class */ (function () {
    function ThreadEventComponent(bpDataService, bpeService) {
        this.bpDataService = bpDataService;
        this.bpeService = bpeService;
        this.history = [];
        this.processCancelled = new core_1.EventEmitter();
    }
    ThreadEventComponent.prototype.ngOnInit = function () {
    };
    ThreadEventComponent.prototype.openBpProcessView = function (updateProcess) {
        return __awaiter(this, void 0, void 0, function () {
            var userRole;
            return __generator(this, function (_a) {
                // whether we are updating the process instance or not
                this.event.isBeingUpdated = updateProcess;
                userRole = this.event.buyer ? "buyer" : "seller";
                this.bpDataService.startBp(new bp_start_event_1.BpActivityEvent(userRole, this.event.processType, this.processInstanceGroup.id, this.collaborationGroupId, this.history, null, false, this.event.formerStep), true, new bpURLParams_1.BpURLParams(this.event.product.catalogueDocumentReference.id, this.event.product.manufacturersItemIdentification.id, this.event.processId));
                return [2 /*return*/];
            });
        });
    };
    ThreadEventComponent.prototype.cancelBP = function () {
        var _this = this;
        if (confirm("Are you sure that you want to cancel this process?")) {
            this.bpeService.cancelBusinessProcess(this.event.processId)
                .then(function (res) {
                _this.processCancelled.next();
            })
                .catch(function (error) {
                console.error(error);
            });
        }
    };
    __decorate([
        core_1.Input(),
        __metadata("design:type", process_instance_group_1.ProcessInstanceGroup)
    ], ThreadEventComponent.prototype, "processInstanceGroup", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", String)
    ], ThreadEventComponent.prototype, "collaborationGroupId", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", thread_event_metadata_1.ThreadEventMetadata)
    ], ThreadEventComponent.prototype, "event", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Array)
    ], ThreadEventComponent.prototype, "history", void 0);
    __decorate([
        core_1.Output(),
        __metadata("design:type", Object)
    ], ThreadEventComponent.prototype, "processCancelled", void 0);
    ThreadEventComponent = __decorate([
        core_1.Component({
            selector: "thread-event",
            templateUrl: "./thread-event.component.html",
            styleUrls: ["./thread-event.component.css"]
        }),
        __metadata("design:paramtypes", [bp_data_service_1.BPDataService,
            bpe_service_1.BPEService])
    ], ThreadEventComponent);
    return ThreadEventComponent;
}());
exports.ThreadEventComponent = ThreadEventComponent;
//# sourceMappingURL=thread-event.component.js.map