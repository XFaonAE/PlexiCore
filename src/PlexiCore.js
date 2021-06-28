"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var Terminal_1 = __importDefault(require("./Terminal/Terminal"));
var PlexiCore = /** @class */ (function () {
    /**
     * PlexiCore framework entry
     */
    function PlexiCore() {
        this.terminal = new Terminal_1.default(this);
    }
    return PlexiCore;
}());
exports.default = PlexiCore;
