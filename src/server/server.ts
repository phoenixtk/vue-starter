import * as Express         from 'express';
import { applyMiddlewares } from './middlewares';
import { StaticRoutes }     from './routes/StaticRoutes';
import { SSRRoutes }        from './routes/SSRRoutes';
import { CounterRoutes }    from './routes/CounterRoutes';

export const app: Express.Application = Express();

app.disable('x-powered-by');

applyMiddlewares(app);

/**
 * routes to demonstrate the possibilities of the vue-starter
 * can be removed if you don't need them in your application
 */
CounterRoutes(app);

/**
 * core routes, don't delete these
 */
StaticRoutes(app);
SSRRoutes(app);
