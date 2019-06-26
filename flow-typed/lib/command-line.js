import { type minimistOutput } from "minimist";

declare type CommandLineArgumentProp = {
  name: string,
  defaultValue?: string | boolean | number,
  valuePlaceholderText?: string,
  isRequired?: boolean,
  configType?: string,
};

declare type CommandLineConfigs = {
  [string]: minimistOutput,
};
