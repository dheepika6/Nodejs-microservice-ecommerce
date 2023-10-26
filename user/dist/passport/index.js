"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const passport_1 = __importDefault(require("passport"));
const passport_local_1 = require("passport-local");
const userStrategy_1 = require("./userStrategy");
passport_1.default.use(new passport_local_1.Strategy({
    usernameField: "email",
    passwordField: "password",
}, userStrategy_1.localStrategy));
passport_1.default.serializeUser(function (user, done) {
    // process.nextTick(function () {
    console.log("serializing.....");
    console.log(user);
    done(null, { email: user.email, _id: user._id });
    // });
});
passport_1.default.deserializeUser(function (user, done) {
    // process.nextTick(function () {
    console.log("deserializing.....");
    console.log(user);
    done(null, user);
    // });
});
exports.default = passport_1.default;
