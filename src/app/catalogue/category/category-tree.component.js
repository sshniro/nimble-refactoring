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
var category_1 = require("../model/category/category");
var category_service_1 = require("./category.service");
var call_status_1 = require("../../common/call-status");
var utils_1 = require("../../common/utils");
var CategoryTreeComponent = /** @class */ (function () {
    function CategoryTreeComponent(categoryService) {
        this.categoryService = categoryService;
        this.expanded = false;
        this.border = true;
        this.level = 1;
        this.getCategoryStatus = new call_status_1.CallStatus;
        this.detailsEvent = new core_1.EventEmitter();
    }
    CategoryTreeComponent.prototype.ngOnInit = function () {
    };
    CategoryTreeComponent.prototype.selectPreferredName = function (cp) {
        return utils_1.selectPreferredName(cp);
    };
    Object.defineProperty(CategoryTreeComponent.prototype, "parentCategories", {
        get: function () {
            return this._parentCategories;
        },
        set: function (parentCategories) {
            if (this.category.taxonomyId == "eClass" || (this.category.taxonomyId == "FurnitureOntology" && this.numberOfSteps > -1)) {
                this._parentCategories = parentCategories;
                if (parentCategories && this.category.code === parentCategories.parents[this.level - 1].code && this.level < parentCategories.parents.length) {
                    this.expanded = true;
                    this.childrenCategories = utils_1.sortCategories(parentCategories.categories[this.level]);
                }
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CategoryTreeComponent.prototype, "scrollToDivId", {
        set: function (divId) {
            var _this = this;
            this._scrollToDivId = divId;
            setTimeout((function () {
                if (_this.category.code === divId) {
                    utils_1.scrollToDiv(_this.category.code);
                }
            }), 0);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CategoryTreeComponent.prototype, "scrollToDiv", {
        get: function () {
            return this._scrollToDivId;
        },
        enumerable: true,
        configurable: true
    });
    CategoryTreeComponent.prototype.toggleExpanded = function (event) {
        event.stopPropagation;
        this.expanded = !this.expanded;
        if (this.expanded && !this.childrenCategories) {
            this.getCategoryTree();
        }
    };
    CategoryTreeComponent.prototype.getCategoryTree = function () {
        var _this = this;
        this.getCategoryStatus.submit();
        this.categoryService.getChildrenCategories(this.category)
            .then(function (categories) {
            _this.childrenCategories = utils_1.sortCategories(categories);
            _this.getCategoryStatus.callback("Category tree created", true);
        })
            .catch(function (error) {
            _this.getCategoryStatus.error("Error creating category tree", error);
        });
    };
    CategoryTreeComponent.prototype.showDetails = function (category) {
        if (category === void 0) { category = this.category; }
        if (!this.loadingStatus) {
            this.detailsEvent.emit(category);
            if (!this.childrenCategories)
                this.getCategoryTree();
        }
    };
    CategoryTreeComponent.prototype.isSelected = function () {
        if (this.selectedCategory != null) {
            return this.category.code === this.selectedCategory.code;
        }
        return false;
    };
    CategoryTreeComponent.prototype.isSelectedPath = function () {
        var ret = false;
        /*
        if (this.isSelected())
          ret = true;
          */
        if (this.selectedPath && this.selectedPath.parents && this.selectedPath.parents.length > 0) {
            for (var i = 0; i < this.selectedPath.parents.length; i++) {
                if (this.selectedPath.parents[i].code == this.category.code)
                    ret = true;
            }
        }
        return ret;
    };
    CategoryTreeComponent.prototype.isInSelectedCategories = function () {
        var _this = this;
        return this.selectedCategories.findIndex(function (c) { return c.id == _this.category.id; }) > -1;
    };
    CategoryTreeComponent.prototype.getToggleIcon = function () {
        if (this.level === 4) {
            return "";
        }
        else if (this.expanded === true) {
            return "fa-caret-down";
        }
        else {
            return "fa-caret-right";
        }
    };
    __decorate([
        core_1.Input(),
        __metadata("design:type", category_1.Category)
    ], CategoryTreeComponent.prototype, "category", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", category_1.Category)
    ], CategoryTreeComponent.prototype, "selectedCategory", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Boolean)
    ], CategoryTreeComponent.prototype, "border", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Array)
    ], CategoryTreeComponent.prototype, "selectedCategories", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Object)
    ], CategoryTreeComponent.prototype, "selectedPath", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Number)
    ], CategoryTreeComponent.prototype, "level", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Number)
    ], CategoryTreeComponent.prototype, "numberOfSteps", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Boolean)
    ], CategoryTreeComponent.prototype, "loadingStatus", void 0);
    __decorate([
        core_1.Output(),
        __metadata("design:type", core_1.EventEmitter)
    ], CategoryTreeComponent.prototype, "detailsEvent", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Object),
        __metadata("design:paramtypes", [Object])
    ], CategoryTreeComponent.prototype, "parentCategories", null);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Object),
        __metadata("design:paramtypes", [Object])
    ], CategoryTreeComponent.prototype, "scrollToDivId", null);
    CategoryTreeComponent = __decorate([
        core_1.Component({
            selector: 'category-tree',
            templateUrl: './category-tree.component.html',
            styleUrls: ['./category-tree.component.css']
        }),
        __metadata("design:paramtypes", [category_service_1.CategoryService])
    ], CategoryTreeComponent);
    return CategoryTreeComponent;
}());
exports.CategoryTreeComponent = CategoryTreeComponent;
//# sourceMappingURL=category-tree.component.js.map