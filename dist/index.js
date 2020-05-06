"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var FlagshipLogger = {
    getLogger: function (config, name) {
        if (name === void 0) { name = 'Flagship SDK'; }
        var enableConsoleLogs = config.enableConsoleLogs;
        var timestamp = "[" + new Date().toISOString().slice(11, -5) + "] - ";
        return {
            warn: function (str) { return (enableConsoleLogs
                ? console.warn("" + timestamp + name + " - " + str)
                : null); },
            error: function (str) { return (enableConsoleLogs
                ? console.error("" + timestamp + name + " - " + str)
                : null); },
            info: function (str) { return (enableConsoleLogs
                ? console.log("" + timestamp + name + " - " + str)
                : null); },
            fatal: function (str) { return (enableConsoleLogs
                ? console.error("" + timestamp + name + " - Fatal: " + str)
                : null); },
            debug: function (str) { return (config.nodeEnv !== 'production' && enableConsoleLogs
                ? console.log("" + timestamp + name + " - Debug: " + str)
                : null); },
        };
    },
};
exports.default = FlagshipLogger;
//# sourceMappingURL=index.js.map