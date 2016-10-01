'use strict';

const HTTPStatus = require('http-status');

module.exports = (router) => {
    return (req, res, next) => {
        var ref;
        if((ref = req.path) === '/' || req.path === '/health' || req.path === '/welcome' || req.path === '/register' || req.path === '/login' || ref === '/logout'){
            if(req.session.user && (req.path === '/' || req.path === '/register' || req.path === '/login')){
                res.redirect('/welcome');
            }
        }else{
            return res.sendStatus(HTTPStatus.UNAUTHORIZED);
        }
        next();

    };
};
