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

    User.findById(req.params.userId, function(err, user) {
        if (!user) {
            res.status(404).send({success: false, message: 'user not found.'});
        }
        res.send(user);
    });
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