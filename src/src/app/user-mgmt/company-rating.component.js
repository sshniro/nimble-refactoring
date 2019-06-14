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
var bpe_service_1 = require("../bpe/bpe.service");
var router_1 = require("@angular/router");
var ng2_cookies_1 = require("ng2-cookies");
var myGlobals = require("../globals");
var call_status_1 = require("../common/call-status");
var CompanyRatingComponent = /** @class */ (function () {
    function CompanyRatingComponent(cookieService, bpeService, route) {
        this.cookieService = cookieService;
        this.bpeService = bpeService;
        this.route = route;
        this.id = null;
        this.hideTitle = false;
        this.ratingStatus = new core_1.EventEmitter();
        this.initCallStatus = new call_status_1.CallStatus();
        this.ratings = null;
        this.ratingOverall = 0;
        this.ratingSeller = 0;
        this.ratingFulfillment = 0;
    }
    CompanyRatingComponent.prototype.ngOnInit = function () {
        var _this = this;
        if (!this.id) {
            this.route.queryParams.subscribe(function (params) {
                var idP = params['id'];
                if (idP) {
                    _this.getRatings(idP);
                }
                else {
                    var idC = _this.cookieService.get("company_id");
                    if (idC) {
                        _this.getRatings(idC);
                    }
                }
            });
        }
        else {
            this.getRatings(this.id);
        }
    };
    CompanyRatingComponent.prototype.getRatings = function (id) {
        var _this = this;
        this.initCallStatus.submit();
        this.bpeService.getRatingsSummary(id).then(function (ratings) {
            if (myGlobals.debug) {
                console.log("Fetched ratings: " + JSON.stringify(ratings));
            }
            _this.ratings = ratings;
            if (_this.ratings.totalNumberOfRatings > 0) {
                _this.calcRatings();
            }
            else {
                _this.ratingStatus.emit(true);
            }
            _this.initCallStatus.callback("Ratings successfully fetched", true);
        })
            .catch(function (error) {
            _this.initCallStatus.error("Error while fetching company ratings", error);
        });
    };
    CompanyRatingComponent.prototype.calcRatings = function () {
        this.ratings.qualityOfNegotiationProcess /= this.ratings.totalNumberOfRatings;
        this.ratings.qualityOfOrderingProcess /= this.ratings.totalNumberOfRatings;
        this.ratings.responseTimeRating /= this.ratings.totalNumberOfRatings;
        this.ratings.listingAccuracy /= this.ratings.totalNumberOfRatings;
        this.ratings.conformanceToContractualTerms /= this.ratings.totalNumberOfRatings;
        this.ratings.deliveryAndPackaging /= this.ratings.totalNumberOfRatings;
        this.ratingSeller = (this.ratings.qualityOfNegotiationProcess + this.ratings.qualityOfOrderingProcess + this.ratings.responseTimeRating) / 3;
        this.ratingFulfillment = (this.ratings.listingAccuracy + this.ratings.conformanceToContractualTerms) / 2;
        this.ratingOverall = (this.ratingSeller + this.ratingFulfillment + this.ratings.deliveryAndPackaging) / 3;
    };
    __decorate([
        core_1.Input(),
        __metadata("design:type", Object)
    ], CompanyRatingComponent.prototype, "id", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Boolean)
    ], CompanyRatingComponent.prototype, "hideTitle", void 0);
    __decorate([
        core_1.Output(),
        __metadata("design:type", Object)
    ], CompanyRatingComponent.prototype, "ratingStatus", void 0);
    CompanyRatingComponent = __decorate([
        core_1.Component({
            selector: "company-rating",
            templateUrl: "./company-rating.component.html",
            styleUrls: ['./company-rating.component.css']
        }),
        __metadata("design:paramtypes", [ng2_cookies_1.CookieService,
            bpe_service_1.BPEService,
            router_1.ActivatedRoute])
    ], CompanyRatingComponent);
    return CompanyRatingComponent;
}());
exports.CompanyRatingComponent = CompanyRatingComponent;
//# sourceMappingURL=company-rating.component.js.map