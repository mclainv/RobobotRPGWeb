import { GetServerSidePropsContext } from "next";
import axios from 'axios';
import { validateCookies } from "./helpers";
import { PartialGuild } from "./types";
import absoluteUrl from 'next-absolute-url';
// import '../config';

export const fetchMutualGuilds = async (context: GetServerSidePropsContext) => {
    const headers = validateCookies(context);
    console.log("headers are ", headers);
    if (!headers) return { redirect: { destination: '/'} };
    // Derive full origin for server-side requests
    const { origin } = absoluteUrl(context.req);
    try {
        const { data: guilds } = await axios.get<PartialGuild[]>(`${origin}/api/guilds`, {
            headers
        });
        console.log("guilds are ", guilds);
        return { props: { guilds } } ;
    } catch(err) {
        console.log(err);
        return { redirect: { destination: '/'}};
    }
}

export const fetchValidGuild = async (context: GetServerSidePropsContext, guildId: string) => {
    const headers = validateCookies(context);
    if (!headers) return { redirect: { destination: '/'} };
    const { origin } = absoluteUrl(context.req);
    // Client-side call remains relative
    const response = await fetch(`${origin}/api/guilds/${guildId}/permissions`, {
        headers
    });
    return response;
}