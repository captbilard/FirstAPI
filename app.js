//app.js

var express = require('express');
var app = express();
//require the database we created
var db = require('./db');
//let the app know about UserController
var UserController = require('./user/UserController');
//ask it to link every link with 'users' to the controller
app.use('/users', UserController);


module.exports = app;