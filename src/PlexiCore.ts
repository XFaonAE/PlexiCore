#!/usr/bin/env node

import PlexiCoreTerminal from "@axeridev/plexi-core-terminal";
import path from "path";
import * as fs from "fs";

new class PlexiCore {
    /**
     * @var { PlexiCoreTerminal } plexiCoreTerminal PlexiCoreTerminal class object
     */
    public plexiCoreTerminal: PlexiCoreTerminal;

    /**
     * PlexiCore entry script
     */
    public constructor() {
        const plexiCoreTerminal = this.plexiCoreTerminal = new PlexiCoreTerminal();

        const command = process.argv.splice(2);
        const key = command[0];
        const args = command.shift() ? command : [];

        if (!key) {
            this.printHelp();
            return;
        }

        switch (key.toLocaleLowerCase()) {
            case "install":
                (() => {
                    const packageJson = require(path.join(process.cwd(), "./package.json"));
                    const packages = [
                        {
                            package: "plexi-core-terminal",
                            repo: "PlexiCoreTerminal"
                        }
                    ];

                    packages.forEach((value: any, index: number) => {
                        packageJson.dependencies["@axeridev/" + value.package] = "github:AxeriDev/" + value.repo;
                    });

                    fs.writeFile(path.join(process.cwd(), "./package.json"), JSON.stringify(packageJson, null, 2), (error: any) => {

                    });
                })();
                break;
        }
    }

    /**
     * Print help list
     */
    public printHelp() {
        const plexiCoreTerminal = this.plexiCoreTerminal;
        plexiCoreTerminal.section("PlexiCore | Commands");

        const addKey = (key: string, label: string) => {
            console.log("  " + plexiCoreTerminal.color("#50ffff", key) + "  -  " + label);
        }

        addKey("Help", "View all commands for PlexiCore");
        addKey("Install", "Install PlexiCore to the current project");
        addKey("Uninstall", "Uninstall PlexiCore from the current project");
        addKey("Dump", "Dump info about the current project");
    }
}