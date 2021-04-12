const express = require('express');
const bodyParser = require('body-parser');
require('dotenv').config();

const app = express();
app.use(bodyParser.json());

// set config
require('./config').set(process.env.NODE_ENV, app);

// get config
const config = require('./config').get();

//require cors
var cors = require('cors');
app.use(cors());



//require swagger - ui and swagger.json
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./app/lib/apiDocs.json');

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// // If no routes matches 
// app.use('*', (req, res) => {
//     res.status(404).send({ success: false, message: 'Route Not found' });
// });



// require user routes
require('./app/routes/user')(app);

// require book routes
require('./app/routes/books')(app);

/**
 * @description listen for requests
 * @param config.port is the port on which server is listening
 */
var server = app.listen(config.port, () => {
    console.log('Server is listening on port ' + config.port);
});

module.exports = server;