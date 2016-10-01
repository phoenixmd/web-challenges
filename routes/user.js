'use strict';

const User  = require('../models').User;
const appValidator = require('../modules/app-validator');

module.exports = (router, store) => {
    router.get('/register', (req, res) => {
        console.log(req.sessionID);
        return res.render('register');
    });

    router.post('/register', (req, res)=> {
        var params = req.body,
            errors = [],
            response = {};


        if(!appValidator.checkEmptyObject(params)){
            if(!appValidator.validEmail(params.email))errors.push('Please provide valid Email Address')
            if(params.password.length < 6 || params.password.length > 8 ) errors.push('Password field should be greater than 6 or equal to 8');
            if(!appValidator.compareStrings(params.password, params.repeatpass) ) errors.push('Password fields do not match');
        }else{
            errors.push('Please Fill all fields');
        }

        response.params = params;
        response.error = errors;


        if(errors.length === 0){
            User.getUser(params.email).then(function(user){
                if(user){
                    errors.push('Email already Exists');
                    response.error = errors;
                    res.render('register',response);
                }else{
                    User.createUser(params, req).then(function(created){
                        if(created){
                            req.session.user = created.get();
                            return res.redirect('/welcome');
                        }
                    }, function(error){})
                }

            }, function(error){})
        }else{
            return res.render('register',response);
        }

    });

    router.post('/login', (req, res) => {
        var params = req.body,
            errors = [],
            response = {};


        if(!appValidator.checkEmptyObject(params)){
            if(!appValidator.validEmail(params.email))errors.push('Please provide valid Email Address')
            if(!params.password) errors.push('Password field should not be empty');
        }else{
            errors.push('Please Fill all fields');
        }

        response.params = params;
        response.error = errors;

        if(errors.length === 0) {
            User.login(req, function (err,user) {
                if (err) {
                    errors.push(err);
                    response.error = errors;
                    return res.render('index', response);
                } else {
                    req.session.user = user.get();
                    res.redirect('/welcome');
                }
            })
        }else{
            res.render('index', response);
        }

        //return res.render("/welcome");
    });

    router.get('/welcome', (req, res) => {
        if(!req.session.user){
            return res.redirect('/');
        }
        res.render('welcome', {user: req.session.user});
    });

    router.get('/logout', (req, res, next) => {
        User.logout(req, function(err){
            if(err){
                next(err);
            }else{
                delete req.session.user;
                req.session.destroy(function() {
                    res.redirect('/');
                });
            }
        });

    });
};