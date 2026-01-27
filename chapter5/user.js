
const { error } = require('console');
const fs = require('fs');
 
const userrequestHandler = (req, res) => {
    console.log (req.url, req.method);

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
        
        const body = [];

        req.on('data', (chunk) => {
            console.log(chunk);
            body.push(chunk);
        });
        req.on('end', () => {
            const parsedBody = Buffer.concat(body).toString();
            console.log(parsedBody);
            const params = new URLSearchParams(parsedBody);//URLSearchParams  this is used for decoding the data from form
            
            //method 1 to convert params to object

            /*const bodyObject = {};// empty object to store key value pairs
            for (const [key, value] of params.entries()) {
                bodyObject[key] = value;
            }*/

            // method2 ( ) 
            const bodyObject = Object.fromEntries(params);


            console.log(bodyObject);
            //fs.writeFileSync('user.txt', JSON.stringify(bodyObject));// this block everything and writes to file first and then sends response which is slow
            fs.writeFile('user.txt', JSON.stringify(bodyObject), error => {
                console.log("Data written successfully to file");
                res.statusCode = 302;
                res.setHeader('Location', '/submit');
                return res.end();
            });
        });
   


    } else {
        res.setHeader('Content-Type', 'text/html');
    res.write('<html>');
    res.write('<head><title>My First Page</title></head>');
    res.write('<body><h1>nikal bsdk bhara gaya tara form</h1></body>');
    res.write('</html>');
    return res.end();
    }
          
    

      
  

    //process.exit(); // stops event loop 
}; 

module.exports = userrequestHandler;
