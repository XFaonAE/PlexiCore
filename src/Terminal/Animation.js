"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var chalk_1 = __importDefault(require("chalk"));
var Animation = /** @class */ (function () {
    /**
     * Create animations in the terminal
     */
    function Animation(terminal) {
        this.renderFrame = false;
        this.quitRenderer = false;
        this.rendererStarted = false;
        this.preRenderedFrames = [];
        this.currentFrame = 0;
        this.terminal = terminal;
    }
    /**
     * Write spinner
     * @param { string } text Text to display with animation
     * @param  { object } rawOptions Options
     */
    Animation.prototype.write = function (text, rawOptions) {
        if (rawOptions === void 0) { rawOptions = {}; }
        var templateOptions = {
            animation: {
                interval: 70,
                frames: [
                    chalk_1.default.hex("#50ffab")("⠋"),
                    chalk_1.default.hex("#50ffab")("⠙"),
                    chalk_1.default.hex("#50ffab")("⠹"),
                    chalk_1.default.hex("#50ffab")("⠸"),
                    chalk_1.default.hex("#50ffab")("⠼"),
                    chalk_1.default.hex("#50ffab")("⠴"),
                    chalk_1.default.hex("#50ffab")("⠦"),
                    chalk_1.default.hex("#50ffab")("⠧"),
                    chalk_1.default.hex("#50ffab")("⠇"),
                    chalk_1.default.hex("#50ffab")("⠏")
                ]
            }
        };
        var options = Object.assign(templateOptions, rawOptions);
        var tempPreRenderedFrames = [];
        options.animation.frames.forEach(function (value, index) {
            tempPreRenderedFrames.push(value + " " + text);
        });
        this.preRenderedFrames = tempPreRenderedFrames;
        this.renderFrame = true;
        if (!this.rendererStarted) {
            this.startRendererLoop(options);
        }
    };
    /**
     * Start the frame renderer loop
     * @param { object } options Options
     */
    Animation.prototype.startRendererLoop = function (options) {
        var _this = this;
        var frameNext = function () {
            setTimeout(function () {
                _this.currentFrame++;
                if (_this.renderFrame) {
                    process.stdout.write("\r" + _this.getNextFrame());
                }
                if (_this.quitRenderer) {
                    return;
                }
                frameNext();
            }, options.animation.interval);
        };
        frameNext();
    };
    /**
     * Get the next rendered frame
     * @return { string } Rendered frame
     */
    Animation.prototype.getNextFrame = function () {
        if (this.currentFrame > this.preRenderedFrames.length - 1) {
            this.currentFrame = 0;
        }
        return this.preRenderedFrames[this.currentFrame];
    };
    return Animation;
}());
exports.default = Animation;
