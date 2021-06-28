"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var http_1 = __importDefault(require("http"));
// @ts-ignore
var websocket_1 = require("websocket");
var Server = /** @class */ (function () {
    /**
     * Server management class
     * @param { PlexiCore } plexiCore PlexiCore class object
     */
    function Server(plexiCore) {
        this.plexiCore = plexiCore;
        this.servers = [];
        this.events = {
            onMessage: [],
            onOpen: [],
            onClose: [],
            onError: []
        };
    }
    /**
     * Create a WebSocket server
     * @param { number } port Port to use for the server
     * @param { string } id Id for this server
     */
    Server.prototype.createServer = function (port, id) {
        var httpServer = http_1.default.createServer();
        httpServer.listen(port);
        var webSocketServer = new websocket_1.server({
            httpServer: httpServer
        });
        this.servers.push({
            id: id,
            server: webSocketServer,
            events: {
                onRequest: [],
                onMessage: [],
                onOpen: [],
                onClose: [],
                onError: []
            }
        });
        this.attachEvents(webSocketServer, id);
    };
    /**
     * Attach a WebSocket servers events
     * @param { object } webSocketServer WebSocket server to attach events for
     * @param { string } serverId Server ID
     */
    Server.prototype.attachEvents = function (webSocketServer, serverId) {
        var server = {};
        var serverIndex = 0;
        this.servers.forEach(function (value, index) {
            if (value.id == serverId) {
                server = value;
                serverIndex = index;
            }
        });
        webSocketServer.on("request", function (request) {
            var connection = request.accept(null, request.origin);
            server.events.onOpen.forEach(function (value, index) {
                value(connection);
            });
            server.events.onRequest.forEach(function (value, index) {
                value(request);
            });
            connection.on("message", function (request) {
                server.events.onMessage.forEach(function (value, index) {
                    value(request);
                });
            });
            connection.on("close", function () {
                server.events.onClose.forEach(function (value, index) {
                    value(connection);
                });
            });
        });
    };
    Server.prototype.on = function (eventName, serverId, callback) {
        var server = {};
        var serverIndex = 0;
        this.servers.forEach(function (value, index) {
            if (value.id == serverId) {
                server = value;
                serverIndex = index;
            }
        });
        switch (eventName) {
            case "request":
                server.events.onRequest.push(callback);
                break;
            case "message":
                server.events.onMessage.push(callback);
                break;
            case "open":
                server.events.onOpen.push(callback);
                break;
            case "close":
                server.events.onClose.push(callback);
                break;
        }
    };
    return Server;
}());
exports.default = Server;
//# sourceMappingURL=Server.js.map