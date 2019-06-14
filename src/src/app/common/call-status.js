"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Created by suat on 29-Sep-17.
 */
var CallStatus = /** @class */ (function () {
    function CallStatus(fb_submitted, fb_callback, fb_errordetc, fb_autoCloseOnCallBack, fb_message, fb_details, fb_showDetails) {
        if (fb_submitted === void 0) { fb_submitted = false; }
        if (fb_callback === void 0) { fb_callback = false; }
        if (fb_errordetc === void 0) { fb_errordetc = false; }
        if (fb_autoCloseOnCallBack === void 0) { fb_autoCloseOnCallBack = false; }
        if (fb_message === void 0) { fb_message = ""; }
        if (fb_details === void 0) { fb_details = ""; }
        if (fb_showDetails === void 0) { fb_showDetails = false; }
        this.fb_submitted = fb_submitted;
        this.fb_callback = fb_callback;
        this.fb_errordetc = fb_errordetc;
        this.fb_autoCloseOnCallBack = fb_autoCloseOnCallBack;
        this.fb_message = fb_message;
        this.fb_details = fb_details;
        this.fb_showDetails = fb_showDetails;
    }
    CallStatus.prototype.submit = function () {
        this.fb_submitted = true;
        this.fb_errordetc = false;
        this.fb_callback = false;
    };
    CallStatus.prototype.callback = function (msg, autoClose) {
        if (autoClose === void 0) { autoClose = false; }
        this.fb_message = msg;
        this.fb_submitted = false;
        this.fb_errordetc = false;
        this.fb_callback = true;
        this.fb_autoCloseOnCallBack = autoClose;
    };
    CallStatus.prototype.error = function (msg, error) {
        this.fb_message = msg;
        this.fb_submitted = false;
        this.fb_errordetc = true;
        this.fb_callback = false;
        this.fb_details = "";
        this.fb_showDetails = false;
        if (error) {
            this.fb_details = "Error " + error.status;
            if (error._body != "") {
                var errorJSON = {};
                try {
                    errorJSON = JSON.parse(error._body);
                    if (errorJSON["error"] || errorJSON["exception"] || errorJSON["message"]) {
                        if (errorJSON["error"]) {
                            this.fb_details += "<br/>";
                            this.fb_details += errorJSON["error"];
                        }
                        if (errorJSON["message"]) {
                            this.fb_details += "<br/>";
                            this.fb_details += errorJSON["message"];
                        }
                        if (errorJSON["exception"]) {
                            this.fb_details += "<br/>";
                            this.fb_details += errorJSON["exception"];
                        }
                    }
                    // the error data is not in the json format, so it's shown as it is
                }
                catch (e) {
                    if (error._body != null) {
                        this.fb_details = error._body;
                    }
                    else {
                        this.fb_details = error;
                    }
                }
            }
        }
    };
    CallStatus.prototype.reset = function () {
        this.fb_submitted = false;
        this.fb_errordetc = false;
        this.fb_callback = false;
    };
    CallStatus.prototype.isComplete = function () {
        return this.fb_callback || this.fb_errordetc;
    };
    CallStatus.prototype.isLoading = function () {
        return this.fb_submitted;
    };
    CallStatus.prototype.isDisplayed = function () {
        return this.fb_submitted || this.fb_errordetc || (this.fb_callback && !this.fb_autoCloseOnCallBack);
    };
    CallStatus.prototype.isError = function () {
        return this.fb_errordetc;
    };
    return CallStatus;
}());
exports.CallStatus = CallStatus;
//# sourceMappingURL=call-status.js.map