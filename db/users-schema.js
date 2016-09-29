/**
 * Created by hari on 29/09/16.
 */
const SCHEMA_COMMONS = require('./schema-commons');
module.exports = {
    id: SCHEMA_COMMONS.TYPE.ID_PK,
    email: SCHEMA_COMMONS.TYPE.EMAIL,
    password: SCHEMA_COMMONS.TYPE.STRING(100),
    salt: SCHEMA_COMMONS.TYPE.STRING(100)
};