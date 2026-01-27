//core modules
const http = require('http');
//external modules
const express = require('express');
//local modules
const requestHandler = require('./user');

const app = express();

app.use((req, res, next) => {
    console.log("come in first middleware", req.url, req.method);
    next();
});

app.use((req, res, next) => {
    console.log("come in second middleware", req.url, req.method);
});
 
const server = http.createServer(app);
    

const port = 3002;
server.listen(port, () => {
    console.log(`Server is running on address http://localhost:${port}`);
    console.log('Listening for requests...');
});