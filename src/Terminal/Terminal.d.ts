import PlexiCore from "../PlexiCore";
import Animation from "./Animation";
export default class Terminal {
    /**
     * @var { PlexiCore } plexiCore PlexiCore class object
     */
    plexiCore: PlexiCore;
    /**
     * @var { Animation } animation Animation class object
     */
    animation: Animation;
    /**
     * Class used for terminal communications
     * @param { PlexiCore } plexiCore PlexiCore class object
     */
    constructor(plexiCore: PlexiCore);
    /**
     * Create a command line divider
     * @param { string } rawTitle Title of the divider
     * @param { object } rawOptions Options for creating the divider
     */
    dividerCreate(rawTitle: string, rawOptions?: object): void;
    /**
     * Write a spinner animation
     * @param { string } text Text to display with animation
     * @param { object } options Options
     */
    writeSpinner(text: string, options?: object): void;
    /**
     * Set spinner status state and exit
     * @param { string } statusCode Status code
     */
    exitSpinner(statusCode: string): void;
}
//# sourceMappingURL=Terminal.d.ts.map