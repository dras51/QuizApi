import Quiz from 'quizModule/model/index';
import express, { NextFunction } from 'express';
import catchAsync from 'util/catch-async';
import AppError from 'util/app-error';
import mongoose from 'mongoose';
// import { IQuizProp } from

const viewQuiz = catchAsync(
  async (req: express.Request, res: express.Response, next: NextFunction) => {
    const quizID = req.params.id;
    // if (!mongoose.Types.ObjectId.isValid(quizID))
    //   return next(new AppError('This ID is invalid', 400));
    const quiz = await Quiz.findById(quizID);
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
