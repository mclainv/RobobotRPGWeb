import { Router } from "express";
import { isAuthenticated } from "../../utils/middlewares";
import { getGuildController, getGuildPermissionsController, getGuildsController } from "../../controllers/guilds";

const router = Router();

router.get('/', isAuthenticated, getGuildsController);
// /api/guilds/854375/permissions
router.get('/:guildId/permissions', isAuthenticated, getGuildPermissionsController)
//get individual guild from id
router.get('/:guildId', isAuthenticated, getGuildController)

export default router;