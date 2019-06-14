"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var constants_1 = require("../catalogue/model/constants");
var text_1 = require("../catalogue/model/publish/text");
var http_1 = require("@angular/http");
var constants_2 = require("./constants");
var UI_NAMES = {
    STRING: "TEXT"
};
exports.COUNTRY_NAMES = getCountryNames();
var COUNTRY_JSON = getCountryJSON();
function getCountryNames() {
    var countriesFull = Countries.countries;
    var countryList = [];
    for (var country in countriesFull) {
        countryList.push(countriesFull[country]["name"]);
    }
    countryList.sort();
    return countryList;
}
function getCountryJSON() {
    var countriesFull = Countries.countries;
    var countryList = [];
    for (var country in countriesFull) {
        countryList.push({
            "iso": country,
            "name": countriesFull[country]["name"],
            "alt": countriesFull[country]["native"]
        });
    }
    return countryList;
}
function getCountryByISO(term) {
    var country = "";
    if (term.length == 2) {
        for (var i = 0; i < COUNTRY_JSON.length; i++) {
            if (COUNTRY_JSON[i].iso.toLowerCase() == term.toLowerCase())
                country = COUNTRY_JSON[i].name;
        }
    }
    return country;
}
exports.getCountryByISO = getCountryByISO;
function getCountrySuggestions(term) {
    var suggestionList = [];
    var suggestions = [];
    if (term != "") {
        for (var i = 0; i < COUNTRY_JSON.length; i++) {
            var prob = 0;
            if (term.length == 2) {
                if (COUNTRY_JSON[i].iso.toLowerCase() == term.toLowerCase())
                    prob = 1;
            }
            if (prob < 1) {
                if (COUNTRY_JSON[i].name.toLowerCase() == term.toLowerCase())
                    prob = 1;
                else if (COUNTRY_JSON[i].alt.toLowerCase() == term.toLowerCase())
                    prob = 1;
                else if (COUNTRY_JSON[i].name.toLowerCase().indexOf(term.toLowerCase()) == 0)
                    prob = 0.9;
                else if (COUNTRY_JSON[i].alt.toLowerCase().indexOf(term.toLowerCase()) == 0)
                    prob = 0.8;
                else if (COUNTRY_JSON[i].name.toLowerCase().indexOf(term.toLowerCase()) != -1)
                    prob = 0.7;
                else if (COUNTRY_JSON[i].alt.toLowerCase().indexOf(term.toLowerCase()) != -1)
                    prob = 0.6;
            }
            if (prob > 0) {
                suggestions.push({
                    "prob": prob,
                    "text": COUNTRY_JSON[i].name
                });
            }
        }
        suggestions = suggestions.sort(function (a, b) {
            var a_comp = a.prob;
            var b_comp = b.prob;
            return b_comp - a_comp;
        });
        for (var i = 0; i < Math.min(suggestions.length, 10); i++) {
            suggestionList.push(suggestions[i].text);
        }
    }
    return suggestionList;
}
exports.getCountrySuggestions = getCountrySuggestions;
function validateCountry(control) {
    var match = (exports.COUNTRY_NAMES.indexOf(control.value) != -1);
    if (!match) {
        return { invalidCountry: true };
    }
    return null;
}
exports.validateCountry = validateCountry;
function sanitizeLink(link) {
    var parsed_link = "";
    if (link && link != "") {
        if (link.indexOf("http://") == -1 && link.indexOf("https://") == -1) {
            parsed_link = "http://" + link;
        }
        else {
            parsed_link = link;
        }
        if (!checkURL(parsed_link))
            parsed_link = "";
    }
    return parsed_link;
}
exports.sanitizeLink = sanitizeLink;
function checkURL(url) {
    var expression = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)?/gi;
    var regex = new RegExp(expression);
    var match = false;
    if (url.match(regex))
        match = true;
    return match;
}
function sanitizeDataTypeName(dataType) {
    if (UI_NAMES[dataType]) {
        return UI_NAMES[dataType];
    }
    return dataType;
}
exports.sanitizeDataTypeName = sanitizeDataTypeName;
function sanitizePropertyName(name) {
    if (!name || name.length === 0) {
        return "(no name)";
    }
    var result = name.replace(/([a-z])([A-Z])/g, '$1 $2');
    return result.substr(0, 1).toUpperCase() + result.substr(1);
}
exports.sanitizePropertyName = sanitizePropertyName;
function copy(object) {
    return JSON.parse(JSON.stringify(object));
}
exports.copy = copy;
function isItemProperty(property) {
    return !!property.name; // preferredName for Property
}
/**
 * label object in the form of:
 * {
 *    "en": "English label",
 *    "es": "Spanish label"
 * }
 *
 * tries first to get label in the preferred language, then English label, then the first label.
 * If the label is not a json object, then the label itself is returned
 * @param label
 */
function selectNameFromLabelObject(label) {
    if (label == null) {
        return "";
    }
    var defaultLanguage = constants_1.DEFAULT_LANGUAGE();
    if (label[defaultLanguage] != null) {
        return label[defaultLanguage];
    }
    if (label["en"] != null) {
        return label["en"];
    }
    if (Object.keys.length > 0) {
        return label[Object.keys(label)[0]];
    }
    else {
        return label;
    }
}
exports.selectNameFromLabelObject = selectNameFromLabelObject;
function selectPreferredName(cp) {
    var defaultLanguage = constants_1.DEFAULT_LANGUAGE();
    var englishName = null;
    for (var _i = 0, _a = cp.preferredName; _i < _a.length; _i++) {
        var pName = _a[_i];
        if (pName.languageID === defaultLanguage) {
            return pName.value;
        }
        else if (pName.languageID == "en") {
            englishName = pName.value;
        }
    }
    if (englishName) {
        return englishName;
    }
    return cp.preferredName[0].value;
}
exports.selectPreferredName = selectPreferredName;
// returns the all values for the default language of the browser
// if there's no value for the defualt language of the browser, then returns english values if possible
function selectPreferredValues(texts) {
    var values = [];
    var defaultLanguage = constants_1.DEFAULT_LANGUAGE();
    var englishValues = [];
    for (var _i = 0, texts_1 = texts; _i < texts_1.length; _i++) {
        var text = texts_1[_i];
        if (text.languageID === defaultLanguage) {
            values.push(text.value);
        }
        else if (text.languageID == "en") {
            englishValues.push(text.value);
        }
    }
    // there are values for the default language of the browser
    if (values.length > 0) {
        return values;
    }
    // there are english values
    if (englishValues.length > 0) {
        return englishValues;
    }
    if (texts.length > 0 && texts[0].value)
        return [texts[0].value];
    else
        return [''];
}
exports.selectPreferredValues = selectPreferredValues;
// return the value for the default language of the browser
function selectPreferredValue(texts) {
    var defaultLanguage = constants_1.DEFAULT_LANGUAGE();
    var englishValue = null;
    for (var _i = 0, texts_2 = texts; _i < texts_2.length; _i++) {
        var text = texts_2[_i];
        if (text.languageID === defaultLanguage) {
            return text.value;
        }
        else if (text.languageID == "en") {
            englishValue = text.value;
        }
    }
    // there is an english value
    if (englishValue) {
        return englishValue;
    }
    if (texts.length > 0 && texts[0].value)
        return texts[0].value;
    else
        return '';
}
exports.selectPreferredValue = selectPreferredValue;
function selectName(ip) {
    var defaultLanguage = constants_1.DEFAULT_LANGUAGE();
    var englishName = null;
    for (var _i = 0, _a = ip.name; _i < _a.length; _i++) {
        var pName = _a[_i];
        if (pName.languageID === defaultLanguage) {
            return pName.value;
        }
        else if (pName.languageID == "en") {
            englishName = pName.value;
        }
    }
    if (englishName) {
        return englishName;
    }
    if (ip.name.length === 0)
        return '';
    return ip.name[0].value;
}
exports.selectName = selectName;
// textObject represents an object which contains languageId-value pairs
// this function is used to get value according to the default language of browser
function selectValueOfTextObject(textObject) {
    var defaultLanguage = constants_1.DEFAULT_LANGUAGE();
    var englishName = null;
    // get the keys
    var keys = Object.keys(textObject);
    for (var _i = 0, keys_1 = keys; _i < keys_1.length; _i++) {
        var key = keys_1[_i];
        // if there is a value for the default language, simply return it
        if (key == defaultLanguage) {
            return textObject[defaultLanguage];
        }
        else if (key == "en") {
            englishName = textObject[key];
        }
    }
    // if there's no value for default language, but an english value is available, then return it
    if (englishName) {
        return englishName;
    }
    // if there's no value for default language and english, then return the first value if possible
    if (keys.length > 0) {
        return textObject[keys[0]];
    }
    // if it is an empty object, return empty string.
    return "";
}
exports.selectValueOfTextObject = selectValueOfTextObject;
// for the given value, it creates a languageId-value pair.
// for now, languageId is the default language of the browser
function createTextObject(value) {
    var defaultLanguage = constants_1.DEFAULT_LANGUAGE();
    var textObject = {};
    textObject[defaultLanguage] = value;
    return textObject;
}
exports.createTextObject = createTextObject;
// For the given PartyName array, it finds the correct name of the party according to the default language of the browser.
function selectPartyName(partyNames) {
    var defaultLanguage = constants_1.DEFAULT_LANGUAGE();
    var englishName = null;
    for (var _i = 0, partyNames_1 = partyNames; _i < partyNames_1.length; _i++) {
        var partyName = partyNames_1[_i];
        // if the party has a name for the default language of the browser, return it
        if (partyName.name.languageID == defaultLanguage) {
            return partyName.name.value;
        }
        else if (partyName.name.languageID == "en") {
            englishName = partyName.name.value;
        }
    }
    // if the party does not have a name for the default language of the browser, but english name is available, then return it
    if (englishName) {
        return englishName;
    }
    // if there's no value for default language and english, then return the first value if possible
    if (partyNames.length > 0) {
        return partyNames[0].name.value;
    }
    // if the party has no names, return empty string
    return "";
}
exports.selectPartyName = selectPartyName;
function createText(value) {
    var language = constants_1.DEFAULT_LANGUAGE();
    return new text_1.Text(value, language);
}
exports.createText = createText;
function selectDescription(item) {
    if (item.description.length == 0) {
        return null;
    }
    var defaultLanguage = constants_1.DEFAULT_LANGUAGE();
    var englishName = null;
    for (var _i = 0, _a = item.description; _i < _a.length; _i++) {
        var pName = _a[_i];
        if (pName.languageID === defaultLanguage) {
            return pName.value;
        }
        else if (pName.languageID == "en") {
            englishName = pName.value;
        }
    }
    if (englishName)
        return englishName;
    return item.description[0].value;
}
exports.selectDescription = selectDescription;
function selectItemPropertyValuesAsString(ip, language) {
    if (language === null)
        language = constants_1.DEFAULT_LANGUAGE();
    var result = [];
    for (var _i = 0, _a = ip.value; _i < _a.length; _i++) {
        var pValue = _a[_i];
        if (pValue.languageID === language) {
            result.push(pValue.value);
        }
    }
    return result;
}
exports.selectItemPropertyValuesAsString = selectItemPropertyValuesAsString;
function getPropertyKey(property) {
    if (isItemProperty(property)) {
        return selectName(property) + "___" + property.valueQualifier;
    }
    //console.log(' Property: ', property);
    return selectPreferredName(property) + "___" + property.dataType;
}
exports.getPropertyKey = getPropertyKey;
function quantityToString(quantity) {
    if (quantity.value) {
        return quantity.value + " " + quantity.unitCode;
    }
    return "";
}
exports.quantityToString = quantityToString;
function amountToString(amount) {
    if (amount.value) {
        return amount.value + " " + amount.currencyID;
    }
    return "";
}
exports.amountToString = amountToString;
function durationToString(duration) {
    if (duration.value > 0) {
        return quantityToString(duration);
    }
    if (duration.value === 0) {
        return "None";
    }
    return "Not defined";
}
exports.durationToString = durationToString;
function periodToString(period) {
    return durationToString(period.durationMeasure);
}
exports.periodToString = periodToString;
var MAX_PRICE = 100000;
var STEPS_FOR_PRICE = 100;
function getMaximumQuantityForPrice(price) {
    if (!price || !price.priceAmount.value) {
        return 100;
    }
    var result = MAX_PRICE / price.priceAmount.value;
    return roundFirstDigit(result) * getMagnitude(result);
}
exports.getMaximumQuantityForPrice = getMaximumQuantityForPrice;
function getStepForPrice(price) {
    return getMaximumQuantityForPrice(price) / STEPS_FOR_PRICE;
}
exports.getStepForPrice = getStepForPrice;
function getMagnitude(value) {
    return Math.pow(10, Math.floor(Math.log10(value)));
}
function round5(value) {
    return Math.round(value / 5) * 5;
}
// rounds the first digit of a number to the nearest 5 or 10
function roundFirstDigit(value) {
    var roundedDigit = round5(value / getMagnitude(value));
    if (roundedDigit == 0) {
        roundedDigit = 1;
    }
    return roundedDigit;
}
var CURRENCIES_STRING_VALUES = {};
function getFileExtension(filename) {
    var ext = /^.+\.([^.]+)$/.exec(filename);
    return ext == null ? "" : ext[1];
}
exports.getFileExtension = getFileExtension;
function roundToTwoDecimals(value) {
    if (!isNaN(value) && value !== null && value != 0) {
        // round to minimum possible decimal >= 2
        var roundedValue = 0;
        var power = 1;
        do {
            power++;
            roundedValue = Math.round(value * Math.pow(10, power)) / Math.pow(10, power);
        } while (roundedValue == 0);
        return roundedValue.toFixed(power);
    }
    return value;
}
exports.roundToTwoDecimals = roundToTwoDecimals;
function trimRedundantDecimals(value) {
    var roundedValue = 0;
    var power = -1;
    do {
        power++;
        roundedValue = Math.round(value * Math.pow(10, power)) / Math.pow(10, power);
    } while (roundedValue == 0);
    return roundedValue;
}
exports.trimRedundantDecimals = trimRedundantDecimals;
function isNaNNullAware(number) {
    if (isNaN(number) || number == null) {
        return true;
    }
    return false;
}
exports.isNaNNullAware = isNaNNullAware;
function isValidPrice(value, maximumDecimals) {
    if (maximumDecimals === void 0) { maximumDecimals = constants_2.maximumDecimalsForPrice; }
    if (value != null && !isNaN(value) && value !== "") {
        var decimals = countDecimals(value);
        return (decimals <= maximumDecimals);
    }
    else {
        return false;
    }
}
exports.isValidPrice = isValidPrice;
function countDecimals(value) {
    if (Math.floor(value) === value)
        return 0;
    return value.toString().split(".")[1].length || 0;
}
exports.countDecimals = countDecimals;
function currencyToString(currencyId) {
    return CURRENCIES_STRING_VALUES[currencyId] || currencyId;
}
exports.currencyToString = currencyToString;
function sortCategories(categories) {
    return categories.sort(function (a, b) { return selectPreferredName(a).localeCompare(selectPreferredName(b)); });
}
exports.sortCategories = sortCategories;
function sortProperties(properties) {
    return properties.sort(function (a, b) { return selectPreferredName(a).localeCompare(selectPreferredName(b)); });
}
exports.sortProperties = sortProperties;
function scrollToDiv(divId) {
    if (document.getElementById(divId))
        document.getElementById(divId).scrollIntoView();
}
exports.scrollToDiv = scrollToDiv;
function isCustomProperty(property) {
    return property && property.itemClassificationCode.listID === constants_1.CUSTOM_PROPERTY_LIST_ID;
}
exports.isCustomProperty = isCustomProperty;
function getPropertyValues(property) {
    switch (property.valueQualifier) {
        case "INT":
        case "DOUBLE":
        case "NUMBER":
            return property.valueDecimal;
        case "FILE":
            return property.valueBinary;
        case "QUANTITY":
            return property.valueQuantity;
        case "STRING":
        case "BOOLEAN":
            return property.value;
    }
}
exports.getPropertyValues = getPropertyValues;
function getPropertyValuesAsStrings(property) {
    switch (property.valueQualifier) {
        case "INT":
        case "DOUBLE":
        case "NUMBER":
            return property.valueDecimal.map(function (num) { return String(num); });
        case "FILE":
            return property.valueBinary.map(function (bin) { return bin.fileName; });
        case "QUANTITY":
            return property.valueQuantity.map(function (qty) { return qty.value + " " + qty.unitCode; });
        case "STRING":
            return selectPreferredValues(property.value);
        case "BOOLEAN":
            if (property.value.length === 0)
                return ['false'];
            else
                return [property.value[0].value];
    }
}
exports.getPropertyValuesAsStrings = getPropertyValuesAsStrings;
function isTransportService(product) {
    if (product) {
        for (var _i = 0, _a = product.goodsItem.item.commodityClassification; _i < _a.length; _i++) {
            var commodityClassification = _a[_i];
            if (commodityClassification.itemClassificationCode.listID == "Default" && commodityClassification.itemClassificationCode.value == "Transport Service") {
                return true;
            }
        }
    }
    return false;
}
exports.isTransportService = isTransportService;
function isLogisticsService(product) {
    if (product) {
        for (var _i = 0, _a = product.goodsItem.item.commodityClassification; _i < _a.length; _i++) {
            var commodityClassification = _a[_i];
            if (commodityClassification.itemClassificationCode.listID == "Default") {
                if (commodityClassification.itemClassificationCode.value == "Logistics Service" || commodityClassification.itemClassificationCode.value == "Transport Service") {
                    return true;
                }
            }
        }
    }
    return false;
}
exports.isLogisticsService = isLogisticsService;
function deepEquals(obj1, obj2) {
    if (obj1 === obj2) {
        return true;
    }
    // simple cases should be compared with obj1 === obj2
    // let's consider functions immutable here...
    if (typeof obj1 !== "object") {
        return false;
    }
    // array case
    if (Array.isArray(obj1)) {
        if (!Array.isArray(obj2)) {
            return false;
        }
        if (obj1.length !== obj2.length) {
            return false;
        }
        for (var i = 0; i < obj1.length; i++) {
            if (!deepEquals(obj1[i], obj2[i])) {
                return false;
            }
        }
        return true;
    }
    var keys1 = Object.keys(obj1);
    var keys2 = Object.keys(obj2);
    if (keys1.length !== keys2.length) {
        return false;
    }
    for (var i = 0; i < keys1.length; i++) {
        // obj2[keys1[i]] is NOT a mistake, keys may be ordered differently...
        if (!deepEquals(obj1[keys1[i]], obj2[keys1[i]])) {
            return false;
        }
    }
    return true;
}
exports.deepEquals = deepEquals;
function removeHjids(json) {
    var ret = JSON.parse(JSON.stringify(json));
    var keys = Object.keys(ret);
    for (var i = 0; i < keys.length; i++) {
        if (keys[i] == "hjid")
            ret[keys[i]] = null;
        else if (ret[keys[i]] && typeof (ret[keys[i]]) === "object") {
            var keys_inner = Object.keys(ret[keys[i]]);
            if (keys_inner.length > 0)
                ret[keys[i]] = this.removeHjids(ret[keys[i]]);
        }
    }
    return ret;
}
exports.removeHjids = removeHjids;
function getAuthorizedHeaders(cookieService) {
    var token = 'Bearer ' + cookieService.get("bearer_token");
    var headers = new http_1.Headers({ 'Content-Type': 'application/json', 'Accept': 'application/json', 'Authorization': token });
    return headers;
}
exports.getAuthorizedHeaders = getAuthorizedHeaders;
//# sourceMappingURL=utils.js.map