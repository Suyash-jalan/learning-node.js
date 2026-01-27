const http = require('http');
const fs = require('fs');
 
const server = http.createServer((req, res) => {
    console.log (req.url, req.method, req.headers);

    if (req.url === '/') {
        res.setHeader('Content-Type', 'text/html');
    res.write('<html>');
    res.write('<head><title>My First Page</title></head>');
    res.write('<body><h1>Enter your details:</h1>');
    res.write('<form action="/submit" method="POST">');
    res.write('<input type="text" name="username" placeholder="Enter your name"/><br>');
    res.write('<label for="male">Male</label>')
    res.write('<input type="radio" id="male" name="gender" value="male"/>')
    res.write('<label for="female">Female</label>')
    res.write('<input type="radio" id="female" name="gender" value="female"/>')
    res.write('<br><input type="submit" value="Submit"/>');
    res.write('</form>');
    res.write('</body>');
    res.write('</html>');
    return res.end();

    } else if (req.url.toLowerCase() === '/submit' && req.method === 'POST'){
        fs.writeFileSync('user.txt', 'User submitted the form.');
        res.statusCode = 302;
        res.setHeader('Location', '/submit');

    } 
          
    res.setHeader('Content-Type', 'text/html');
    res.write('<html>');
    res.write('<head><title>My First Page</title></head>');
    res.write('<body><h1>nikal bsdk bhara gaya tara form</h1></body>');
    res.write('</html>');
    return res.end();

      
  

    //process.exit(); // stops event loop 
}); 

const port = 3000;
server.listen(port, () => {
    console.log(`Server is running on address http://localhost:${port}`);
    console.log('Listening for requests...');
});