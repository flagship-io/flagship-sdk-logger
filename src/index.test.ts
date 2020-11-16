import FlagshipLogger, { LogConfig, FlagshipCommon } from './index';

describe('FlagshipLogger', () => {
    const defaultConfig: LogConfig = {
        enableConsoleLogs: true
    };
    let config: LogConfig;
    let spyWarnLogs: any;
    let spyErrorLogs: any;
    let spyInfoLogs: any;

    beforeEach(() => {
        config = defaultConfig as LogConfig;
        spyWarnLogs = jest.spyOn(console, 'warn').mockImplementation();
        spyErrorLogs = jest.spyOn(console, 'error').mockImplementation();
        spyInfoLogs = jest.spyOn(console, 'log').mockImplementation();
    });

    afterEach(() => {
        spyWarnLogs.mockRestore();
        spyErrorLogs.mockRestore();
        spyInfoLogs.mockRestore();
    });

    it('should have not frozen timestamp', (done) => {
        const fsLogger = FlagshipLogger.getLogger(config);
        const spy = jest.spyOn(fsLogger, 'info');
        fsLogger.info('This is a info log');
        expect(spy).toHaveBeenNthCalledWith(1, 'This is a info log');
        let splitElement = spyInfoLogs.mock.calls[0][0].split(' - ');
        const timePast = splitElement[0];
        const name = splitElement[1];
        const value = splitElement[2];
        expect(name).toEqual('Flagship SDK');
        expect(value).toEqual('This is a info log');
        expect(spyErrorLogs).toHaveBeenCalledTimes(0);
        expect(spyWarnLogs).toHaveBeenCalledTimes(0);

        setTimeout(() => {
            try {
                fsLogger.info('Here me again !');
                splitElement = spyInfoLogs.mock.calls[1][0].split(' - ');
                const timePresent = splitElement[0];
                expect(timePresent).not.toEqual(timePast);
                done();
            } catch (error) {
                done.fail(error);
            }
        }, 2000);
    });

    it('should info log', () => {
        const fsLogger = FlagshipLogger.getLogger(config);
        const spy = jest.spyOn(fsLogger, 'info');
        fsLogger.info('This is a info log');
        expect(spy).toHaveBeenNthCalledWith(1, 'This is a info log');
        const splitElement = spyInfoLogs.mock.calls[0][0].split(' - ');
        const time = splitElement[0].replace(new RegExp('[0-9]', 'g'), 'x');
        const name = splitElement[1];
        const value = splitElement[2];
        expect(time).toEqual('[xx:xx:xx]');
        expect(name).toEqual('Flagship SDK');
        expect(value).toEqual('This is a info log');
        expect(spyErrorLogs).toHaveBeenCalledTimes(0);
        expect(spyWarnLogs).toHaveBeenCalledTimes(0);
    });

    it('should warn log', () => {
        const fsLogger = FlagshipLogger.getLogger(config);
        const spy = jest.spyOn(fsLogger, 'warn');
        const param = 'This is a warn log';
        fsLogger.warn(param);
        expect(spy).toHaveBeenNthCalledWith(1, param);
        const splitElement = spyWarnLogs.mock.calls[0][0].split(' - ');
        const time = splitElement[0].replace(new RegExp('[0-9]', 'g'), 'x');
        const name = splitElement[1];
        const value = splitElement[2];
        expect(time).toEqual('[xx:xx:xx]');
        expect(name).toEqual('Flagship SDK');
        expect(value).toEqual(param);
        expect(spyErrorLogs).toHaveBeenCalledTimes(0);
        expect(spyInfoLogs).toHaveBeenCalledTimes(0);
    });

    it('should error log', () => {
        const fsLogger = FlagshipLogger.getLogger(config);
        const spy = jest.spyOn(fsLogger, 'error');
        const param = 'This is a error log';
        fsLogger.error(param);
        expect(spy).toHaveBeenNthCalledWith(1, param);
        const splitElement = spyErrorLogs.mock.calls[0][0].split(' - ');
        const time = splitElement[0].replace(new RegExp('[0-9]', 'g'), 'x');
        const name = splitElement[1];
        const value = splitElement[2];
        expect(time).toEqual('[xx:xx:xx]');
        expect(name).toEqual('Flagship SDK');
        expect(value).toEqual(param);
        expect(spyWarnLogs).toHaveBeenCalledTimes(0);
        expect(spyInfoLogs).toHaveBeenCalledTimes(0);
    });
    it('should fatal log', () => {
        const fsLogger = FlagshipLogger.getLogger(config);
        const spy = jest.spyOn(fsLogger, 'fatal');
        const param = 'This is a fatal log';
        fsLogger.fatal(param);
        expect(spy).toHaveBeenNthCalledWith(1, param);
        const splitElement = spyErrorLogs.mock.calls[0][0].split(' - ');
        const time = splitElement[0].replace(new RegExp('[0-9]', 'g'), 'x');
        const name = splitElement[2];
        const type = splitElement[1];
        const value = splitElement[3];
        expect(time).toEqual('[xx:xx:xx]');
        expect(name).toEqual('Flagship SDK');
        expect(type).toEqual('FATAL');
        expect(value).toEqual(param);
        expect(spyWarnLogs).toHaveBeenCalledTimes(0);
        expect(spyInfoLogs).toHaveBeenCalledTimes(0);
    });
    it('should debug log when nodeEnv is set but not equal to "production"', () => {
        config = { ...config, nodeEnv: 'development' };
        const fsLogger = FlagshipLogger.getLogger(config);
        const spy = jest.spyOn(fsLogger, 'debug');
        const param = 'This is a debug log';
        fsLogger.debug(param);
        expect(spy).toHaveBeenNthCalledWith(1, param);
        const splitElement = spyInfoLogs.mock.calls[0][0].split(' - ');
        const time = splitElement[0].replace(new RegExp('[0-9]', 'g'), 'x');
        const name = splitElement[2];
        const type = splitElement[1];
        const value = splitElement[3];
        expect(time).toEqual('[xx:xx:xx]');
        expect(name).toEqual('Flagship SDK');
        expect(type).toEqual('DEBUG');
        expect(value).toEqual(param);
        expect(spyWarnLogs).toHaveBeenCalledTimes(0);
        expect(spyErrorLogs).toHaveBeenCalledTimes(0);
    });
    it('should NOT debug log when nodeEnv="production"', () => {
        config = { ...config, nodeEnv: 'production' };
        const fsLogger = FlagshipLogger.getLogger(config);
        const spy = jest.spyOn(fsLogger, 'debug');
        const param = 'This is a debug log';
        fsLogger.debug(param);
        expect(spy).toHaveBeenNthCalledWith(1, param);
        expect(spyWarnLogs).toHaveBeenCalledTimes(0);
        expect(spyInfoLogs).toHaveBeenCalledTimes(0);
        expect(spyErrorLogs).toHaveBeenCalledTimes(0);
    });
    it('should NOT debug log when nodeEnv is not set', () => {
        const fsLogger = FlagshipLogger.getLogger(config);
        const spy = jest.spyOn(fsLogger, 'debug');
        const param = 'This is a debug log';
        fsLogger.debug(param);
        expect(spy).toHaveBeenNthCalledWith(1, param);
        expect(spyWarnLogs).toHaveBeenCalledTimes(0);
        expect(spyInfoLogs).toHaveBeenCalledTimes(0);
        expect(spyErrorLogs).toHaveBeenCalledTimes(0);
    });
    it('should display correct name if set', () => {
        const fsLogger = FlagshipLogger.getLogger(config, 'Toto SDK');
        const spy = jest.spyOn(fsLogger, 'info');
        fsLogger.info('This is a info log');
        expect(spy).toHaveBeenNthCalledWith(1, 'This is a info log');
        const splitElement = spyInfoLogs.mock.calls[0][0].split(' - ');
        const time = splitElement[0].replace(new RegExp('[0-9]', 'g'), 'x');
        const name = splitElement[1];
        const value = splitElement[2];
        expect(time).toEqual('[xx:xx:xx]');
        expect(name).toEqual('Toto SDK');
        expect(value).toEqual('This is a info log');
        expect(spyErrorLogs).toHaveBeenCalledTimes(0);
        expect(spyWarnLogs).toHaveBeenCalledTimes(0);
    });
});

describe('FlagshipCommon', () => {
    beforeEach(() => {
        //
    });

    afterEach(() => {
        //
    });

    it('should generate correct template when creating a new visitor id', () => {
        const id = FlagshipCommon.createVisitorId();
        const now = new Date();

        const slicedId = id;
        expect(parseInt(slicedId.slice(0, 4), 10)).toEqual(now.getFullYear());
        expect(parseInt(slicedId.slice(4, 6), 10)).toEqual(now.getMonth() + 1);
        expect(parseInt(slicedId.slice(6, 8), 10)).toEqual(now.getDate());
        expect(parseInt(slicedId.slice(8, 10), 10)).toEqual(now.getHours());
        expect(parseInt(slicedId.slice(10, 12), 10)).toEqual(now.getMinutes());
    });
});
