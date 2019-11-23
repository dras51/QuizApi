import express from 'express';
import listAnswerSheet from './controller/actions/list';
import createAnswerSheet from './controller/actions/create';
import viewAnswerSheet from './controller/actions/view';
import updateAnswerSheet from './controller/actions/update';
import deleteAnswerSheet from './controller/actions/delete';

const router = express.Router();

router.route('/').post(createAnswerSheet);
router.route('/:quizId').get(listAnswerSheet);

router
  .route('/:id')
  .get(viewAnswerSheet)
  .patch(updateAnswerSheet)
  .delete(deleteAnswerSheet);

export default router;
