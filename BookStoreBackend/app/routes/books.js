/**
 * @module      routes
 * @file         book.js
 * @description  provide the routes for user as well note operations and middleware inpu vallidations
 * @author       Payal Ghusalikar <payal.ghusalikar9@gmail.com>
 * @since        05/04/2021  
-----------------------------------------------------------------------------------------------*/

var helper = require("../../middleware/helper.js");
const book = require("../controllers/book.js");
const {
  bookValidationRules,
  validate
} = require('../../middleware/vallidation')

module.exports = (app) => {

  //add new book
  app.post('/book', helper.verifyRole, bookValidationRules(), validate, book.addBook);

  //get all books from bucket
  app.get('/books', helper.verifyToken, book.findAllBooks);

  //update a book by id
  app.put('/book/:bookId', helper.verifyToken, bookValidationRules(), validate, book.update);

  //delete a book by id
  app.delete('/book/:bookId', helper.verifyToken, book.delete);

  //add to bag book by id
  app.put('/book/addtobag/:bookId', helper.verifyToken, book.addToBag);
};