"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var PlexiCore_1 = __importDefault(require("../src/PlexiCore"));
new /** @class */ (function () {
    function PlexiCoreTest() {
        var plexiCore = new PlexiCore_1.default();
        plexiCore.terminal.dividerCreate("Hello, PlexiCore");
        plexiCore.terminal.writeSpinner("Hello, CliAnimeJs");
    }
    return PlexiCoreTest;
}());
//# sourceMappingURL=PlexiCore.test.js.map