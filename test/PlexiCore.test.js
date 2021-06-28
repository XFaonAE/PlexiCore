"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var PlexiCore_1 = __importDefault(require("../src/PlexiCore"));
new /** @class */ (function () {
    function PlexiCoreTest() {
        var plexiCore = new PlexiCore_1.default();
        plexiCore.terminal.dividerCreate("PlexiCore | Test");
        var time = 3;
        var runTick = function () {
            setTimeout(function () {
                if (time == 0) {
                    plexiCore.terminal.writeSpinner("Running server test in " + time + "s");
                    plexiCore.terminal.exitSpinner("success");
                    plexiCore.server.createServer(7070, "test");
                    plexiCore.server.on("open", "test", function (connection) {
                        console.log("Plexi Server > New connection: " + connection.remoteAddress);
                    });
                    plexiCore.server.on("close", "test", function (connection) {
                        console.log("Plexi Server > Connection closed: " + connection.remoteAddress);
                    });
                    plexiCore.server.on("message", "test", function (message) {
                        console.log("Plexi Server > New message: " + message.utf8Data);
                        plexiCore.server.servers[0].connections.forEach(function (value, index) {
                            plexiCore.server.send(value, message.utf8Data);
                        });
                    });
                    return;
                }
                plexiCore.terminal.writeSpinner("Running server test in " + time + "s");
                time -= 1;
                runTick();
            }, 1000);
        };
        runTick();
    }
    return PlexiCoreTest;
}());
//# sourceMappingURL=PlexiCore.test.js.map