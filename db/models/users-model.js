/**
 * Created by hari on 29/09/16.
 */
"use strict"
const Users = require('sequelize').tango_models.Users;

module.exports = {
    create: function (opts) {
        return Users.create(opts);
    },
    findByEmail: function (email) {
        return Users.findOne({where: {email: email}});
    }
}
