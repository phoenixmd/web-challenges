/**
 * Created by hari on 29/09/16.
 */
var Sequelize = require('sequelize');
var uuid= require('node-uuid');
module.exports = {
    TYPE: {
        ID_PK: {type: Sequelize.UUID, primaryKey: true,defaultValue : function () { return uuid.v4(); } },
        EMAIL : {type: Sequelize.STRING(50), unique: true, validate: {isEmail: true}},
        STRING: (size = 100) => {return {type: Sequelize.STRING(size)};}
    }
}