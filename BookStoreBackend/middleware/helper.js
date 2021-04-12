/**
 * @module       Middleware
 * @file         helper.js
 * @description  holds the logical reusable methods calling from service class
 * @author       Payal Ghusalikar <payal.ghusalikar9@gmail.com>
*  @since        27/01/2021  
-----------------------------------------------------------------------------------------------*/

//const jwt = require("jsonwebtoken");
const express = require("express");
const app = express();
const bcrypt = require("bcrypt");

require("dotenv").config();

var jwt = require('jsonwebtoken');
// require("../config").set(process.env.NODE_ENV, app);
 const config = require("../config").get();
 const { logger } = config;
class Helper {

    /**
     * @description verify the user to authorized user's role
     * @param {*} req
     * @param {*} res
     * @param {*} next
     */
    addRole = (role) => {
        return (req, res, next) => {
            req.role = role;
            next();
        }
    };


    encryptPassword = (password, callback) => {
        bcrypt.hash(password, 10, (err, hash) => {
                if (err)
                    return callback(err, null);
                return callback(null, hash);
            })
    }

    /**
     * @description create the token
     * @param {} data
     */
    generateToken = (user) => {
        const token = jwt.sign({
                emailId: user['user'].emailId,
                userId: user.id,
                role: user['user'].role
            },
            process.env.SECRET_KEY, {
                expiresIn: "60d",
            });
        return token;
    }


    verifyRole = (req, res, next) => {
        const token =   req.headers.authorization.split(" ")[1];
        if (token === undefined) {
            logger.error('Incorrect token or token is expired');
            return res.status(401).send({ success: false, message: 'Incorrect token or token is expired' });
        }

        return jwt.verify(token, process.env.SECRET_KEY, (error, decodeData) => {
            if (error) {
                logger.error('Incorrect token or token is expired');
                return res.status(401).send({ success: false, message: 'Incorrect token or token is expiredd ', error });
            } else if (decodeData.role != 'admin') {
                logger.error('Authorization failed');
                return res.status(401).send({ success: false, message: 'Authorization failed' });
            }
            req.decodeData = decodeData;
            next();
        });
    }




    verifyToken = (req, res, next) => {
        const token =   req.headers.authorization.split(" ")[1];
		if (token === undefined) {
			logger.error('Incorrect token or token is expired');
			return res.status(401).send({ success: false, message: 'Incorrect token or token is expired' });
		}
	
		return jwt.verify(token, process.env.SECRET_KEY, (error, decodeData) => {
        if (error) {
				logger.error('Incorrect token or token is expired');
				return res.status(401).send({ success: false, message: 'Incorrect token or token is expired' });
			}
            req.decodeData = decodeData;
			next();
		});
	}




    findAllBooks = (req, res) => {
        try{
            const userId = req.decodeData.userId;
            bookService.getBooks(userId, (error, data) => {
                if(error) {
                    logger.error(error.message);
                    if(error.message.includes('401'))
                        return res.status(401).send({ success: false, message: error.message });
                    return res.status(500).send({ success: false, message: error.message });
                }
                else if(data.length == 0){
                    logger.error('Books not found');
                    return res.status(404).send({ success: false, message: 'Books not found' });
                }
                logger.info('Successfully retrieved books !');
                return res.status(200).send({ success: true, message: 'Successfully retrieved books !', data: data});
            });
        }
        catch(error){
            logger.error('Some error occurred !');
			res.status(500).send({ success: false, message: 'Some error occurred !' });
        }
    }



}

module.exports = new Helper();