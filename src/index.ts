/* eslint-disable no-console */

export type FsLogger = {
    warn(str: string): void | null;
    error(str: string): void | null;
    info(str: string): void | null;
    fatal(str: string): void | null;
    debug(str: string): void | null;
};

export type LogConfig = {
    fetchNow?: boolean;
    activateNow?: boolean;
    enableConsoleLogs?: boolean;
    nodeEnv?: string;
    flagshipApi?: string;
};

/*
Available logs:
    - debug()
    - info()
    - warn()
    - error()
    - fatal()
*/

const FlagshipLogger = {
    getLogger: (config: LogConfig, name = 'Flagship SDK'): FsLogger => {
        const { enableConsoleLogs, nodeEnv } = config;
        const printTimestamp = (): string => `[${new Date().toISOString().slice(11, -5)}]`;
        return {
            warn: (str: string): void | null => (enableConsoleLogs ? console.warn(`${printTimestamp()} - ${name} - ${str}`) : null),
            error: (str: string): void | null => (enableConsoleLogs ? console.error(`${printTimestamp()} - ${name} - ${str}`) : null),
            info: (str: string): void | null => (enableConsoleLogs ? console.log(`${printTimestamp()} - ${name} - ${str}`) : null),
            fatal: (str: string): void | null =>
                enableConsoleLogs ? console.error(`${printTimestamp()} - FATAL - ${name} - ${str}`) : null,
            debug: (str: string): void | null =>
                nodeEnv && nodeEnv !== 'production' && enableConsoleLogs
                    ? console.log(`${printTimestamp()} - DEBUG - ${name} - ${str}`)
                    : null
        };
    }
};

export const FlagshipCommon = {
    createVisitorId: (): string => {
        const now = new Date();
        const random = Math.floor(Math.random() * (99999 - 10000) + 10000); // Random number between 10000 - 99999
        const twoDigits = (val: any): any => (val.toString().length === 1 ? `0${val}` : val);
        return `${now.getFullYear()}${twoDigits(now.getMonth() + 1)}${twoDigits(now.getDate())}${twoDigits(now.getHours())}${twoDigits(
            now.getMinutes()
        )}${random}`;
    }
};

export default FlagshipLogger;
