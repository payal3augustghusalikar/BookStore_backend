const bookModel = require('../models/book');
class Bookservice {
    /**
     * @description add new book to bookstore
     * @method save is a model class method
     */
    addBook = (bookData, callback) => {
    
       return bookModel.save(bookData, (error, data) => {
            return (error) ? callback(error, null) : callback(null, data);
        });
    }



    getBooks = (userId, callback) => {
        bookModel.getBooks(userId, (error, data) => {
            return (error) ? callback(error, null) : callback(null, data);
        });
    }
}

module.exports = new Bookservice();