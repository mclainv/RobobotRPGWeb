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
const passport_1 = __importDefault(require("passport"));
const passport_discord_1 = require("passport-discord");
const models_1 = require("../database/models");
passport_1.default.serializeUser((user, done) => {
    return done(null, user.id);
});
passport_1.default.deserializeUser((id, done) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield models_1.User.findById(id);
        return user ? done(null, user) : done(null, null);
    }
    catch (err) {
        console.log(err);
        return done(err, null);
    }
}));
passport_1.default.use(new passport_discord_1.Strategy({
    clientID: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
    callbackURL: process.env.CALLBACK_URL,
    scope: ['identify', 'guilds', 'email'],
}, (accessToken, refreshToken, profile, done) => __awaiter(void 0, void 0, void 0, function* () {
    const { id: discordId } = profile;
    try {
        const existingUser = yield models_1.User.findOneAndUpdate({ userId: discordId }, { accessToken, refreshToken }, { new: true });
        if (existingUser) {
            console.log(existingUser);
            return done(null, existingUser);
        }
        // const newUser = User.create( discordId, guildId, accessToken, refreshToken)
        // const savedUser = await newUser.save();
        // return done(null, savedUser);
    }
    catch (err) {
        console.log(err);
        return done(err, undefined);
    }
})));
