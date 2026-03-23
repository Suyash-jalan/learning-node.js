const path = require('path');

const express = require('express');
//local module
const userRouter = require("./routes/userRouter");
const {hostRouter} = require("./routes/hostRouter");
const rootDir = require("./utils/pathUtils");

const app = express();

app.set('view engine', 'ejs');
app.set('views',path.join(__dirname, 'views') );


app.use(express.urlencoded());


app.use(userRouter);
app.use("/host",hostRouter);
app.use(express.static(path.join(__dirname, 'public')))

const errorsController = require("./controllers/errors.js");
app.use(errorsController.pageNotFound);

const port = 3000;
app.listen(port, () => {
    console.log(`Server is running on address http://localhost:${port}`);
});
