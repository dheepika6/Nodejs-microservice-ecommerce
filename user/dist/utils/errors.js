"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NotFound = exports.ServerError = exports.STATUS_CODES = void 0;
exports.STATUS_CODES = {
    OK: 200,
    BAD_REQUEST: 400,
    UNAUTHORIZED: 403,
    NOT_FOUND: 404,
    INTERNAL_SERVER_ERROR: 500,
};
class APIError extends Error {
    constructor(name, statusCode, description) {
        super(description);
        this.name = name;
        this.statusCode = statusCode;
        this.description = description;
    }
}
class ServerError extends APIError {
    constructor(description) {
        super("Internal Server error", exports.STATUS_CODES.INTERNAL_SERVER_ERROR, description);
        this.description = description;
    }
}
exports.ServerError = ServerError;
class NotFound extends APIError {
    constructor(description) {
        super("Not Found", exports.STATUS_CODES.NOT_FOUND, description);
        this.description = description;
    }
}
exports.NotFound = NotFound;
