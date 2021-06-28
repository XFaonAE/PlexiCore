import PlexiCore from "../src/PlexiCore";

new class PlexiCoreTest {
    public constructor() {
        const plexiCore = new PlexiCore();

        plexiCore.terminal.dividerCreate("PlexiCore | Test");

        let time: number = 3;
        const runTick = () => {
            setTimeout(() => {
                if (time == 0) {
                    plexiCore.terminal.writeSpinner("Running server test in " + time + "s");
                    plexiCore.terminal.exitSpinner("success");

                    plexiCore.server.createServer(7070, "test");

                    plexiCore.server.on("open", "test", (connection: any) => {
                        console.log("Plexi Server > New connection: " + connection.remoteAddress);
                    });

                    plexiCore.server.on("close", "test", (connection: any) => {
                        console.log("Plexi Server > Connection closed: " + connection.remoteAddress);
                    });

                    plexiCore.server.on("message", "test", (message: any) => {
                        console.log("Plexi Server > New message: " + message.utf8Data);
                    });
                    return;
                }

                plexiCore.terminal.writeSpinner("Running server test in " + time + "s");
                time -= 1
                runTick();
            }, 1000);
        }

        runTick();
    }
}