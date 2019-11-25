import Answer from 'answer-module/model';
import express from 'express';
import ApiFeatures from 'util/api-features';
const listAnswer = async (req: express.Request, res: express.Response) => {
  try {
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
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: err.message
    });
  }
};

export default listAnswer;
