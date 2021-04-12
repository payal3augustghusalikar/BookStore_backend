const bookModel = require('../models/book');
class Bookservice {
    /**
     * @description add new book to book-store
     * @method save is a model class method
     */
    addBook = (bookData, callback) => {
        console.log("ser")
       return bookModel.save(bookData, (error, data) => {
            return (error) ? callback(error, null) : callback(null, data);
        });
    }
}

module.exports = new Bookservice();