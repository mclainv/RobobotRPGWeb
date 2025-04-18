import { Response, Request } from 'express';
import { getBotGuildsService, getUserGuildsService } from '../../services/guilds/';
import { User } from '../../database/models/User';
export async function getGuildsController(req: Request, res: Response) {
    const user = req.user as User;
    try {
        const { data: botGuilds } = await getBotGuildsService();
        const {data: userGuilds } = await getUserGuildsService(user.id);
        res.send({
            botGuilds,
            userGuilds
        });
    } catch (err) {
        console.log(err);
        res.status(400).send({ msg: 'Failed to fetch guilds' });
    }
}