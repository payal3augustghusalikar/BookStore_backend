
/**
 * @module       services
 * @file         user.js
 * @description  holds the methods calling from controller
 * @author       Payal Ghusalikar <payal.ghusalikar9@gmail.com>
*  @since        27/01/2021  
-----------------------------------------------------------------------------------------------*/

const User = require("../models/user.js");
const helper = require("../../middleware/helper.js");
const bcrypt = require("bcrypt");
const config = require('../../config').get();

const { logger } = config;
class userService {
    /**
     * @description register and save User then send response to controller
     * @method register is used to save the User
     * @param callback is the callback for controller
     */
    register = (userInfo, callback) => {

        helper.encryptPassword(userInfo.password,
            (error, encryptedPassword) => {
                if (error) {
                    logger.error('Error while encrypting password');
                    throw new Error('Error while encrypting password');
                }
                userInfo.password = encryptedPassword;

                User.save(userInfo, (error, data) => {
                    if (error) return callback(error, null);
                    else {
                        return callback(null, data);
                    }
                })

            })
    }


    login = (userLoginData, callback) => {
      
        User.findOne(userLoginData, (error, data) => {
         
            if (error) {
                logger.error('ERR:500-Some error occured while logging in');
                return callback(new Error('ERR:401-Authorization failed'), null);
            } else if (!data) {
                logger.error('ERR:401-Authorization failed');
                return callback(new Error('ERR:401-Authorization failed'), null);
            } else {
                bcrypt.compare(userLoginData.password, data[0]['user'].password, async(error, result) => {
                    if (result) {
                        logger.info('Authorization success');
                        const token = await helper.generateToken(data[0]);
                        data.token = token;
                        return callback(null, data);
                    }
                    logger.error('ERR:401-Authorization failed');
                    return callback(new Error('ERR:401-Authorization failed'), null);
                });
            }
        });
    }
}

module.exports = new userService();