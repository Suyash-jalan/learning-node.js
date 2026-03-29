const path = require('path');

const express = require('express');
//local module
const storerouter = require("./routes/storerouter");
const hostRouter = require("./routes/hostRouter");
const rootDir = require("./utils/pathUtils");

const db = require("./utils/databaseUtil");

db.execute('SELECT * FROM homes').then(result =>{
    console.log('Getting from db', result);
})
.catch(error =>{
    console.log('Error while reading home records', error);
})

const app = express();

app.set('view engine', 'ejs');
app.set('views',path.join(__dirname, 'views') );


app.use(express.urlencoded({ extended: false }));


app.use(storerouter);
app.use("/host",hostRouter);
app.use(express.static(path.join(__dirname, 'public')))

const errorsController = require("./controllers/errors.js");
app.use(errorsController.pageNotFound);

const port = 3000;
app.listen(port, () => {
    console.log(`Server is running on address http://localhost:${port}`);
});
