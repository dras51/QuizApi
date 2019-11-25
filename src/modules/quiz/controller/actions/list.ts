import Quiz from 'quizModule/model/index';
import ApiFeatures from 'util/api-features';
import express from 'express';

const listQuiz = async (req: express.Request, res: express.Response) => {
  try {
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
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: err.message
    });
  }
};

export default listQuiz;
