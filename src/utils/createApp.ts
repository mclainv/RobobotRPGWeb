import express, { Express } from 'express';
import cors from 'cors';
import session from 'express-session';
import passport from 'passport';
// import passport-discord from 'passport-discord';
import routes from '../routes';
require('../strats/discord');

export function createApp(): Express {
    const app = express();
    // middleware
    app.use(express.json());
    app.use(express.urlencoded());

    //enable cores
    app.use(
        cors({
            origin: ['http://localhost:3000'],
            credentials: true,
        })
    );
    //Enable sessions
    app.use(session({
        secret: 'aKj7$9pQ#2zLmN*5rT!xV8@yW3sBdE6fG', // used to en/decrypt cookie, to get session ID from server
        resave: false,
        saveUninitialized: false,
        cookie: { maxAge: 60000 * 60 * 24 * 3 } // 3 days 
    }));

    //Enable passport
    app.use(passport.initialize());
    app.use(passport.session());
    
    app.use('/api', routes);

    return app;
}
