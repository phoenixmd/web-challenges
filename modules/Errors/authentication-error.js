/**
 * Created by hari on 29/09/16.
 */
function AuthenticationError(message) {
    this.message = message;
    this.name = "AuthenticationError";
    Error.apply(this, arguments);
}
AuthenticationError.prototype = Object.create(Error.prototype);
AuthenticationError.prototype.constructor = AuthenticationError;
