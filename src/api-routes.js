import { Router } from 'express';
import questionRouter from './modules/question/routes';
import quizRouter from './modules/quiz/routes';
import answerRouter from './modules/answer/routes';
import answerSheetRouter from './modules/answerSheet/routes';

const apiRoutes = Router();

apiRoutes.use('/question', questionRouter);
apiRoutes.use('/quiz', quizRouter);
apiRoutes.use('/answer', answerRouter);
apiRoutes.use('/answerSheet', answerSheetRouter);

export default apiRoutes;
