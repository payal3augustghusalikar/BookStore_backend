/**
 * @module      routes
 * @file         route.js
 * @description  provide the routes for user as well note operations
 * @author       Payal Ghusalikar <payal.ghusalikar9@gmail.com>
 * @since        05/04/2021  
-----------------------------------------------------------------------------------------------*/

var helper = require("../../middleware/helper.js");
//const {body, checkSchema, validationResult} = require('express-validator');
const { userValidationRules, validate } = require('../../middleware/vallidation')
//let vallidator = require("../../middleware/vallidation.js");
const user = require("../controllers/user.js");

module.exports = (app) => {
  

    // register a new user
    app.post("/user-register", helper.addRole('user'), userValidationRules(), validate, user.register);

    // register a new user
    app.post("/admin-register", helper.addRole('admin'), userValidationRules(), validate, user.register);

    // user login
    app.post('/user-login', user.login);

    // admin login
    app.post('/admin-login',validate,user.login);

    
};