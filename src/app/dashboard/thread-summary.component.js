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
var process_instance_group_1 = require("../bpe/model/process-instance-group");
var router_1 = require("@angular/router");
var bp_data_service_1 = require("../bpe/bp-view/bp-data-service");
var bpe_service_1 = require("../bpe/bpe.service");
var activity_variable_parser_1 = require("../bpe/bp-view/activity-variable-parser");
var moment = require("moment");
var call_status_1 = require("../common/call-status");
var ng2_cookies_1 = require("ng2-cookies");
var data_channel_service_1 = require("../data-channel/data-channel.service");
var thread_event_metadata_1 = require("../catalogue/model/publish/thread-event-metadata");
var search_context_service_1 = require("../simple-search/search-context.service");
var document_service_1 = require("../bpe/bp-view/document-service");
var evidence_supplied_1 = require("../catalogue/model/publish/evidence-supplied");
var comment_1 = require("../catalogue/model/publish/comment");
var ng_bootstrap_1 = require("@ng-bootstrap/ng-bootstrap");
var code_1 = require("../catalogue/model/publish/code");
var bp_start_event_1 = require("../catalogue/model/publish/bp-start-event");
var bpURLParams_1 = require("../catalogue/model/publish/bpURLParams");
var ubl_model_utils_1 = require("../catalogue/model/ubl-model-utils");
var utils_1 = require("../common/utils");
var constants_1 = require("../catalogue/model/constants");
/**
 * Created by suat on 12-Mar-18.
 */
var ThreadSummaryComponent = /** @class */ (function () {
    function ThreadSummaryComponent(bpeService, cookieService, dataChannelService, searchContextService, bpDataService, router, modalService, documentService) {
        this.bpeService = bpeService;
        this.cookieService = cookieService;
        this.dataChannelService = dataChannelService;
        this.searchContextService = searchContextService;
        this.bpDataService = bpDataService;
        this.router = router;
        this.modalService = modalService;
        this.documentService = documentService;
        this.threadStateUpdated = new core_1.EventEmitter();
        this.lastEventPartnerID = null;
        // History of events
        this.hasHistory = false;
        this.historyExpanded = false;
        this.ratingOverall = 0;
        this.ratingSeller = 0;
        this.ratingFulfillment = 0;
        // Utilities
        this.eventCount = 0;
        this.archiveCallStatus = new call_status_1.CallStatus();
        this.fetchCallStatus = new call_status_1.CallStatus();
        this.saveCallStatusRating = new call_status_1.CallStatus();
        this.showDataChannelButton = false;
        this.channelLink = "";
        this.compRating = {
            "QualityOfTheNegotiationProcess": 0,
            "QualityOfTheOrderingProcess": 0,
            "ResponseTime": 0,
            "ProductListingAccuracy": 0,
            "ConformanceToOtherAgreedTerms": 0,
            "DeliveryAndPackaging": 0
        };
        this.compComment = [];
        // this is always true unless an approved order is present in this process group or the collaboration is already cancelled
        this.showCancelCollaborationButton = true;
        // this is always false unless the collaboration was cancelled or fully completed (buyer side only)
        this.showRateCollaborationButton = false;
        this.expanded = false;
        this.selectPreferredValue = utils_1.selectPreferredValue;
    }
    ThreadSummaryComponent.prototype.ngOnInit = function () {
        if (this.processInstanceGroup.status == "CANCELLED") {
            this.showCancelCollaborationButton = false;
            //this.showRateCollaborationButton = true;
        }
        this.eventCount = this.processInstanceGroup.processInstanceIDs.length;
        this.hasHistory = this.eventCount > 1;
        this.fetchEvents();
    };
    ThreadSummaryComponent.prototype.toggleHistory = function () {
        this.historyExpanded = !this.historyExpanded;
    };
    ThreadSummaryComponent.prototype.openBpProcessView = function () {
        return __awaiter(this, void 0, void 0, function () {
            var userRole;
            return __generator(this, function (_a) {
                userRole = this.titleEvent.buyer ? "buyer" : "seller";
                this.bpDataService.startBp(new bp_start_event_1.BpActivityEvent(userRole, this.titleEvent.processType, this.processInstanceGroup.id, this.collaborationGroupId, [this.titleEvent].concat(this.history), null, false, false), // thread summary always shows the last step in the negotiation
                true, new bpURLParams_1.BpURLParams(this.titleEvent.product.catalogueDocumentReference.id, this.titleEvent.product.manufacturersItemIdentification.id, this.titleEvent.processId));
                return [2 /*return*/];
            });
        });
    };
    ThreadSummaryComponent.prototype.fetchEvents = function () {
        var _this = this;
        this.fetchCallStatus.submit();
        var ids = this.processInstanceGroup.processInstanceIDs;
        Promise.all(ids.map(function (id) { return _this.fetchThreadEvent(id); })).then(function (events) {
            events.sort(function (a, b) { return moment(a.startTime).diff(moment(b.startTime)); });
            events = events.reverse();
            _this.completeHistory = events;
            _this.history = events.slice(1, events.length);
            _this.lastEvent = events[0];
            // Update History in order to remove pending orders
            _this.updateHistory(_this.history);
            if (!_this.lastEvent.isRated) {
                if (_this.lastEvent.statusText == "Receipt Advice sent" || _this.lastEvent.statusText == "Transport Execution Plan received" || _this.processInstanceGroup.status == "CANCELLED") {
                    _this.showRateCollaborationButton = true;
                }
            }
            _this.computeTitleEvent();
            // update the former step field of events after sorting and other population
            events[0].formerStep = false;
            for (var i = 1; i < events.length; i++) {
                events[i].formerStep = true;
            }
            _this.fetchCallStatus.callback("Successfully fetched events.", true);
        }).catch(function (error) {
            _this.fetchCallStatus.error("Error while fetching thread.", error);
        });
    };
    /*
        For all processes except Fulfilment,
            * for the buyer,correspondent is the one who sends the response
            * for the seller, correspondent is the one who sends the request
        For Fulfilment, this is vice versa.
     */
    ThreadSummaryComponent.prototype.getCorrespondent = function (dashboardProcessInstanceDetails, userRole, processType) {
        var correspondent = null;
        if (userRole === "buyer") {
            if (processType == "Fulfilment") {
                correspondent = dashboardProcessInstanceDetails.requestCreatorUser.firstName + " " + dashboardProcessInstanceDetails.requestCreatorUser.familyName;
            }
            else if (dashboardProcessInstanceDetails.responseCreatorUser) {
                correspondent = dashboardProcessInstanceDetails.responseCreatorUser.firstName + " " + dashboardProcessInstanceDetails.responseCreatorUser.familyName;
            }
        }
        else {
            if (processType == "Fulfilment") {
                if (dashboardProcessInstanceDetails.responseCreatorUser) {
                    correspondent = dashboardProcessInstanceDetails.responseCreatorUser.firstName + " " + dashboardProcessInstanceDetails.responseCreatorUser.familyName;
                }
            }
            else {
                correspondent = dashboardProcessInstanceDetails.requestCreatorUser.firstName + " " + dashboardProcessInstanceDetails.requestCreatorUser.familyName;
            }
        }
        return correspondent;
    };
    ThreadSummaryComponent.prototype.fetchThreadEvent = function (processInstanceId) {
        return __awaiter(this, void 0, void 0, function () {
            var dashboardProcessInstanceDetails, activityVariables, processType, initialDoc, responseDocumentStatus, userRole, lastActivity, processInstance, correspondent, item, isRated, event;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.bpeService.getDashboardProcessInstanceDetails(processInstanceId)];
                    case 1:
                        dashboardProcessInstanceDetails = _a.sent();
                        activityVariables = dashboardProcessInstanceDetails.variableInstance;
                        processType = activity_variable_parser_1.ActivityVariableParser.getProcessType(activityVariables);
                        initialDoc = dashboardProcessInstanceDetails.requestDocument;
                        responseDocumentStatus = dashboardProcessInstanceDetails.responseDocumentStatus;
                        userRole = activity_variable_parser_1.ActivityVariableParser.getUserRole(processType, initialDoc, this.processInstanceGroup.partyID);
                        lastActivity = dashboardProcessInstanceDetails.lastActivityInstance;
                        processInstance = dashboardProcessInstanceDetails.processInstance;
                        correspondent = this.getCorrespondent(dashboardProcessInstanceDetails, userRole, processType);
                        if (userRole === "buyer") {
                            item = initialDoc.item;
                            this.lastEventPartnerID = ubl_model_utils_1.UBLModelUtils.getPartyId(item.manufacturerParty);
                        }
                        else {
                            this.lastEventPartnerID = initialDoc.buyerPartyId;
                        }
                        return [4 /*yield*/, this.bpeService.ratingExists(processInstanceId, this.lastEventPartnerID)];
                    case 2:
                        isRated = _a.sent();
                        event = new thread_event_metadata_1.ThreadEventMetadata(processType, processType.replace(/[_]/gi, " "), processInstanceId, moment(new Date(lastActivity["startTime"]), 'YYYY-MM-DDTHH:mm:ss.SSSZ').format("YYYY-MM-DD HH:mm:ss"), activity_variable_parser_1.ActivityVariableParser.getTradingPartnerName(initialDoc, this.cookieService.get("company_id"), processType), initialDoc.item, correspondent, this.getBPStatus(responseDocumentStatus), initialDoc, activityVariables, userRole === "buyer", isRated === "true");
                        this.fillStatus(event, processInstance["state"], processType, responseDocumentStatus, userRole === "buyer");
                        this.setCancelCollaborationButtonStatus(processType, responseDocumentStatus);
                        this.checkDataChannel(event);
                        return [2 /*return*/, event];
                }
            });
        });
    };
    ThreadSummaryComponent.prototype.navigateToSearchDetails = function () {
        var item = this.titleEvent.product;
        this.searchContextService.clearSearchContext();
        this.router.navigate(['/product-details'], {
            queryParams: {
                catalogueId: item.catalogueDocumentReference.id,
                id: item.manufacturersItemIdentification.id
            }
        });
    };
    ThreadSummaryComponent.prototype.navigateToCompanyDetails = function () {
        this.router.navigate(['/user-mgmt/company-details'], {
            queryParams: {
                id: this.lastEventPartnerID
            }
        });
    };
    ThreadSummaryComponent.prototype.updateHistory = function (events) {
        for (var _i = 0, events_1 = events; _i < events_1.length; _i++) {
            var event_1 = events_1[_i];
            if (event_1.processType == "Order" && event_1.status != "DONE" && event_1.processStatus == "Completed") {
                event_1.status = "DONE";
                if (event_1.statusText != "Order declined")
                    event_1.statusText = "Order approved";
                event_1.actionText = "See Order";
            }
        }
    };
    ThreadSummaryComponent.prototype.fillStatus = function (event, processState, processType, response, buyer) {
        event.status = this.getStatus(processState, processType, response, buyer);
        // messages if there is no response from the responder party
        if (response == null) {
            // messages for the buyer
            if (buyer) {
                switch (processType) {
                    case "Fulfilment":
                        event.statusText = "Action Required!";
                        event.actionText = "Send Receipt Advice";
                        break;
                    case "Order":
                        event.statusText = "Waiting for Order Response";
                        event.actionText = "View Request";
                        break;
                    case "Negotiation":
                        event.statusText = "Waiting for Quotation";
                        event.actionText = "View Request";
                        break;
                    case "Ppap":
                        event.statusText = "Waiting for Ppap Response";
                        event.actionText = "View Request";
                        break;
                    case "Transport_Execution_Plan":
                        event.statusText = "Waiting for Transport Execution Plan";
                        event.actionText = "View Request";
                        break;
                    case "Item_Information_Request":
                        event.statusText = 'Waiting for Information Response';
                        event.actionText = "View Request";
                }
            }
            else {
                // messages for the seller
                switch (processType) {
                    case "Fulfilment":
                        event.statusText = "Waiting for Receipt Advice";
                        event.actionText = "View Request";
                        break;
                    case "Order":
                        event.statusText = "Action Required!";
                        event.actionText = "Send Order Response";
                        break;
                    case "Negotiation":
                        event.statusText = "Action Required!";
                        event.actionText = "Send Quotation";
                        break;
                    case "Ppap":
                        event.statusText = "Action Required!";
                        event.actionText = "Send Ppap Response";
                        break;
                    case "Transport_Execution_Plan":
                        event.statusText = "Action Required!";
                        event.actionText = "Send Transport Execution Plan";
                        break;
                    case "Item_Information_Request":
                        event.statusText = "Action Required!";
                        event.actionText = 'Send Information Response';
                }
            }
            // messages if the responder party responded already
        }
        else {
            switch (processType) {
                case "Order":
                    if (response.documentStatus) {
                        if (buyer) {
                            event.statusText = "Waiting for Dispatch Advice";
                            event.actionText = "See Order";
                        }
                        else {
                            event.statusText = "Order approved";
                            event.actionText = "Send Dispatch Advice";
                        }
                    }
                    else {
                        event.statusText = "Order declined";
                        event.actionText = "See Order";
                    }
                    break;
                case "Negotiation":
                    if (buyer) {
                        if (response.documentStatus == constants_1.NEGOTIATION_RESPONSES.REJECTED) {
                            event.statusText = "Quotation rejected";
                        }
                        else if (response.documentStatus == constants_1.NEGOTIATION_RESPONSES.TERMS_UPDATED) {
                            event.statusText = "Quotation terms updated";
                        }
                        else {
                            event.statusText = "Quotation accepted";
                        }
                    }
                    else {
                        event.statusText = "Quotation sent";
                    }
                    event.actionText = "See Quotation";
                    break;
                case "Fulfilment":
                    if (buyer) {
                        event.statusText = "Receipt Advice sent";
                        //this.showRateCollaborationButton = true;
                    }
                    else {
                        event.statusText = "Receipt Advice received";
                    }
                    event.actionText = "See Receipt Advice";
                    break;
                case "Ppap":
                    if (response.documentStatus) {
                        event.statusText = "Ppap approved";
                    }
                    else {
                        event.statusText = "Ppap declined";
                    }
                    event.actionText = "See Ppap Response";
                    break;
                case "Transport_Execution_Plan":
                    if (buyer) {
                        event.statusText = "Transport Execution Plan received";
                    }
                    else {
                        event.statusText = "Transport Execution Plan sent";
                    }
                    event.actionText = "See Transport Execution Plan";
                    break;
                case "Item_Information_Request":
                    if (buyer) {
                        event.statusText = "Information Request received";
                        event.actionText = "See Information Request";
                    }
                    else {
                        event.statusText = "Information Response sent";
                        event.actionText = "See Information Response";
                    }
            }
        }
    };
    ThreadSummaryComponent.prototype.getStatus = function (processState, processType, response, buyer) {
        switch (processState) {
            case "COMPLETED":
                if (processType === "Order") {
                    return buyer ? "WAITING" : "ACTION_REQUIRED";
                }
                return "DONE";
            case "EXTERNALLY_TERMINATED":
                return "CANCELLED";
            default:
                if (response) {
                    return "WAITING";
                }
                if (buyer) {
                    return processType === "Fulfilment" ? "ACTION_REQUIRED" : "WAITING";
                }
                return processType === "Fulfilment" ? "WAITING" : "ACTION_REQUIRED";
        }
    };
    ThreadSummaryComponent.prototype.getBPStatus = function (response) {
        var bpStatus;
        if (response == null) {
            bpStatus = "Started";
        }
        else {
            bpStatus = "Completed";
        }
        return bpStatus;
    };
    ThreadSummaryComponent.prototype.computeTitleEvent = function () {
        this.titleEvent = this.lastEvent;
        // if the event is a transportation service, go through the history and check the last event that is not (if any)
        if (this.lastEvent.product.transportationServiceDetails) {
            // history ordered from new to old
            for (var i = this.history.length - 1; i >= 0; i--) {
                var event_2 = this.history[i];
                if (!event_2.product.transportationServiceDetails) {
                    // if not a transport, this is relevant, doing it in the for loop makes sure the LAST non-transport event is the relevant one.
                    this.titleEvent = event_2;
                }
            }
        }
    };
    ThreadSummaryComponent.prototype.deleteGroup = function () {
        var _this = this;
        if (confirm("Are you sure that you want to delete this business process thread?")) {
            this.archiveCallStatus.submit();
            this.bpeService.deleteProcessInstanceGroup(this.processInstanceGroup.id)
                .then(function () {
                _this.archiveCallStatus.callback('Thread deleted permanently');
                _this.threadStateUpdated.next();
            })
                .catch(function (err) {
                _this.archiveCallStatus.error('Failed to delete thread permanently', err);
            });
        }
    };
    ThreadSummaryComponent.prototype.checkDataChannel = function (event) {
        var _this = this;
        if (event.processType === 'Order') {
            this.dataChannelService.channelsForBusinessProcess(event.processId)
                .then(function (channels) {
                if (channels.length > 0) {
                    _this.showDataChannelButton = true;
                    var channelId = channels[0].channelID;
                    _this.channelLink = "/data-channel/details/" + channelId;
                }
            })
                .catch(function (err) {
                _this.showDataChannelButton = false;
            });
        }
    };
    ThreadSummaryComponent.prototype.cancelCollaboration = function () {
        var _this = this;
        if (confirm("Are you sure that you want to cancel this collaboration?")) {
            this.archiveCallStatus.submit();
            this.bpeService.cancelCollaboration(this.processInstanceGroup.id)
                .then(function () {
                _this.archiveCallStatus.callback("Cancelled collaboration successfully");
                _this.threadStateUpdated.next();
            })
                .catch(function (err) {
                _this.archiveCallStatus.error("Failed to cancel collaboration", err);
            });
        }
    };
    ThreadSummaryComponent.prototype.setCancelCollaborationButtonStatus = function (processType, response) {
        switch (processType) {
            case "Order":
                if (response && response.acceptedIndicator) {
                    // since the order is approved, do not show the button
                    this.showCancelCollaborationButton = false;
                }
                break;
            case "Transport_Execution_Plan":
                if (response && response.acceptedIndicator == "Accepted") {
                    this.showCancelCollaborationButton = false;
                }
        }
    };
    ThreadSummaryComponent.prototype.rateCollaboration = function (success, cancel) {
        if (this.processInstanceGroup.status == "CANCELLED") {
            this.rateCollaborationCancelled(cancel);
        }
        else {
            this.rateCollaborationSuccess(success);
        }
    };
    ThreadSummaryComponent.prototype.changeCommunicationRating = function () {
        this.ratingSeller = (this.compRating.QualityOfTheNegotiationProcess + this.compRating.QualityOfTheOrderingProcess + this.compRating.ResponseTime) / 3;
        this.ratingOverall = (this.ratingSeller + this.ratingFulfillment + this.compRating.DeliveryAndPackaging) / 3;
    };
    ThreadSummaryComponent.prototype.changeFullfillmentRating = function () {
        this.ratingFulfillment = (this.compRating.ProductListingAccuracy + this.compRating.ConformanceToOtherAgreedTerms) / 2;
        this.ratingOverall = (this.ratingSeller + this.ratingFulfillment + this.compRating.DeliveryAndPackaging) / 3;
    };
    ThreadSummaryComponent.prototype.changeDeliveryRating = function () {
        this.ratingOverall = (this.ratingSeller + this.ratingFulfillment + this.compRating.DeliveryAndPackaging) / 3;
    };
    ThreadSummaryComponent.prototype.rateCollaborationSuccess = function (content) {
        this.compRating = {
            "QualityOfTheNegotiationProcess": 0,
            "QualityOfTheOrderingProcess": 0,
            "ResponseTime": 0,
            "ProductListingAccuracy": 0,
            "ConformanceToOtherAgreedTerms": 0,
            "DeliveryAndPackaging": 0
        };
        this.ratingOverall = 0;
        this.ratingSeller = 0;
        this.ratingFulfillment = 0;
        this.compComment = "";
        this.modalService.open(content);
    };
    ThreadSummaryComponent.prototype.rateCollaborationCancelled = function (content) {
        this.compComment = "";
        this.modalService.open(content);
    };
    ThreadSummaryComponent.prototype.onSaveSuccessRating = function (close) {
        var _this = this;
        var ratings = [];
        var reviews = [];
        for (var key in this.compRating) {
            var evidence = new evidence_supplied_1.EvidenceSupplied(key, this.compRating[key]);
            ratings.push(evidence);
        }
        var comm = new comment_1.Comment(this.compComment, new code_1.Code("", "", "", "", ""));
        reviews.push(comm);
        this.saveCallStatusRating.submit();
        this.bpeService
            .postRatings(this.lastEventPartnerID, this.lastEvent.processId, ratings, reviews)
            .then(function () {
            _this.saveCallStatusRating.callback("Rating saved", true);
            close();
            _this.showRateCollaborationButton = false;
            _this.fetchEvents();
        })
            .catch(function (error) {
            _this.saveCallStatusRating.error("Error while saving rating", error);
        });
    };
    ThreadSummaryComponent.prototype.onSaveCancelRating = function (close) {
        var _this = this;
        var ratings = [];
        var reviews = [];
        var comm = new comment_1.Comment("", new code_1.Code(this.compComment, "", "", "", ""));
        reviews.push(comm);
        this.saveCallStatusRating.submit();
        this.bpeService
            .postRatings(this.lastEventPartnerID, this.lastEvent.processId, ratings, reviews)
            .then(function () {
            _this.saveCallStatusRating.callback("Rating saved", true);
            close();
            _this.showRateCollaborationButton = false;
            _this.fetchEvents();
        })
            .catch(function (error) {
            _this.saveCallStatusRating.error("Error while saving rating", error);
        });
    };
    ThreadSummaryComponent.prototype.checkCompRating = function () {
        var filled = true;
        for (var key in this.compRating) {
            if (this.compRating[key] == 0)
                filled = false;
        }
        return !filled;
    };
    ThreadSummaryComponent.prototype.checkCompComment = function () {
        return this.compComment == "";
    };
    __decorate([
        core_1.Input(),
        __metadata("design:type", process_instance_group_1.ProcessInstanceGroup)
    ], ThreadSummaryComponent.prototype, "processInstanceGroup", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", String)
    ], ThreadSummaryComponent.prototype, "collaborationGroupId", void 0);
    __decorate([
        core_1.Output(),
        __metadata("design:type", Object)
    ], ThreadSummaryComponent.prototype, "threadStateUpdated", void 0);
    ThreadSummaryComponent = __decorate([
        core_1.Component({
            selector: 'thread-summary',
            templateUrl: './thread-summary.component.html',
            styleUrls: ['./thread-summary.component.css']
        }),
        __metadata("design:paramtypes", [bpe_service_1.BPEService,
            ng2_cookies_1.CookieService,
            data_channel_service_1.DataChannelService,
            search_context_service_1.SearchContextService,
            bp_data_service_1.BPDataService,
            router_1.Router,
            ng_bootstrap_1.NgbModal,
            document_service_1.DocumentService])
    ], ThreadSummaryComponent);
    return ThreadSummaryComponent;
}());
exports.ThreadSummaryComponent = ThreadSummaryComponent;
//# sourceMappingURL=thread-summary.component.js.map