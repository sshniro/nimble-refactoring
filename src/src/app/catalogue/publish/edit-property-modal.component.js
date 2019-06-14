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
var ng_bootstrap_1 = require("@ng-bootstrap/ng-bootstrap");
var utils_1 = require("../../common/utils");
var quantity_1 = require("../model/publish/quantity");
var constants_1 = require("../model/constants");
var constants_2 = require("../model/constants");
var EditPropertyModalComponent = /** @class */ (function () {
    function EditPropertyModalComponent(modalService) {
        this.modalService = modalService;
        this.PROPERTY_TYPES = constants_1.PROPERTY_TYPES;
        this.languages = constants_2.LANGUAGES;
    }
    EditPropertyModalComponent.prototype.ngOnInit = function () {
    };
    EditPropertyModalComponent.prototype.open = function (property, selectedProperty, ref) {
        var _this = this;
        this.selectedProperty = selectedProperty;
        this.property = utils_1.copy(property);
        this.addEmptyValuesToProperty();
        this.modalService.open(this.modal).result.then(function () {
            // on OK, update the property with the values
            property.value = _this.property.value;
            property.valueBinary = _this.property.valueBinary;
            property.valueDecimal = _this.property.valueDecimal;
            property.valueQuantity = _this.property.valueQuantity;
            if (utils_1.isCustomProperty(property)) {
                property.name = _this.property.name;
                property.valueQualifier = _this.property.valueQualifier;
            }
            if (ref) {
                //console.log(property.value);
                ref.push(property);
            }
        }, function () {
        });
    };
    EditPropertyModalComponent.prototype.addEmptyValuesToProperty = function () {
        if (this.property.name.length === 0) {
            this.property.name.push(utils_1.createText(''));
        }
        if (this.property.value.length === 0) {
            if (this.property.valueQualifier == "BOOLEAN") {
                this.property.value.push(utils_1.createText('false'));
            }
            else {
                this.property.value.push(utils_1.createText(''));
            }
        }
        if (this.property.valueDecimal.length === 0) {
            this.property.valueDecimal.push(0);
        }
        if (this.property.valueQuantity.length === 0) {
            this.property.valueQuantity.push(new quantity_1.Quantity());
        }
    };
    EditPropertyModalComponent.prototype.selectName = function (ip) {
        return utils_1.selectName(ip);
    };
    EditPropertyModalComponent.prototype.getDefinition = function () {
        if (!this.selectedProperty) {
            return "No definition.";
        }
        for (var _i = 0, _a = this.selectedProperty.properties; _i < _a.length; _i++) {
            var prop = _a[_i];
            if (prop.definition && prop.definition !== "") {
                return prop.definition;
            }
        }
        return "No definition.";
    };
    Object.defineProperty(EditPropertyModalComponent.prototype, "prettyName", {
        get: function () {
            // console.log(' Pretty name: ', sanitizePropertyName(selectName(this.property)));
            return utils_1.sanitizePropertyName(utils_1.selectName(this.property));
        },
        set: function (name) {
            // console.log(' Property: ', this.property);
            this.property.name.push(utils_1.createText(name));
        },
        enumerable: true,
        configurable: true
    });
    EditPropertyModalComponent.prototype.getValues = function () {
        var values = utils_1.getPropertyValues(this.property);
        // console.log(' Property Values: ', values);
        return values;
    };
    EditPropertyModalComponent.prototype.getNames = function () {
        return this.property.name;
    };
    EditPropertyModalComponent.prototype.getPropertyPresentationMode = function () {
        return utils_1.isCustomProperty(this.property) ? "edit" : "view";
    };
    EditPropertyModalComponent.prototype.addPropertyValue = function () {
        this.property.value.push(utils_1.createText(''));
    };
    EditPropertyModalComponent.prototype.deletePropertyValue = function (index) {
        this.property.value.splice(index, 1);
    };
    EditPropertyModalComponent.prototype.addPropertyName = function () {
        this.property.name.push(utils_1.createText(''));
    };
    EditPropertyModalComponent.prototype.deletePropertyName = function (index) {
        this.property.name.splice(index, 1);
    };
    EditPropertyModalComponent.prototype.onAddValue = function () {
        switch (this.property.valueQualifier) {
            case "INT":
            case "DOUBLE":
            case "NUMBER":
                this.property.valueDecimal.push(0);
                break;
            case "QUANTITY":
                this.property.valueQuantity.push(new quantity_1.Quantity(0, ""));
                break;
            case "STRING":
                this.property.value.push(utils_1.createText(''));
                break;
            default:
        }
    };
    EditPropertyModalComponent.prototype.onRemoveValue = function (index) {
        switch (this.property.valueQualifier) {
            case "INT":
            case "DOUBLE":
            case "NUMBER":
                this.property.valueDecimal.splice(index, 1);
                break;
            case "QUANTITY":
                this.property.valueQuantity.splice(index, 1);
                break;
            case "STRING":
                this.property.value.splice(index, 1);
                break;
            default:
        }
    };
    EditPropertyModalComponent.prototype.setValue = function (i, event) {
        this.property.value[i].value = event.target.value;
    };
    EditPropertyModalComponent.prototype.setBooleanValue = function (i, event) {
        //console.log(event.target.checked);
        if (event.target.checked)
            this.property.value[i].value = "true";
        else
            this.property.value[i].value = "false";
    };
    EditPropertyModalComponent.prototype.setValueDecimal = function (i, event) {
        this.property.valueDecimal[i] = event.target.value;
    };
    __decorate([
        core_1.ViewChild("modal"),
        __metadata("design:type", core_1.ElementRef)
    ], EditPropertyModalComponent.prototype, "modal", void 0);
    EditPropertyModalComponent = __decorate([
        core_1.Component({
            selector: "edit-property-modal",
            templateUrl: "./edit-property-modal.component.html",
            styleUrls: ["./edit-property-modal.component.css"]
        }),
        __metadata("design:paramtypes", [ng_bootstrap_1.NgbModal])
    ], EditPropertyModalComponent);
    return EditPropertyModalComponent;
}());
exports.EditPropertyModalComponent = EditPropertyModalComponent;
//# sourceMappingURL=edit-property-modal.component.js.map