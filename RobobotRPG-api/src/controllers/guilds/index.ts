import { Response, Request } from 'express';
import { getMutualGuildsService } from '../../services/guilds/';
import { User } from '../../database/models/User';
export async function getGuildsController(req: Request, res: Response) {
    const user = req.user as User;
    try {
        const guilds = await getMutualGuildsService(user.id);
        res.send({guilds});
    } catch (err) {
        console.log(err);
        res.status(400).send({ msg: 'Failed to fetch guilds' });
    }
}