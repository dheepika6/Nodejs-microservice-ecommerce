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
exports.signUp = exports.logOut = void 0;
const user_service_1 = __importDefault(require("../services/user-service"));
const logger_1 = __importDefault(require("../utils/logger"));
const errors_1 = require("../utils/errors");
const logOut = (req, res, next) => {
    req.logOut(function (err) {
        if (err) {
            return next(err);
        }
        res.send();
    });
};
exports.logOut = logOut;
const signUp = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const service = new user_service_1.default();
        const { email, password } = req.body;
        // let { salt, hashedPassword } = createPassword(password);
        const userCreated = yield service.signUp({ email, password });
        req.login(userCreated, function (err) {
            if (err) {
                return next(err);
            }
            res.send(JSON.stringify({ user: userCreated }));
        });
    }
    catch (error) {
        logger_1.default.error("Error Signing up", { error });
        res.status(errors_1.STATUS_CODES.INTERNAL_SERVER_ERROR).send(error);
    }
});
exports.signUp = signUp;
