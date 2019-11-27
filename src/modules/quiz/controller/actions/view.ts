import Quiz from 'quizModule/model/index';
import express, { NextFunction } from 'express';
import catchAsync from 'util/catchAsync';
import AppError from 'util/appError';
import mongoose from 'mongoose';
// import { IQuizProp } from

const viewQuiz = catchAsync(
  async (req: express.Request, res: express.Response, next: NextFunction) => {
    const userId = req.params.id;
    if (!mongoose.Types.ObjectId.isValid(userId))
      return next(new AppError('This ID is invalid', 400));
    const quiz = await Quiz.findById(userId);
    if (!quiz) return next(new AppError('Quiz not found', 404));
    res.status(200).json({
      status: 'success',
      data: {
        quiz
      }
    });
  }
);

export default viewQuiz;
