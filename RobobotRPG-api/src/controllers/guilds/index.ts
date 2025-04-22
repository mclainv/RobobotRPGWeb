import { Response, Request } from 'express';
import { getMutualGuildsService } from '../../services/guilds/';
import { User } from '../../database/models/User';
export async function getGuildsController(req: Request, res: Response) {
    const user = req.user as User;
    try {
        const guilds = await getMutualGuildsService(user.id);
        res.send(guilds);
    } catch (err) {
        console.log(err);
        res.status(400).send({ msg: 'Failed to fetch guilds' });
    }
}

export async function getGuildPermissionsController(req: Request, res: Response) {
    const { guildId } = req.params;
    const user = req.user as User;
    try {
        const guilds = await getMutualGuildsService(user.id);
        const valid = guilds.some((guild) => guild.id === guildId);
        console.log(valid);
        //200 if valid, 403 error otherwise
        valid ? res.sendStatus(200) : res.sendStatus(403);
        //for some reason, returning here doesn't work. Has to do with promises.
        // return valid ? res.sendStatus(200) : res.sendStatus(403);
    } catch (err) {
        console.log(err);
        res.status(400).send({ msg: 'Failed to fetch guilds' });
    }
}