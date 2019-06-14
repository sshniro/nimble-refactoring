"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var CataloguePaginationResponse = /** @class */ (function () {
    function CataloguePaginationResponse(catalogueUuid, // uuid of the catalogue
        size, // the number of catalogue lines which the catalogue contains
        catalogueLines, // catalogue lines of the catalogue
        categoryNames // names of the categories which are included in catalogue lines of the catalogue
    ) {
        if (catalogueUuid === void 0) { catalogueUuid = null; }
        if (size === void 0) { size = null; }
        if (catalogueLines === void 0) { catalogueLines = null; }
        if (categoryNames === void 0) { categoryNames = []; } // names of the categories which are included in catalogue lines of the catalogue
        this.catalogueUuid = catalogueUuid;
        this.size = size;
        this.catalogueLines = catalogueLines;
        this.categoryNames = categoryNames; // names of the categories which are included in catalogue lines of the catalogue
    }
    return CataloguePaginationResponse;
}());
exports.CataloguePaginationResponse = CataloguePaginationResponse;
//# sourceMappingURL=catalogue-pagination-response.js.map