const path = require('path');

const express = require('express');
const session = require('express-session');
const MongoDBStore = require('connect-mongodb-session')(session);
const multer = require('multer');

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

const randomString = (length) => {
  const characters = 'abcdefghijklmnopqrstuvwxyz';
  let result = '';
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return result;
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, randomString(10) + '-' + file.originalname);
  }
});


const fileFilter = (req, file, cb) => {
  if (file.mimetype === 'image/png' || file.mimetype === 'image/jpg' || file.mimetype === 'image/jpeg') {
    cb(null, true);
  } else {
    cb(null, false);
  }
}
const multerOptions = {
    storage, fileFilter
};


app.use(express.urlencoded({ extended: false }));
app.use(multer(multerOptions).single('photo'));
app.use(express.static(path.join(__dirname, 'public')));
app.use("/uploads", express.static(path.join(__dirname, 'uploads')));
app.use("/host/uploads", express.static(path.join(__dirname, 'uploads')))
app.use("/homes/uploads", express.static(path.join(__dirname, 'uploads')))




app.use(session({
    secret: "suyash jalan",
    resave: false,
    saveUninitialized: true,
    store
}));


app.use((req, res, next) => {
    console.log(`[${req.method}] ${req.url} - Cookies in Header:`, req.headers.cookie);
    req.isLoggedIn = req.session.isLoggedIn;
    console.log(`[${req.method}] ${req.url} - Session ID: ${req.sessionID} - isLoggedIn: ${req.session.isLoggedIn}`);
    next();
});

const requireLogin = (req, res, next) => {
    if (req.isLoggedIn) {
        next();
    } else {
        res.redirect("/login");
    }
};

app.use(authrouter);
app.use("/favourites", requireLogin);
app.use("/bookings", requireLogin);
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
