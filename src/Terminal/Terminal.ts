export default class Terminal {
    public constructor() {

    }

    /**
     * Create a command line divider
     * @param { string } rawTitle Title of the divider
     * @param { object } rawOptions Options for creating the divider
     */
    public dividerCreate(rawTitle: string, rawOptions: object = {}) {
        interface DividerCreateOptions {
            titleHex: string;
            barHex: string;
            titlePadding: number;
            barStartLength: number;
            titlePaddingSymbol: string;
            barSymbol: string;
        }

        const templateOptions: DividerCreateOptions = {
            barHex: "#555",
            titleHex: "#fff",
            titlePadding: 5,
            titlePaddingSymbol: " ",
            barStartLength: 8,
            barSymbol: "─"
        };
        const options: DividerCreateOptions = Object.assign(templateOptions, rawOptions);
        var divider: string = "";
        var columnsLeft: number = process.stdout.columns;

        const barStart = options.barSymbol.repeat(options.barStartLength);
        columnsLeft -= barStart.length;

        const titlePadding = options.titlePaddingSymbol.repeat(options.titlePadding);
        columnsLeft -= (titlePadding.length * 2);

        console.log(divider);
    }
}