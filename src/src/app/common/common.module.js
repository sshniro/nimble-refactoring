"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var forms_1 = require("@angular/forms");
var http_1 = require("@angular/http");
var common_1 = require("@angular/common");
var ng_bootstrap_1 = require("@ng-bootstrap/ng-bootstrap");
var call_status_component_1 = require("./call-status.component");
var text_input_component_1 = require("./text-input.component");
var options_input_component_1 = require("./options-input.component");
var quantity_input_component_1 = require("./quantity-input.component");
var plain_amount_input_component_1 = require("./plain-amount-input.component");
var file_input_component_1 = require("./file-input.component");
var date_input_component_1 = require("./date-input.component");
var address_input_component_1 = require("./address-input.component");
var address_input_simple_component_1 = require("./address-input-simple.component");
var boolean_input_component_1 = require("./boolean-input.component");
var multi_address_input_component_1 = require("./multi-address-input.component");
var input_label_component_1 = require("./input-label.component");
var amount_input_component_1 = require("./amount-input.component");
var expandable_flex_row_component_1 = require("./expandable-flex-row.component");
var AppCommonModule = /** @class */ (function () {
    function AppCommonModule() {
    }
    AppCommonModule = __decorate([
        core_1.NgModule({
            imports: [
                common_1.CommonModule,
                forms_1.FormsModule,
                http_1.HttpModule,
                forms_1.ReactiveFormsModule,
                ng_bootstrap_1.NgbModule.forRoot()
            ],
            declarations: [
                call_status_component_1.CallStatusComponent,
                text_input_component_1.TextInputComponent,
                options_input_component_1.OptionsInputComponent,
                quantity_input_component_1.QuantityInputComponent,
                plain_amount_input_component_1.PlainAmountInputComponent,
                file_input_component_1.FileInputComponent,
                date_input_component_1.DateInputComponent,
                address_input_component_1.AddressInputComponent,
                address_input_simple_component_1.AddressInputSimpleComponent,
                boolean_input_component_1.BooleanInputComponent,
                multi_address_input_component_1.MultiAddressInputComponent,
                input_label_component_1.InputLabelComponent,
                amount_input_component_1.AmountInputComponent,
                expandable_flex_row_component_1.ExpandableFlexRow
            ],
            exports: [
                call_status_component_1.CallStatusComponent,
                text_input_component_1.TextInputComponent,
                options_input_component_1.OptionsInputComponent,
                quantity_input_component_1.QuantityInputComponent,
                plain_amount_input_component_1.PlainAmountInputComponent,
                file_input_component_1.FileInputComponent,
                date_input_component_1.DateInputComponent,
                address_input_component_1.AddressInputComponent,
                address_input_simple_component_1.AddressInputSimpleComponent,
                boolean_input_component_1.BooleanInputComponent,
                multi_address_input_component_1.MultiAddressInputComponent,
                input_label_component_1.InputLabelComponent,
                amount_input_component_1.AmountInputComponent,
                expandable_flex_row_component_1.ExpandableFlexRow
            ],
            providers: []
        })
    ], AppCommonModule);
    return AppCommonModule;
}());
exports.AppCommonModule = AppCommonModule;
//# sourceMappingURL=common.module.js.map