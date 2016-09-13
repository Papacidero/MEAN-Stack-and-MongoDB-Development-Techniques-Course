var User = require('../models/user');
var jwt = require('jwt-simple');
var moment = require('moment');

module.exports = {
    register(req, res) {
        console.log(req.body);

        User.findOne({
            email: req.body.email
        }, function(err, existingUser) {

            if (existingUser) 
                return res.status(409).send({message: 'User already registered'});
            
            var user = new User(req.body);
            user.save(function(err, result) {
                console.log(err);
                if (err) {
                    res.status(500).send({
                        message: err.message
                    });
                }
                res.status(200).send({token: createToken(result)});
            });
            
        });
    }
};

function createToken(user){
    var payload = {
        sub: user._id,
        iat: moment().unix(),
        exp: moment().add(14, 'days').unix()
    };
    return jwt.encode(payload, 'secret');
}