import PlexiCore from "../PlexiCore";
import { server as WebSocketServer } from "websocket";
export default class Server {
    /**
     * @var { PlexiCore } plexiCore PlexiCore class object
     */
    plexiCore: PlexiCore;
    /**
     * @var { Array<any> } servers List of all created servers
     */
    servers: Array<any>;
    events: object;
    /**
     * Server management class
     * @param { PlexiCore } plexiCore PlexiCore class object
     */
    constructor(plexiCore: PlexiCore);
    /**
     * Create a WebSocket server
     * @param { number } port Port to use for the server
     * @param { string } id Id for this server
     */
    createServer(port: number, id: string): void;
    /**
     * Attach a WebSocket servers events
     * @param { object } webSocketServer WebSocket server to attach events for
     * @param { string } serverId Server ID
     */
    attachEvents(webSocketServer: WebSocketServer, serverId: string): void;
    on(eventName: string, serverId: string, callback: CallableFunction): void;
}
//# sourceMappingURL=Server.d.ts.map