var Message = require('../models/messages');

module.exports = {
    get(req, res) {
        Message.find({}).populate('user', '-pwd').exec(function(err, result) {
            res.send(result);
        });
    },
    post(req, res) {
        console.log(req.body, req.user);
        req.body.user = req.user;
        var message = new Message(req.body);
        message.save();
        res.status(200);
    },
};