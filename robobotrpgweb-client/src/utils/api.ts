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

export const fetchValidGuild = async (guildId: string, headers: HeadersInit) => {
    // Call through Next.js rewrite to ensure same-origin and cookie forwarding
    const response = await fetch(`/api/guilds/${guildId}/permissions`, {
        headers,
        credentials: 'include',
    });
    return response;
}