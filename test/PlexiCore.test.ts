import PlexiCore from "../src/PlexiCore";

new class PlexiCoreTest {
    public constructor() {
        const plexiCore = new PlexiCore();
        plexiCore.terminal.dividerCreate("Hello, PlexiCore");
        plexiCore.terminal.writeSpinner("Hello, CliAnimeJs");
        setTimeout(() => {
            plexiCore.terminal.writeSpinner("Hello, CliAnimeJs | New Message");
            setTimeout(() => {
                plexiCore.terminal.exitSpinner("success");
            }, 1000);
        }, 1000);
    }
}