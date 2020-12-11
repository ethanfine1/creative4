const express = require('express');
const bodyParser = require("body-parser");
const mongoose = require('mongoose');

// setup express
const app = express();

// setup body parser middleware to conver to JSON and handle URL encoded forms
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));

// connect to the mongodb database
mongoose.connect('mongodb://localhost:27017/finePodcasts', {
  useUnifiedTopology: true,
  useNewUrlParser: true
});

const cookieParser = require("cookie-parser");
app.use(cookieParser());

const cookieSession = require('cookie-session');
app.use(cookieSession({
  name: 'session',
  keys: [
    'secretValue'
  ],
  cookie: {
    maxAge: 24 * 60 * 60 * 1000 // 24 hours
  }
}));

const books = require("./books.js");
app.use("/api/books", books.routes);

const toRead = require("./toRead.js");
app.use("/api/toRead", toRead.routes);

const recommendations = require("./recommendations.js");
app.use("/api/recommendations", recommendations.routes);

app.listen(3002, () => console.log('Server listening on port 3002!'));
