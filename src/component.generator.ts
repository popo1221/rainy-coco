import isUrl = require("is-url");
import { relative } from "path";
import { getAssetPath } from "./utils";

export type ComponentCreator = (assetPath: string) => string;

export interface GenerateComponentOptions {
  assetUrl?: string;
  outputDir?: string;
  preimport?: string;
  componentCreator?: ComponentCreator;
}

const defaultComponentCreator: ComponentCreator = (assetPath) => `(props) => ${
  isUrl(assetPath)
    ? `<img {...props} src="${assetPath}" />`
    : `<img {...props} src={require(${assetPath})} />`
}
`;
export default async function generateComponent(
  assets: string[],
  opts?: GenerateComponentOptions
): Promise<string> {
  const componentCreator = opts?.componentCreator ?? defaultComponentCreator;
  return `${opts?.preimport ?? ""}
export const AssetComponents = {
${assets.map(
  (f) =>
    `
  "${f}": ${componentCreator(
      getAssetPath(f, opts!.outputDir!, opts?.assetUrl)
    )},`
)}
}  
`;
}
