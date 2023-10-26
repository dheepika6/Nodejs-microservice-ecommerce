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
const User_1 = __importDefault(require("../database/repositories/User"));
const password_1 = require("../passport/password");
class UserService {
    constructor() {
        this.repository = new User_1.default();
    }
    signUp(userInputs) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { email, password } = userInputs;
                const { salt, hashedPassword } = (0, password_1.createPassword)(password);
                const userCreated = yield this.repository.create({
                    email,
                    password: hashedPassword,
                    salt,
                });
                return userCreated;
            }
            catch (err) {
                console.log("error", err);
                throw err;
            }
        });
    }
}
exports.default = UserService;
