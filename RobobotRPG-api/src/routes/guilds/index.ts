import { Router } from "express";
import { isAuthenticated } from "../../utils/middlewares";
import { getGuildPermissionsController, getGuildsController } from "../../controllers/guilds";

const router = Router();

router.get('/', isAuthenticated, getGuildsController);
// /api/guilds/854375/permissions
router.get('/:guildId/permissions', isAuthenticated, getGuildPermissionsController)

export default router;