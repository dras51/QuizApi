import express from 'express';
import createAnswer from './controller/actions/create';
import listAnswer from './controller/actions/list';
import viewAnswer from './controller/actions/view';
import updateAnswer from './controller/actions/update';
import deleteAnswer from './controller/actions/delete';

const router = express.Router();

router.route('/').post(createAnswer);
router.route('/:answerSheetId').get(listAnswer);

router
  .route('/:id')
  .get(viewAnswer)
  .patch(updateAnswer)
  .delete(deleteAnswer);

export default router;
