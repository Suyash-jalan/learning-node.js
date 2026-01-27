const fs= require('fs');

const homeRequestHandler = (req, res) => {
    console.log (req.url, req.method);

    if (req.url === '/') {
        res.setHeader('Content-Type', 'text/html');
    res.write('<html>');
    res.write('<head><title>Home Page</title></head>');
    res.write('<body><h1>welcome to home page </h1>');
    res.write('<h2>click the calculator button to go to calculator page</h2>');
    res.write('<br><input type="button" value="Calculator" onclick="location.href=\'/calculator\'"/>');
    res.write('</body>');
    res.write('</html>');
    return res.end();
    }
    else if( req.url === '/calculator'){
        res.setHeader('Content-Type', 'text/html');
        res.write('<html>');
        res.write('<head><title>Calculator Page</title></head>');
        res.write('<body><h1>Welcome to Calculator Page</h1>');
        res.write('<form action="/calculate" method="POST">');
        res.write('<input type="number" name="num1" placeholder="Enter first number"/><br>');
        res.write('<input type="number" name="num2" placeholder="Enter second number"/><br>');
        res.write('<input type="submit" value="Sum" onclick="location.href=\'/sum\'"/>');
        res.write('</form>');
        res.write('</body>');
        res.write('</html>');
        return res.end();
    }
     else if (req.url.toLowerCase() === '/calculate' && req.method === 'POST'){
        
        const body = [];    
        req.on('data', (chunk) => {
           // console.log(chunk);
            body.push(chunk);
        });
        req.on('end', () => {
            const parsedBody = Buffer.concat(body).toString();
            console.log(parsedBody);
            const params = new URLSearchParams(parsedBody);//URLSearchParams  this is used for decoding the data from form
            const num1 = parseFloat(params.get('num1'));
            const num2 = parseFloat(params.get('num2'));
            const sum = num1 + num2;
            res.setHeader('Content-Type', 'text/html');
            res.write('<html>');
            res.write('<head><title>Result Page</title></head>');
            res.write('<body><h1>Result</h1>');
            res.write(`<h2>The sum of ${num1} and ${num2} is ${sum}</h2>`);
            res.write('</body>');
            res.write('</html>');
            
            const bodyObject = Object.fromEntries(params);
            console.log(bodyObject);
            fs.writeFileSync('calculator.txt', JSON.stringify(bodyObject));
           
             return res.end();
            
        }); 
        res.statusCode = 302;
;
        
        
    }
}

module.exports = homeRequestHandler;