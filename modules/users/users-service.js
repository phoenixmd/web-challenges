/**
 * Created by hari on 29/09/16.
 */
"use strict";
const Promise = require('bluebird');
const validator = require('validator');
const UsersModel = require('../../db/models/users-model');
const HTTPStatus = require('http-status');

const validateUser = (user) => {
    if (!validator.isEmail(user.email)) {
        return Promise.reject(new TangoError("Invalid email","VALIDATION_ERROR",HTTPStatus.BAD_REQUEST ));
    }
    if (!validator.isLength(user.password, {min: 4, max: 12})) {
        return Promise.reject(new TangoError("Invalid password. Password should have characters 4 chars and max 12 characters","VALIDATION_ERROR",HTTPStatus.BAD_REQUEST ));
    }
    return Promise.resolve(user);
};
const verifyPassword = (password, user)=> {

};

const addUser = (user) => {
    return validateUser(user)
        .then(UsersModel.create)
};
const authenticate = (user)=> {
    return validateUser(user)
        .then((user)=> {
            UsersModel.findByEmail(user.email)
        })
        .then(verifyPassword.bind(null, user.password))


};
module.exports = {
    addUser: addUser,
    authenticate: authenticate
};