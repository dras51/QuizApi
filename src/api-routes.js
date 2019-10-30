import { Router } from 'express';
import questionRouter from './modules/question/routes';

const apiRoutes = Router();

apiRoutes.use('/question', questionRouter);

export default apiRoutes;
