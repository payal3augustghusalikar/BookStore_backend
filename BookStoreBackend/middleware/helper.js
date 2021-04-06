/**
 * @module       Middleware
 * @file         helper.js
 * @description  holds the logical reusable methods calling from service class
 * @author       Payal Ghusalikar <payal.ghusalikar9@gmail.com>
*  @since        27/01/2021  
-----------------------------------------------------------------------------------------------*/

//const jwt = require("jsonwebtoken");
const express = require("express");
require("dotenv").config();
const app = express();
require("../config").set(process.env.NODE_ENV, app);
const config = require("../config").get();


class Helper {

    /**
     * @description verify the user to authorized user's role
     * @param {*} req
     * @param {*} res
     * @param {*} next
     */
    verifyRole = (role) => {
        console.log("verify user")
        return (req, res, next) => {
            req.role = role;
            next();
        }
    };


    async encryptPassword(password) {
        console.log("encryptPassword user", password)
        if (this.isModified("password")) {
            password = await bcrypt.hash(password, 10);
            console.log("encryptPassword user new", password)
                //  this.confirmPassword = undefined;
        }

    }

}

module.exports = new Helper();