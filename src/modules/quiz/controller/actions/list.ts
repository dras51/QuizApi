import Quiz from 'quizModule/model/index';
import ApiFeatures from 'util/api-features';
import express, { NextFunction } from 'express';
import catchAsync from 'util/catchAsync';

const listQuiz = catchAsync(
  async (req: express.Request, res: express.Response, next: NextFunction) => {
    const features = new ApiFeatures(Quiz.find(), req.query)
      .filter()
      .sort()
      .LimitFields()
      .pagination();

    const quizzes = await features.query;
    res.status(200).json({
      status: 'success',
      results: quizzes.length,
      data: {
        quizzes: quizzes
      }
    });
  }
);

export default listQuiz;
