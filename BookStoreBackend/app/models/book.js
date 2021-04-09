class BookModel {
    /**
     * @description saving book into buckets
     * @method insert is used to save book into bucket
     */
    save = async(bookData, callback) => {
        await userBucket.get(bookData.adminId.toString(), async(error, user) => {
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
                    description: bookData.description
                }
                logger.info('creating unique id');
                const id = uuid();
                await bookBucket.insert(id, data, (error, result) => {
                    return error ? callback(error, null) : callback(null, result);
                });
            }
        });
    }
}


module.exports = new BookModel();