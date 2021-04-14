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
     */
    save = async (bookData, callback) => {
        await userBucket.get(bookData.adminId.toString(), async (error, user) => {
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
                    description: bookData.description
                }
                const id = uuid();
                return data = await bookBucket.insert(id, data, callback)
                // (error, result) => {
                //     console.log("id", id)
                //     console.log("result", result)
                //     return error ? callback(error, null) : callback(null, result);
                // });
            }
        });
    }



    getBooks = async (userId, callback) => {
        console.log("userId", userId)
        console.log("userId.toString()", userId.toString())
        await userBucket.get(userId, async (error, user) => {
            if (error)
                return callback(error, null);
            else if (user.length == 0)
                return callback(new Error('ERR-401'), null);
            else {
                await bookBucket.query(
                    N1qlQuery.fromString('SELECT * FROM `books`'), (err, rows) => {
                        console.log(rows)
                        return (err) ? callback(err, null) : callback(null, rows);

                    });
            }
        });
    }





    update = async (bookData, callback) => {
        console.log("mdl")
        console.log("bookData.adminId", bookData.adminId.toString())
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


    delete = async (bookData, callback) => {
        console.log("mdl")
        console.log("bookData.adminId", bookData.adminId.toString())
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
    // delete = (bookData) => {
    //      userBucket.get(bookData.adminId)
    //         .then(bookBucket.get(bookData.bookId))
    //         .then( bookBucket.remove(bookData.bookId))
    // }


    addToBag = async (userData) => {

        // return Note.findById(collaborator.noteId).then((noteData) => {
        //     if (!noteData.collaborator.includes(collaborator.collaboratorId)) {
        //         return Note.findByIdAndUpdate(
        //             collaborator.noteId, {
        //                 $push: {
        //                     collaborator: collaborator.collaboratorId,
        //                 },
        //             }, { new: true }
        //         );
        //     }

console.log("mdl")
console.log("bookid, ", userData.adminId)
        return bookBucket.get(userData.adminId).then((user) => {
            if (user) {
                console.log("bookid, ", userData.bookId)
                var query = N1qlQuery.fromString('UPDATE my `books` SET isAddedToBag = true WHERE meta().id =' + '"' + userData.bookId + '"');
                const rows =  userBucket.query(query)

                console.log("rows", rows)
                return rows

            }
        }).catch((error) => {
                   return res.send({
                        status: status.Internal_Server_Error,
                        message: "Some error occurred while adding to bag...." + error,
                    });
                });
    }
}

// if 
// var query = N1qlQuery.fromString('SELECT meta().id, * FROM `user` WHERE emailId=' + '"' + userData.emailId + '"');
// var query = N1qlQuery.fromString('UPDATE my `books` SET isAddedToBag = true WHERE meta().id =' +'"' + userData.bookId + '"');
// const rows = await userBucket.query(query, callback)

// console.log("rows",rows)
// return rows
//             (error, rows) => {
// console.log("rows",rows)
//             return (error) ? callback(error, null) : callback(null, rows);
//         });




module.exports = new BookModel();