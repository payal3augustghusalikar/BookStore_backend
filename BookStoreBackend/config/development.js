/**
 * @file development.js
 *
 * @description Development file is the default setup expected to have on a localmachine to work with the Production config
 *
 * @author  Payal <payal.ghusalikar9@gmail.com>
 -----------------------------------------------------------------------------------------------*/

const winston = require("winston");

/**
 * @exports : Exports developement Config Environment based Configuration
 */
module.exports = () => {
    return {
        port: process.env.PORT || 4000,
        logger: winston.createLogger({
            format: winston.format.json(),
            transports: [
                new winston.transports.File({
                    filename: "./log/error.log",
                    level: "error",
                }),
                new winston.transports.File({
                    filename: "./log/info.log",
                    level: "info",
                }),
            ],
        }),

        database: {
            username: process.env.COUCHBASE_USERNAME,
            password: process.env.COUCHBASE_PASSWORD,
            dbURL: process.env.DB_URL
        },
    };
};