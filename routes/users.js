'use strict';
const usersController = require('../modules/users/users-controller')
module.exports = router => {
    router.post('/users', usersController.addUser);
    router.post('/authenticate', usersController.authenticate);
    router.get('/logout', usersController.logout);
};