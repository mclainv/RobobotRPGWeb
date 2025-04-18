"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createApp = createApp;
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const express_session_1 = __importDefault(require("express-session"));
const passport_1 = __importDefault(require("passport"));
// import passport-discord from 'passport-discord';
const routes_1 = __importDefault(require("../routes"));
require('../strats/discord');
function createApp() {
    const app = (0, express_1.default)();
    // middleware
    app.use(express_1.default.json());
    app.use(express_1.default.urlencoded());
    //enable cores
    app.use((0, cors_1.default)({
        origin: ['http://localhost:3000'],
        credentials: true,
    }));
    //Enable sessions
    app.use((0, express_session_1.default)({
        secret: 'aKj7$9pQ#2zLmN*5rT!xV8@yW3sBdE6fG', // used to en/decrypt cookie, to get session ID from server
        resave: false,
        saveUninitialized: false,
        cookie: { maxAge: 60000 * 60 * 24 * 3 } // 3 days 
    }));
    //Enable passport
    app.use(passport_1.default.initialize());
    app.use(passport_1.default.session());
    app.use('/api', routes_1.default);
    return app;
}
