"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.passwordCheck = exports.createPassword = void 0;
const crypto_1 = __importDefault(require("crypto"));
const config_1 = __importDefault(require("../config"));
const createPassword = (password) => {
    let salt = crypto_1.default.randomBytes(config_1.default.crypto.randomSize).toString("base64");
    let hashedPassword = crypto_1.default.pbkdf2Sync(password, salt, config_1.default.crypto.workFactor, config_1.default.crypto.keyLength, "sha256");
    console.log("salt", salt);
    console.log("hashedPass", hashedPassword);
    return {
        salt: salt,
        hashedPassword: hashedPassword.toString("base64"),
    };
};
exports.createPassword = createPassword;
const passwordCheck = (password, actualPassword, salt) => {
    let hashedPassword = crypto_1.default.pbkdf2Sync(password, salt, config_1.default.crypto.workFactor, config_1.default.crypto.keyLength, "sha256");
    console.log(password, hashedPassword.toString("base64"), actualPassword, salt);
    let isPasswordEqual = crypto_1.default.timingSafeEqual(hashedPassword, Buffer.from(actualPassword, "base64"));
    console.log("isPasswordEqual", isPasswordEqual);
    return isPasswordEqual;
};
exports.passwordCheck = passwordCheck;
