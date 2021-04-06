/**
 * @module       models
 * @file         user.js
 * @description  userModel class holds the databse related methods 
 * @author       Payal Ghusalikar <payal.ghusalikar9@gmail.com>
 * @since        27/01/2021  
-----------------------------------------------------------------------------------------------*/


const bcrypt = require("bcrypt");
const userBucket = require('../../config/dbConfig').userBucket;
const N1qlQuery = require('couchbase').N1qlQuery;
const helper = require("../../middleware/helper.js");
const uuid = require('uuid').v4;

let vallidator = require("../../middleware/vallidation.js");


// // encrypted the password before saving to database
// UserSchema.pre("save", async function(next) {
//     if (this.isModified("password")) {
//         this.password = await bcrypt.hash(this.password, 10);
//         this.confirmPassword = undefined;
//     }
//     next();
// });



class UserModel {
    /**
     * @description save the user to database
     * @param {*} userInfo
     * @param {*} callback is for service class
     */
    save = (userInfo, callback) => {
        console.log("service")
        const id = uuid();
        console.log("id", id)
        const query = 'SELECT * FROM `user` WHERE emailId=' + '"' + userInfo.emailId + '"';
        userBucket.query(
            N1qlQuery.fromString(query), (err, rows) => {
                if (err)
                    return callback(err, null);
                else
                    userBucket.insert(id, userData, (error, result) => {
                        return error ? callback(error, null) : callBack(null, result);
                    });
            });
    };
}

module.exports = new UserModel();