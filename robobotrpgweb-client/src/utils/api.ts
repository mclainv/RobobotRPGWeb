import { GetServerSidePropsContext } from "next";
import axios from 'axios';
import { validateCookies } from "./helpers";
import { PartialGuild } from "./types";
// import '../config';

const API_URL = process.env.API_URL;

export const fetchMutualGuilds = async (context: GetServerSidePropsContext) => {
    const headers = validateCookies(context);
    console.log("headers are ", headers);
    if (!headers) return { redirect: { destination: '/'} };
    try {
        const { data: guilds } = await axios.get<PartialGuild[]>(`${API_URL}/api/guilds`, { headers });
        console.log("guilds are ", guilds);
        return { props: { guilds } } ;
    } catch(err) {
        console.log(err);
        return { redirect: { destination: '/'}};
    }
}

export const fetchValidGuild = async (guildId: string, headers: HeadersInit) => {
    const response = await fetch(`${API_URL}/api/guilds/${guildId}/permissions`, { headers });
    return response;
}