import { cosmiconfig } from "cosmiconfig";
import { GenerateBackgroundOptions } from "./background.generator";
import {
  ComponentCreator,
  GenerateComponentOptions,
} from "./component.generator";

export interface BackgroundConfiguration {
  className?: (assert: string) => string;
  styleFilename?: string;
  tsFilename?: string;
}

export interface ComponentConfiguration {
  preimport?: string;
  componentCreator?: ComponentCreator;
  filename?: string;
}

export interface RainyCocoConfiguration {
  assetUrl?: string;
  assetDir?: string | string[];
  background?: BackgroundConfiguration;
  component?: ComponentConfiguration;
  outputDir?: string;
  extensions?: string[];
}

export default async function loadConfiguration(): Promise<RainyCocoConfiguration> {
  const explorer = cosmiconfig("coco");
  const result = await explorer.search();
  return result?.config;
}
