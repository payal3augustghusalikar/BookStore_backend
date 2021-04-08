// /**
//  * @module       models
//  * @file         user.js
//  * @description  userModel class holds the databse related methods 
//  * @author       Payal Ghusalikar <payal.ghusalikar9@gmail.com>
//  * @since        27/01/2021  
// -----------------------------------------------------------------------------------------------*/


// //let vallidator = require("../../middleware/vallidation.js");

// /**
//  * @module       models
//  * @file         user.js
//  * @description  userModel class holds the databse related methods 
//  * @author       Payal Ghusalikar <payal.ghusalikar9@gmail.com>
//  * @since        27/01/2021  
// -----------------------------------------------------------------------------------------------*/


// const bcrypt = require("bcrypt");
// // const userBucket = require('../../config/dbConfig').userBucket;
// // const N1qlQuery = require('../../config/dbConfig').N1qlQuery;
// const helper = require("../../middleware/helper.js");
// const uuid = require('uuid').v4;
// const bucket = require('../../server').bucket
//     //let vallidator = require("../../middleware/vallidation.js");


// class UserModel {
//     /**
//      * @description save the user to database
//      * @param {*} userInfo
//      * @param {*} callback is for service class
//      */

//     save = (userInfo, callback) => {
//         console.log("inside save ")
//         console.log("userInfo save ", userInfo)
//         const id = uuid();
//         // const query = 'SELECT * FROM `user` WHERE emailId=' + '"' + userInfo.emailId + '"';
//         // console.log("userBucket", userBucket)
//         // console.log("query", query)
//         // userBucket.query(
//         //     N1qlQuery.fromString(query)
//         // bucket.upsert(userInfo, (err, rows) => {
//         //     if (err)
//         //         return callback(err, null);
//         //     else
//         userBucket.insert(id, userInfo, (error, result) => {
//             return error ? callback(error, null) : callback(null, result);
//         });

//     };

//     /**
//      * @description finding user for login using query
//      */
//     findOne = (userData, callback) => {
//         var query = N1qlQuery.fromString('SELECT meta().id, * FROM `user` WHERE emailId=' + '"' + userData.emailId + '"');
//         bucket.query(query, (error, rows) => {
//             return (error) ? callback(error, null) : callback(null, rows);
//         });
//     }
// }

// // class UserModel {
// //     /**
// //      * @description save the user to database
// //      * @param {*} userInfo
// //      * @param {*} callback is for service class
// //      */

// //     save = (userInfo, callback) => {
// //         // console.log("inside save ")
// //         // console.log("userInfo save ", userInfo)
// //         const id = uuid();
// //         // const query = 'SELECT * FROM `user` WHERE emailId=' + '"' + userInfo.emailId + '"';
// //         // console.log("userBucket", userBucket)
// //         // console.log("query", query)
// //         // userBucket.query(
// //         //     N1qlQuery.fromString(query)
// //         // bucket.upsert(userInfo, (err, rows) => {
// //         //     if (err)
// //         //         return callback(err, null);
// //         //     else
// //         userBucket.insert(id, userInfo, (error, result) => {
// //             return error ? callback(error, null) : callback(null, result);
// //         });

// //     };

// /**
//  * @description finding user for login using query
//  */
// findOne = (userData, callback) => {
//     var query = N1qlQuery.fromString('SELECT meta().id, * FROM `user` WHERE emailId=' + '"' + userData.emailId + '"');
//     bucket.query(query, (error, rows) => {
//         return (error) ? callback(error, null) : callback(null, rows);
//     });
// }


// module.exports = new UserModel();


const bucket = require('../../server').bucket
const uuid = require('uuid').v4

class UserModel {
    save = (userData, callBack) => {
        console.log('Userdata', userData)
        const id = uuid()
        bucket.collection().insert(id, userData, (error, result) => {
            if (error) {

                console.log("error", error)
                return callBack(error, null)
            } else {
                console.log("result", result)
                return callBack(null, result)
            }
        })
    }
}
module.exports = new UserModel();