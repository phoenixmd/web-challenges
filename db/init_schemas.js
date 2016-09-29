/**
 * Created by hari on 29/09/16.
 */
const sequelize = require('sequelize').tango_db_con;
const Users = sequelize.define('tango_users', require('./users-schema'));
module.exports = sequelize.sync();
