import Answer from 'answer-module/model';
import express, { NextFunction } from 'express';
import catchAsync from 'util/catchAsync';
import AppError from 'util/appError';

const viewAnswer = catchAsync(
  async (req: express.Request, res: express.Response, next: NextFunction) => {
    const answer = await Answer.findById(req.params.id);
    if (!answer) return next(new AppError('answer not found', 404));
    res.status(200).json({
      status: 'success',
      data: {
        answer
      }
    });
  }
);

export default viewAnswer;
