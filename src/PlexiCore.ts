import Terminal from "./Terminal/Terminal";
import Server from "./server/Server";

module.exports = class PlexiCore {
    /**
     * @var { Server } server Server class object
     */
    public server: Server;

    /**
     * @var { Terminal } terminal Terminal class object
     */
    public terminal: Terminal;

    /**
     * PlexiCore framework entry
     */
    public constructor() {
        this.terminal = new Terminal(this);
        this.server = new Server(this);
    }
}