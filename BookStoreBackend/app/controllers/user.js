/**
 * @module       controllers
 * @file         user.js
 * @description  controller class holds request and sends response 
 * @author       Payal Ghusalikar <payal.ghusalikar9@gmail.com>
 * @since        4/04/2021  
-----------------------------------------------------------------------------------------------*/


const userService = require("../services/user.js");
const status = require("../../middleware/staticFile.json");
const config = require('../../config').get();
const {
    logger
} = config;

class userController {
    /** 
     * @method register is service class method
     * @description register and save a new user
     * @param res is used to send the response
     */
    register = (req, res) => {
        try {

            let confirmPassword = req.body.confirmPassword;
            let password = req.body.password;
            if (password !== confirmPassword) {
                return res.send({
                    status_code: status.Bad_Request,
                    message: "Password not match",
                });
            } else {
                const userInfo = {
                    firstName: req.body.firstName,
                    lastName: req.body.lastName,
                    emailId: req.body.emailId,
                    password: password,
                    role: req.role
                };
                userService.register(userInfo, (error, data) => {
                    return error ?
                        res.send({
                            success: false,
                            status_code: status.Internal_Server_Error + error.message
                        }) :
                        res.send({
                            status_code: status.Success,
                            message: "user added successfully !!",
                        });
                })
            }
        } catch (error) {
            logger.error("Some error occurred while creating user");
            return res.send({
                success: false,
                status_code: status.Internal_Server_Error,
                message: "Some error occurred while creating user" + error
            });
        }
    };


    /**
     * @method login is service class method in which user input data is passed
     * @description User login API
     * @method login is service class method
     */
    login = (req, res) => {
        try {
            const userLoginData = {
                emailId: req.body.emailId,
                password: req.body.password
            }
            userService.login(userLoginData, (error, data) => {
                if (error) {
                    logger.error(error.message);
                    if (error.message.includes('401'))
                        return res.status(401).send({
                            success: false,
                            message: error.message
                        });
                    return res.status(500).send({
                        success: false,
                        message: error.message
                    });
                }
                if (!data) {
                    const response = {
                        success: false,
                        message: 'Authorization failed'
                    };
                    return res.status(401).send(response);
                } else {
                    const userData = {
                        emailId: data[0]['user'].emailId,
                        name: data[0]['user'].fullName
                    };
                    logger.info('Login Successfull !');
                    return res.status(200).send({
                        message: 'Login Successfull !',
                        token: data.token,
                        data: userData
                    });
                }
            });
        } catch (error) {
            logger.error('Some error occurred !');
            res.status(500).send({
                success: false,
                message: 'Some error occurred !'
            });
        }
    }
}

module.exports = new userController();