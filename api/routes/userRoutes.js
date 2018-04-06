'use strict';


module.exports = function(app) {
    var userController = require('../controllers/userController');

    // todoList Routes
    app.route('/users')
        .get(userController.list_all_users)
        .post(userController.create_an_user);


    app.route('/users/:userId')
        .get(userController.read_an_user)
        .put(userController.update_an_user)
        .delete(userController.delete_an_user);
};