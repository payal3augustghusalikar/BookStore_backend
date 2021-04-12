/**
 * @file index.js
 *
 * @description Index Configuration setup is required to run your server.
 *
 * @author  Payal <payal.ghusalikar9@gmail.com>
 -----------------------------------------------------------------------------------------------*/



 let config;

/**
 * @description It return true if the current system is production
 * @param {*} config
 */
const isProduction = config => {
    return config.name == 'production';
};

/**
 * @description It return true if the current system is production
 * @param {*} config
 */
const isDevelopement = config => {
    return config.name == 'development';
};

// Combine all the require config files.
const envConfig = {
    production() {
        return require('./production')(config);
    },
    development() {
        return require('./development')(config);
    }
};

/**
 * @description Set the config.
 * @param {Object} obj
 */
const setConfig = obj => {
    config = obj;
};

// Return the config.
const getConfig = () => this.config;

/**
 *  @exports : Exports the Config Environment based Configuration
 */
module.exports = {
    set: (env, _app) => {
        if (config == null) {
            this.config = typeof envConfig[env] !== 'undefined' ? envConfig[env]() : envConfig.development();
            this.config.app = _app;
            this.config.isProduction = isProduction(this.config);
            this.config.isDevelopment = isDevelopement(this.config);
        }
        setConfig(this.config);
    },
    get: () => getConfig()
};