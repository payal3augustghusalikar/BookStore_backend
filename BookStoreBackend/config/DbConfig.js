//const config = require('.').get();

var couchbase = require('couchbase')

const cluster = new couchbase.Cluster("couchbase://localhost", {
    username: process.env.COUCHBASE_USERNAME,
    password: process.env.COUCHBASE_PASSWOPRD
});

// get a reference to our bucket
const bucket = cluster.bucket("Books");

// get a reference to the default collection
const collection = bucket.defaultCollection();