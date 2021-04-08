const config = require('.').get();
var couchbase = require('couchbase');
var N1qlQuery = couchbase.N1qlQuery;

// var cluster = new couchbase.Cluster(config.database.dbURL
//     /* , {
//         username: config.database.username,
//         password: config.database.password,
//     } */
// );
// cluster.authenticate(config.database.username, config.database.password);
// console.log("cluster", cluster)
// var userBucket = cluster.openBucket('user', (err) => {
//     if (err) {
//         console.error('Got error : ', err);
//     }
// });


var cluster = new couchbase.Cluster(config.database.dbURL, {
    username: config.database.username,
    password: config.database.password,
})
console.log("cluster", cluster)
console.log("N1qlQuery", N1qlQuery)
var userBucket = cluster.bucket('user', (err) => {
    if (err) {
        console.error('Got error: ', err)
    }
})
var bookBucket = cluster.bucket('books', (err) => {
    if (err) {
        console.error('Got error : ', err);
    }
});


//userBucket.enableN1ql('localhost' + ":8093")
//var collection = bucket.collection();

module.exports = {
    //collection: collection,
    userBucket: userBucket,
    bookBucket: bookBucket,
    N1qlQuery: N1qlQuery
};