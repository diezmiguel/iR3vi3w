'use strict';

var mongoose = require('mongoose'),
    User = mongoose.model('Users');
exports.list_all_users = function(req, res) {
    User.find({}, function(err, user) {
        if (err)
            res.send(err);
        res.json(user);
    });
};

exports.create_an_user = function(req, res) {
    var user = new User(req.body);
    console.log(user);
    user.save(function(err, user) {
        if (err)
            res.send(err);
        res.send(user);
    });
};


exports.read_an_user = function(req, res) {
try {
    var _id = req.params.userId;
    User.findById(_id, function (err, user) {
            if (!user) {
                return res.send({
                    success: false,
                    msg: 'user not found.',
                    _objectId: _id
                });
            }
            var user = user.toObject();
            user.success = true;
            res.send(user);
    });
} catch(err){
    res.status(404).json({success:false,error:err.toString()});
}
};


exports.update_an_user = function(req, res) {
    var update = req.body;
    console.log(update);
    User.findByIdAndUpdate(req.params.userId, update, function(err, user) {
        if (err)
            res.send(err);
        res.json(user);
    });
};


exports.delete_an_user = function(req, res) {
    User.remove({
        _id: req.params.userId
    }, function(err, user) {
        if (err)
            res.send(err);
        res.send({ message: 'User successfully deleted' });
    });
};