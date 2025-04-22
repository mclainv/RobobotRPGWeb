import axios from 'axios';
import { User } from '../../database/models/';
import { DISCORD_API_URL } from '../../utils/constants';
import { PartialGuild } from '../../utils/types';

export function getBotGuildsService() {
    const TOKEN = process.env.DISCORD_BOT_TOKEN;
    return axios.get<PartialGuild[]>(`${DISCORD_API_URL}/users/@me/guilds`, {
        headers: { Authorization: `Bot ${TOKEN}`},
    });
}

export async function getUserGuildsService(id: string) {
    const user = await User.findById(id)
    if (!user) throw new Error('No user found');
    return axios.get<PartialGuild[]>(`${DISCORD_API_URL}/users/@me/guilds`, {
        headers: { Authorization: `Bearer ${user.accessToken}`},
    });
}

export async function getMutualGuildsService(id: string) {
    const { data: botGuilds} = await getBotGuildsService();
    const { data: userGuilds} = await getUserGuildsService(id);
    
    //check if user is an admin
    
    // https://discordapi.com/permissions.html#536887296
    // const adminUserGuilds = userGuilds.filter(
    //     ({ permissions }) => (parseInt(permissions) & 0x8) === 0x8
    // );
    // console.log(adminUserGuilds);
    
    //get mutual servers
    return userGuilds.filter((userG) => 
        botGuilds.some((botGuild) => botGuild.id === userG.id));
}

export function getGuildService(guildId: string) {
    const TOKEN = process.env.DISCORD_BOT_TOKEN;
    return axios.get(`${DISCORD_API_URL}/guilds/${guildId}`, {
        headers: { Authorization: `Bot ${TOKEN}`},
    });
}