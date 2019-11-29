import Question from 'questionModule/model/index';
import ApiFeatures from 'util/api-features';
import express from 'express';
import catchAsync from 'util/catchAsync';

const listQuestion = catchAsync(
  async (req: express.Request, res: express.Response) => {
    const features = new ApiFeatures(Question.find(), req.query)
      .filter()
      .sort()
      .LimitFields()
      .pagination();

    const questions = await features.query;
    res.status(200).json({
      status: 'success',
      results: questions.length,
      data: {
        questions
      }
    });
  }
);

export default listQuestion;
