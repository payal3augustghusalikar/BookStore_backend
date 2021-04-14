/**
 * @module      routes
 * @file         book.js
 * @description  provide the routes for user as well note operations
 * @author       Payal Ghusalikar <payal.ghusalikar9@gmail.com>
 * @since        05/04/2021  
-----------------------------------------------------------------------------------------------*/

var helper = require("../../middleware/helper.js");
const book = require("../controllers/book.js");

module.exports = (app) => {
      app.post('/book', helper.verifyRole, 
        book.addBook
      ); 

 app.get('/books', helper.verifyToken, book.findAllBooks);
 app.put('/book/:bookId', helper.verifyToken, book.update);
 app.delete('/book/:bookId', helper.verifyToken, book.delete);
 app.put('/book/addtobag/:bookId', helper.verifyToken, book.addToBag);
};