import express from 'express';
import createQuestion from './controller/actions/create';
import listQuestions from './controller/actions/list';
import viewQuestion from './controller/actions/view';
import deleteQuestion from './controller/actions/delete';
import updateQuestion from './controller/actions/update';

const router = express.Router();

router
  .route('/')
  .get(listQuestions)
  .post(createQuestion);

router
  .route('/:id')
  .get(viewQuestion)
  .delete(deleteQuestion)
  .patch(updateQuestion);

export default router;
