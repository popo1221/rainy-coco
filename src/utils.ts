import isUrl = require("is-url");
import { relative, sep } from "path";

export function getAssetPath(
  filepath: string,
  outputDir: string,
  assetUrl?: string
): string {
  return assetUrl && isUrl(assetUrl)
    ? `${assetUrl}${filepath}`
    : `.${sep}${relative(outputDir, filepath)}`;
}
