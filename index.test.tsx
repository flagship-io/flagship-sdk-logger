import FlagshipLogger, { LogConfig } from './index';

describe('FlagshipLogger', () => {
  const defaultConfig: LogConfig = {
    enableConsoleLogs: true,
  };
  let config: LogConfig;
  // let spyWarnLogs;
  // let spyErrorLogs;
  // let spyFatalLogs;
  let spyInfoLogs;
  // let spyDebugLogs;
  beforeEach(() => {
    config = defaultConfig as LogConfig;
  });

  it('should info log', () => {
    const fsLogger = FlagshipLogger.getLogger(config);
    spyInfoLogs = jest.spyOn(fsLogger, 'info');
    // spyWarnLogs = jest.spyOn(fsLogger, 'warn');
    // spyErrorLogs = jest.spyOn(fsLogger, 'error');
    // spyFatalLogs = jest.spyOn(fsLogger, 'fatal');
    // spyDebugLogs = jest.spyOn(fsLogger, 'debug');
    fsLogger.info('This is a info log');
    expect(spyInfoLogs).toHaveBeenNthCalledWith(1, 'This is a info log');
  });
});
