var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var jwt = require('jwt-simple');
var moment = require('moment');


var auth = require('./controllers/auth');
var message = require('./controllers/message');
var checkAuthenticated = require('./services/checkAuthenticated');
var cors = require('./services/cors');

var database;

mongoose.Promise = global.Promise;

app.use(bodyParser.json());

app.use(cors);



app.post('/auth/register', auth.register);
app.post('/api/message', checkAuthenticated, message.post);
app.get('/api/message', message.get);

mongoose.connect("mongodb://localhost:27017/test", function(err, db) {
    if (!err) {
        console.log("We are connected to mongo");
        // db.collection('messages').insertOne({'msg':'test'});
    } else {
        console.error("We are not connected to mongo");
    }
});

var server = app.listen(5000, function() {
    console.log('listening on port', server.address().port);
});