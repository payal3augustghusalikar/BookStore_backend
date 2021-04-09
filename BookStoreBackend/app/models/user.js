/**
 * @module       models
 * @file         user.js
 * @description  userModel class holds the databse related methods 
 * @author       Payal Ghusalikar <payal.ghusalikar9@gmail.com>
 * @since        27/01/2021  
-----------------------------------------------------------------------------------------------*/

const userBucket = require('../../config/dbConfig').userBucket;
const N1qlQuery = require('../../config/dbConfig').N1qlQuery;
const uuid = require('uuid').v4;
const config = require('../../config').get();
const { logger } = config;

class UserModel {
    /**
     * @description saving user/admin data into buckets
     * @method insert is used to save data into bucket
     */
    save = (userData, callback) => {
        const id = uuid();
        // const query = 'SELECT * FROM `user` WHERE emailId=' + '"' + userData.emailId + '"';
        // userBucket.query(
        //     N1qlQuery.fromString(query), (err, rows) => {
        //         if (err) {
        //             console.log("err", err)
        //             return callback(err, null);
        //         } else if (rows.length != 0) {
        //             return callback(new Error('ERR-409'), null);
        //         } else
        console.log("userData", userData)
        userBucket.collection().insert(id, userData, (error, result) => {
            return error ? callback(error, null) : callback(null, result);
        });
        // });
    }

    /**
     * @description finding user for login
     */
    findOne = async(userData, callback) => {
        console.log("userdata", userData)
            // var query = N1qlQuery.fromString('SELECT meta().id, * FROM `user` WHERE emailId=' + '"' + userData.emailId + '"');
            // await userBucket.query(query, (error, rows) => {
            //     return (error) ? callback(error, null) : callback(null, rows);
            // });

        console.log("userData.emailId", userData.emailId)
        console.log("userData.emailId.toString()", userData.emailId.toString())
        userBucket.get(userData.emailId.toString(), async(error, user) => {
            if (error) {
                console.log("err", error)
                return callback(error, null);
            } else if (user.length == 0) {
                console.log("user", user)
                return callback(null, user);
            }
        })
    }



}




module.exports = new UserModel();