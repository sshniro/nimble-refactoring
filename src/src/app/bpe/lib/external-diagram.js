"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var _ = require("underscore");
var ExternalDiagram = /** @class */ (function () {
    function ExternalDiagram() {
    }
    ExternalDiagram.prototype.draw_editable_diagram = function () {
        var editor = jQuery('#editor');
        editor.on('change', _.debounce(on_change, 100));
        on_change();
        function on_change() {
            var diagram_div = jQuery('#diagram');
            var diagram = Diagram.parse(editor.val());
            // Clear out old diagram
            diagram_div.html('');
            // Draw
            diagram.drawSVG(diagram_div.get(0));
        }
    };
    ExternalDiagram.prototype.draw_static_diagram = function (text_content) {
        var diagram_div = jQuery('#diagram');
        var diagram = Diagram.parse(text_content);
        diagram.drawSVG(diagram_div.get(0));
    };
    return ExternalDiagram;
}());
exports.ExternalDiagram = ExternalDiagram;
//# sourceMappingURL=external-diagram.js.map