"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
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
        this.currentMessage = "";
        this.currentOptions = {
            animation: {
                interval: 0,
                frames: []
            },
            statusIcons: {}
        };
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
                interval: 50,
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
            },
            statusIcons: {
                success: chalk_1.default.hex("#50ffab")("✓"),
                warning: chalk_1.default.hex("#ffff77")("△"),
                error: chalk_1.default.hex("#ff7777")("✖")
            }
        };
        var options = Object.assign(templateOptions, rawOptions);
        var tempPreRenderedFrames = [];
        options.animation.frames.forEach(function (value, index) {
            tempPreRenderedFrames.push(value + " " + text);
        });
        this.preRenderedFrames = tempPreRenderedFrames;
        this.currentOptions = options;
        this.currentMessage = text;
        this.renderFrame = true;
        if (!this.rendererStarted) {
            this.rendererStarted = true;
            this.startRendererLoop(options);
        }
    };
    /**
     * Start the frame renderer loop
     * @param { AnimationWriteOptions } options Options
     */
    Animation.prototype.startRendererLoop = function (options) {
        var _this = this;
        (function () { return __awaiter(_this, void 0, void 0, function () {
            var frameNext;
            var _this = this;
            return __generator(this, function (_a) {
                frameNext = function () {
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
                return [2 /*return*/];
            });
        }); })();
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
    /**
     * Exit the spinner animation
     * @param { string } statusName Name of the status state
     */
    Animation.prototype.exitSpinner = function (statusName) {
        var icon = this.currentOptions.statusIcons[statusName];
        this.preRenderedFrames = [];
        this.renderFrame = false;
        this.write(this.currentMessage, {
            animation: {
                frames: [
                    icon
                ]
            }
        });
    };
    return Animation;
}());
exports.default = Animation;
//# sourceMappingURL=Animation.js.map