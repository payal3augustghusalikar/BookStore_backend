/**
 * @module      routes
 * @file         route.js
 * @description  provide the routes for user as well note operations and input vallidation in middlewares
 * @author       Payal Ghusalikar <payal.ghusalikar9@gmail.com>
 * @since        05/04/2021  
-----------------------------------------------------------------------------------------------*/

var helper = require("../../middleware/helper.js");
const { userValidationRules, loginUserValidationRules,  validate } = require('../../middleware/vallidation')
const user = require("../controllers/user.js");

module.exports = (app) => {

    // register a new user
    app.post("/user-register", helper.addRole('user'), userValidationRules(), validate, user.register);

    // register a new user
    app.post("/admin-register", helper.addRole('admin'), userValidationRules(), validate, user.register);

    // user login
    app.post('/user-login',  loginUserValidationRules(), validate, user.login);

    // admin login
    app.post('/admin-login', loginUserValidationRules(), validate,user.login);  
};