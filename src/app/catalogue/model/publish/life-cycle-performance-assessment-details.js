"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var lcpa_input_1 = require("./lcpa-input");
var lcpa_output_1 = require("./lcpa-output");
var LifeCyclePerformanceAssessmentDetails = /** @class */ (function () {
    function LifeCyclePerformanceAssessmentDetails(lcpainput, lcpaoutput) {
        if (lcpainput === void 0) { lcpainput = new lcpa_input_1.LCPAInput(); }
        if (lcpaoutput === void 0) { lcpaoutput = new lcpa_output_1.LCPAOutput(); }
        this.lcpainput = lcpainput;
        this.lcpaoutput = lcpaoutput;
    }
    return LifeCyclePerformanceAssessmentDetails;
}());
exports.LifeCyclePerformanceAssessmentDetails = LifeCyclePerformanceAssessmentDetails;
//# sourceMappingURL=life-cycle-performance-assessment-details.js.map