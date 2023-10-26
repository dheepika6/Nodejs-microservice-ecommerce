"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.serverError = exports.notFound = void 0;
const logger_1 = __importDefault(require("../utils/logger"));
const notFound = (req, res, next) => {
    res.status(404).send("Sorry, not found!");
};
exports.notFound = notFound;
const serverError = (err, req, res, next) => {
    logger_1.default.error("Server error from middleware", { error: err });
    res.status(500).send("Server error");
};
exports.serverError = serverError;
