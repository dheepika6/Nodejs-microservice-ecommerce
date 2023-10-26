"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authenticated = void 0;
const authenticated = (req, res, next) => {
    if (req.isAuthenticated() && "user" in (req.session.passport || {})) {
        next();
    }
    else
        res.status(404).send("Please login to access");
};
exports.authenticated = authenticated;
