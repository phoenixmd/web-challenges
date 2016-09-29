"use strict";
const usersService = require('./users-service');
const HTTPStatus = require('http-status');
const addUser = (req, res, next) => {
    return usersService.addUser(req.body)
        .then((data)=> {
            return res.send(HTTPStatus.OK, {email : data.email})
        })
        .catch(next)
};
const authenticate = (req, res, next) => {
    return usersService.authenticate(req.body)
        .then((user)=> {
            return new Promise(function (resolve, reject) {
                req.session.regenerate(function (err) {
                    if (err) {
                        return reject(err);
                    }
                    req.session.user = {email: user.email};
                    return resolve(user);
                })
            })

        })
        .then((user)=>{
            return res.send(HTTPStatus.OK,{email : user.email});
        })
        .catch(next)
};
const  logout = function (req, res, next) {
    req.session.destroy((err)=>{
        if(err){
            return next(err);
        }
        return res.send(HTTPStatus.OK,{mesage : "successfully logged out"})
    });
}
module.exports = {
    addUser: addUser,
    authenticate: authenticate,
    logout: logout
};