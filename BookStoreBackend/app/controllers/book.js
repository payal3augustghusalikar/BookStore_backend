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
      
        try {
            const bookData = {
                author: req.body.author,
                title: req.body.title,
                quantity: req.body.quantity,
                price: req.body.price,
                description: req.body.description,
                image: req.body.image,
                adminId: req.decodeData.userId
            }

            bookService.addBook(bookData)
                .then((data) => {
                    logger.info("Book added successfully !"),
                        res.send({
                            status: status.Success,
                            message: "Book added successfully !",
                            data: data,
                        });
                })
                .catch((error) => {
                    logger.error("Some error occurred while creating Book", +error),
                        res.send({
                            status: status.Internal_Server_Error,
                            message: "Some error occurred while creating Book",
                        });
                });
        } catch (error) {
            logger.error("Some error occurred while creating Book"),
                res.send({
                    status: status.Internal_Server_Error,
                    message: "Some error occurred while creating Book" + error,
                });
        }
    }

    findAllBooks = (req, res) => {
        try{
            const userId = req.decodeData.userId;
            bookService.getBooks(userId, (error, data) => {
                if(error) {
                    return res.status(500).send({ success: false, message: error.message });
                }
                else if(data.length == 0){
                    logger.error('Books not found');
                    return res.status(404).send({ success: false, message: 'Books not found' });
                }
                console.log("data1", data)
                logger.info('Successfully retrieved books !');
                return res.status(200).send({ success: true, message: 'Successfully retrieved books !', data: data});
            });
        }
        catch(error){
            logger.error('Some error occurred !');
			res.status(500).send({ success: false, message: 'Some error occurred !'+ error });
        }
    }



    /**
     * @message Update book by id
     * @method update is service class method
     * @param res is used to send the response
     */
     update = (req, res) => {
         console.log("ctrl")
        // try {
        //     const bookInfo = {
        //         bookID: req.params.bookId,
		// 		author: req.body.author,
		// 		title: req.body.title,
		// 		image: req.body.image,
		// 		quantity: req.body.quantity,
        //         price: req.body.price,
        //         description: req.body.description,
        //         adminId: req.decodeData.userId
        //     };
        //     // const validation = namePattern.validate(bookInfo.name);
        //     // console.log(validation);
        //     // return validation.error ?
        //     //     res.send({
        //     //         success: false,
        //     //         status: status.Bad_Request,
        //     //         message: "please enter valid details" + validation.error,
        //     //     }) :
        //     bookService
        //         .updateBook(bookInfo)
        //         .then((data) => {
        //             !data
        //                 ?
        //                 (logger.warn(
        //                         "book not found with id : " + req.params.bookId
        //                     ),
        //                     res.send({
        //                         status_code: status.Not_Found,
        //                         message: "book not found",
        //                     })) :
        //                 logger.info("book updated successfully !"),
        //                 res.send({
        //                     status_code: status.Success,
        //                     message: "book updated successfully !",
        //                     data: data,
        //                 });
        //             // this.findAll();
        //         })
        //         .catch((error) => {
        //             logger.error(
        //                     "Error updating book with id : " + req.params.bookId
        //                 ),
        //                 res.send({
        //                     status_code: status.Unauthorized,
        //                     message: "Error updating book",
        //                 });
        //         });
        // } catch (error) {
        //     return (
        //         error.kind === "ObjectId" ?
        //         (logger.error("book not found with id " + req.params.bookId),
        //             res.send({
        //                 status_code: status.Not_Found,
        //                 message: "book not found ",
        //             })) :
        //         logger.error("Error updating book with id " + req.params.bookId),
        //         res.send({
        //             status_code: status.Internal_Server_Error,
        //             message: "Error updating book",
        //         })
        //     );
        // }





        try {
                const bookInfo = {
                bookId: req.params.bookId,
				author: req.body.author,
				title: req.body.title,
				image: req.body.image,
				quantity: req.body.quantity,
                price: req.body.price,
                description: req.body.description,
                adminId: req.decodeData.userId,
                addedToBag: false
            };
          
            // const validation = ControllerDataValidation.validate(bookData);
            // return validation.error ?
            //     res.status(400).send({
            //         success: false,
            //         message: "please enter valid details " + validation.error,
            //     }) :
                bookService.updateBook(bookInfo, (error, data) => {
                    return (
                        error ?
                        (logger.error("Error updating book with id : " + req.params.bookId),
                            res.send({
                                status_code: status.Internal_Server_Error,
                                message: "Error updating book with id : " + req.params.bookId +error,
                            })) :
                        !data ?
                        (logger.warn("book not found with id : " + req.params.bookId +error),
                            res.send({
                                status_code: status.Not_Found,
                                message: "book not found with id : " + req.params.bookId +error,
                            })) :
                        logger.info("book updated successfully !"),
                        res.send({
                            message: "book updated successfully !",
                           data: data,
                        })
                    );
                });
        } catch (error) {
            return (
                error.kind === "ObjectId" ?
                (logger.error("book not found with id "+error + req.params.bookId),
                    res.send({
                        status_code: status.Not_Found,
                        message: "book not found with id "+error + req.params.bookId,
                    })) :
                logger.error("Error updating book with id "+error + req.params.bookId),
                res.send({
                    status_code: status.Internal_Server_Error,
                    message: "Error updating book with id "+error + req.params.bookId,
                })
            );
        }
    };




    /**
     * @message Update book with id
     * @method delete is service class method
     * @param response is used to send the response
     */
    delete = async(req, res) => {
        console.log("ctrl")
        try {
            const bookData = {
                bookId: req.params.bookId,
                adminId: req.decodeData.userId
			};
            console.log("bookid", req.params.bookId)
            let data = await bookService.deleteBook(bookData);
            !data
                ? 
                (logger.warn("book not found with id " + req.params.bookId),
                    res.send({
                        status_code: status.Not_Found,
                        message: "book not found with id "+ req.params.bookId,
                    })) :
                res.send({
                    status_code: status.Success,
                    message: "book deleted successfully!",
                });
            error(
                logger.warn("book not found with id" + req.params.bookId),
                res.send({
                    status_code: status.Not_Found,
                    message: "book not found with id " + req.params.bookId,
                }) 
            )
                
        } catch (error) {
            return (
                error.kind === "ObjectId" || error.name === "NotFound" ?
                (logger.error("could not found book with id" + req.params.bookId),
                    res.send({
                        status_code: status.Not_Found,
                        message: "book not found with id" + error + req.params.bookId,
                    })) :
                logger.error("Could not delete book with id" + error + req.params.bookId),
                res.send({
                    status_code: status.Internal_Server_Error,
                    message: "Could not delete book with id " + error + req.params.bookId,
                })
            );
        }
    };



    addToBag = (req, res) => {
        try {
            console.log("ctrl")
            const addToBagData = {
                bookId: req.params.bookId, 
                adminId: req.decodeData.userId,
              //  isAddedToBag : true
            };
            bookService
                .addToBag(addToBagData)
                .then((data) => {
                    if (!data) {
                        res.send({
                            success: false,
                            status_code: status.Not_Found,
                            message: "book not found with id : " + req.params.bookId + error,
                        });
                    }
                    res.send({
                     
                        status: status.Success,
                        message: " added to bag successfully !",
                      //  data: data,
                    });
                })
                .catch((error) => {
                    res.send({
                      
                        status: status.Internal_Server_Error,
                        message: "Some error occurred while adding to bag" + error,
                    });
                });
        } catch (error) {
            logger.error("Some error occurred while adding to bag"),
                res.send({
                 
                    status: status.Internal_Server_Error,
                    message: "Some error occurred while adding to bag" + error,
                });
        }
    };
}


module.exports = new BookController();