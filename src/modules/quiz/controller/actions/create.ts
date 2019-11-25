import Quiz from 'quizModule/model/index';
import catchAsync from 'util/catchAsync';
import express from 'express';

const createQuiz = catchAsync(
  async (req: express.Request, res: express.Response) => {
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
