import Terminal from "./Terminal";
import chalk from "chalk";
import AnimationWriteOptions from "./AnimationWriteOptions";

export default class Animation {
    /**
     * @var { boolean } renderFrame Render the frame to the terminal
     */
    public renderFrame: boolean;

    /**
     * @var { boolean } quitRenderer Quit the renderer loop
     */
    public quitRenderer: boolean;

    /**
     * @var { boolean } rendererStarted Is the renderer started
     */
    public rendererStarted: boolean;

    /**
     * @var { Array<string> } preRenderedFrames Pre rendered frames
     */
    public preRenderedFrames: Array<string>;

    /**
     * @var { number } currentFrame Current frame number
     */
    public currentFrame: number;

    /**
     * @var { Terminal } terminal Terminal class object
     */
    public terminal: Terminal;

    /**
     * @var { AnimationWriteOptions } currentOptions Options for current animation
     */
    public currentOptions: AnimationWriteOptions;

    /**
     * @var { string } currentMessage Current message for the spinner
     */
    public currentMessage: string;

    /**
     * Create animations in the terminal
     */
    public constructor(terminal: Terminal) {
        this.renderFrame = false;
        this.quitRenderer = false;
        this.rendererStarted = false;
        this.preRenderedFrames = [];
        this.currentFrame = 0;
        this.terminal = terminal;
        this.currentMessage = "";
        this.currentOptions = {
            animation: {
                interval: 0,
                frames: []
            },
            statusIcons: {}
        };
    }

    /**
     * Write spinner
     * @param { string } text Text to display with animation
     * @param  { object } rawOptions Options
     */
    public write(text: string, rawOptions: object = {}) {
        const templateOptions: AnimationWriteOptions = {
            animation: {
                interval: 50,
                frames: [
                    chalk.hex("#50ffab")("⠋"),
                    chalk.hex("#50ffab")("⠙"),
                    chalk.hex("#50ffab")("⠹"),
                    chalk.hex("#50ffab")("⠸"),
                    chalk.hex("#50ffab")("⠼"),
                    chalk.hex("#50ffab")("⠴"),
                    chalk.hex("#50ffab")("⠦"),
                    chalk.hex("#50ffab")("⠧"),
                    chalk.hex("#50ffab")("⠇"),
                    chalk.hex("#50ffab")("⠏")
                ]
            },
            statusIcons: {
                success: chalk.hex("#50ffab")("✓"),
                warning: chalk.hex("#ffff77")("△"),
                error: chalk.hex("#ff7777")("✖")
            }
        };
        const options: AnimationWriteOptions = Object.assign(templateOptions, rawOptions);
        let tempPreRenderedFrames: Array<string> = [];

        options.animation.frames.forEach((value: string, index: number) => {
            tempPreRenderedFrames.push(value + " " + text);
        });

        this.preRenderedFrames = tempPreRenderedFrames;
        this.currentOptions = options;
        this.currentMessage = text;
        this.renderFrame = true;
        if (!this.rendererStarted) {
            this.rendererStarted = true;
            this.startRendererLoop(options);
        }
    }

    /**
     * Start the frame renderer loop
     * @param { AnimationWriteOptions } options Options
     */
    public startRendererLoop(options: AnimationWriteOptions) {
        (async () => {
            const frameNext: CallableFunction = () => {
                setTimeout(() => {
                    this.currentFrame++;
                    if (this.renderFrame) {
                        process.stdout.write("\r" + this.getNextFrame());
                    }

                    if (this.quitRenderer) {
                        return;
                    }

                    frameNext();
                }, options.animation.interval);
            }
            frameNext();
        })();
    }

    /**
     * Get the next rendered frame
     * @return { string } Rendered frame
     */
    public getNextFrame(): string {
        if (this.currentFrame > this.preRenderedFrames.length - 1) {
            this.currentFrame = 0;
        }

        return this.preRenderedFrames[this.currentFrame];
    }

    /**
     * Exit the spinner animation
     * @param { string } statusName Name of the status state
     */
    public exitSpinner(statusName: string) {
        const icon: string = this.currentOptions.statusIcons[statusName];
        this.renderFrame = false;
        this.preRenderedFrames = [
            icon + " " + this.currentMessage
        ];

        process.stdout.write("\r" + this.preRenderedFrames[0]);
    }
}