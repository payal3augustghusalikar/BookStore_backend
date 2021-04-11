/**
 * @module      routes
 * @file         route.js
 * @description  provide the routes for user as well note operations
 * @author       Payal Ghusalikar <payal.ghusalikar9@gmail.com>
 * @since        05/04/2021  
-----------------------------------------------------------------------------------------------*/

var helper = require("../../middleware/helper.js");

module.exports = (app) => {
    const user = require("../controllers/user.js");
console.log("routes")
    // register a new user
    app.post("/user-register", helper.addRole('user'), user.register);

    // register a new user
    app.post("/admin-register", helper.addRole('admin'), user.register);

    // user login
    app.post('/user-login', user.login);

    // admin login
    app.post('/admin-login', user.login);



};