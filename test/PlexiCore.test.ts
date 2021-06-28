import PlexiCore from "../src/PlexiCore";

new class PlexiCoreTest {
    public constructor() {
        const plexiCore = new PlexiCore();
        plexiCore.terminal.dividerCreate("Hello, PlexiCore");
        plexiCore.terminal.writeSpinner("Hello, CliAnimeJs")
    }
}