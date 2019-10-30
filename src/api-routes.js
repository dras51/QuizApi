import { Router } from 'express';
import questionRouter from './modules/question/routes';
import quizRouter from './modules/quiz/routes';

const apiRoutes = Router();

apiRoutes.use('/question', questionRouter);
apiRoutes.use('/quiz', quizRouter);

export default apiRoutes;
