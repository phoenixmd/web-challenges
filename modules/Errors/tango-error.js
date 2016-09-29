/**
 * Created by hari on 29/09/16.
 */
function TangoError(message, code,statusCode, meta) {
    this.message = message;
    this.code = code;
    this.statusCode = statusCode;
    this.name = "Tango Error";
    Error.call(this, message);
}
TangoError.prototype = Object.create(Error.prototype);
TangoError.prototype.constructor = TangoError;

