/**
 * Created by hari on 29/09/16.
 */
"use strict";
const SCHEMA_COMMONS = require('./schema-commons');
const _ = require('lodash')
const utils = require('../utils/utils')

module.exports = {
    id: SCHEMA_COMMONS.TYPE.ID_PK,
    email: _.defaults({
        set: function(email) {
            this.setDataValue('email', email.toLowerCase());
        }
    }, SCHEMA_COMMONS.TYPE.EMAIL),
    password: _.defaults({
        set: function(password) {
            var salt = utils.makeSalt();
            this.setDataValue('salt', salt);
            this.setDataValue('password', utils.encryptPassword(password, salt));
        }
    }, SCHEMA_COMMONS.TYPE.STRING(100)),
    salt: SCHEMA_COMMONS.TYPE.STRING(100)
};