import { GetServerSidePropsContext } from "next";
import axios from 'axios';
import { validateCookies } from "./helpers";
import { PartialGuild } from "./types";
// import '../config';

export const fetchMutualGuilds = async (context: GetServerSidePropsContext) => {
    const headers = validateCookies(context);
    console.log("headers are ", headers);
    if (!headers) return { redirect: { destination: '/'} };
    try {
        const { data: guilds } = await axios.get<PartialGuild[]>('/api/guilds', {
            headers,
            withCredentials: true,
        });
        console.log("guilds are ", guilds);
        return { props: { guilds } } ;
    } catch(err) {
        console.log(err);
        return { redirect: { destination: '/'}};
    }
}

export const fetchValidGuild = async (guildId: string, headers: HeadersInit) => {
    const response = await fetch(`/api/guilds/${guildId}/permissions`, {
        headers,
        credentials: 'include',
    });
    return response;
}