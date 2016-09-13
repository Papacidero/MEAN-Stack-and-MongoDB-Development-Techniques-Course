var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

var auth = require('./controllers/auth');
var message = require('./controllers/message');

var database;

mongoose.Promise = global.Promise;

app.use(bodyParser.json());

app.use(function(req, res, next){
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
    next();
});

app.post('/auth/register', auth.register);
app.post('/api/message', message.post);
app.get('/api/message', message.get);

mongoose.connect("mongodb://localhost:27017/test", function(err,db){
    if (!err) {
        console.log("We are connected to mongo");
        // db.collection('messages').insertOne({'msg':'test'});
    } else {
        console.error("We are not connected to mongo");
    }
});

var server = app.listen(5000, function(){
    console.log('listening on port', server.address().port);
});