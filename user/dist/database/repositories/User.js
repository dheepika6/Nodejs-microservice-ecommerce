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
const models_1 = require("../models");
const errors_1 = require("../../utils/errors");
const logger_1 = __importDefault(require("../../utils/logger"));
class UserRepository {
    create({ email, password, salt }) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const customer = new models_1.UserModel({
                    email,
                    password,
                    salt,
                });
                const customerSaved = yield customer.save();
                return customerSaved;
            }
            catch (err) {
                logger_1.default.error("Database error: Create customer", { error: err });
                throw new errors_1.ServerError("Unable to Create Customer");
            }
        });
    }
    findByEmail({ email }) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const customer = yield models_1.UserModel.findOne({ email });
                return customer;
            }
            catch (err) {
                logger_1.default.error("Database error: FindByEmail customer", { error: err });
                throw new errors_1.ServerError("Unable to find the customer");
            }
        });
    }
    findById({ id }) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const customer = yield models_1.UserModel.findById(id);
                return customer;
            }
            catch (error) {
                logger_1.default.error("Database error: FindById customer", { error });
                throw new errors_1.ServerError("Unable to find the customer");
            }
        });
    }
    addToWishList(customerId, { _id, name, price, available, banner }) {
        return __awaiter(this, void 0, void 0, function* () {
            const product = { _id, name, price, available, banner };
            try {
                const profile = yield models_1.UserModel.findById(customerId).populate("wishlist");
                if (profile) {
                    let wishlist = profile.wishlist;
                    if (wishlist.length > 0) {
                        let isExist = false;
                        for (let i = 0; i < wishlist.length; i++) {
                            if (wishlist[i]._id.toString() === product._id.toString()) {
                                wishlist.splice(i, 1);
                                isExist = true;
                                break;
                            }
                        }
                        if (!isExist) {
                            wishlist.push(product);
                        }
                    }
                    else {
                        wishlist.push(product);
                    }
                    profile.wishlist = wishlist;
                    const profileResult = yield profile.save();
                    return profileResult.wishlist;
                }
                return [];
            }
            catch (error) {
                logger_1.default.error("Database error: AddtoWishList customer", { error });
                throw new errors_1.ServerError("Error in AddtoWishList");
            }
        });
    }
    addToCart(email, product, qty, isDeleted) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const profile = yield models_1.UserModel.findOne({ email }).populate("cart");
                // const profile = await res.findByEmail({ email: email });
                const { _id, name, price, banner } = product;
                if (profile) {
                    const cartItem = {
                        product: { _id, name, price, banner },
                        unit: qty,
                    };
                    let cartItems = profile.cart;
                    let isExist = false;
                    if (cartItems.length > 0) {
                        for (let i = 0; i < cartItems.length; i++) {
                            let item = cartItems[i];
                            if (item.product._id.toString() === _id.toString()) {
                                if (isDeleted) {
                                    cartItems.splice(i, 1);
                                }
                                else {
                                    item.unit = qty;
                                }
                                isExist = true;
                            }
                        }
                    }
                    if (!isExist) {
                        cartItems.push(cartItem);
                    }
                    profile.cart = cartItems;
                    const savedResult = yield profile.save();
                    return savedResult;
                }
                else {
                    throw new Error("Profile not found");
                }
            }
            catch (error) {
                logger_1.default.error("Database error: addToCart customer", { error });
                throw new errors_1.ServerError("Error in addToCart");
            }
        });
    }
    addToOrder(customerId, order) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const profile = yield models_1.UserModel.findById(customerId);
                if (profile) {
                    if (profile.orders == undefined) {
                        profile.orders = [];
                    }
                    profile.orders.push(order);
                    profile.cart = [];
                    const profileResult = yield profile.save();
                    return profileResult;
                }
                throw new Error("Unable to add to order!");
            }
            catch (error) {
                logger_1.default.error("Database error: addToOrder customer", { error });
                throw new errors_1.ServerError("Error in addToOrder");
            }
        });
    }
}
exports.default = UserRepository;
