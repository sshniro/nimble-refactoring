"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.INCOTERMS = [
    "",
    "CIF (Cost, Insurance and Freight)",
    "CIP (Carriage and Insurance Paid to)",
    "CFR (Cost and Freight)",
    "CPT (Carriage paid to)",
    "DAT (Delivered at Terminal)",
    "DAP (Delivered at Place)",
    "DDP (Delivery Duty Paid)",
    "EXW (Ex Works)",
    "FAS (Free Alongside Ship)",
    "FCA (Free Carrier)",
    "FOB (Free on Board)"
];
exports.PAYMENT_MEANS = [
    "Credit Card",
    "ACH Transfer",
    "Wire Transfer",
    "Cash On Delivery"
];
exports.NEGOTIATION_RESPONSES = {
    ACCEPTED: "Accepted",
    TERMS_UPDATED: "Terms Updated",
    REJECTED: "Rejected"
};
exports.CURRENCIES = [
    "EUR",
    "USD",
    "SEK"
];
exports.CATALOGUE_LINE_SORT_OPTIONS = [
    { name: "PRICE_LOW_TO_HIGH", value: "Price:Low to High" },
    { name: "PRICE_HIGH_TO_LOW", value: "Price:High to Low" }
];
exports.FAVOURITE_LINEITEM_PUT_OPTIONS = [
    { name: "ITEM_PUT", value: 1 },
    { name: "LIST_REMOVE", value: 2 }
];
exports.CUSTOM_PROPERTY_LIST_ID = "Custom";
exports.PROPERTY_TYPES = [
    { name: "Text", value: "STRING" },
    { name: "Number", value: "NUMBER" },
    { name: "Image", value: "FILE" },
    { name: "File", value: "FILE" },
    { name: "Quantity", value: "QUANTITY" },
    { name: "Boolean", value: "BOOLEAN" },
];
exports.TRANSPORT_SERVICE_CATEGORY_NAME = "Transport service";
exports.PPAP_CERTIFICATES = [
    "Appearance Approval Report",
    "Checking Aids",
    "Control Plan",
    "Customer Engineering Approval",
    "Customer Specific Requirements",
    "Design Documentation",
    "Design Failure Mode and Effects Analysis",
    "Dimensional Results",
    "Engineering Change Documentation",
    "Initial Process Studies",
    "Master Sample",
    "Measurement System Analysis Studies",
    "Part Submission Warrant",
    "Process Failure Mode and Effects Analysis",
    "Process Flow Diagram",
    "Qualified Laboratory Documentation",
    "Records of Material / Performance Tests",
    "Sample Production Parts"
];
exports.REGIONS = [
    "Europe",
    "Asia",
    "Africa",
    "North America",
    "South America",
    "Oceania"
];
exports.PRICE_OPTIONS = {
    ORDERED_QUANTITY: { text: 'Ordered Quantity', typeID: 1 },
    PRODUCT_PROPERTY: { text: 'Product Property', typeID: 2 },
    DELIVERY_PERIOD: { text: 'Delivery Period', typeID: 4 },
    INCOTERM: { text: 'Incoterm', typeID: 8 },
    PAYMENT_MEAN: { text: 'Payment Mean', typeID: 16 },
    DELIVERY_LOCATION: { text: 'Delivery Location', typeID: 32 }
};
exports.DISCOUNT_TARGETS = {
    TOTAL_PRICE: 'Total Price',
    PER_UNIT: 'Per Unit'
};
exports.DISCOUNT_UNITS = exports.CURRENCIES.concat(['%']);
exports.LANGUAGES = ["en", "es", "de", "tr", "it"];
exports.DEFAULT_LANGUAGE = function () {
    var languageId = navigator.language.indexOf('-') == -1 ? navigator.language : navigator.language.substring(0, navigator.language.indexOf('-'));
    if (exports.LANGUAGES.indexOf(languageId) == -1) {
        return "en";
    }
    return languageId;
};
//# sourceMappingURL=constants.js.map