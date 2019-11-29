import Quiz from 'quizModule/model/index';
import express, { NextFunction } from 'express';
import catchAsync from 'util/catchAsync';
import AppError from 'util/appError';

const deleteQuiz = catchAsync(
  async (req: express.Request, res: express.Response, next: NextFunction) => {
    const quiz = await Quiz.findByIdAndDelete(req.params.id);
    if (!quiz) return next(new AppError('Quiz not found', 404));
    res.status(204).json({
      status: 'success',
      data: null
    });
  }
);

export default deleteQuiz;
