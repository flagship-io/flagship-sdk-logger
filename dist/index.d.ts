export declare type FsLogger = {
    warn(str: string): void | null;
    error(str: string): void | null;
    info(str: string): void | null;
    fatal(str: string): void | null;
    debug(str: string): void | null;
};
export declare type LogConfig = {
    fetchNow?: boolean;
    activateNow?: boolean;
    logPathName?: string;
    enableConsoleLogs?: boolean;
    nodeEnv?: string;
    flagshipApi?: string;
};
declare const FlagshipLogger: {
    getLogger: (config: LogConfig, name?: string) => FsLogger;
};
export default FlagshipLogger;
