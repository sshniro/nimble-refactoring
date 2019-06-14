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
require("rxjs/add/operator/switchMap");
var core_1 = require("@angular/core");
var router_1 = require("@angular/router");
var common_1 = require("@angular/common");
var bp_service_1 = require("./bp.service");
var process_configuration_1 = require("./model/process-configuration");
var transaction_configuration_1 = require("./model/transaction-configuration");
var execution_configuration_1 = require("./model/execution-configuration");
var external_diagram_1 = require("./lib/external-diagram");
var BPConfigureComponent = /** @class */ (function () {
    function BPConfigureComponent(bpService, route, location) {
        this.bpService = bpService;
        this.route = route;
        this.location = location;
        this.partnerID = 'buyer1387';
        this.partnerRole = '';
        this.configuration = new process_configuration_1.ProcessConfiguration(this.partnerID, this.partnerRole, '', []);
        this.selectedTransactionID = '';
        this.startSelecting = false;
    }
    BPConfigureComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.route.paramMap
            .switchMap(function (params) { return _this.bpService.getBP(params.get('processID')); })
            .subscribe(function (bp) { return _this.bp = bp; });
    };
    BPConfigureComponent.prototype.ngAfterViewInit = function () {
        var _this = this;
        setTimeout(function () {
            _this.diagram = new external_diagram_1.ExternalDiagram();
            _this.diagram.draw_static_diagram(_this.bp.textContent);
        }, 500);
        setTimeout(function () {
            jQuery('.actor').hover(_this.mouse_enter_actor_function, _this.mouse_exit_actor_function);
            jQuery('.signal').hover(_this.mouse_enter_signal_function, _this.mouse_exit_signal_function);
            jQuery('.actor').click('click', function (event) {
                var element = event.target;
                var roleName = '';
                if (element.tagName === 'path') {
                    var tspanElement = element.parentElement.getElementsByTagName('tspan')[0];
                    roleName = tspanElement.textContent;
                }
                else if (element.tagName === 'tspan') {
                    roleName = element.textContent;
                }
                _this.partnerRole = roleName.toUpperCase();
                // Now handle all the actor boxes
                var svgElement = element.ownerSVGElement;
                var groupElements = svgElement.getElementsByTagName('g');
                for (var i = 0; i < groupElements.length; i++) {
                    var gElement = groupElements.item(i);
                    if (gElement.getAttribute('class') !== 'actor') {
                        continue;
                    }
                    var tspanElement = gElement.getElementsByTagName('tspan')[0];
                    var pathElement = gElement.getElementsByTagName('path')[0];
                    if (tspanElement.textContent === roleName) {
                        if (pathElement.style.fill !== 'gray') {
                            pathElement.style.fill = 'gray';
                        }
                        else {
                            pathElement.style.fill = 'white';
                            _this.partnerRole = '';
                        }
                    }
                    else {
                        pathElement.style.fill = 'white';
                    }
                }
                //console.log(' $$$ Partner role: ', this.partnerRole);
                _this.route.paramMap
                    .switchMap(function (params) { return _this.bpService.getConfiguration(_this.partnerID, params.get('processID'), _this.partnerRole); })
                    .subscribe(function (configuration) {
                    _this.configuration = configuration;
                    //console.log(' $$$ Retrieved configuration: ', this.configuration);
                    if (_this.selectedTransactionID !== '') {
                        _this.onSelect();
                    }
                });
            });
            jQuery('.signal').on('click', function (event) {
                var element = event.target;
                var transactionID = '';
                if (element.tagName === 'tspan') {
                    transactionID = element.textContent;
                }
                else if (element.tagName === 'path') {
                    var tspanElement = element.previousElementSibling.getElementsByTagName('tspan')[0];
                    transactionID = tspanElement.textContent;
                }
                _this.selectedTransactionID = transactionID.toUpperCase().replace(/\s/g, '');
                // now handle the rest of the transactions
                var svgElement = element.ownerSVGElement;
                var groupElements = svgElement.getElementsByTagName('g');
                for (var i = 0; i < groupElements.length; i++) {
                    var gElement = groupElements.item(i);
                    if (gElement.getAttribute('class') !== 'signal') {
                        continue;
                    }
                    var tspanElement = gElement.getElementsByTagName('tspan')[0];
                    var pathElement = gElement.getElementsByTagName('path')[0];
                    if (tspanElement.textContent === transactionID) {
                        if (pathElement.style.stroke !== 'maroon') {
                            pathElement.style.stroke = 'maroon';
                            tspanElement.style.fill = 'maroon';
                        }
                        else {
                            pathElement.style.stroke = 'black';
                            tspanElement.style.fill = 'black';
                            _this.selectedTransactionID = '';
                        }
                    }
                    else {
                        pathElement.style.stroke = 'black';
                        tspanElement.style.fill = 'black';
                    }
                }
                //console.log(' $$$ Transaction ID ', this.selectedTransactionID);
                _this.onSelect();
            });
            _this.startSelecting = true;
        }, 3000);
    };
    BPConfigureComponent.prototype.onSelect = function () {
        this.dataAdapterURI = '';
        this.dataAdapterType = '';
        this.dataProcessorURI = '';
        this.dataProcessorType = '';
        this.dataChannelURI = '';
        this.dataChannelType = '';
        if (this.configuration != null && this.configuration.transactionConfigurations != null) {
            for (var _i = 0, _a = this.configuration.transactionConfigurations; _i < _a.length; _i++) {
                var t = _a[_i];
                if (this.selectedTransactionID === t.transactionID) {
                    var executionConfigurations = t.executionConfigurations;
                    for (var _b = 0, executionConfigurations_1 = executionConfigurations; _b < executionConfigurations_1.length; _b++) {
                        var ec = executionConfigurations_1[_b];
                        if (ec.applicationType === 'DATAADAPTER') {
                            this.dataAdapterURI = ec.executionUri;
                            this.dataAdapterType = ec.executionType;
                        }
                        else if (ec.applicationType === 'DATAPROCESSOR') {
                            this.dataProcessorURI = ec.executionUri;
                            this.dataProcessorType = ec.executionType;
                        }
                        else if (ec.applicationType === 'DATACHANNEL') {
                            this.dataChannelURI = ec.executionUri;
                            this.dataChannelType = ec.executionType;
                        }
                    }
                }
            }
        }
    };
    BPConfigureComponent.prototype.configure = function () {
        this.configuration.partnerID = this.partnerID;
        this.configuration.processID = this.bp.processID;
        this.configuration.roleType = this.partnerRole;
        var transactionConfiguration = new transaction_configuration_1.TransactionConfiguration(this.selectedTransactionID, []);
        var dataAdapterExecutionConfiguration = new execution_configuration_1.ExecutionConfiguration('DATAADAPTER', this.dataAdapterType, this.dataAdapterURI);
        transactionConfiguration.executionConfigurations.push(dataAdapterExecutionConfiguration);
        var dataProcessorExecutionConfiguration = new execution_configuration_1.ExecutionConfiguration('DATAPROCESSOR', this.dataProcessorType, this.dataProcessorURI);
        transactionConfiguration.executionConfigurations.push(dataProcessorExecutionConfiguration);
        var dataChannelExecutionConfiguration = new execution_configuration_1.ExecutionConfiguration('DATACHANNEL', this.dataChannelType, this.dataChannelURI);
        transactionConfiguration.executionConfigurations.push(dataChannelExecutionConfiguration);
        //console.log(' $$$ Constructed TransactionConfiguration: ', transactionConfiguration);
        //console.log(' $$$ Existing TransactionConfigurations: ', this.configuration.transactionConfigurations);
        if (this.configuration.transactionConfigurations != null && this.configuration.transactionConfigurations.length > 0) {
            var found = false;
            for (var _i = 0, _a = this.configuration.transactionConfigurations; _i < _a.length; _i++) {
                var t = _a[_i];
                if (this.selectedTransactionID === t.transactionID) {
                    var index = this.configuration.transactionConfigurations.indexOf(t);
                    this.configuration.transactionConfigurations[index] = transactionConfiguration;
                    found = true;
                }
                if (!found) {
                    this.configuration.transactionConfigurations.push(transactionConfiguration);
                }
            }
        }
        else {
            this.configuration.transactionConfigurations.push(transactionConfiguration);
        }
        //console.log(' $$$ TransactionConfigurations after processing: ', this.configuration.transactionConfigurations);
        this.bpService.updateConfiguration(this.configuration)
            .subscribe(function () {
        });
    };
    BPConfigureComponent.prototype.goBack = function () {
        this.location.back();
    };
    BPConfigureComponent.prototype.mouse_enter_actor_function = function (event) {
        var element = event.target;
        if (element.tagName === 'path') {
            if (element.style.fill !== 'gray') {
                element.style.fill = 'lightgray';
            }
        }
    };
    BPConfigureComponent.prototype.mouse_exit_actor_function = function (event) {
        var element = event.target;
        if (element.tagName === 'path') {
            if (element.style.fill === 'lightgray') {
                element.style.fill = 'white';
            }
        }
    };
    BPConfigureComponent.prototype.mouse_enter_signal_function = function (event) {
        var element = event.target;
        if (element.tagName === 'tspan') {
            if (element.style.fill !== 'maroon') {
                element.style.fill = 'crimson';
                var pathElement = element.parentElement.nextElementSibling;
                pathElement.style.stroke = 'crimson';
            }
        }
        else if (element.tagName === 'path') {
            if (element.style.stroke !== 'maroon') {
                element.style.stroke = 'crimson';
                var tspanElement = element.previousElementSibling.getElementsByTagName('tspan')[0];
                tspanElement.style.fill = 'crimson';
            }
        }
    };
    BPConfigureComponent.prototype.mouse_exit_signal_function = function (event) {
        var element = event.target;
        if (element.tagName === 'tspan') {
            if (element.style.fill === 'crimson') {
                element.style.fill = 'black';
                var pathElement = element.parentElement.nextElementSibling;
                pathElement.style.stroke = 'black';
            }
        }
        else if (element.tagName === 'path') {
            if (element.style.stroke === 'crimson') {
                element.style.stroke = 'black';
                var tspanElement = element.previousElementSibling.getElementsByTagName('tspan')[0];
                tspanElement.style.fill = 'black';
            }
        }
    };
    BPConfigureComponent = __decorate([
        core_1.Component({
            selector: 'bp-configure',
            templateUrl: './bp-configure.component.html'
        }),
        __metadata("design:paramtypes", [bp_service_1.BPService,
            router_1.ActivatedRoute,
            common_1.Location])
    ], BPConfigureComponent);
    return BPConfigureComponent;
}());
exports.BPConfigureComponent = BPConfigureComponent;
//# sourceMappingURL=bp-configure.component.js.map