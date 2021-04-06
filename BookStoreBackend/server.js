const express = require('express');
const bodyParser = require('body-parser');
//require("./config/DbConfig.js")();
// create express app
const app = express();
require("./config").set(process.env.NODE_ENV, app);
const config = require("./config").get();

require("dotenv").config();

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }))

// parse requests of content-type - application/json
app.use(bodyParser.json())

// define a simple route
app.get('/', (req, res) => {
    res.json({ "message": "Welcome to BookStore application. " });
});

// // listen for requests
// app.listen(4000, () => {
//     console.log("Server is listening on port 4000");
// });

// require user routes
require("./app/routes/user.js")(app);

const port = config.port || 4000;
app.listen(port, () => {
    console.log(`Server is listening on port: ${port}`);
});