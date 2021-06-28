import Terminal from "./Terminal/Terminal";

export default class PlexiCore {
    public terminal: Terminal;

    /**
     * PlexiCore framework entry
     */
    public constructor() {
        this.terminal = new Terminal(this);
    }
}