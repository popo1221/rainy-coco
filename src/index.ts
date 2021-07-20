import { Command, flags } from "@oclif/command";
import defaults = require("defaults");
import loadConfiguration, { RainyCocoConfiguration } from "./configuration";
import rainyCoco from "./rainy-coco";

const rainyCocoDefaults: RainyCocoConfiguration = {
  assetDir: "src/assets",
  outputDir: "src/",
  background: {
    styleFilename: "background.css",
    tsFilename: "background.ts",
  },
  component: {
    filename: "asset-components.tsx",
  },
  extensions: ["png", "jpg", "jpeg", "svg", "svg"],
};

class RainyCoco extends Command {
  static description = "describe the command here";

  static flags = {
    // add --version flag to show CLI version
    version: flags.version({ char: "v" }),
    help: flags.help({ char: "h" }),
    // flag with a value (-n, --name=VALUE)
    name: flags.string({ char: "n", description: "name to print" }),
    // flag with no value (-f, --force)
    force: flags.boolean({ char: "f" }),
  };

  static args = [{ name: "file" }];

  async run() {
    const config = await loadConfiguration();
    rainyCoco(defaults(config, rainyCocoDefaults));
  }
}

export = RainyCoco;
