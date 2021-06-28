import Terminal from "./Terminal";
import AnimationWriteOptions from "./AnimationWriteOptions";
export default class Animation {
    /**
     * @var { boolean } renderFrame Render the frame to the terminal
     */
    renderFrame: boolean;
    /**
     * @var { boolean } quitRenderer Quit the renderer loop
     */
    quitRenderer: boolean;
    /**
     * @var { boolean } rendererStarted Is the renderer started
     */
    rendererStarted: boolean;
    /**
     * @var { Array<string> } preRenderedFrames Pre rendered frames
     */
    preRenderedFrames: Array<string>;
    /**
     * @var { number } currentFrame Current frame number
     */
    currentFrame: number;
    /**
     * @var { Terminal } terminal Terminal class object
     */
    terminal: Terminal;
    /**
     * Create animations in the terminal
     */
    constructor(terminal: Terminal);
    /**
     * Write spinner
     * @param { string } text Text to display with animation
     * @param  { object } rawOptions Options
     */
    write(text: string, rawOptions?: object): void;
    /**
     * Start the frame renderer loop
     * @param { AnimationWriteOptions } options Options
     */
    startRendererLoop(options: AnimationWriteOptions): void;
    /**
     * Get the next rendered frame
     * @return { string } Rendered frame
     */
    getNextFrame(): string;
}
//# sourceMappingURL=Animation.d.ts.map