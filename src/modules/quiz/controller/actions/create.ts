import Quiz from 'quizModule/model/index';
import catchAsync from 'util/catchAsync';
import express, { NextFunction } from 'express';
import { runInNewContext } from 'vm';
import AppError from 'util/appError';

const createQuiz = catchAsync(
  async (req: express.Request, res: express.Response, next: NextFunction) => {
    const newQuiz = await Quiz.create(req.body);
    res.status(201).json({
      status: 'success',
      data: {
        newQuiz
      }
    });
  }
);

export default createQuiz;
