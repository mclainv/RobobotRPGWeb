import { GetServerSidePropsContext } from "next";
import axios from 'axios';
import { validateCookies } from "./helpers";
import { PartialGuild } from "./types";

// Dynamically resolve the API URL based on environment (SSR, local dev, or Codespaces)
const getApiUrl = () => {
  if (typeof window === 'undefined') {
    // SSR: use container-internal address
    return 'http://localhost:3001/api';
  }
  const { protocol, hostname } = window.location;
  if (hostname.endsWith('.githubpreview.dev') || hostname.endsWith('.github.dev')) {
    // GH Codespaces forwarded domain: swap port prefix from 3000 to 3001
    const [first, ...rest] = hostname.split('.');
    const parts = first.split('-');
    parts[0] = '3001';
    const newHost = [parts.join('-'), ...rest].join('.');
    return `${protocol}//${newHost}/api`;
  }
  // Local dev in browser: same host, port 3001
  return `${protocol}//${hostname}:3001/api`;
};
const API_URL = getApiUrl();

export const fetchMutualGuilds = async (context: GetServerSidePropsContext) => {
    const headers = validateCookies(context);
    if (!headers) return { redirect: { destination: '/'} };
    try {
        const { data: guilds } = await axios.get<PartialGuild[]>(`${API_URL}/guilds`, { headers });
        return { props: { guilds } } ;
    } catch(err) {
        console.log(err);
        return { redirect: { destination: '/'}};
    }

}

export const fetchValidGuild = async (guildId: string, headers: HeadersInit) => {
    const response = await fetch(`${API_URL}/guilds/${guildId}/permissions`, { headers });
    return response;
}