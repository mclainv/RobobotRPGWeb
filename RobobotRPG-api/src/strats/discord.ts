import passport from 'passport';
import { Profile, Strategy } from 'passport-discord';
import { VerifyCallback } from 'passport-oauth2';
import { User } from '../database/models';

passport.serializeUser((user: any, done) => {
    return done(null, user.id);
});

passport.deserializeUser(async (id: string, done) => {
    try {
        const user = await User.findById(id);
        return user ? done(null, user) : done(null, null);
    } catch (err) {
        console.log(err);
        return done(err, null);
    }
});

passport.use(new Strategy({
    clientID: process.env.CLIENT_ID!,
    clientSecret: process.env.CLIENT_SECRET!,
    callbackURL: process.env.CALLBACK_URL,
    scope: ['identify', 'guilds', 'email'],
    }, async (
        accessToken: string, 
        refreshToken: string, 
        profile: Profile, 
        done: VerifyCallback
    ) => {
        const { id: discordId } = profile;  
        try {
            const existingUser = await User.findOneAndUpdate(
                { userId: discordId },
                { accessToken, refreshToken },
                { new: true }
            );
            if (existingUser) {
                console.log(existingUser);
                return done(null, existingUser);
            }
        
            // const newUser = User.create( discordId, guildId, accessToken, refreshToken)
            // const savedUser = await newUser.save();
            // return done(null, savedUser);
        } catch (err) {
            console.log(err);
            return done(err, undefined);
        }
    }
));