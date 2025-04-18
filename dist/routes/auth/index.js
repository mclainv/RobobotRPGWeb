"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const passport_1 = __importDefault(require("passport"));
const router = (0, express_1.Router)();
router.get('/discord', passport_1.default.authenticate('discord'), (req, res) => {
    res.send(200);
});
router.get('/discord/redirect', passport_1.default.authenticate('discord'), (req, res) => {
    res.send({ msg: 'Success' });
});
exports.default = router;
