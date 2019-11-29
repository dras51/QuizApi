import Question from 'questionModule/model/index';
import express, { NextFunction } from 'express';
import catchAsync from 'util/catchAsync';
import AppError from 'util/appError';

const deleteQuestion = catchAsync(
  async (req: express.Request, res: express.Response, next: NextFunction) => {
    const question = await Question.findByIdAndDelete(req.params.id);
    if (!question) return next(new AppError('Question not found', 404));
    res.status(204).json({
      status: 'success',
      data: null
    });
  }
);

export default deleteQuestion;
