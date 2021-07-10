#!/usr/bin/env node
"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var plexi_core_terminal_1 = __importDefault(require("@axeridev/plexi-core-terminal"));
var path_1 = __importDefault(require("path"));
var fs = __importStar(require("fs"));
new /** @class */ (function () {
    /**
     * PlexiCore entry script
     */
    function PlexiCore() {
        var plexiCoreTerminal = this.plexiCoreTerminal = new plexi_core_terminal_1.default();
        var command = process.argv.splice(2);
        var key = command[0];
        var args = command.shift() ? command : [];
        if (!key) {
            this.printHelp();
            return;
        }
        switch (key.toLocaleLowerCase()) {
            case "install":
                (function () {
                    var packageJson = require(path_1.default.join(process.cwd(), "./package.json"));
                    var packages = [
                        {
                            package: "plexi-core-terminal",
                            repo: "PlexiCoreTerminal"
                        }
                    ];
                    packages.forEach(function (value, index) {
                        packageJson.dependencies["@axeridev/" + value.package] = "github:AxeriDev/" + value.repo;
                    });
                    fs.writeFile(path_1.default.join(process.cwd(), "./package.json"), JSON.stringify(packageJson, null, 2), function (error) {
                    });
                })();
                break;
        }
    }
    /**
     * Print help list
     */
    PlexiCore.prototype.printHelp = function () {
        var plexiCoreTerminal = this.plexiCoreTerminal;
        plexiCoreTerminal.section("PlexiCore | Commands");
        var addKey = function (key, label) {
            console.log("  " + plexiCoreTerminal.color("#50ffff", key) + "  -  " + label);
        };
        addKey("Help", "View all commands for PlexiCore");
        addKey("Install", "Install PlexiCore to the current project");
        addKey("Uninstall", "Uninstall PlexiCore from the current project");
        addKey("Dump", "Dump info about the current project");
    };
    return PlexiCore;
}());
