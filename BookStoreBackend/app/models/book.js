/**
 * @module       models
 * @file         book.js
 * @description  models class holds all database operation and couchbase queries
 * @author       Payal Ghusalikar <payal.ghusalikar9@gmail.com>
 * @since        4/04/2021  
-----------------------------------------------------------------------------------------------*/

const userBucket = require('../../config/dbConfig').userBucket;
const bookBucket = require('../../config/dbConfig').bookBucket;
const N1qlQuery = require('../../config/dbConfig').N1qlQuery;
const uuid = require('uuid').v4;
const config = require('../../config').get();
const {
    logger
} = config;

class BookModel {

    /**
     * @description saving book into buckets
     * @method insert is used to save book into bucket
     * @param {*} bookData holds user input data 
     * @param {*} callback is for service class method
     */
    save = async (bookData, callback) => {
        await userBucket.get(bookData.adminId, async (error, user) => {
            if (error)
                return callback(error, null);
            else if (user.length == 0)
                return callback(null, user);
            else {
                const data = {
                    author: bookData.author,
                    title: bookData.title,
                    quantity: bookData.quantity,
                    price: bookData.price,
                    image: bookData.image,
                    description: bookData.description,
                    adminId: bookData.adminId,
                    isAddedToBag: false
                }
                const id = uuid();
                console.log("id")
                return data = await bookBucket.insert(id, data, callback)
            }
        });
    }


    /**
     * @description get all books from database
     * @method userBucket.get is used to get all books
     * @param {*} userId holds athorizes person id
     * @param {*} callback is for service class holds error and user
     */
    getBooks = async (userId, callback) => {
        await userBucket.get(userId, async (error, user) => {
            if (error)
                return callback(error, null);
            else if (user.length == 0)
                return callback(new Error('ERR-401'), null);
            else {
                await bookBucket.query(
                    N1qlQuery.fromString('SELECT * FROM `books`'), (err, rows) => {
                        return (err) ? callback(err, null) : callback(null, rows);
                    });
            }
        });
    }

    /**
     * @description update a book by admin
     * @method userBucket.get is used to get user associated with book
     * @method bookBucket.get is used to get book from db
     * @method bookBucket.upsert is used to insert and update book
     * @param {*} bookData 
     * @param {*} callback 
     * @returns 
     */
    update = async (bookData, callback) => {
        return userBucket.get(bookData.adminId, async (error, user) => {
            if (error)
                return callback(error, null);
            else if (user.length == 0)
                return callback(new Error('ERR-401-not found'), null);
            else {
                return bookBucket.get(bookData.bookId, (error, book) => {
                    if (error)
                        return callback(error, null);
                    else if (book.length == 0)
                        return callback(null, book);
                    else {
                        const updateBookData = {
                            author: bookData.author,
                            title: bookData.title,
                            quantity: bookData.quantity,
                            price: bookData.price,
                            image: bookData.image,
                            description: bookData.description
                        }
                        bookBucket.upsert(bookData.bookId, updateBookData, (error, result) => {
                            return error ? callback(error, null) : callback(null, result);
                        });
                    }
                });
            }
        });
    }

    /**
     * @description delete a book 
     * @param {*} bookData 
     * @param {*} callback 
     * @returns data of remove method
     * @method userBucket.get is used to get user associated with book
     * @method bookBucket.remove is used to remove book from db
     */
    delete = async (bookData, callback) => {
        userBucket.get(bookData.adminId)
        if (error)
            return callback(error, null);
        else if (user.length == 0)
            return callback(new Error('ERR-401 not found'), null);
        else {
            await bookBucket.get(bookData.bookId)
            if (error)
                return callback(error, null);
            else if (books.length == 0)
                return callback(null, books);
            else {
                const data = bookBucket.remove(bookData.bookId)
                return data
            }
        }
    }

    /**
     * @description add a book to bag by making isAddedToBag flag to true
     * @param {*} userData 
     * @returns rows 
     */
    addToBag = async (userData) => {
        var query = N1qlQuery.fromString('UPDATE `books` SET isAddedToBag = true WHERE meta().id =' + '"' + userData.bookId + '"');
        const rows = userBucket.query(query)
        return rows
    }
}

module.exports = new BookModel();