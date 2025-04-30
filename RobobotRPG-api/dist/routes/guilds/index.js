"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const middlewares_1 = require("../../utils/middlewares");
const guilds_1 = require("../../controllers/guilds");
const router = (0, express_1.Router)();
router.get('/', middlewares_1.isAuthenticated, guilds_1.getGuildsController);
// /api/guilds/854375/permissions
router.get('/:guildId/permissions', middlewares_1.isAuthenticated, guilds_1.getGuildPermissionsController);
//get individual guild from id
router.get('/:guildId', middlewares_1.isAuthenticated, guilds_1.getGuildController);
exports.default = router;
