'use strict';

const _= require('underscore');
const validator = require('validator');

var appValidator =  {
    checkEmptyObject: (params) => {
        return (_.isEmpty(_.without(_.values(params),'')));
    },
    validEmail: (email) =>{
        return (validator.isEmail(email));
    },
    compareStrings: (str1, str2) => {
       return ((str1 && str2) && str1 === str2);
    }
};


module.exports = appValidator;