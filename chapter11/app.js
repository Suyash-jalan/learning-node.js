const path = require('path');

const express = require('express');
const session = require('express-session');
const MongoDBStore = require('connect-mongodb-session')(session);

const DB_PATH = "mongodb+srv://suyash:ssjy2311@cluster0.z7jqy5q.mongodb.net/airbnb?appName=Cluster0";

//local module
const storerouter = require("./routes/storerouter");
const hostRouter = require("./routes/hostRouter");
const rootDir = require("./utils/pathUtils");
const authrouter = require("./routes/authRouter");

const app = express();

app.set('view engine', 'ejs');
app.set('views',path.join(__dirname, 'views') );

const store = new MongoDBStore({
    uri: DB_PATH,
    collection: 'sessions'
});

store.on('error', function(error) {
    console.log('Session Store Error:', error);
});


app.use(express.urlencoded({ extended: false }));

app.use(session({
    secret: "suyash jalan",
    resave: false,
    saveUninitialized: true,
    store
}));


app.use(express.static(path.join(__dirname, 'public')));
app.use((req, res, next) => {
    req.isLoggedIn = req.session.isLoggedIn;
    next();
})
app.use(authrouter)
app.use(storerouter);
app.use("/host", (req, res, next) => {
    if(req.isLoggedIn){
        next();
    }else {
        res.redirect("/login");
    } 
});
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

mongoose.connect(DB_PATH).then(() => {
    console.log('connect to Mongo');
    app.listen(port, () => {
        console.log(`Server is running on address http://localhost:${port}`);
    });

}).catch(err => {
    console.log('Error while connecting to Mongo: ', err);
}) 
