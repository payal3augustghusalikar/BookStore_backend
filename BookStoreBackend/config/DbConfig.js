/**
 * @module       config
 * @file         dbConfig.js
 * @description  contains couchbae server and  bucket connection
 * @author       Payal Ghusalikar <payal.ghusalikar9@gmail.com>
 * @since        4/04/2021  
-----------------------------------------------------------------------------------------------*/
const config = require('.').get();
var couchbase = require('couchbase');

var cluster = new couchbase.Cluster(config.database.dbURL);
cluster.authenticate(config.database.username, config.database.password);

var userBucket = cluster.openBucket('user', (err) => {
    if (err) {
        console.error('Got error : ', err);
    }
});

var bookBucket = cluster.openBucket('books', (err) => {
    if (err) {
        console.error('Got error : ', err);
    }
});

var N1qlQuery = couchbase.N1qlQuery;

module.exports = {
    userBucket: userBucket,
    bookBucket: bookBucket,
    N1qlQuery: N1qlQuery
};