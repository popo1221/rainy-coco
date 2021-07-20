import { customAlphabet } from "nanoid";

export interface GenerateBackgroundOptions {
  className?: (assert: string) => string;
}
interface GenerateBackgroundReturnType {
  styleContent: string;
  classNameMap: string;
}

type Tuple<T, S> = [T, S];

const defaultClassName = customAlphabet(
  "0123456789abcdefghijklmnopkrstuvwxyzABCDEFGHIJKLMNOPKRSTUVWXYZ",
  5
);

function generateStyleContent(data: Tuple<string, string>[]) {
  return `
${data.map(
  ([file, className]) => `
.${className} {
  background-image: url("${file}")
}
`
)}  
`;
}

function generateClassNameMap(data: Tuple<string, string>[]) {
  return `
export const Backgrounds = {
  ${data.map(
    ([f, className]) => `
  "${f}": "${className}",
`
  )}
} 
`;
}

export default async function generateBackground(
  assets: string[],
  opts?: GenerateBackgroundOptions
): Promise<GenerateBackgroundReturnType> {
  const assetData: Tuple<string, string>[] = assets.map((f) => [
    f,
    defaultClassName(),
  ]);
  return {
    styleContent: generateStyleContent(assetData),
    classNameMap: generateClassNameMap(assetData),
  };
}
