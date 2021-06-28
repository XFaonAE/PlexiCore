import PlexiCore from "../PlexiCore";
import http from "http";
// @ts-ignore
import { server as WebSocketServer } from "websocket";

export default class Server {
    /**
     * @var { PlexiCore } plexiCore PlexiCore class object
     */
    public plexiCore: PlexiCore;

    /**
     * @var { Array<any> } servers List of all created servers
     */
    public servers: Array<any>;

    public events: object;

    /**
     * Server management class
     * @param { PlexiCore } plexiCore PlexiCore class object
     */
    public constructor(plexiCore: PlexiCore) {
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
    public createServer(port: number, id: string) {
        const httpServer = http.createServer();
        httpServer.listen(port);

        const webSocketServer = new WebSocketServer({
            httpServer: httpServer
        });

        this.servers.push({
            id: id,
            server: webSocketServer,
            connections: [],
            events: {
                onRequest: [],
                onMessage: [],
                onOpen: [],
                onClose: [],
                onError: []
            }
        });
        this.attachEvents(webSocketServer, id);
    }

    /**
     * Attach a WebSocket servers events
     * @param { object } webSocketServer WebSocket server to attach events for
     * @param { string } serverId Server ID
     */
    public attachEvents(webSocketServer: WebSocketServer, serverId: string) {
        let server: any = {};
        let serverIndex: number = 0;
        this.servers.forEach((value: any, index: number) => {
            if (value.id == serverId) {
                server = value;
                serverIndex = index;
            }
        });

        webSocketServer.on("request", (request: any) => {
            const connection = request.accept(null, request.origin);
            server.connections.push(connection);

            server.events.onOpen.forEach((value: CallableFunction, index: number) => {
                value(connection);
            });

            server.events.onRequest.forEach((value: CallableFunction, index: number) => {
                value(request);
            });

            connection.on("message", (request: any) => {
                server.events.onMessage.forEach((value: CallableFunction, index: number) => {
                    value(request);
                });
            });

            connection.on("close", () => {
                server.connections.forEach((value: any, index: number) => {
                    if (connection == value) {
                        delete server.connections[index];
                    }
                });

                server.events.onClose.forEach((value: CallableFunction, index: number) => {
                    value(connection);
                });
            });
        });
    }

    /**
     * On event listener
     * @param { string } eventName Name of the event
     * @param { string } serverId ID of the server
     * @param { CallableFunction } callback Callback to fire on event fire
     */
    public on(eventName: string, serverId: string, callback: CallableFunction) {
        let server: any = {};
        let serverIndex: number = 0;
        this.servers.forEach((value: any, index: number) => {
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
    }

    /**
     * Send a message to a connection
     */
}