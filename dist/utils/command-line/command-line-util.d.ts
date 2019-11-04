declare type CommandLineArgumentProp = {
    name: string;
    defaultValue?: string | boolean | number;
    valuePlaceholderText?: string;
    isRequired?: boolean;
    configType?: string;
};
declare type CommandLineConfigs = {
    [key: string]: {
        [key: string]: string;
    };
};
export declare const processCommandLineArgs: (commandLineArguments: {
    [key: string]: any;
}, argumentProps: CommandLineArgumentProp[]) => CommandLineConfigs;
export {};
