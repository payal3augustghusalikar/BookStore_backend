const bookService = require('../services/book.js');

const userService = require("../services/user.js");
let vallidator = require("../../middleware/vallidation.js");
const status = require("../../middleware/staticFile.json");
const config = require('../../config').get();
const {
    logger
} = config;
const {
    body,
    checkSchema,
    validationResult
} = require('express-validator');


class BookController {
    /**
     * @description add new book to book-store
     * @method register is a service class method
     * 
     */
    addBook = (req, res) => {
        console.log("ctrl")
        try {
            const bookData = {
                author: req.body.author,
                title: req.body.title,
                quantity: req.body.quantity,
                price: req.body.price,
                description: req.body.description,
                adminId: req.decodeData.userId
            };
            // const validationResult = validator.validate(bookData);
            // if (validationResult.error) {
            // 	return res.status(400).send({ success: false, message: validationResult.error.message });
            // }
            //     bookService.addBook(bookData, (error, data) => {
            //         if (error) {
            //            // logger.error(error.message);
            //             return res.status(500).send({ success: false, message: error.message });
            //         } else if (data.length == 0) {
            //           //  logger.error('Authorization failed');
            //             return res.status(401).send({ success: false, message: 'Authorization failed' });
            //         }
            //        // logger.info('added book!');
            //         return res.status(200).send({ success: true, message: 'book is added successfully!' });
            //     });
            // } catch (error) {
            //     logger.error('Some error occurred !');
            //     res.status(500).send({ success: false, message: 'Some error occurred !'+ error });
            // }


            bookService.addBook(bookData)
                .then((data) => {
                    logger.info("Book added successfully !"),
                        res.send({
                            success: true,
                            status: status.Success,
                            message: "Book added successfully !",
                            data: data,
                        });
                })
                .catch((error) => {
                    logger.error("Some error occurred while creating Book", +error),
                        res.send({
                            success: false,
                            status: status.Internal_Server_Error,
                            message: "Some error occurred while creating Book",
                        });
                });
        } catch (error) {
            logger.error("Some error occurred while creating Book"),
                res.send({
                    success: false,
                    status: status.Internal_Server_Error,
                    message: "Some error occurred while creating Book" + error,
                });
        }
    }


}


module.exports = new BookController();