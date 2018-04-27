'use strict';

var mongoose = require('mongoose'),
    User = mongoose.model('Users'),
    _ = require('lodash');


exports.list_all_users = function (req, res) {
    User.find({}, function (err, user) {
        if (_.isEmpty(user)) {
            return res.status(204).json({msg: "No data available."});
        }
        res.json(user);
    });
};

exports.create_an_user = function (req, res) {
    try {
        var user = new User(req.body);
        console.log(user);
        user.save(function (err, user) {
            if (err)res.status(500).send(err);
            res.send(user);
        });
    } catch (err) {
        res.status(500).json({success: false, error: err.toString()});
    }
};

exports.read_an_user = function (req, res) {

    try {
        var _id = req.params.userId;
        User.findById(_id, function (err, user) {
            if (_.isEmpty(user)) {
                return res.json({
                    success: false,
                    msg: 'user not found.',
                    _objectId: _id
                });
            }
            res.send(user);
        });
    } catch (err) {
        res.status(404).json({success: false, error: err.toString()});
    }
};

exports.update_an_user = function (req, res) {
    var update = req.body;
    var _id = req.params.userId;
    User.findByIdAndUpdate(_id, update, function (err, user) {
        if (err) {
            if(_.isEmpty(user)) err.message = "No user found.";
            return res.status(500).send(err);
        }
        var response = {
            message: "User successfully updated",
            id:_id}

        return res.status(200).send(response);
    });
};


exports.delete_an_user = function (req, res) {
    var _id = req.params.userId;
    User.findByIdAndRemove(_id,function (err, user) {
        console.log(user);
        if (err) {
            if( _.isEmpty(user)) err.message = "No user found.";
            return res.status(500).send(err);
        }


    var response = {
        message: "User successfully deleted",
        id:_id}

    return res.status(200).send(response);
    });
};

