// const express = require('express');
// const bodyParser = require('body-parser');
// const app = express();
// const couchbase = require('couchbase');
// require("./config").set(process.env.NODE_ENV, app);
// const config = require("./config").get();


// // For Couchbase > 4.5 with RBAC Auth
// // cluster.authenticate('Administarator', 'Payal1234567')
// // const bucket = cluster.openBucket('user');


// // require("dotenv").config();
// // var cluster = new couchbase.Cluster("couchbase://localhost", { username: process.env.USERNAME, password: process.env.PASSWORD })

// // var bucket = new cluster.bucket('user')
// // parse requests of content-type - application/x-www-form-urlencoded
// app.use(bodyParser.urlencoded({ extended: true }))

// // parse requests of content-type - application/json
// app.use(bodyParser.json())

// // define a simple route
// app.get('/', (req, res) => {
//     res.json({ "message": "Welcome to BookStore application. " });
// });

// // require user routes
// require("./app/routes/user.js")(app);

// const port = config.port || 4000;
// //const port = process.env.PORT
// app.listen(port, () => {
//     console.log(`Server is listening on port: ${port}`);
// });
// //module.exports.bucket = bucket;












const express = require('express');
var couchbase = require('couchbase')
const bodyParser = require('body-parser');
require('dotenv').config();
//const logger = require('./app/logger/logger');

const app = express();
app.use(bodyParser.json());
var cluster = new couchbase.Cluster('couchbase://localhost', {
    username: process.env.COUCHBASE_USERNAME,
    password: process.env.COUCHBASE_PASSWORD,
})
console.log("cluster", cluster)
var bucket = cluster.bucket('user', (err) => {
    if (err) {
        console.error('Got error: ', err)
    }
})

module.exports.bucket = bucket

// require user routes
require('./app/routes/user')(app)

/**
 * @description listen for requests
 * @param process.env.PORT is the port number 
 */
app.listen(process.env.PORT, () => {
    console.log("Server is listening on port ", process.env.PORT);
})