var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

var database;
var Message = mongoose.model('Message', {
    msg: String
})

mongoose.Promise = global.Promise;

app.use(bodyParser.json());

app.use(function(req, res, next){
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
    next();
})

app.post('/auth/register', function(req,res){
    console.log(req.body);
    // var message = new Message(req.body);
    // 
    // message.save();
    // 
    // res.status(200);
});


app.post('/api/message', function(req,res){
    console.log(req.body);
    var message = new Message(req.body);
    
    message.save();
    
    res.status(200);
});

app.get('/api/message', GetMessages);

function GetMessages(req, res){
    Message.find({}).exec(function(err, result){
        res.send(result);
    });
}

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