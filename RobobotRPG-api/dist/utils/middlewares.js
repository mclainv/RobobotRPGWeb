"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isAuthenticated = void 0;
const isAuthenticated = (req, res, next) => {
    if (req.user) {
        next();
    }
    else {
        res.status(403).send({ msg: "Unauthorized" });
    }
};
exports.isAuthenticated = isAuthenticated;
