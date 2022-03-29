import { Router } from 'express';

import complexRouter from './complex';
import seriesRouter from './series';
import webhookRouter from './webhook';
import generalRouter from './general';

const routes = Router();

routes.use('/', generalRouter);
routes.use('/webhook', webhookRouter);
routes.use('/complex', complexRouter);
routes.use('/series', seriesRouter);

export default routes;

