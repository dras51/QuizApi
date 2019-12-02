import Quiz from 'quizModule/model/index';
import express, { NextFunction } from 'express';
import catchAsync from 'util/catch-async';
import mongoose from 'mongoose';
import AppError from 'util/app-error';

const updateQuiz = catchAsync(
  async (req: express.Request, res: express.Response, next: NextFunction) => {
    const quizId = req.params.id;
    const quiz = await Quiz.findByIdAndUpdate(quizId, req.body, {
      new: true,
      runValidators: true
    });
    if (!quiz) return next(new AppError('Quiz not found', 404));
    res.status(201).json({
      status: 'success',
      data: {
        quiz
      }
    });
  }
);

export default updateQuiz;
