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
        setTimeout(function () {
            plexiCore.terminal.writeSpinner("Hello, CliAnimeJs | New Message");
            setTimeout(function () {
                plexiCore.terminal.exitSpinner("success");
            }, 1000);
        }, 1000);
        plexiCore.terminal.animation.quitRenderer = true;
        plexiCore.server.createServer(2020, "test");
        plexiCore.server.on("message", "test", function (message) {
            console.log(message.utf8Data);
        });
        plexiCore.server.on("open", "test", function (connection) {
            console.log(connection.remoteAddress);
        });
        plexiCore.server.on("close", "test", function (connection) {
            console.log("Connection lost: " + connection.remoteAddress);
        });
    }
    return PlexiCoreTest;
}());
//# sourceMappingURL=PlexiCore.test.js.map