import Answer from 'answer-module/model';
import express from 'express';
import ApiFeatures from 'util/api-features';
import catchAsync from 'util/catch-async';

const listAnswer = catchAsync(
  async (req: express.Request, res: express.Response) => {
    const features = new ApiFeatures(Answer.find(), req.query)
      .filter()
      .sort()
      .LimitFields()
      .pagination();

    const answers = await features.query;
    res.status(200).json({
      status: 'success',
      data: {
        answers
      }
    });
  }
);

export default listAnswer;
