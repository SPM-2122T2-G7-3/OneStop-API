const http = require('http');
const app = require('./app');
const mongoose = require('mongoose');

const environment = process.env.NODE_ENV || 'development';
const port = process.env.PORT || 3000;


// Mongo Connection
const dbHost = process.env.DB_HOST;
const dbPort = process.env.DB_PORT;
// const dbName = environment == 'development' ? process.env.DB_TEST_NAME : process.env.DB_NAME;
const dbName = process.env.DB_NAME;
const connStr = `mongodb://${dbHost}:${dbPort}/${dbName}`;
mongoose.connect(connStr, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const server = http.createServer(app);
server.listen(port);