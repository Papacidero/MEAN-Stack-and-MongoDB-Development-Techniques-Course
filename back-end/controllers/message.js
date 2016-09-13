var Message = require('../models/messages');

module.exports = {
    get(req, res) {
        var message = new Message(req.body);
        message.save();
        res.status(200);
    },
    post() {
        Message.find({}).exec(function(err, result) {
            res.send(result);
        });
    }
};