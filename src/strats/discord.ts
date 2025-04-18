import passport from 'passport';
import { Profile, Strategy } from 'passport-discord';
import { VerifyCallback } from 'passport-oauth2';

passport.use(new Strategy({
    clientID: process.env.CLIENT_ID!,
    clientSecret: process.env.CLIENT_SECRET!,
    callbackURL: process.env.CALLBACK_URL,
    scope: ['identity', 'email', 'guilds'],
    }, async (
        accessToken: string, 
        refreshToken: string, 
        profile: Profile, 
        done: VerifyCallback
    ) => {}
));