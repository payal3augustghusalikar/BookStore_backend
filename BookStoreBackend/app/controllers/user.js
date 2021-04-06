/* @module        middlewares
 * @file          user.js
 * @description  controllers takes request and send the response   
 * @author       Payal Ghusalikar <payal.ghusalikar9@gmail.com>
*  @since         26/01/2021  
-----------------------------------------------------------------------------------------------*/

const userService = require("../services/user.js");
let vallidator = require("../../middleware/vallidation.js");
const status = require("../../middleware/staticFile.json");

class userController {
    /**
     * @description register and save a new user
     * @param res is used to send the response
     */
    register = (req, res) => {
        console.log("controleer")
        try {
            let confirmPassword = req.body.confirmPassword;
            let password = req.body.password;
            if (password !== confirmPassword) {
                return res.send({
                    success: false,
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
                const validation = vallidator.validate(userInfo);
                return validation.error ?
                    res.send({
                        success: false,
                        status_code: status.Bad_Request,
                        message: validation.error.message,
                    }) :
                    userService.register(userInfo, (error, data) => {
                        return error ?
                            res.send({
                                success: false,
                                status_code: status.Internal_Server_Error,
                                message: error.message,
                            }) :
                            res.send({
                                status_code: status.Success,
                                message: "user added successfully please verify your mail!",
                                data: data,
                            });
                    });
            }
        } catch (error) {
            logger.error("Some error occurred while creating user");
            return res.send({
                success: false,
                status_code: status.Internal_Server_Error,
                message: "Some error occurred while creating user",
                error,
            });
        }
    };
}


module.exports = new userController();