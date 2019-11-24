import express from 'express';
import listQuizes from './controller/actions/list';
import createQuiz from './controller/actions/create';
import viewQuiz from './controller/actions/view';
import deleteQuiz from './controller/actions/delete';
import updateQuiz from './controller/actions/update';
import listArchived from './controller/actions/listArchived';

const router = express.Router();
router
  .route('/')
  .get(listQuizes)
  .get(listArchived)
  .post(createQuiz);

router.route('/archived').get(listArchived);

router
  .route('/:id')
  .get(viewQuiz)
  .delete(deleteQuiz)
  .patch(updateQuiz);
export default router;
