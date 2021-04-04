const express = require('express');
const bodyParser = require('body-parser');
var couchbase = require('couchbase')
    // create express app
const app = express();
const cluster = new couchbase.Cluster("couchbase://localhost", {
    username: process.env.COUCHBASE_USERNAME,
    password: process.env.COUCHBASE_PASSWOPRD
});

// get a reference to our bucket
const bucket = cluster.bucket("travel-sample");
// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }))

// parse requests of content-type - application/json
app.use(bodyParser.json())

// define a simple route
app.get('/', (req, res) => {
    res.json({ "message": "Welcome to EasyNotes application. Take notes quickly. Organize and keep track of all your notes." });
});

// listen for requests
app.listen(4000, () => {
    console.log("Server is listening on port 4000");
});