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
var call_status_1 = require("../../../common/call-status");
var bpe_service_1 = require("../../bpe.service");
var user_service_1 = require("../../../user-mgmt/user.service");
var utils_1 = require("../../../common/utils");
var unit_service_1 = require("../../../common/unit-service");
var constants_1 = require("../../../common/constants");
var TermsAndConditionsComponent = /** @class */ (function () {
    function TermsAndConditionsComponent(bpeService, userService, unitService) {
        this.bpeService = bpeService;
        this.userService = userService;
        this.unitService = unitService;
        // Inputs
        this.orderId = null;
        this.readOnly = false;
        this.rfqId = null;
        this._originalTermAndConditionClauses = null; // original terms and conditions of the object
        this._termsAndConditions = []; // updated terms and conditions of the object
        this.needATitle = true; // whether we need to add a title before displaying terms and conditions
        // Outputs
        this.onIncotermChanged = new core_1.EventEmitter();
        this.onTradingTermChanged = new core_1.EventEmitter();
        this.showPreview = false;
        this.callStatus = new call_status_1.CallStatus();
        this.showSection = [];
        // used to store values of parameters inside the terms and conditions text
        this.tradingTerms = null;
        // used to store original values of parameters
        this.originalTradingTerms = null;
        this.randomComponentId = '';
        // options
        this.INCOTERMS = [];
        this.PAYMENT_TERMS = [];
        this.COUNTRY_NAMES = utils_1.COUNTRY_NAMES;
        this.UNITS = [];
        // selected values for Incoterm and Trading Term (e.g. Payment Terms)
        this._selectedIncoterm = null;
        this._selectedTradingTerm = null;
    }
    TermsAndConditionsComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.callStatus.submit();
        var array = new Uint32Array(1);
        window.crypto.getRandomValues(array);
        this.randomComponentId = "" + array[0];
        Promise.all([
            this.userService.getSettingsForParty(this.sellerPartyId),
            this.unitService.getCachedUnitList(constants_1.deliveryPeriodUnitListId),
            this.unitService.getCachedUnitList(constants_1.warrantyPeriodUnitListId)
        ]).then(function (_a) {
            var sellerPartySettings = _a[0], deliveryPeriodUnits = _a[1], warrantyPeriodUnits = _a[2];
            // populate available incoterms
            _this.INCOTERMS = sellerPartySettings.negotiationSettings.incoterms;
            // populate available payment terms
            _this.PAYMENT_TERMS = sellerPartySettings.negotiationSettings.paymentTerms;
            // populate available units
            _this.UNITS = deliveryPeriodUnits.concat(warrantyPeriodUnits);
            // if there is no need to have a title, then display the preview
            if (!_this.needATitle) {
                _this.showPreview = true;
            }
            _this.callStatus.callback("Successfully fetched terms and conditions", true);
        }).catch(function (error) {
            _this.callStatus.error("Error while fething terms and conditions", error);
        });
    };
    TermsAndConditionsComponent.prototype.displayTermsAndConditions = function () {
        this.clearShowSectionArray();
        this.showPreview = !this.showPreview;
    };
    TermsAndConditionsComponent.prototype.clearShowSectionArray = function () {
        for (var i = 0; i < 19; i++) {
            this.showSection[i] = false;
        }
    };
    TermsAndConditionsComponent.prototype.setSectionText = function (index) {
        if (this.readOnly) {
            var element = document.getElementById(this.generateIdForClause(index));
            var clause = this._termsAndConditions[index];
            var text = clause.content[0].value;
            for (var _i = 0, _a = clause.tradingTerms; _i < _a.length; _i++) {
                var tradingTerm = _a[_i];
                var id = tradingTerm.id;
                var spanText = "";
                if (this.isOriginalTradingTerm(tradingTerm.id)) {
                    spanText = "<b><span id='" + this.generateIdForParameter(id) + "'>";
                }
                else {
                    spanText = "<b><span style='color: red' id='" + this.generateIdForParameter(id) + "'>";
                }
                if (tradingTerm.value.valueQualifier == "QUANTITY") {
                    var defaultValue = tradingTerm.value.valueQuantity[0].value;
                    var defaultUnit = tradingTerm.value.valueQuantity[0].unitCode;
                    text = text.replace(tradingTerm.id, spanText + defaultValue + " " + defaultUnit + "</span></b>");
                }
                else if (tradingTerm.value.valueQualifier == "STRING") {
                    var defaultValue = this.tradingTerms.get(tradingTerm.id).value.value[0].value;
                    text = text.replace(tradingTerm.id, spanText + defaultValue + "</span></b>");
                }
                else if (tradingTerm.value.valueQualifier == "NUMBER") {
                    var defaultValue = this.tradingTerms.get(tradingTerm.id).value.valueDecimal[0].toString();
                    text = text.replace(tradingTerm.id, spanText + defaultValue + "</span></b>");
                }
                else if (tradingTerm.value.valueQualifier == "CODE") {
                    var defaultValue = this.tradingTerms.get(tradingTerm.id).value.valueCode[0].value;
                    text = text.replace(tradingTerm.id, spanText + defaultValue + "</span></b>");
                }
            }
            element.innerHTML = text;
        }
        else {
            var element = document.getElementById(this.generateIdForClause(index));
            var clause = this._termsAndConditions[index];
            var text = clause.content[0].value;
            // replace placeholders with spans
            for (var _b = 0, _c = clause.tradingTerms; _b < _c.length; _b++) {
                var tradingTerm = _c[_b];
                var id = tradingTerm.id;
                var spanText = "";
                if (this.isOriginalTradingTerm(tradingTerm.id)) {
                    spanText = "<b><span id='" + this.generateIdForParameter(id) + "'>";
                }
                else {
                    spanText = "<b><span style='color: red' id='" + this.generateIdForParameter(id) + "'>";
                }
                // for the quantities, we have value and unit
                if (tradingTerm.value.valueQualifier == "QUANTITY") {
                    var defaultValue = this.tradingTerms.get(id).value.valueQuantity[0].value;
                    var defaultUnit = this.tradingTerms.get(id).value.valueQuantity[0].unitCode;
                    text = text.replace(id, spanText + defaultValue + " " + defaultUnit + "</span></b>");
                }
                else if (tradingTerm.value.valueQualifier == "STRING") {
                    var defaultValue = this.tradingTerms.get(id).value.value[0].value;
                    text = text.replace(id, spanText + defaultValue + "</span></b>");
                }
                else if (tradingTerm.value.valueQualifier == "NUMBER") {
                    var defaultValue = this.tradingTerms.get(id).value.valueDecimal[0].toString();
                    text = text.replace(id, spanText + defaultValue + "</span></b>");
                }
                else if (tradingTerm.value.valueQualifier == "CODE") {
                    var defaultValue = this.tradingTerms.get(id).value.valueCode[0].value;
                    text = text.replace(id, spanText + defaultValue + "</span></b>");
                }
            }
            element.innerHTML = text;
        }
    };
    TermsAndConditionsComponent.prototype.updateParameter = function (sectionIndex, id, value, isUnit) {
        if (isUnit === void 0) { isUnit = false; }
        var clause = this.originalTermAndConditionClauses[sectionIndex];
        // handling of empty string
        if (value == "") {
            for (var _i = 0, _a = clause.tradingTerms; _i < _a.length; _i++) {
                var tradingTerm = _a[_i];
                if (tradingTerm.id == id) {
                    if (tradingTerm.value.valueQualifier == "STRING") {
                        value = tradingTerm.value.value[0].value;
                    }
                    else if (tradingTerm.value.valueQualifier == "NUMBER") {
                        value = tradingTerm.value.valueDecimal[0].toString();
                    }
                    else if (tradingTerm.value.valueQualifier == "QUANTITY") {
                        value = tradingTerm.value.valueQuantity[0].value.toString();
                    }
                    else if (tradingTerm.value.valueQualifier == "CODE") {
                        value = tradingTerm.value.valueCode[0].value;
                    }
                    break;
                }
            }
        }
        // update the value of parameter
        if (isUnit) {
            this.tradingTerms.get(id).value.valueQuantity[0].unitCode = value;
            var element = document.getElementById(this.generateIdForParameter(id));
            element.innerText = this.tradingTerms.get(id).value.valueQuantity[0].value + " " + value;
            this.setElementColor(element, id);
        }
        else {
            var tradingTerm = this.tradingTerms.get(id);
            if (tradingTerm.value.valueQualifier == "STRING") {
                tradingTerm.value.value[0].value = value;
            }
            else if (tradingTerm.value.valueQualifier == "NUMBER") {
                tradingTerm.value.valueDecimal[0] = Number(value);
            }
            else if (tradingTerm.value.valueQualifier == "QUANTITY") {
                tradingTerm.value.valueQuantity[0].value = Number(value);
            }
            else if (tradingTerm.value.valueQualifier == "CODE") {
                tradingTerm.value.valueCode[0].value = value;
            }
            var element = document.getElementById(this.generateIdForParameter(id));
            if (tradingTerm.value.valueQualifier == "QUANTITY") {
                element.innerText = value + " " + tradingTerm.value.valueQuantity[0].unitCode;
            }
            else {
                element.innerText = value;
            }
            this.setElementColor(element, id);
        }
        // emit the new value if necessary
        if (id == "$incoterms_id") {
            this.onIncotermChanged.emit(value);
        }
        else if (id == "$payment_id") {
            this.onTradingTermChanged.emit(value);
        }
    };
    TermsAndConditionsComponent.prototype.getClauseName = function (clause) {
        var startIndex = clause.id.indexOf("_");
        return clause.id.substring(startIndex + 1);
    };
    TermsAndConditionsComponent.prototype.generateIdForClause = function (clauseId) {
        return this.randomComponentId + "-" + this.documentType + "-" + clauseId;
    };
    TermsAndConditionsComponent.prototype.generateIdForParameter = function (parameter) {
        return this.documentType + "-" + parameter;
    };
    Object.defineProperty(TermsAndConditionsComponent.prototype, "selectedIncoterm", {
        get: function () {
            return this._selectedIncoterm;
        },
        set: function (incoterm) {
            this._selectedIncoterm = incoterm;
            var id = "$incoterms_id";
            this.updateTermNegotiating(id, this._selectedIncoterm);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TermsAndConditionsComponent.prototype, "selectedTradingTerm", {
        get: function () {
            return this._selectedTradingTerm;
        },
        set: function (tradingTerm) {
            this._selectedTradingTerm = tradingTerm;
            this.updateTermNegotiating("$payment_id", tradingTerm);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TermsAndConditionsComponent.prototype, "originalTermAndConditionClauses", {
        get: function () {
            return this._originalTermAndConditionClauses;
        },
        set: function (clauses) {
            var _this = this;
            this._originalTermAndConditionClauses = clauses;
            this._originalTermAndConditionClauses.sort(function (clause1, clause2) {
                var order1 = Number(clause1.id.substring(0, clause1.id.indexOf("_")));
                var order2 = Number(clause2.id.substring(0, clause2.id.indexOf("_")));
                return order1 - order2;
            });
            this.originalTradingTerms = new Map();
            // create tradingTerms map using the original terms and conditions
            for (var _i = 0, _a = this._originalTermAndConditionClauses; _i < _a.length; _i++) {
                var clause = _a[_i];
                for (var _b = 0, _c = clause.tradingTerms; _b < _c.length; _b++) {
                    var tradingTerm = _c[_b];
                    this.originalTradingTerms.set(tradingTerm.id, tradingTerm);
                }
            }
            var _loop_1 = function (i) {
                if (this_1.showSection[i]) {
                    setTimeout(function () {
                        _this.setSectionText(i);
                    });
                }
            };
            var this_1 = this;
            // refresh the texts for the open sections, otherwise the panel gets empty
            for (var i = 0; i < this.showSection.length; i++) {
                _loop_1(i);
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TermsAndConditionsComponent.prototype, "termsAndConditions", {
        get: function () {
            return this._termsAndConditions;
        },
        set: function (clauses) {
            var _this = this;
            this._termsAndConditions = clauses;
            // sort terms and conditions
            this._termsAndConditions.sort(function (clause1, clause2) {
                var order1 = Number(clause1.id.substring(0, clause1.id.indexOf("_")));
                var order2 = Number(clause2.id.substring(0, clause2.id.indexOf("_")));
                return order1 - order2;
            });
            // create valuesOfParameters map
            this.tradingTerms = new Map();
            // create tradingTerms map using the terms and conditions
            for (var _i = 0, _a = this._termsAndConditions; _i < _a.length; _i++) {
                var clause = _a[_i];
                for (var _b = 0, _c = clause.tradingTerms; _b < _c.length; _b++) {
                    var tradingTerm = _c[_b];
                    this.tradingTerms.set(tradingTerm.id, tradingTerm);
                }
            }
            var _loop_2 = function (i) {
                if (this_2.showSection[i]) {
                    setTimeout(function () {
                        _this.setSectionText(i);
                    });
                }
            };
            var this_2 = this;
            // refresh the texts for the open sections, otherwise the panel gets empty
            for (var i = 0; i < this.showSection.length; i++) {
                _loop_2(i);
            }
        },
        enumerable: true,
        configurable: true
    });
    // checks whether the terms are updated or not with respect to the original clause
    TermsAndConditionsComponent.prototype.isClauseUpdated = function (clause) {
        // if we have an order, we do not need to check the clause is changed or not
        if (this.orderId) {
            return true;
        }
        for (var _i = 0, _a = clause.tradingTerms; _i < _a.length; _i++) {
            var tradingTerm = _a[_i];
            if (!this.isOriginalTradingTerm(tradingTerm.id)) {
                return false;
            }
        }
        return true;
    };
    TermsAndConditionsComponent.prototype.isOriginalTradingTerm = function (tradingTermId) {
        // if we have an order, we do not need to check the clause is changed or not
        if (this.orderId) {
            return true;
        }
        var defaultTradingTerm = this.originalTradingTerms.get(tradingTermId);
        if (defaultTradingTerm.value.valueQualifier == "STRING") {
            if (defaultTradingTerm.value.value[0].value != this.tradingTerms.get(tradingTermId).value.value[0].value) {
                return false;
            }
        }
        else if (defaultTradingTerm.value.valueQualifier == "NUMBER") {
            if (defaultTradingTerm.value.valueDecimal[0] != this.tradingTerms.get(tradingTermId).value.valueDecimal[0]) {
                return false;
            }
        }
        else if (defaultTradingTerm.value.valueQualifier == "QUANTITY") {
            if (defaultTradingTerm.value.valueQuantity[0].value != this.tradingTerms.get(tradingTermId).value.valueQuantity[0].value
                || defaultTradingTerm.value.valueQuantity[0].unitCode != this.tradingTerms.get(tradingTermId).value.valueQuantity[0].unitCode) {
                return false;
            }
        }
        else if (defaultTradingTerm.value.valueQualifier == "CODE") {
            if (defaultTradingTerm.value.valueCode[0].value != this.tradingTerms.get(tradingTermId).value.valueCode[0].value) {
                return false;
            }
        }
        return true;
    };
    TermsAndConditionsComponent.prototype.updateTermNegotiating = function (tradingTermId, value) {
        // update the value of parameter in tradingTerms map
        if (this.tradingTerms) {
            this.tradingTerms.get(tradingTermId).value.valueCode[0].value = value;
        }
        // update the value of parameter in the text
        var element = document.getElementById(this.generateIdForParameter(tradingTermId));
        if (element) {
            element.innerText = value;
            this.setElementColor(element, tradingTermId);
        }
    };
    // if the trading term is updated, its color is set to red, otherwise to black.
    TermsAndConditionsComponent.prototype.setElementColor = function (element, tradingTermId) {
        if (this.isOriginalTradingTerm(tradingTermId)) {
            element.style.color = 'black';
        }
        else {
            element.style.color = 'red';
        }
    };
    __decorate([
        core_1.Input(),
        __metadata("design:type", String)
    ], TermsAndConditionsComponent.prototype, "orderId", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", String)
    ], TermsAndConditionsComponent.prototype, "buyerPartyId", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", String)
    ], TermsAndConditionsComponent.prototype, "sellerPartyId", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Boolean)
    ], TermsAndConditionsComponent.prototype, "readOnly", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", String)
    ], TermsAndConditionsComponent.prototype, "rfqId", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", String)
    ], TermsAndConditionsComponent.prototype, "documentType", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Boolean)
    ], TermsAndConditionsComponent.prototype, "needATitle", void 0);
    __decorate([
        core_1.Output(),
        __metadata("design:type", Object)
    ], TermsAndConditionsComponent.prototype, "onIncotermChanged", void 0);
    __decorate([
        core_1.Output(),
        __metadata("design:type", Object)
    ], TermsAndConditionsComponent.prototype, "onTradingTermChanged", void 0);
    __decorate([
        core_1.Input('selectedIncoterm'),
        __metadata("design:type", String),
        __metadata("design:paramtypes", [String])
    ], TermsAndConditionsComponent.prototype, "selectedIncoterm", null);
    __decorate([
        core_1.Input('selectedTradingTerm'),
        __metadata("design:type", String),
        __metadata("design:paramtypes", [String])
    ], TermsAndConditionsComponent.prototype, "selectedTradingTerm", null);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Array),
        __metadata("design:paramtypes", [Array])
    ], TermsAndConditionsComponent.prototype, "originalTermAndConditionClauses", null);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Array),
        __metadata("design:paramtypes", [Array])
    ], TermsAndConditionsComponent.prototype, "termsAndConditions", null);
    TermsAndConditionsComponent = __decorate([
        core_1.Component({
            selector: "terms-and-conditions",
            templateUrl: "./terms-and-conditions.component.html",
            styleUrls: ["./terms-and-conditions.component.css"]
        }),
        __metadata("design:paramtypes", [bpe_service_1.BPEService,
            user_service_1.UserService,
            unit_service_1.UnitService])
    ], TermsAndConditionsComponent);
    return TermsAndConditionsComponent;
}());
exports.TermsAndConditionsComponent = TermsAndConditionsComponent;
//# sourceMappingURL=terms-and-conditions.component.js.map