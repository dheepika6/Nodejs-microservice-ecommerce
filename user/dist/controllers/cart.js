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
exports.addToCart = void 0;
const User_1 = __importDefault(require("../database/repositories/User"));
const logger_1 = __importDefault(require("../utils/logger"));
const addToCart = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    let isDeleted = false;
    try {
        const repository = new User_1.default();
        let profile = yield repository.addToCart((_a = req.session.passport) === null || _a === void 0 ? void 0 : _a.user.email, {
            _id: "P-1",
            name: "P-1",
            price: 200,
            available: true,
            banner: "imageurl",
        }, 2, isDeleted);
        res.status(200).send(profile);
    }
    catch (err) {
        logger_1.default.error("Error occured addToCart", { error: err });
        res
            .status(404)
            .send(`Error occured during ${isDeleted ? "deleting to" : "adding"} the cart`);
    }
});
exports.addToCart = addToCart;
