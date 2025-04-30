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
exports.getBotGuildsService = getBotGuildsService;
exports.getUserGuildsService = getUserGuildsService;
exports.getMutualGuildsService = getMutualGuildsService;
exports.getGuildService = getGuildService;
const axios_1 = __importDefault(require("axios"));
const models_1 = require("../../database/models/");
const constants_1 = require("../../utils/constants");
function getBotGuildsService() {
    const TOKEN = process.env.DISCORD_BOT_TOKEN;
    return axios_1.default.get(`${constants_1.DISCORD_API_URL}/users/@me/guilds`, {
        headers: { Authorization: `Bot ${TOKEN}` },
    });
}
function getUserGuildsService(id) {
    return __awaiter(this, void 0, void 0, function* () {
        const user = yield models_1.User.findById(id);
        if (!user)
            throw new Error('No user found');
        return axios_1.default.get(`${constants_1.DISCORD_API_URL}/users/@me/guilds`, {
            headers: { Authorization: `Bearer ${user.accessToken}` },
        });
    });
}
function getMutualGuildsService(id) {
    return __awaiter(this, void 0, void 0, function* () {
        const { data: botGuilds } = yield getBotGuildsService();
        const { data: userGuilds } = yield getUserGuildsService(id);
        //check if user is an admin
        // https://discordapi.com/permissions.html#536887296
        // const adminUserGuilds = userGuilds.filter(
        //     ({ permissions }) => (parseInt(permissions) & 0x8) === 0x8
        // );
        // console.log(adminUserGuilds);
        //get mutual servers
        return userGuilds.filter((userG) => botGuilds.some((botGuild) => botGuild.id === userG.id));
    });
}
function getGuildService(guildId) {
    const TOKEN = process.env.DISCORD_BOT_TOKEN;
    return axios_1.default.get(`${constants_1.DISCORD_API_URL}/guilds/${guildId}`, {
        headers: { Authorization: `Bot ${TOKEN}` },
    });
}
