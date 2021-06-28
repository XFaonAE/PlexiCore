"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var chalk_1 = __importDefault(require("chalk"));
var Animation_1 = __importDefault(require("./Animation"));
var Terminal = /** @class */ (function () {
    /**
     * Class used for terminal communications
     * @param { PlexiCore } plexiCore PlexiCore class object
     */
    function Terminal(plexiCore) {
        this.plexiCore = plexiCore;
        this.animation = new Animation_1.default(this);
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
        columnsLeft -= rawTitle.length;
        var barEnd = options.barSymbol.repeat(columnsLeft);
        columnsLeft -= barEnd.length;
        divider = chalk_1.default.hex(options.barHex)(barStart) + titlePadding + chalk_1.default.hex(options.titleHex)(rawTitle) + titlePadding + chalk_1.default.hex(options.barHex)(barEnd);
        console.log(divider);
    };
    /**
     * Write a spinner animation
     * @param { string } text Text to display with animation
     * @param { object } options Options
     */
    Terminal.prototype.writeSpinner = function (text, options) {
        if (options === void 0) { options = {}; }
        this.animation.write(text, options);
    };
    /**
     * Set spinner status state and exit
     * @param { string } statusCode Status code
     */
    Terminal.prototype.exitSpinner = function (statusCode) {
        this.animation.exitSpinner(statusCode);
        console.log("");
    };
    return Terminal;
}());
exports.default = Terminal;
//# sourceMappingURL=Terminal.js.map