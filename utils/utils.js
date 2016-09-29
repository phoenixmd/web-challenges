/**
 * Created by hari on 29/09/16.
 */
"user strict"
const crypto = require('crypto');
const makeSalt = () => {
    return crypto.randomBytes(16).toString('base64');
};
const encryptPassword = (password, salt) => {
    if (!password || !salt) return '';
    salt = new Buffer(salt, 'base64')
    return crypto.pbkdf2Sync(password,salt , 10000, 64).toString('base64');
};
module.exports = {
    makeSalt :makeSalt,
    encryptPassword : encryptPassword
}