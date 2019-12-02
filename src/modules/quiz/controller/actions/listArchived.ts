import Quiz from 'quizModule/model/index';
import ApiFeatures from 'util/api-features';
import express from 'express';
import catchAsync from 'util/catch-async';

const listQuiz = catchAsync(
  async (req: express.Request, res: express.Response) => {
    const features = new ApiFeatures(Quiz.find({ archived: true }), req.query)
      .filter()
      .sort()
      .LimitFields()
      .pagination();

    const quizzes = await features.query;
    res.status(200).json({
      status: 'success',
      results: quizzes.length,
      data: {
        quizzes
      }
    });
  }
);

export default listQuiz;