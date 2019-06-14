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
var router_1 = require("@angular/router");
var call_status_1 = require("../../common/call-status");
var catalogue_service_1 = require("../../catalogue/catalogue.service");
var bp_data_service_1 = require("./bp-data-service");
var product_wrapper_1 = require("../../common/product-wrapper");
var utils_1 = require("../../common/utils");
var user_service_1 = require("../../user-mgmt/user.service");
var bpe_service_1 = require("../bpe.service");
var search_context_service_1 = require("../../simple-search/search-context.service");
var ng2_cookies_1 = require("ng2-cookies");
var ng_bootstrap_1 = require("@ng-bootstrap/ng-bootstrap");
var myGlobals = require("../../globals");
var http_1 = require("@angular/http");
var platform_browser_1 = require("@angular/platform-browser");
/**
 * Created by suat on 20-Oct-17.
 */
var ProductBpOptionsComponent = /** @class */ (function () {
    function ProductBpOptionsComponent(bpDataService, sanitizer, catalogueService, searchContextService, userService, bpeService, route, cookieService, renderer, http, modalService) {
        this.bpDataService = bpDataService;
        this.sanitizer = sanitizer;
        this.catalogueService = catalogueService;
        this.searchContextService = searchContextService;
        this.userService = userService;
        this.bpeService = bpeService;
        this.route = route;
        this.cookieService = cookieService;
        this.renderer = renderer;
        this.http = http;
        this.modalService = modalService;
        this.callStatus = new call_status_1.CallStatus();
        this.productExpanded = false;
        this.serviceExpanded = false;
        this.config = myGlobals.config;
        this.identityEndpoint = myGlobals.user_mgmt_endpoint;
        this.chatURL = this.sanitizer.bypassSecurityTrustResourceUrl(myGlobals.rocketChatEndpoint);
        this.channelName = "";
        this.renderer.setStyle(document.body, "background-image", "none");
    }
    /**
     * This function will create a separate chat channel for business negotiations
     * @param content
     */
    ProductBpOptionsComponent.prototype.open = function (content) {
        var _this = this;
        var createChannelRequest = {
            userId: this.cookieService.get("rocket_chat_userID"),
            userToken: this.cookieService.get("rocket_chat_token"),
            initiatingPartyID: this.cookieService.get("company_id"),
            respondingPartyID: this.bpDataService.getCompanySettings().companyID,
            productName: this.line.goodsItem.item.name[0].value
        };
        var headers = new http_1.Headers({ 'Content-Type': 'application/json' });
        var url = this.identityEndpoint + "/chat/createChannel";
        this.http
            .post(url, JSON.stringify(createChannelRequest), { headers: headers })
            .toPromise()
            .then(function (res) {
            var channelDetails = res.json();
            _this.channelName = channelDetails.channelName;
            _this.chatURL = _this.sanitizer.bypassSecurityTrustResourceUrl(myGlobals.rocketChatEndpoint + "/channel/" + channelDetails.channelName);
            _this.modalService.open(content, {});
        })
            .catch(function (e) {
            alert("Error occurred while creating the channel. Please try again later");
        });
    };
    ProductBpOptionsComponent.prototype.ngOnInit = function () {
        var _this = this;
        // get copy of ThreadEventMetadata of the current business process
        if (this.bpDataService.bpActivityEvent.processHistory.length > 0) {
            this.processMetadata = this.bpDataService.bpActivityEvent.processHistory[0];
        }
        this.bpActivityEventSubs = this.bpDataService.bpActivityEventObservable.subscribe(function (bpActivityEvent) {
            if (bpActivityEvent) {
                if (_this.bpDataService.bpActivityEvent.newProcess) {
                    _this.processMetadata = null;
                }
                _this.processType = bpActivityEvent.processType;
                _this.currentStep = _this.getCurrentStep(bpActivityEvent.processType);
                _this.stepsDisplayMode = _this.getStepsDisplayMode();
            }
        });
        this.route.queryParams.subscribe(function (params) {
            var id = params["id"];
            var catalogueId = params["catalogueId"];
            _this.bpDataService.precedingProcessId = params["pid"];
            if (_this.id !== id || _this.catalogueId !== catalogueId) {
                _this.id = id;
                _this.catalogueId = catalogueId;
                _this.callStatus.submit();
                var userId = _this.cookieService.get("user_id");
                Promise.all([
                    _this.catalogueService.getCatalogueLine(catalogueId, id),
                    _this.getOriginalOrder(),
                    _this.userService.getSettingsForUser(userId)
                ]).then(function (_a) {
                    var line = _a[0], order = _a[1], ownCompanySettings = _a[2];
                    _this.line = line;
                    _this.originalOrder = order;
                    _this.bpDataService.productOrder = order;
                    _this.bpDataService.currentUserSettings = ownCompanySettings;
                    return Promise.all([
                        _this.getReferencedCatalogueLine(line, order),
                        _this.userService.getSettingsForProduct(line)
                    ]);
                })
                    .then(function (_a) {
                    var referencedLine = _a[0], settings = _a[1];
                    // set the product line to be the first fetched line, either service or product.
                    _this.bpDataService.setCatalogueLines([_this.line], [settings]);
                    _this.bpDataService.computeWorkflowOptions();
                    // there is an order that references another product -> the line is a service and the referencedLine is the original product
                    if (referencedLine) {
                        _this.serviceLine = _this.line;
                        _this.serviceWrapper = new product_wrapper_1.ProductWrapper(_this.serviceLine, settings.negotiationSettings);
                        _this.serviceSettings = settings;
                        _this.line = referencedLine;
                        return _this.userService.getSettingsForProduct(referencedLine);
                    }
                    _this.initWithCatalogueLine(_this.line, settings);
                    return null;
                })
                    .then(function (settings) {
                    if (settings) {
                        _this.initWithCatalogueLine(_this.line, settings);
                    }
                    _this.callStatus.callback("Retrieved product details", true);
                })
                    .catch(function (error) {
                    _this.callStatus.error("Failed to retrieve product details", error);
                });
            }
        });
    };
    ProductBpOptionsComponent.prototype.ngOnDestroy = function () {
        this.bpActivityEventSubs.unsubscribe();
        this.renderer.setStyle(document.body, "background-image", "url('assets/bg_global.jpg')");
    };
    ProductBpOptionsComponent.prototype.getStepsStatus = function () {
        return this.processMetadata ? this.processMetadata.status : "OPEN";
    };
    ProductBpOptionsComponent.prototype.getStepsStatusText = function () {
        if (this.processMetadata) {
            return this.processMetadata.statusText;
        }
        return "";
    };
    ProductBpOptionsComponent.prototype.isReadOnly = function () {
        return !(this.processMetadata && this.processMetadata.isBeingUpdated) || this.bpDataService.bpActivityEvent.processType == 'Fulfilment' || this.bpDataService.bpActivityEvent.processType == 'Transport_Execution_Plan';
    };
    ProductBpOptionsComponent.prototype.onToggleProductExpanded = function () {
        this.productExpanded = !this.productExpanded;
        this.serviceExpanded = false;
    };
    ProductBpOptionsComponent.prototype.onToggleServiceExpanded = function () {
        this.serviceExpanded = !this.serviceExpanded;
        this.productExpanded = false;
    };
    ProductBpOptionsComponent.prototype.isOrderDone = function () {
        return (this.processType === "Order" || this.processType === "Transport_Execution_Plan")
            && this.processMetadata
            && this.processMetadata.processStatus === "Completed";
    };
    ProductBpOptionsComponent.prototype.getOriginalOrder = function () {
        if (this.bpDataService.bpActivityEvent.userRole === "seller") {
            return Promise.resolve(null);
        }
        if (this.searchContextService.getAssociatedProcessMetadata()) {
            var processId = this.searchContextService.getAssociatedProcessMetadata().processId;
            return this.bpeService.getOriginalOrderForProcess(processId);
        }
        if (this.processMetadata) {
            var processId = this.processMetadata.processId;
            return this.bpeService.getOriginalOrderForProcess(processId);
        }
        return Promise.resolve(null);
    };
    ProductBpOptionsComponent.prototype.initWithCatalogueLine = function (line, settings) {
        this.wrapper = new product_wrapper_1.ProductWrapper(line, settings.negotiationSettings);
        this.settings = settings;
        this.options = this.bpDataService.bpActivityEvent.workflowOptions;
        if (this.processType) {
            this.currentStep = this.getCurrentStep(this.processType);
        }
        this.stepsDisplayMode = this.getStepsDisplayMode();
    };
    ProductBpOptionsComponent.prototype.getCurrentStep = function (processType) {
        switch (processType) {
            case "Item_Information_Request":
                if (this.isTransportService()) {
                    return "Transport_Information_Request";
                }
                else {
                    return "Item_Information_Request";
                }
            case "Ppap":
                return "Ppap";
            case "Negotiation":
                if (this.isTransportService()) {
                    return "Transport_Negotiation";
                }
                else {
                    return "Negotiation";
                }
            case "Fulfilment":
                return "Fulfilment";
            case "Transport_Execution_Plan":
                return this.isOrderDone() ? "Transport_Order_Confirmed" : "Transport_Order";
            case "Order":
                if (this.isTransportService()) {
                    return this.isOrderDone() ? "Transport_Order_Confirmed" : "Transport_Order";
                }
                else {
                    return this.isOrderDone() ? "Order_Confirmed" : "Order";
                }
        }
    };
    ProductBpOptionsComponent.prototype.isTransportService = function () {
        return !!this.serviceLine || utils_1.isTransportService(this.line);
    };
    ProductBpOptionsComponent.prototype.isLogisticsService = function () {
        return !!this.serviceLine || utils_1.isLogisticsService(this.line);
    };
    ProductBpOptionsComponent.prototype.getStepsDisplayMode = function () {
        if (this.isTransportService()) {
            if (this.bpDataService.bpActivityEvent.processType == 'Transport_Execution_Plan' && this.bpDataService.bpActivityEvent.userRole === "seller") {
                // The service provider only sees transport steps
                return "Transport";
            }
            else if (!this.originalOrder) {
                // No original order: this is just a transport order without previous order from the customer
                return "Transport";
            }
            else {
                return "Transport_After_Order";
            }
        }
        else {
            if (this.isLogisticsService()) {
                return "Logistics";
            }
            if (this.bpDataService.bpActivityEvent.userRole === "seller") {
                return "Order_Before_Transport";
            }
            else {
                return "Order";
            }
        }
    };
    ProductBpOptionsComponent.prototype.getReferencedCatalogueLine = function (line, order) {
        if (!this.hasReferencedCatalogueLine(line, order)) {
            return Promise.resolve(null);
        }
        var item = order.orderLine[0].lineItem.item;
        var catalogueId = item.catalogueDocumentReference.id;
        var lineId = item.manufacturersItemIdentification.id;
        return this.catalogueService.getCatalogueLine(catalogueId, lineId);
    };
    ProductBpOptionsComponent.prototype.hasReferencedCatalogueLine = function (line, order) {
        if (!order) {
            return false;
        }
        var orderItem = order.orderLine[0].lineItem.item;
        var orderCatalogueId = orderItem.catalogueDocumentReference.id;
        var orderLineId = orderItem.manufacturersItemIdentification.id;
        var item = line.goodsItem.item;
        var catalogueId = item.catalogueDocumentReference.id;
        var lineId = item.manufacturersItemIdentification.id;
        return orderCatalogueId !== catalogueId || orderLineId !== lineId;
    };
    ProductBpOptionsComponent = __decorate([
        core_1.Component({
            selector: "product-bp-options",
            templateUrl: "./product-bp-options.component.html",
            styleUrls: ["./product-bp-options.component.css"]
        }),
        __metadata("design:paramtypes", [bp_data_service_1.BPDataService,
            platform_browser_1.DomSanitizer,
            catalogue_service_1.CatalogueService,
            search_context_service_1.SearchContextService,
            user_service_1.UserService,
            bpe_service_1.BPEService,
            router_1.ActivatedRoute,
            ng2_cookies_1.CookieService,
            core_1.Renderer2,
            http_1.Http,
            ng_bootstrap_1.NgbModal])
    ], ProductBpOptionsComponent);
    return ProductBpOptionsComponent;
}());
exports.ProductBpOptionsComponent = ProductBpOptionsComponent;
//# sourceMappingURL=product-bp-options.component.js.map