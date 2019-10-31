import express from 'express';
import listQuizes from './controller/actions/list';
import createQuiz from './controller/actions/create';
import viewQuiz from './controller/actions/view';
import deleteQuiz from './controller/actions/delete';
import updateQuiz from './controller/actions/update';
// import addQuestion from './controller/actions/addQuestion';

const router = express.Router();
router
  .route('/')
  .get(listQuizes)
  .post(createQuiz);

router
  .route('/:id')
  .get(viewQuiz)
  .delete(deleteQuiz)
  .patch(updateQuiz);
//   .patch(addQuestion);

export default router;
