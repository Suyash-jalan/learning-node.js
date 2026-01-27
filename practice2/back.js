const http = require('http');
const homeRequestHandler = require('./home');

const server = http.createServer(homeRequestHandler);
const port = 4000;
server.listen(port, () => {
    console.log(`Server is running on address http://localhost:${port}`);
    console.log('Listening for requests...');
});