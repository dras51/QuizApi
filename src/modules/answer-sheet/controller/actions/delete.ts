import AnswerSheet from 'answer-sheet-module/model/index';
import express, { NextFunction } from 'express';
import catchAsync from 'util/catchAsync';
import AppError from 'util/appError';

const deleteAnswerSheet = catchAsync(
  async (req: express.Request, res: express.Response, next: NextFunction) => {
    const answerSheet = await AnswerSheet.findByIdAndDelete(req.params.id);
    if (!answerSheet) return next(new AppError('Answer Sheet not found', 404));
    res.status(204).json({
      status: 'success',
      data: null
    });
  }
);

export default deleteAnswerSheet;
