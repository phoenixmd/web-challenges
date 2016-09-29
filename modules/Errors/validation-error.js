/**
 * Created by hari on 29/09/16.
 */
function ValidationError(message) {
    this.message = message;
    this.name = "ValidationError";
    Error.apply(this, arguments);
}
ValidationError.prototype = Object.create(Error.prototype);
ValidationError.prototype.constructor = ValidationError;
