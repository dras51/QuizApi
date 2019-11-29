import Answer from 'answer-module/model';
import express, { NextFunction } from 'express';
import catchAsync from 'util/catchAsync';
import AppError from 'util/appError';

const deleteAnswer = catchAsync(
  async (req: express.Request, res: express.Response, next: NextFunction) => {
    const answer = await Answer.findByIdAndDelete(req.params.id);
    if (!answer) return next(new AppError('Answer not found', 404));
    res.status(204).json({
      status: 'success',
      data: null
    });
  }
);

export default deleteAnswer;
