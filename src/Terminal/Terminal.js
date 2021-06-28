"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Terminal = /** @class */ (function () {
    function Terminal() {
    }
    /**
     * Create a command line divider
     * @param { string } rawTitle Title of the divider
     * @param { object } rawOptions Options for creating the divider
     */
    Terminal.prototype.dividerCreate = function (rawTitle, rawOptions) {
        if (rawOptions === void 0) { rawOptions = {}; }
        var templateOptions = {
            barHex: "#555",
            titleHex: "#fff",
            titlePadding: 5,
            titlePaddingSymbol: " ",
            barStartLength: 8,
            barSymbol: "─"
        };
        var options = Object.assign(templateOptions, rawOptions);
        var divider = "";
        var columnsLeft = process.stdout.columns;
        var barStart = options.barSymbol.repeat(options.barStartLength);
        columnsLeft -= barStart.length;
        var titlePadding = options.titlePaddingSymbol.repeat(options.titlePadding);
        columnsLeft -= (titlePadding.length * 2);
        console.log(divider);
    };
    return Terminal;
}());
exports.default = Terminal;
