"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const globals_1 = require("@jest/globals");
const password_1 = require("../../passport/password");
(0, globals_1.describe)("test createPassword", () => {
    (0, globals_1.test)("test createPassword with verify", () => {
        const { salt, hashedPassword } = (0, password_1.createPassword)("password");
        let isEqual = (0, password_1.passwordCheck)("password", hashedPassword, salt);
        console.log("isEqual: ", isEqual);
    });
});
