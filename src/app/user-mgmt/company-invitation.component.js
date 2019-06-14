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
var app_component_1 = require("../app.component");
var company_invitation_1 = require("./model/company-invitation");
var user_service_1 = require("./user.service");
var ng2_cookies_1 = require("ng2-cookies");
var ng_bootstrap_1 = require("@ng-bootstrap/ng-bootstrap");
var myGlobals = require("../globals");
var call_status_1 = require("../common/call-status");
var utils_1 = require("../common/utils");
var CompanyInvitationComponent = /** @class */ (function () {
    function CompanyInvitationComponent(cookieService, userService, appComponent, modalService) {
        this.cookieService = cookieService;
        this.userService = userService;
        this.appComponent = appComponent;
        this.modalService = modalService;
        this.myEmail = "";
        this.invEmail = "";
        this.invRoles = [];
        this.invPending = [];
        this.invToChange = "";
        this.tooltipHTML = "";
        this.userRoles = [];
        this.config = myGlobals.config;
        this.rolesSelected = false;
        this.rolesChangeSelected = true;
        this.rolesCallStatus = new call_status_1.CallStatus();
        this.submitCallStatus = new call_status_1.CallStatus();
        this.membersCallStatus = new call_status_1.CallStatus();
        this.membersFetched = false;
        this.partyId = null;
        this.platformManagerMode = false;
    }
    CompanyInvitationComponent.prototype.ngOnInit = function () {
        this.loadInvites();
        this.loadRoles();
        if (this.cookieService.get('user_email'))
            this.myEmail = decodeURIComponent(this.cookieService.get('user_email'));
        if (this.partyId && this.partyId != this.cookieService.get("company_id"))
            this.platformManagerMode = true;
    };
    CompanyInvitationComponent.prototype.checkMail = function (mail) {
        return (mail.localeCompare(this.myEmail) == 0);
    };
    CompanyInvitationComponent.prototype.checkDisable = function (role) {
        var disable = false;
        if (role == "external_representative" || role == "legal_representative") {
            if (!this.appComponent.checkRoles("legal"))
                disable = true;
        }
        return disable;
    };
    CompanyInvitationComponent.prototype.loadInvites = function () {
        var _this = this;
        this.invPending = [];
        this.membersCallStatus.submit();
        this.membersFetched = false;
        if (this.partyId == "")
            this.partyId = null;
        this.userService.getCompanyMemberList(this.partyId)
            .then(function (response) {
            _this.invPending = response;
            _this.membersCallStatus.callback("Successfully loading invites", true);
            _this.membersFetched = true;
        })
            .catch(function (error) {
            _this.invPending = [];
            _this.membersCallStatus.error("Error while loading invites", error);
        });
    };
    CompanyInvitationComponent.prototype.loadRoles = function () {
        var _this = this;
        this.userRoles = [];
        this.rolesCallStatus.submit();
        this.userService.getUserRoles()
            .then(function (response) {
            response.sort(function (a, b) {
                var a_comp = a.name;
                var b_comp = b.name;
                return a_comp.localeCompare(b_comp);
            });
            for (var _i = 0, response_1 = response; _i < response_1.length; _i++) {
                var role = response_1[_i];
                if (_this.config.supportedRoles.indexOf(role.identifier) != -1)
                    _this.userRoles.push(role);
            }
            _this.rolesCallStatus.callback("Successfully fetched roles.", true);
        })
            .catch(function (error) {
            _this.userRoles = [];
            _this.rolesCallStatus.error("Error while fetching roles.", error);
        });
    };
    CompanyInvitationComponent.prototype.setRoles = function (id) {
        if (this.invRoles.indexOf(id) == -1)
            this.invRoles.push(id);
        else
            this.invRoles.splice(this.invRoles.indexOf(id), 1);
        if (this.invRoles.length > 0)
            this.rolesSelected = true;
        else
            this.rolesSelected = false;
    };
    CompanyInvitationComponent.prototype.setChangeRoles = function (id) {
        if (this.invToChange["roleIDs"].indexOf(id) == -1)
            this.invToChange["roleIDs"].push(id);
        else
            this.invToChange["roleIDs"].splice(this.invToChange["roleIDs"].indexOf(id), 1);
        if (this.invToChange["roleIDs"].length > 0)
            this.rolesChangeSelected = true;
        else
            this.rolesChangeSelected = false;
    };
    CompanyInvitationComponent.prototype.changeRoles = function () {
        var _this = this;
        this.userService.setRoles(this.invToChange["email"], this.invToChange["roleIDs"])
            .then(function (response) {
            _this.loadInvites();
        })
            .catch(function (error) {
            console.error('An error occurred', error);
            _this.loadInvites();
        });
    };
    CompanyInvitationComponent.prototype.editRole = function (inv) {
        if (this.isJson(JSON.stringify(inv))) {
            this.invToChange = utils_1.copy(inv);
        }
    };
    CompanyInvitationComponent.prototype.openModal = function (content) {
        this.modalService.open(content);
    };
    CompanyInvitationComponent.prototype.cancelInvite = function (inv) {
        var _this = this;
        if (confirm("Are you sure that you want to cancel the invitation for this user?")) {
            this.userService.deleteInvite(inv["email"])
                .then(function (response) {
                _this.loadInvites();
            })
                .catch(function (error) {
                console.error('An error occurred', error);
                _this.loadInvites();
            });
        }
    };
    CompanyInvitationComponent.prototype.deleteInvite = function (inv) {
        var _this = this;
        if (confirm("Are you sure that you want to remove this user from your company?")) {
            this.userService.deleteInvite(inv["email"])
                .then(function (response) {
                _this.loadInvites();
            })
                .catch(function (error) {
                console.error('An error occurred', error);
                _this.loadInvites();
            });
        }
    };
    CompanyInvitationComponent.prototype.showRoleTT = function (content) {
        var tooltip = "";
        tooltip += "<table class='table table-striped table-bordered'>";
        tooltip += "<tr><th>Role</th><th>Permissions</th></tr>";
        if (this.config.supportedRoles.indexOf("company_admin") != -1)
            tooltip += "<tr><td>Company Admin</td><td>A member of the company that got all rights on the NIMBLE platform (except for assigning external/legal representatives)</td></tr>";
        if (this.config.supportedRoles.indexOf("external_representative") != -1)
            tooltip += "<tr><td>External Representative</td><td>Somebody from outside the company that got all rights connected to the company on the NIMBLE platform (except for assigning external/legal representatives)</td></tr>";
        tooltip += "<tr><td>Legal Representative</td><td>The legally liable representative of your company. Usually a single person. Has got all rights on the NIMBLE platform</td></tr>";
        if (this.config.supportedRoles.indexOf("monitor") != -1)
            tooltip += "<tr><td>Monitor</td><td>Can observe sales, purchases and relevant business data on the NIMBLE platform without executing the associated business processes</td></tr>";
        if (this.config.supportedRoles.indexOf("publisher") != -1)
            tooltip += "<tr><td>Publisher</td><td>Can publish and maintain the catalogues of the company</td></tr>";
        if (this.config.supportedRoles.indexOf("purchaser") != -1)
            tooltip += "<tr><td>Purchaser</td><td>Can observe purchases on the NIMBLE platform and execute the associated business processes</td></tr>";
        if (this.config.supportedRoles.indexOf("sales_officer") != -1)
            tooltip += "<tr><td>Sales Offices</td><td>Can observe sales on the NIMBLE platform and execute the associated business processes</td></tr>";
        this.tooltipHTML = tooltip;
        this.modalService.open(content);
    };
    CompanyInvitationComponent.prototype.onSubmit = function () {
        var _this = this;
        var companyId = this.cookieService.get('company_id');
        var companyInvitation = new company_invitation_1.CompanyInvitation(companyId, this.invEmail, this.invRoles);
        if (myGlobals.debug)
            console.log("Sending invitation " + JSON.stringify(companyInvitation));
        this.submitCallStatus.submit();
        this.userService.inviteCompany(companyInvitation)
            .then(function (response) {
            _this.submitCallStatus.callback("Invitation sent");
            _this.loadInvites();
        })
            .catch(function (error) {
            _this.submitCallStatus.error(error.status === 400 ? "User already invited" : "Error while inviting user", error);
        });
    };
    CompanyInvitationComponent.prototype.isJson = function (str) {
        try {
            JSON.parse(str);
        }
        catch (e) {
            return false;
        }
        return true;
    };
    __decorate([
        core_1.Input(),
        __metadata("design:type", String)
    ], CompanyInvitationComponent.prototype, "partyId", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Boolean)
    ], CompanyInvitationComponent.prototype, "platformManagerMode", void 0);
    CompanyInvitationComponent = __decorate([
        core_1.Component({
            selector: 'company-invitation',
            templateUrl: './company-invitation.component.html',
            styleUrls: ['./company-invitation.component.css']
        }),
        __metadata("design:paramtypes", [ng2_cookies_1.CookieService,
            user_service_1.UserService,
            app_component_1.AppComponent,
            ng_bootstrap_1.NgbModal])
    ], CompanyInvitationComponent);
    return CompanyInvitationComponent;
}());
exports.CompanyInvitationComponent = CompanyInvitationComponent;
//# sourceMappingURL=company-invitation.component.js.map