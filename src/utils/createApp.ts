import express, { Express } from 'express';
import cors from 'cors';
import session from 'express-session';
import routes from '../routes';

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

    app.use(session({
        secret: 'aKj7$9pQ#2zLmN*5rT!xV8@yW3sBdE6fG', // used to en/decrypt cookie, to get session ID from server
        resave: false,
        saveUninitialized: false,
        cookie: { maxAge: 60000 * 60 * 24 * 3 } // 3 days 
    }));

    app.use('/api', routes);

    return app;
}
