const express = require("express");
const Clarifai = require("clarifai");
const multer = require("multer");
const path = require('path');
const hbs = require('hbs');
const bodyParser = require("body-parser");
const methodOverride = require('method-override');

const indexRouter = require('./routes/index');
const app = express();
const port = 3000;



app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(express.static(path.join(__dirname, 'public')));

app.use(methodOverride(function (req, res) {
    if (req.body && typeof req.body === 'object' && '_method' in req.body) {
        const method = req.body._method;
        delete req.body._method;
        return method;
    }
}));

app.use('/', indexRouter);


app.listen(port, () => console.log(`Running on http://localhost:${port}/`));

module.exports = app;
