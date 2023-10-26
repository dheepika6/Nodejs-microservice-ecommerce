"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.localStrategy = void 0;
const User_1 = __importDefault(require("../database/repositories/User"));
const password_1 = require("./password");
const localStrategy = (email, password, done) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let repository = new User_1.default();
        const user = yield repository.findByEmail({ email });
        if (!user) {
            done(null, false, { message: "Incorrect Username/password" });
        }
        else {
            let isPasswordEqual = (0, password_1.passwordCheck)(password, user === null || user === void 0 ? void 0 : user.password, user.salt);
            if (!isPasswordEqual) {
                done(null, false, { message: "Incorrect User/password" });
            }
            else
                done(null, user);
        }
    }
    catch (err) {
        done(err);
    }
});
exports.localStrategy = localStrategy;
