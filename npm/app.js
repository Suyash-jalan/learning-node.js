
//external module
const express = require('express');
const bodyparser = require('body-parser');
const app = express();

app.use((req,res,next) =>{
    console.log("Came in first middleware",req.url, req.method);
    next();
});

app.use((req,res,next) =>{
    console.log("Came in second middleware",req.url, req.method);
    next();
});

app.get("/",(req,res,next) =>{
    console.log("Handling / for GET",req.url, req.method);
    res.send(`<h1>Welcome to Complete coding</h1>`);
    
});
app.post("/contact-us",  (req,res,next) =>{
    console.log("Handling /contect-us for GET",req.url, req.method, req.body);
    next();
});

app.use(bodyParser.urlencoded());


app.post("/contact-us", (req,res,next) =>{
    console.log("handling /contact-us for POST", req.url, req.meothod);
    res.send(`<h1>We will contact you shortly</h1>`);
});



const port = 3000;
app.listen(port, () => {
    console.log(`Server is running on address http://localhost:${port}`);
});