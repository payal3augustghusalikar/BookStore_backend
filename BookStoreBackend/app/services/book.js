const bookModel = require('../models/book');

class Bookservice {

    /**
     * @description calling model class method to add new book to book store
     * @method save is model class method
     * @param {*} bookData holds book information
     * @param {*} callback 
     * @returns callback function
     */
      addBook = (bookData, callback) => {
        console.log("ser")
       return bookModel.save(bookData, (error, data) => {
            return (error) ? callback(error, null) : callback(null, data);
        });
    }


    /**
     * @description add new book to bookstore
     *  @method getBooks is a model class method
     *  @param userId contains admin information
     */
    getBooks = (userId, callback) => {
        bookModel.getBooks(userId, (error, data) => {
            return (error) ? callback(error, null) : callback(null, data);
        });
    }

    updateBook = (bookData, callback) => {
       return bookModel.update(bookData, (error, data) => {
            return (error) ? callback(error, null) : callback(null, data);
        });
    }


    deleteBook = (bookData, callback) => {
      return bookModel.delete(bookData, (error, data) => {
        return (error) ? callback(error, null) : callback(null, data);
    })
    }

    addToBag =  async(bookData) => {
        console.log("ser")
       const data = await bookModel.addToBag(bookData)
       console.log("data", data)
        return data
    }
}

module.exports = new Bookservice();