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
class userService {
    /**
     * @description register and save User then send response to controller
     * @method register is used to save the User
     * @param callback is the callback for controller
     */
    register = (userInfo, callback) => {
        console.log("service")
        userData.password = helper.encryptPassword(userInfo.password)
        console.log("pass: ", helper.encryptPassword(userInfo.password))
        User.save(userInfo, (error, data) => {
            if (error) return callback(error, null);
            else {
                return callback(null, data);
            }
        })

    }
}

module.exports = new userService();