import isUrl = require("is-url");
import { relative } from "path";

export type ComponentCreator = (assetPath: string) => string;

export interface GenerateComponentOptions {
  assetUrl?: string;
  outputDir?: string;
  preimport?: string;
  componentCreator?: ComponentCreator;
}

const defaultComponentCreator: ComponentCreator = (assetPath) =>
  `<img src="${assetPath}" />`;

export default async function generateComponent(
  assets: string[],
  opts?: GenerateComponentOptions
): Promise<string> {
  const componentCreator = opts?.componentCreator ?? defaultComponentCreator;
  return `${opts?.preimport ?? ""}
export const AssetComponents = {
${assets.map(
  (f) =>
    `"${f}": ${componentCreator(
      isUrl(opts?.assetUrl ?? "")
        ? `${opts?.assetUrl}${f}`
        : relative(opts!.outputDir!, f)
    )}`
)}
}  
`;
}
