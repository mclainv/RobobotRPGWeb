import express, { Express } from 'express';
import cors from 'cors';

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

    app.use('/api', routes);

    return app;
}
