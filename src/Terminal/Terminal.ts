import chalk from "chalk";
import PlexiCore from "../PlexiCore";
import Animation from "./Animation";

export default class Terminal {
    /**
     * @var { PlexiCore } plexiCore PlexiCore class object
     */
    public plexiCore: PlexiCore;

    /**
     * @var { Animation } animation Animation class object
     */
    public animation: Animation;

    /**
     * Class used for terminal communications
     * @param { PlexiCore } plexiCore PlexiCore class object
     */
    public constructor(plexiCore: PlexiCore) {
        this.plexiCore = plexiCore;
        this.animation = new Animation(this);
    }

    /**
     * Create a command line divider
     * @param { string } rawTitle Title of the divider
     * @param { object } rawOptions Options for creating the divider
     */
    public dividerCreate(rawTitle: string, rawOptions: object = {}) {
        interface Options {
            titleHex: string;
            barHex: string;
            titlePadding: number;
            barStartLength: number;
            titlePaddingSymbol: string;
            barSymbol: string;
        }

        const templateOptions: Options = {
            barHex: "#555",
            titleHex: "#fff",
            titlePadding: 5,
            titlePaddingSymbol: " ",
            barStartLength: 8,
            barSymbol: "─"
        };
        const options: Options = Object.assign(templateOptions, rawOptions);
        let divider: string = "";
        let columnsLeft: number = process.stdout.columns;

        const barStart: string = options.barSymbol.repeat(options.barStartLength);
        columnsLeft -= barStart.length;

        const titlePadding: string = options.titlePaddingSymbol.repeat(options.titlePadding);
        columnsLeft -= (titlePadding.length * 2);

        columnsLeft -= rawTitle.length;

        const barEnd: string = options.barSymbol.repeat(columnsLeft);
        columnsLeft -= barEnd.length;

        divider = chalk.hex(options.barHex)(barStart) + titlePadding + chalk.hex(options.titleHex)(rawTitle) + titlePadding + chalk.hex(options.barHex)(barEnd);
        console.log(divider);
    }

    /**
     * Write a spinner animation
     * @param { string } text Text to display with animation
     * @param { object } options Options
     */
    public writeSpinner(text: string, options: object = {}) {
        this.animation.write(text, options);
    }

    /**
     * Set spinner status state and exit
     * @param { string } statusCode Status code
     */
    public exitSpinner(statusCode: string) {
        this.animation.exitSpinner(statusCode);
        console.log("");
    }
}