"use strict";
var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
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
var app_component_1 = require("../app.component");
var ng2_cookies_1 = require("ng2-cookies");
var bpe_service_1 = require("../bpe/bpe.service");
var user_service_1 = require("../user-mgmt/user.service");
var router_1 = require("@angular/router");
var constants_1 = require("./constants");
var process_instance_group_filter_1 = require("../bpe/model/process-instance-group-filter");
var call_status_1 = require("../common/call-status");
var dashboard_orders_query_1 = require("./model/dashboard-orders-query");
var dashboard_orders_query_results_1 = require("./model/dashboard-orders-query-results");
var dashboard_query_parameters_1 = require("./model/dashboard-query-parameters");
var dashboard_user_1 = require("./model/dashboard-user");
var myGlobals = require("../globals");
var DashboardThreadedComponent = /** @class */ (function () {
    function DashboardThreadedComponent(cookieService, bpeService, userService, router, route, appComponent) {
        this.cookieService = cookieService;
        this.bpeService = bpeService;
        this.userService = userService;
        this.router = router;
        this.route = route;
        this.appComponent = appComponent;
        this.modifiedFilterSet = new process_instance_group_filter_1.ProcessInstanceGroupFilter();
        this.filterQueryStatus = new call_status_1.CallStatus();
        this.queryParameters = new dashboard_query_parameters_1.DashboardQueryParameters();
        this.query = new dashboard_orders_query_1.DashboardOrdersQuery();
        this.results = new dashboard_orders_query_results_1.DashboardOrdersQueryResults();
        this.queryStatus = new call_status_1.CallStatus();
        this.TABS = constants_1.TABS;
        this.buyerCounter = 0;
        this.sellerCounter = 0;
        // this contains status-name-defaultName information of collaboration groups
        // if status is true, that means we are changing collaboration group name
        // defaultName is used if the collaboration group does not have any name assigned.
        this.updatingCollaborationGroupName = [];
        this.config = myGlobals.config;
    }
    DashboardThreadedComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.computeUserFromCookies();
        this.getTabCounters();
        this.route.queryParams.subscribe(function (params) { return _this.updateStateFromQueryParameters(params); });
    };
    /*
     * Handlers called from the template.
     */
    DashboardThreadedComponent.prototype.onChangeTab = function (event) {
        event.preventDefault();
        this.updateQueryParameters({ tab: event.target.id });
    };
    DashboardThreadedComponent.prototype.onCloseWelcomeTab = function (event) {
        var _this = this;
        event.preventDefault();
        event.stopImmediatePropagation();
        this.user.showWelcomeTab = false;
        this.userService.setWelcomeFlag(false)
            .then(function (res) {
            _this.cookieService.set("show_welcome", "false");
        });
        if (this.queryParameters.tab === constants_1.TABS.WELCOME) {
            if (this.appComponent.checkRoles('purchases'))
                this.updateQueryParameters({ tab: constants_1.TABS.PURCHASES });
            else if (this.appComponent.checkRoles('sales'))
                this.updateQueryParameters({ tab: constants_1.TABS.SALES });
            else
                this.updateQueryParameters({ tab: constants_1.TABS.CATALOGUE });
        }
    };
    DashboardThreadedComponent.prototype.onToggleArchived = function () {
        this.updateQueryParameters({ arch: !this.queryParameters.arch });
    };
    DashboardThreadedComponent.prototype.onPageChange = function () {
        this.updateQueryParameters({ pg: this.query.page });
    };
    DashboardThreadedComponent.prototype.onFilterChange = function () {
        this.updateQueryParameters({
            prd: this.toString(this.modifiedFilterSet.relatedProducts),
            cat: this.toString(this.modifiedFilterSet.relatedProductCategories),
            sts: this.toString(this.modifiedFilterSet.status),
            prt: this.getSelectedPartners(this.modifiedFilterSet),
        });
    };
    DashboardThreadedComponent.prototype.onOrderRemovedFromView = function () {
        this.filterSet = null;
        if (this.results.resultCount === 1 && this.query.page > 1) {
            this.updateQueryParameters({ pg: this.queryParameters.pg - 1 });
        }
        else {
            this.updateStateFromQueryParameters(this.queryParameters);
        }
        this.getTabCounters();
    };
    /*
     * Getters for the template
     */
    DashboardThreadedComponent.prototype.isToggleArchivedButtonEnabled = function () {
        return this.query.archived || this.results.hasArchivedOrders;
    };
    DashboardThreadedComponent.prototype.getToggleArchivedButtonText = function () {
        if (!this.isToggleArchivedButtonEnabled()) {
            return "No Archived Orders";
        }
        return this.query.archived ? "Back" : "Show Archived";
    };
    /*
     * Internal methods.
     */
    DashboardThreadedComponent.prototype.toString = function (filters) {
        return filters.join("_SEP_");
    };
    DashboardThreadedComponent.prototype.getSelectedPartners = function (filter) {
        var _this = this;
        return filter.tradingPartnerNames.map(function (name) {
            // get the index in the original filter set
            var index = _this.filterSet.tradingPartnerNames.indexOf(name);
            // get the ID corresponding to the index
            return _this.filterSet.tradingPartnerIDs[index];
        }).join("_SEP_");
    };
    /**
     * Sets the parameters in the URL, this in turns triggers `this.updateStateFromQueryParameters(params)`.
     *
     * @param params the updated parameters
     */
    DashboardThreadedComponent.prototype.updateQueryParameters = function (params) {
        var queryParams = __assign({}, this.queryParameters, params);
        this.router.navigate(["dashboard"], { queryParams: queryParams });
    };
    DashboardThreadedComponent.prototype.computeUserFromCookies = function () {
        this.user = new dashboard_user_1.DashboardUser(this.cookieService.get("user_fullname") || "");
        if (this.cookieService.get("user_id") && this.cookieService.get("company_id")) {
            this.user.hasCompany = this.cookieService.get("company_id") !== "null";
        }
        else {
            this.appComponent.checkLogin("/user-mgmt/login");
        }
        if (this.cookieService.get("bearer_token")) {
            var at = this.cookieService.get("bearer_token");
            if (at.split(".").length == 3) {
                var at_payload = at.split(".")[1];
                try {
                    var at_payload_json = JSON.parse(atob(at_payload));
                    var at_payload_json_roles = at_payload_json["realm_access"]["roles"];
                    this.user.roles = at_payload_json_roles;
                }
                catch (e) { }
            }
        }
        this.user.showWelcomeTab = this.cookieService.get("show_welcome") === "true";
    };
    DashboardThreadedComponent.prototype.getTabCounters = function () {
        var _this = this;
        this.buyerCounter = 0;
        this.sellerCounter = 0;
        this.bpeService
            .getActionRequiredCounter(this.cookieService.get("company_id"))
            .then(function (response) {
            _this.buyerCounter = parseInt(response.buyer);
            _this.sellerCounter = parseInt(response.seller);
        });
    };
    DashboardThreadedComponent.prototype.updateStateFromQueryParameters = function (params) {
        this.queryParameters = new dashboard_query_parameters_1.DashboardQueryParameters(this.sanitizeTab(params["tab"]), // tab
        params["arch"] === "true" || params["arch"] === true, // archived
        this.sanitizePage(params["pg"]), // page
        params["prd"], // products
        params["cat"], // categories
        params["prt"], // partners
        params["sts"] // status
        );
        switch (this.queryParameters.tab) {
            case constants_1.TABS.PURCHASES:
            case constants_1.TABS.FAVOURITE:
            case constants_1.TABS.COMPARE:
            case constants_1.TABS.PERFORMANCE:
            case constants_1.TABS.SALES:
                this.queryOrdersIfNeeded();
                return;
            default:
        }
    };
    DashboardThreadedComponent.prototype.sanitizeTab = function (tab) {
        if (!tab) {
            if (this.queryParameters.tab) {
                return this.queryParameters.tab;
            }
            if (this.user.showWelcomeTab) {
                return constants_1.TABS.WELCOME;
            }
        }
        else {
            var upped = tab.toUpperCase();
            if (upped === constants_1.TABS.CATALOGUE || upped === constants_1.TABS.SALES || upped === constants_1.TABS.WELCOME || upped === constants_1.TABS.FAVOURITE || upped == constants_1.TABS.COMPARE || upped == constants_1.TABS.PERFORMANCE) {
                return upped;
            }
        }
        return constants_1.TABS.PURCHASES;
    };
    DashboardThreadedComponent.prototype.sanitizePage = function (page) {
        if (page == null) {
            return (this.queryParameters.pg) || 1;
        }
        try {
            return Number.parseInt(page);
        }
        catch (e) {
            return 1;
        }
    };
    DashboardThreadedComponent.prototype.queryOrdersIfNeeded = function () {
        var query = this.computeOrderQueryFromQueryParams();
        if (this.isOrdersQueryNeeded(query)) {
            this.executeOrdersQuery(query);
        }
        if (this.isOrdersFiltersQueryNeeded(query)) {
            this.executeOrdersFiltersQuery(query);
        }
        this.query = query;
    };
    DashboardThreadedComponent.prototype.executeOrdersQuery = function (query) {
        var _this = this;
        this.queryStatus.submit();
        this.getOrdersQuery(query)
            .then(function () {
            _this.queryStatus.callback("Successfully fetched orders", true);
        })
            .catch(function (error) {
            _this.queryStatus.error("Error while fetching orders.", error);
        });
    };
    DashboardThreadedComponent.prototype.getOrdersQuery = function (query) {
        var _this = this;
        if (query.archived) {
            // only one query needed
            return this.bpeService
                .getCollaborationGroups(this.cookieService.get("company_id"), query.collaborationRole, query.page - 1, query.pageSize, query.archived, query.products, query.categories, query.partners, query.status)
                .then(function (response) {
                _this.results = new dashboard_orders_query_results_1.DashboardOrdersQueryResults(response.collaborationGroups, response.collaborationGroups.length > 0, response.size);
                _this.createUpdatingCollaborationGroupNameArray();
            });
        }
        else {
            // Needs to query for archived orders to know if the "Show Archived" button should be enabled
            return Promise.all([
                // regular query
                this.bpeService.getCollaborationGroups(this.cookieService.get("company_id"), query.collaborationRole, query.page - 1, query.pageSize, query.archived, query.products, query.categories, query.partners, query.status),
                // query for archived orders
                this.bpeService.getCollaborationGroups(this.cookieService.get("company_id"), query.collaborationRole, 0, 1, true, [], [], [], []),
            ]).then(function (_a) {
                var response = _a[0], archived = _a[1];
                _this.results = new dashboard_orders_query_results_1.DashboardOrdersQueryResults(response.collaborationGroups, archived.collaborationGroups.length > 0, response.size);
                _this.createUpdatingCollaborationGroupNameArray();
            });
        }
    };
    DashboardThreadedComponent.prototype.createUpdatingCollaborationGroupNameArray = function () {
        this.updatingCollaborationGroupName = [];
        for (var _i = 0, _a = this.results.orders; _i < _a.length; _i++) {
            var order = _a[_i];
            this.updatingCollaborationGroupName.push({ status: false, name: order.name, defaultName: this.getDefaultCollaborationNames(order) });
        }
    };
    DashboardThreadedComponent.prototype.getDefaultCollaborationNames = function (collaborationGroup) {
        var defaultName = "Activities on ";
        for (var i = 0; i < collaborationGroup.associatedProcessInstanceGroups.length; i++) {
            if (i == collaborationGroup.associatedProcessInstanceGroups.length - 1) {
                defaultName += collaborationGroup.associatedProcessInstanceGroups[i].name;
            }
            else {
                defaultName += collaborationGroup.associatedProcessInstanceGroups[i].name + ", ";
            }
        }
        return defaultName;
    };
    DashboardThreadedComponent.prototype.areOrdersLoading = function () {
        return this.queryStatus.fb_submitted;
    };
    DashboardThreadedComponent.prototype.executeOrdersFiltersQuery = function (query) {
        var _this = this;
        this.filterQueryStatus.submit();
        this.bpeService
            .getProcessInstanceGroupFilters(this.cookieService.get("company_id"), query.collaborationRole, query.archived, query.products, query.categories, query.partners, query.status)
            .then(function (response) {
            // populate the modified filter set with the passed parameters that are also included in the results
            // so that the selected criteria would have a checkbox along with
            _this.modifiedFilterSet = new process_instance_group_filter_1.ProcessInstanceGroupFilter();
            // products
            if (query.products.length > 0) {
                for (var _i = 0, _a = response.relatedProducts; _i < _a.length; _i++) {
                    var product = _a[_i];
                    _this.modifiedFilterSet.relatedProducts.push(product);
                }
            }
            // status
            if (query.status.length > 0) {
                for (var _b = 0, _c = response.status; _b < _c.length; _b++) {
                    var status_1 = _c[_b];
                    _this.modifiedFilterSet.status.push(status_1);
                }
            }
            // categories
            if (query.categories.length > 0) {
                for (var _d = 0, _e = response.relatedProductCategories; _d < _e.length; _d++) {
                    var product = _e[_d];
                    _this.modifiedFilterSet.relatedProductCategories.push(product);
                }
            }
            // partners
            if (query.partners.length > 0) {
                for (var i = 0; i < response.tradingPartnerIDs.length; i++) {
                    _this.modifiedFilterSet.tradingPartnerIDs.push(response.tradingPartnerIDs[i]);
                    _this.modifiedFilterSet.tradingPartnerNames.push(response.tradingPartnerNames[i]);
                }
            }
            _this.filterSet = response;
            _this.filterQueryStatus.callback("Successfully fetched filters", true);
        })
            .catch(function (error) {
            _this.filterQueryStatus.error("Failed to get filters", error);
        });
    };
    DashboardThreadedComponent.prototype.areFiltersLoading = function () {
        return this.filterQueryStatus.fb_submitted;
    };
    DashboardThreadedComponent.prototype.isOrdersQueryNeeded = function (query) {
        return true;
    };
    DashboardThreadedComponent.prototype.isOrdersFiltersQueryNeeded = function (query) {
        // filterSet may be set to null to request a recompute of the filter sets.
        if (!this.filterSet) {
            return true;
        }
        // Do not recompute the filters on filter changes.
        return this.query.archived !== query.archived
            || this.query.collaborationRole !== query.collaborationRole;
    };
    DashboardThreadedComponent.prototype.computeOrderQueryFromQueryParams = function () {
        return new dashboard_orders_query_1.DashboardOrdersQuery(this.queryParameters.arch, this.queryParameters.tab === constants_1.TABS.PURCHASES ? "BUYER" : "SELLER", this.queryParameters.pg, this.parseArray(this.queryParameters.prd), this.parseArray(this.queryParameters.cat), this.parseArray(this.queryParameters.prt), this.parseArray(this.queryParameters.sts), constants_1.PAGE_SIZE);
    };
    DashboardThreadedComponent.prototype.parseArray = function (param) {
        return param ? param.split("_SEP_") : [];
    };
    DashboardThreadedComponent.prototype.changeCollaborationGroupNameStatus = function (index, status) {
        // if status is true,then we will change the name of the group.
        if (status) {
            this.updatingCollaborationGroupName[index].name = this.results.orders[index].name;
        }
        this.updatingCollaborationGroupName[index].status = status;
    };
    DashboardThreadedComponent.prototype.updateCollaborationGroupName = function (id, name) {
        var _this = this;
        this.bpeService.updateCollaborationGroupName(id, name)
            .then(function () {
            _this.onOrderRemovedFromView();
        })
            .catch(function (err) {
            console.error("Failed to update collaboration group name", err);
        });
    };
    DashboardThreadedComponent.prototype.archiveGroup = function (id) {
        var _this = this;
        this.bpeService.archiveCollaborationGroup(id)
            .then(function () {
            _this.onOrderRemovedFromView();
        })
            .catch(function (err) {
            console.error("Failed to archive collaboration group", err);
        });
    };
    DashboardThreadedComponent.prototype.restoreGroup = function (id) {
        var _this = this;
        this.bpeService.restoreCollaborationGroup(id)
            .then(function () {
            _this.onOrderRemovedFromView();
        })
            .catch(function (err) {
            console.error("Failed to restore collaboration group", err);
        });
    };
    DashboardThreadedComponent.prototype.deleteGroup = function (id) {
        var _this = this;
        if (confirm("Are you sure that you want to delete this collaboration group?")) {
            this.bpeService.deleteCollaborationGroup(id)
                .then(function () {
                _this.onOrderRemovedFromView();
            })
                .catch(function (err) {
                console.error("Failed to delete the collaboration group", err);
            });
        }
    };
    DashboardThreadedComponent = __decorate([
        core_1.Component({
            selector: "dashboard-threaded",
            templateUrl: "./dashboard-threaded.component.html",
            styleUrls: ["./dashboard-threaded.component.css"]
        }),
        __metadata("design:paramtypes", [ng2_cookies_1.CookieService,
            bpe_service_1.BPEService,
            user_service_1.UserService,
            router_1.Router,
            router_1.ActivatedRoute,
            app_component_1.AppComponent])
    ], DashboardThreadedComponent);
    return DashboardThreadedComponent;
}());
exports.DashboardThreadedComponent = DashboardThreadedComponent;
//# sourceMappingURL=dashboard-threaded.component.js.map