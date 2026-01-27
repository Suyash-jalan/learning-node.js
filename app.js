const http = require('http');
 
const server = http.createServer((req, res) => {
    console.log (req.url, req.method, req.headers);

    if (req.url === '/') {
        res.setHeader('Content-Type', 'text/html');
    res.write('<html>');
    res.write('<head><title>My First Page</title></head>');
    res.write('<body><h1>welcome to home</h1></body>');
    res.write('</html>');
    return res.end();

    } else if (req.url === '/products') {
        res.setHeader('Content-Type', 'text/html');
    res.write('<html>');
    res.write('<head><title>My First Page</title></head>');
    res.write('<body><h1>checkout our product</h1></body>');
    res.write('</html>');
    return res.end();

    } 
          
    res.setHeader('Content-Type', 'text/html');
    res.write('<html>');
    res.write('<head><title>My First Page</title></head>');
    res.write('<body><h1>Hello from my Node.js server!</h1></body>');
    res.write('</html>');
    return res.end();

      
  

    //process.exit(); // stops event loop 
}); 

const port = 3001;
server.listen(port, () => {
    console.log(`Server is running on address http://localhost:${port}`);
    console.log('Listening for requests...');
});