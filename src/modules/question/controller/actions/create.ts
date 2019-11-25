import Question from 'questionModule/model/index';
import express from 'express';

const createQuestion = async (req: express.Request, res: express.Response) => {
  try {
    const newQuestion = await Question.create(req.body);
    res.status(201).json({
      status: 'success',
      data: {
        question: newQuestion
      }
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: err.message
    });
  }
};

export default createQuestion;
