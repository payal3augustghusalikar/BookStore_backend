const bookService = require('../services/book.js');
const config = require('../../config').get();
const { logger } = config;

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
                adminId: req.decodeData.userId
            };
            // const validationResult = validator.validate(bookData);
            // if (validationResult.error) {
            // 	return res.status(400).send({ success: false, message: validationResult.error.message });
            // }
            bookService.addBook(bookData, (error, data) => {
                if (error) {
                    logger.error(error.message);
                    return res.status(500).send({ success: false, message: error.message });
                } else if (data.length == 0) {
                    logger.error('Authorization failed');
                    return res.status(401).send({ success: false, message: 'Authorization failed' });
                }
                logger.info('added book!');
                return res.status(200).send({ success: true, message: 'added book !' });
            });
        } catch (error) {
            logger.error('Some error occurred !');
            res.status(500).send({ success: false, message: 'Some error occurred !' });
        }
    }
}

ports = new BookController();