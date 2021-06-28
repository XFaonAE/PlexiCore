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

        plexiCore.terminal.animation.quitRenderer = true;

        plexiCore.server.createServer(2020, "test");

        plexiCore.server.on("message", "test", (message: any) => {
            console.log(message.utf8Data);
        });

        plexiCore.server.on("open", "test", (connection: any) => {
            console.log(connection.remoteAddress);
        });

        plexiCore.server.on("close", "test", (connection: any) => {
            console.log("Connection lost: " + connection.remoteAddress);
        });
    }
}