import isUrl = require("is-url");
import { customAlphabet } from "nanoid";
import { relative } from "path";
import { getAssetPath } from "./utils";

export interface GenerateBackgroundOptions {
  importCss: string;
  assetUrl?: string;
  outputDir?: string;
  className?: (assert: string) => string;
}
interface GenerateBackgroundReturnType {
  styleContent: string;
  classNameMap: string;
}

type Tuple<T, S, X> = [T, S, X];

const defaultClassName = customAlphabet(
  "0123456789abcdefghijklmnopkrstuvwxyzABCDEFGHIJKLMNOPKRSTUVWXYZ",
  5
);

function generateStyleContent(data: Tuple<string, string, string>[]) {
  return `
${data.map(
  ([_, className, url]) => `
.${className} {
  background-image: url("${url}")
}
`
)}  
`;
}

function generateClassNameMap(
  data: Tuple<string, string, string>[],
  importCss: string
) {
  return `${importCss}
export const Backgrounds = {
  ${data.map(
    ([key, className]) => `
  "${key}": "${className}",
`
  )}
} 
`;
}

export default async function generateBackground(
  assets: string[],
  opts?: GenerateBackgroundOptions
): Promise<GenerateBackgroundReturnType> {
  const className = opts?.className ?? defaultClassName;
  const assetData: Tuple<string, string, string>[] = assets.map((f) => [
    f,
    className(f),
    getAssetPath(f, opts!.outputDir!, opts?.assetUrl),
  ]);

  return {
    styleContent: generateStyleContent(assetData),
    classNameMap: generateClassNameMap(assetData, opts!.importCss),
  };
}
