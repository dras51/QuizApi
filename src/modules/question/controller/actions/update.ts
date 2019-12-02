import Question from 'questionModule/model/index';
import express, { NextFunction } from 'express';
import AppError from 'util/app-error';
import catchAsync from 'util/catch-async';

const updateQuestion = catchAsync(
  async (req: express.Request, res: express.Response, next: NextFunction) => {
    const question = await Question.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });
    if (!question) return next(new AppError('Question not found', 404));
    res.status(201).json({
      status: 'success',
      data: {
        question
      }
    });
  }
);

export default updateQuestion;
