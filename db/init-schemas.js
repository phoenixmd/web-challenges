/**
 * Created by hari on 29/09/16.
 */
const Sequelize = require('sequelize');
const sequelize = Sequelize.tango_db_con;
Sequelize.tango_models = {Users: sequelize.define('tango_users', require('./users-schema'))};
module.exports = sequelize.sync();
