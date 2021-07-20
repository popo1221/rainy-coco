import { writeFileSync } from "fs";
import { join } from "path";
import globby = require("globby");
import generateBackground from "./background.generator";
import generateComponent from "./component.generator";
import { RainyCocoConfiguration } from "./configuration";

interface RainyCocoOptions extends RainyCocoConfiguration {
  assetDir: string | string[];
  outputDir: string;
  extensions: string[];
}

async function gatherAssets(assetDir: string[], extensions: string[]) {
  return globby(assetDir, {
    expandDirectories: {
      extensions,
    },
  });
}

export default async function rainyCoco(opts: RainyCocoOptions) {
  const assets = await gatherAssets(
    Array.isArray(opts.assetDir)
      ? opts.assetDir
      : opts.assetDir
      ? [opts.assetDir]
      : [],
    opts.extensions
  );

  // Deal with backgrounds
  const backgrounds = await generateBackground(assets, {
    assetUrl: opts.assetUrl,
    outputDir: opts.outputDir,
    importCss: `import "./${opts.background!.styleFilename}";`,
    ...opts.background,
  });
  writeFileSync(
    `${join(opts.outputDir, opts.background!.styleFilename!)}`,
    backgrounds.styleContent
  );
  writeFileSync(
    `${join(opts.outputDir, opts.background!.tsFilename!)}`,
    backgrounds.classNameMap
  );

  // Deal with components
  const components = await generateComponent(assets, opts.component);
  writeFileSync(
    `${join(opts.outputDir, opts.component!.filename!)}`,
    components
  );
}
