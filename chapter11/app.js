const path = require('path');

const express = require('express');
//local module
const storerouter = require("./routes/storerouter");
const hostRouter = require("./routes/hostRouter");
const rootDir = require("./utils/pathUtils");


const app = express();

app.set('view engine', 'ejs');
app.set('views',path.join(__dirname, 'views') );


app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use(storerouter);
app.use("/host", hostRouter);

const errorsController = require("./controllers/errors.js");
const mongoose = require('mongoose');
app.use(errorsController.pageNotFound);

// Global error handler
app.use((err, req, res, next) => {
    console.error('Server Error:', err);
    res.status(500).send('<h1>Something went wrong: ' + err.message + '</h1>');
});

const port = 3000;

const DB_PATH = "mongodb+srv://suyash:ssjy2311@cluster0.z7jqy5q.mongodb.net/airbnb?appName=Cluster0";
mongoose.connect(DB_PATH).then(() => {
    console.log('connect to Mongo');
    app.listen(port, () => {
        console.log(`Server is running on address http://localhost:${port}`);
    });

}).catch(err => {
    console.log('Error while connecting to Mongo: ', err);
}) 
