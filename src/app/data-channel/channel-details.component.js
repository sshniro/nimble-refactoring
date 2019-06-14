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
var data_channel_service_1 = require("./data-channel.service");
var machine_1 = require("./model/machine");
var sensor_1 = require("./model/sensor");
var NewSensor = /** @class */ (function () {
    function NewSensor(name, description, machineName) {
        this.name = name;
        this.description = description;
        this.machineName = machineName;
    }
    return NewSensor;
}());
var ChannelDetailsComponent = /** @class */ (function () {
    function ChannelDetailsComponent(route, dataChannelService, router) {
        this.route = route;
        this.dataChannelService = dataChannelService;
        this.router = router;
        this.channelConfig = {};
        this.channelMessages = [];
        this.channelSensors = [];
        this.newSensor = new NewSensor(null, null, null);
    }
    ChannelDetailsComponent.prototype.ngOnInit = function () {
        this.update();
    };
    ChannelDetailsComponent.prototype.update = function () {
        var _this = this;
        var channelID = this.route.snapshot.params['channelID'];
        // get metadata of channel
        this.dataChannelService.getChannelConfig(channelID)
            .then(function (channelConfig) {
            _this.channelConfig = channelConfig;
        });
        // get sensors
        this.dataChannelService.getAssociatedSensors(channelID)
            .then(function (sensors) {
            _this.channelSensors = sensors;
        });
        // get messages of channels
        this.dataChannelService.getChannelMessages(channelID)
            .then(function (messages) {
            _this.channelMessages = messages.map(JSON.parse);
        });
    };
    ChannelDetailsComponent.prototype.deleteChannel = function () {
        var _this = this;
        var channelId = this.channelConfig["channelID"];
        this.dataChannelService.deleteChannel(channelId)
            .then(function () {
            alert("Deleted Channel");
            _this.router.navigate(["dashboard"]);
        })
            .catch(function () {
            alert("Error while deleting channel");
        });
    };
    ChannelDetailsComponent.prototype.addSensor = function () {
        var _this = this;
        // create sensor locally
        var machine = new machine_1.Machine(this.newSensor.machineName, null, null);
        var sensor = new sensor_1.Sensor(this.newSensor.name, this.newSensor.description, machine);
        // add to backend
        var channelId = this.channelConfig["channelID"];
        this.dataChannelService.addSensor(channelId, sensor)
            .then(function (addedSensor) {
            _this.update();
        })
            .catch(function () {
            alert("Error while adding sensor");
        });
    };
    ChannelDetailsComponent.prototype.removeSensor = function (sensor) {
        var _this = this;
        var channelId = this.channelConfig["channelID"];
        this.dataChannelService.removeSensor(channelId, sensor)
            .then(function () {
            _this.update();
        })
            .catch(function () {
            _this.update();
        });
    };
    ChannelDetailsComponent = __decorate([
        core_1.Component({
            selector: 'channel-details',
            templateUrl: './channel-details.component.html',
            styleUrls: ['./channel-details.component.css']
        }),
        __metadata("design:paramtypes", [router_1.ActivatedRoute,
            data_channel_service_1.DataChannelService,
            router_1.Router])
    ], ChannelDetailsComponent);
    return ChannelDetailsComponent;
}());
exports.ChannelDetailsComponent = ChannelDetailsComponent;
//# sourceMappingURL=channel-details.component.js.map