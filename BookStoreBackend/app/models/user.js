/**
 * @module       models
 * @file         user.js
 * @description  userModel class holds the databse related methods 
 * @author       Payal Ghusalikar <payal.ghusalikar9@gmail.com>
 * @since        4/04/2021  
-----------------------------------------------------------------------------------------------*/

const userBucket = require('../../config/dbConfig').userBucket;
const N1qlQuery = require('../../config/dbConfig').N1qlQuery;
const uuid = require('uuid').v4;
const config = require('../../config').get();
const {
  logger
} = config;

class UserModel {

  /**
   * @description saving user/admin data into buckets
   * @method insert is used to save data into bucket
   * @param {*} userData holds userinput data
   * @param {*} callback is for service class method 
   */
  save = (userData, callback) => {
    const id = uuid();
    const query = 'SELECT * FROM `user` WHERE emailId=' + '"' + userData.emailId + '"';
    userBucket.query(
      N1qlQuery.fromString(query), (err, rows) => {
        if (err) {
          return callback(err, null);
        } else if (rows.length != 0) {
          return callback(new Error('ERR-409'), null);
        } else
          userBucket.insert(id, userData, (error, result) => {
            return error ? callback(error, null) : callback(null, result);
          });
      });
  }

  /**
   * @description find the user from userBucket
   * @param {*} userData holds userinput data
   * @param {*} callback is for service class 
   */
  findOne = async (userData, callback) => {
    var query = N1qlQuery.fromString('SELECT meta().id, * FROM `user` WHERE emailId=' + '"' + userData.emailId + '"');
    await userBucket.query(query, (error, rows) => {
      return (error) ? callback(error, null) : callback(null, rows);
    });
  }
}

module.exports = new UserModel();