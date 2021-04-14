const bookModel = require('../models/book');

class Bookservice {

    /**
     * @description calling model class method to add new book to book store
     * @method save is model class method
     * @param {*} bookData holds book information
     * @param {*} callback 
     * @returns callback function
     */
    addBook =  async (bookData, callback) => {

        const data = await bookModel.save(bookData, callback)
        return data
        //     , (error, data) => {
        //     return (error) ? callback(error, null) : callback(null, data);
        // });
    }


    /**
     * @description add new book to bookstore
     *  @method getBooks is a model class method
     *  @param userId contains admin information
     */
    getBooks = (userId, callback) => {
        console.log("ser")
        bookModel.getBooks(userId, (error, data) => {
            console.log("data", data)
            return (error) ? callback(error, null) : callback(null, data);
        });
    }


    updateBook = (bookData, callback) => {
        console.log("ser")
       return bookModel.update(bookData, (error, data) => {
            return (error) ? callback(error, null) : callback(null, data);
        });
    }

  
    deleteBook = async (bookData, callback) => {
        console.log("ser")
       const data =await bookModel.delete(bookData)
       console.log("data", data)
    
        // , (error, data) => {
        //    console.log("err,", error)
        //     return (error) ? callback(error, null) : callback(null, data);
        // });
    }




    addToBag =  async(bookData) => {
        console.log("ser")
       const data = await bookModel.addToBag(bookData)
       console.log("data", data)
        return data
        
        // => {
        //     return (error) ? callback(error, null) : callback(null, data);
        // });
    }
}

module.exports = new Bookservice();