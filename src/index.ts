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
    const timestamp = `[${new Date().toISOString().slice(11, -5)}]`;
    return {
      warn: (str: string): void | null => (enableConsoleLogs
        ? console.warn(`${timestamp} - ${name} - ${str}`)
        : null),
      error: (str: string): void | null => (enableConsoleLogs
        ? console.error(`${timestamp} - ${name} - ${str}`)
        : null),
      info: (str: string): void | null => (enableConsoleLogs
        ? console.log(`${timestamp} - ${name} - ${str}`)
        : null),
      fatal: (str: string): void | null => (enableConsoleLogs
        ? console.error(`${timestamp} - FATAL - ${name} - ${str}`)
        : null),
      debug: (str: string): void | null => (nodeEnv
                && nodeEnv !== 'production'
                && enableConsoleLogs
        ? console.log(`${timestamp} - DEBUG - ${name} - ${str}`)
        : null),
    };
  },
};

export default FlagshipLogger;
