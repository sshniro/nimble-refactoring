"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Created by deniz on 16/07/17.
 */
var LocationCoordinate = /** @class */ (function () {
    function LocationCoordinate(coordinateSystemCode, latitudeDegreesMeasure, latitudeMinutesMeasure, latitudeDirectionCode, longitudeDegreesMeasure, longitudeMinutesMeasure, longitudeDirectionCode, altitudeMeasure, hjid) {
        this.coordinateSystemCode = coordinateSystemCode;
        this.latitudeDegreesMeasure = latitudeDegreesMeasure;
        this.latitudeMinutesMeasure = latitudeMinutesMeasure;
        this.latitudeDirectionCode = latitudeDirectionCode;
        this.longitudeDegreesMeasure = longitudeDegreesMeasure;
        this.longitudeMinutesMeasure = longitudeMinutesMeasure;
        this.longitudeDirectionCode = longitudeDirectionCode;
        this.altitudeMeasure = altitudeMeasure;
        this.hjid = hjid;
    }
    return LocationCoordinate;
}());
exports.LocationCoordinate = LocationCoordinate;
//# sourceMappingURL=location-coordinate.js.map