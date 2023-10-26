"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRoutes = void 0;
const auth_1 = require("../controllers/auth");
const cart_1 = require("../controllers/cart");
const utitlities_1 = require("../middlewares/utitlities");
const passport_1 = __importDefault(require("passport"));
// import
function userRoutes(app) {
    app.post("/login", passport_1.default.authenticate("local", {
        failureMessage: "Incorrect Username/password",
    }), function (req, res) {
        if (req.user) {
            res.json(req.user);
        }
        else {
            // handle errors here, decide what you want to send back to your front end
            // so that it knows the user wasn't found
            res.statusCode = 503;
            res.send({ message: "Not Found" });
        }
    });
    app.post("/signUp", auth_1.signUp);
    app.post("/logout", auth_1.logOut);
    app.post("/cart/add", utitlities_1.authenticated, cart_1.addToCart);
    app.get("/ping", utitlities_1.authenticated, (req, res) => {
        // console.log(app._router.stack);
        console.log("\n==============================");
        // console.log(`------------>  ${count++}`);
        console.log(`req.body.username -------> ${req.body.username}`);
        console.log(`req.body.password -------> ${req.body.password}`);
        console.log(`\n req.session.passport -------> `);
        console.log(req.session);
        console.log(`\n req.user -------> `);
        console.log(req.user);
        console.log(req.signedCookies);
        console.log("\n Session and Cookie");
        console.log(`req.session.id -------> ${req.session.id}`);
        console.log(`req.session.cookie -------> `);
        console.log(req.session.cookie);
        console.log("===========================================\n");
        res.send();
    });
}
exports.userRoutes = userRoutes;
