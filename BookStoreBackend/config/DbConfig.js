//const config = require('.').get();
// const config = require('.').get();
// require(`dotenv`).config();
// var couchbase = require('couchbase')

// var cluster = new couchbase.Cluster(config.database.dbURL);

// cluster.authenticate(config.database.username, config.database.password);

// var bucket = cluster.openBucket('user', function(err) {
//     if (err) {
//         console.error('Got error: ', err);
//     }
// });

// var N1qlQuery = couchbase.N1qlQuery;

// module.exports = {
//     N1qlQuery,
//     bucket
// };



const config = require('.').get();
var couchbase = require('couchbase');

var cluster = new couchbase.Cluster(config.database.dbURL
    /* , {
        username: config.database.username,
        password: config.database.password,
    } */
);
console.log("cluster", cluster)
cluster.authenticate(config.database.username, config.database.password);
var bucket = cluster.openBucket('user', (err) => {
    if (err) {
        console.error('Got error : ', err);
    }
});


var N1qlQuery = couchbase.N1qlQuery;
//var collection = bucket.collection();

module.exports = {
    //collection: collection,
    userBucket: bucket,
    N1qlQuery: N1qlQuery
};