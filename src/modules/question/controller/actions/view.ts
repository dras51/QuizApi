import Question from 'questionModule/model/index';
import express, { NextFunction } from 'express';
import AppError from 'util/app-error';
import catchAsync from 'util/catch-async';

const viewQuestion = catchAsync(
  async (req: express.Request, res: express.Response, next: NextFunction) => {
    const question = await Question.findById(req.params.id);
    if (!question) return next(new AppError('Question not found', 404));
    res.status(200).json({
      status: 'success',
      data: { question }
    });
  }
);

export default viewQuestion;
