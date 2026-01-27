const http = require('http');
const fs = require('fs');
 
const server = http.createServer((req, res) => {
    console.log (req.url, req.method, req.headers);
    if (req.url === '/home') {
        res.write('<h1>Welcome to the Home Page</h1>');
        return res.end();
    }else {
        res.write('<h1>Page Not Found</h1>');
        
    } 
  
    

    //res.setHeader('Content-Type', 'text/html');
    res.write('<html>');
    res.write('<head><title>My First Page</title></head>');
    res.write('<body>');
    res.write('<nav>')
    res.write('<ul>')
    res.write('<li><a href="/home">Home</a></li>');
    res.write('<li><a href="/men">Men</a></li>');
    res.write('<li><a href="/women">Women</a></li>');
    res.write('<li><a href="/kids">Kids</a></li>');
    res.write('<li><a href="/cart">Cart</a></li>');
    res.write('</ul>')
    res.write('</nav>')
    res.write('</body>');
    res.write('</html>');
     res.end();
    
          
   

    //process.exit(); // stops event loop 
}); 

const port = 3002;
server.listen(port, () => {
    console.log(`Server is running on address http://localhost:${port}`);
    console.log('Listening for requests...');
});