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
var catalogue_service_1 = require("../catalogue/catalogue.service");
var call_status_1 = require("../common/call-status");
var bp_data_service_1 = require("../bpe/bp-view/bp-data-service");
var bp_workflow_options_1 = require("../bpe/model/bp-workflow-options");
var product_wrapper_1 = require("../common/product-wrapper");
var utils_1 = require("../common/utils");
var app_component_1 = require("../app.component");
var user_service_1 = require("../user-mgmt/user.service");
var quantity_1 = require("../catalogue/model/publish/quantity");
var discount_modal_component_1 = require("./discount-modal.component");
var bp_start_event_1 = require("../catalogue/model/publish/bp-start-event");
var bpURLParams_1 = require("../catalogue/model/publish/bpURLParams");
var ng2_cookies_1 = require("ng2-cookies");
var constants_1 = require("../catalogue/model/constants");
var myGlobals = require("../globals");
var discount_price_wrapper_1 = require("../common/discount-price-wrapper");
var document_service_1 = require("../bpe/bp-view/document-service");
var bpe_service_1 = require("../bpe/bpe.service");
var ubl_model_utils_1 = require("../catalogue/model/ubl-model-utils");
var quotation_wrapper_1 = require("../bpe/bp-view/negotiation/quotation-wrapper");
var ProductDetailsComponent = /** @class */ (function () {
    function ProductDetailsComponent(bpeService, bpDataService, catalogueService, documentService, userService, route, cookieService, appComponent) {
        this.bpeService = bpeService;
        this.bpDataService = bpDataService;
        this.catalogueService = catalogueService;
        this.documentService = documentService;
        this.userService = userService;
        this.route = route;
        this.cookieService = cookieService;
        this.appComponent = appComponent;
        // the first two call status are just to control the enabled/disabled status of quantity input
        // we need initCheckgetProductStatus since getProductStatus is updated by the view based on user actions
        this.initCheckGetFrameContractStatus = new call_status_1.CallStatus();
        this.initCheckGetProductStatus = new call_status_1.CallStatus();
        this.getProductStatus = new call_status_1.CallStatus();
        this.favouriteItemIds = [];
        this.options = new bp_workflow_options_1.BpWorkflowOptions();
        this.tabToOpen = "";
        this.isLogistics = false;
        this.isTransportService = false;
        this.config = myGlobals.config;
        this.termsSelectBoxValue = 'product_defaults';
        this.addFavoriteCategoryStatus = new call_status_1.CallStatus();
        this.callStatus = new call_status_1.CallStatus();
        this.selectPreferredValue = utils_1.selectPreferredValue;
    }
    ProductDetailsComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.bpDataService.setCatalogueLines([], []);
        this.route.queryParams.subscribe(function (params) {
            var id = params['id'];
            var catalogueId = params['catalogueId'];
            _this.tabToOpen = params['tabToOpen'];
            if (id !== _this.id || catalogueId !== _this.catalogueId) {
                _this.id = id;
                _this.catalogueId = catalogueId;
                _this.getProductStatus.submit();
                _this.initCheckGetFrameContractStatus.submit();
                _this.initCheckGetProductStatus.submit();
                _this.catalogueService.getCatalogueLine(catalogueId, id)
                    .then(function (line) {
                    _this.line = line;
                    _this.item = line.goodsItem.item;
                    _this.isLogistics = utils_1.isLogisticsService(_this.line);
                    _this.isTransportService = utils_1.isTransportService(_this.line);
                    // check frame contract for the current line
                    _this.bpeService.getFrameContract(ubl_model_utils_1.UBLModelUtils.getPartyId(_this.line.goodsItem.item.manufacturerParty), _this.cookieService.get("company_id"), _this.line.id).then(function (contract) {
                        // contract exists, get the corresponding quotation including the terms
                        _this.documentService.getDocumentJsonContent(contract.quotationReference.id).then(function (document) {
                            _this.frameContract = contract;
                            _this.frameContractQuotationWrapper = new quotation_wrapper_1.QuotationWrapper(document, _this.line);
                            // quotation ordered quantity contains the actual ordered quantity in that business process,
                            // so we overwrite it with the options's quantity, which is by default 1
                            _this.frameContractQuotationWrapper.orderedQuantity.value = _this.options.quantity;
                            _this.initCheckGetFrameContractStatus.callback(null, true);
                        }).catch(function (error) {
                            _this.initCheckGetFrameContractStatus.callback(null, true);
                        });
                    }).catch(function (error) {
                        _this.initCheckGetFrameContractStatus.callback(null, true);
                    });
                    return _this.userService.getSettingsForProduct(line);
                })
                    .then(function (settings) {
                    _this.settings = settings;
                    _this.priceWrapper = new discount_price_wrapper_1.DiscountPriceWrapper(_this.line.requiredItemLocationQuantity.price, _this.line.requiredItemLocationQuantity.price, _this.line.requiredItemLocationQuantity.applicableTaxCategory[0].percent, new quantity_1.Quantity(1, _this.line.requiredItemLocationQuantity.price.baseQuantity.unitCode), _this.line.priceOption, [], _this.line.goodsItem.deliveryTerms.incoterms, settings.negotiationSettings.paymentMeans[0], _this.line.goodsItem.deliveryTerms.estimatedDeliveryPeriod.durationMeasure);
                    _this.productWrapper = new product_wrapper_1.ProductWrapper(_this.line, settings.negotiationSettings, _this.priceWrapper.orderedQuantity);
                    _this.bpDataService.setCatalogueLines([_this.line], [settings]);
                    // we have to set bpActivityEvent.workflowOptions here
                    // in BPDataService,chooseFirstValuesOfItemProperties method, we use this workflowOptions to select values of the properties correctly
                    _this.bpDataService.bpActivityEvent.workflowOptions = _this.options;
                    _this.getProductStatus.callback("Retrieved product details", true);
                    _this.initCheckGetProductStatus.error(null);
                })
                    .catch(function (error) {
                    _this.line = null;
                    _this.productWrapper = null;
                    _this.getProductStatus.error("Failed to retrieve product details", error);
                    _this.initCheckGetProductStatus.error(null);
                });
            }
        });
        // load favourite item ids for the person
        var userId = this.cookieService.get("user_id");
        this.callStatus.submit();
        this.userService.getPerson(userId)
            .then(function (person) {
            _this.callStatus.callback("Successfully loaded user profile", true);
            _this.favouriteItemIds = person.favouriteProductID;
        })
            .catch(function (error) {
            _this.callStatus.error("Invalid credentials", error);
        });
    };
    /*
     * Event Handlers
     */
    ProductDetailsComponent.prototype.onNegotiate = function (termsSource) {
        this.navigateToBusinessProcess("Negotiation", termsSource);
    };
    ProductDetailsComponent.prototype.onRequestInformation = function () {
        this.navigateToBusinessProcess("Item_Information_Request");
    };
    ProductDetailsComponent.prototype.onStartPpap = function () {
        this.navigateToBusinessProcess("Ppap");
    };
    ProductDetailsComponent.prototype.navigateToBusinessProcess = function (targetProcess, termsSource) {
        if (termsSource === void 0) { termsSource = 'product_defaults'; }
        this.bpDataService.startBp(new bp_start_event_1.BpActivityEvent('buyer', targetProcess, null, this.bpDataService.bpActivityEvent.collaborationGroupId, [], this.options, true, // this is a new process
        false), // there is no subsequent process as this is a new process
        false, new bpURLParams_1.BpURLParams(this.catalogueId, this.id, null, termsSource));
    };
    ProductDetailsComponent.prototype.onOrderQuantityKeyPressed = function (event) {
        var charCode = (event.which) ? event.which : event.keyCode;
        if (charCode > 31 && (charCode < 48 || charCode > 57)) {
            return false;
        }
        return true;
    };
    ProductDetailsComponent.prototype.onOrderQuantityChange = function () {
        var _this = this;
        this.priceWrapper.orderedQuantity.value = this.options.quantity;
        if (this.frameContractQuotationWrapper != null) {
            this.frameContractQuotationWrapper.orderedQuantity.value = this.options.quantity;
        }
        // quantity change must be activated in the next iteration of execution
        // otherwise, the update discount method will use the old value of the quantity
        setTimeout((function () {
            //this.priceWrapper.itemPrice.value = this.priceWrapper.pricePerItem;
            _this.onTermsChange(_this.termsSelectBoxValue);
        }), 0);
    };
    ProductDetailsComponent.prototype.onTermsChange = function (event) {
        this.termsSelectBoxValue = event;
        // update price wrapper with user selections
        // copy the selected specific item properties into the price wrapper so that the discounts can be calculated based on the selections
        var copyItem = JSON.parse(JSON.stringify(this.item));
        this.bpDataService.selectFirstValuesAmongAlternatives(copyItem);
        this.priceWrapper.additionalItemProperties = copyItem.additionalItemProperty;
        if (event == 'product_defaults') {
            this.priceWrapper.itemPrice.value = this.priceWrapper.discountedPricePerItem;
        }
    };
    /*
     * Getters For Template
     */
    ProductDetailsComponent.prototype.getPricePerItem = function () {
        return this.priceWrapper.discountedPricePerItemString;
    };
    ProductDetailsComponent.prototype.hasPrice = function () {
        return this.priceWrapper.hasPrice();
    };
    ProductDetailsComponent.prototype.getMaximumQuantity = function () {
        return utils_1.getMaximumQuantityForPrice(this.priceWrapper.price);
    };
    ProductDetailsComponent.prototype.getSteps = function () {
        return utils_1.getStepForPrice(this.priceWrapper.price);
    };
    ProductDetailsComponent.prototype.getQuantityUnit = function () {
        if (!this.line) {
            return "";
        }
        return this.line.requiredItemLocationQuantity.price.baseQuantity.unitCode || "";
    };
    ProductDetailsComponent.prototype.isPpapAvailable = function () {
        return this.settings && !!this.settings.tradeDetails.ppapCompatibilityLevel;
    };
    ProductDetailsComponent.prototype.openDiscountModal = function () {
        this.discountModal.open(this.priceWrapper.appliedDiscounts, this.priceWrapper.price.priceAmount.currencyID);
    };
    ProductDetailsComponent.prototype.removeFavorites = function (item) {
        var _this = this;
        if (!this.addFavoriteCategoryStatus.isLoading()) {
            var itemidList = [];
            itemidList.push(item.hjid.toString());
            this.addFavoriteCategoryStatus.submit();
            this.userService.putUserFavourite(itemidList, constants_1.FAVOURITE_LINEITEM_PUT_OPTIONS[0].value).then(function (res) {
                var prefCats_tmp = [];
                var index = _this.favouriteItemIds.indexOf(item.hjid.toString());
                if (index !== -1) {
                    _this.favouriteItemIds.splice(index, 1);
                }
                _this.findPrefItem(item.hjid);
                _this.addFavoriteCategoryStatus.callback("Category removed from favorites", true);
            })
                .catch(function (error) {
                _this.addFavoriteCategoryStatus.error("Error while removing category from favorites", error);
            });
        }
    };
    ProductDetailsComponent.prototype.addFavorites = function (item) {
        var _this = this;
        if (!this.addFavoriteCategoryStatus.isLoading()) {
            var itemidList = [];
            itemidList.push(item.hjid.toString());
            this.addFavoriteCategoryStatus.submit();
            this.userService.putUserFavourite(itemidList, constants_1.FAVOURITE_LINEITEM_PUT_OPTIONS[0].value).then(function (res) {
                var prefCats_tmp = [];
                var index = _this.favouriteItemIds.indexOf(item.hjid.toString());
                if (index == -1) {
                    _this.favouriteItemIds.push(item.hjid.toString());
                }
                _this.findPrefItem(item.hjid);
                _this.addFavoriteCategoryStatus.callback("Category removed from favorites", true);
            })
                .catch(function (error) {
                _this.addFavoriteCategoryStatus.error("Error while removing category from favorites", error);
            });
        }
    };
    ProductDetailsComponent.prototype.findPrefItem = function (itemId) {
        var found = false;
        found = (this.favouriteItemIds.indexOf(itemId.toString()) !== -1) ? true : false;
        return found;
    };
    ProductDetailsComponent.prototype.setTab = function (data) {
        if (data) {
            this.tabToOpen = "COMPANY";
        }
        else {
            this.tabToOpen = null;
        }
    };
    __decorate([
        core_1.ViewChild(discount_modal_component_1.DiscountModalComponent),
        __metadata("design:type", discount_modal_component_1.DiscountModalComponent)
    ], ProductDetailsComponent.prototype, "discountModal", void 0);
    ProductDetailsComponent = __decorate([
        core_1.Component({
            selector: 'product-details',
            templateUrl: './product-details.component.html',
            styleUrls: ['./product-details.component.css']
        }),
        __metadata("design:paramtypes", [bpe_service_1.BPEService,
            bp_data_service_1.BPDataService,
            catalogue_service_1.CatalogueService,
            document_service_1.DocumentService,
            user_service_1.UserService,
            router_1.ActivatedRoute,
            ng2_cookies_1.CookieService,
            app_component_1.AppComponent])
    ], ProductDetailsComponent);
    return ProductDetailsComponent;
}());
exports.ProductDetailsComponent = ProductDetailsComponent;
//# sourceMappingURL=product-details.component.js.map