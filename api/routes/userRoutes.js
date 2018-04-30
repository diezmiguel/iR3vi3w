'use strict';

var router = require("express").Router();

module.exports = function(app) {

    var userController = require('../controllers/userController');
    var token = require('../Auth/VerifyToken');

    const checkUser = [token.verifyToken()];

    app.route("/users")
        .get(checkUser, userController.list_all_users)
        .post(userController.create_an_user);


    app.route('/users/:userId')
        .get(checkUser, userController.read_an_user)
        .put(checkUser, userController.update_an_user)
        .delete(checkUser, userController.delete_an_user);
};
