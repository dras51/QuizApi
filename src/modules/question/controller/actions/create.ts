import Question from 'questionModule/model/index';
import express, { NextFunction } from 'express';
import catchAsync from 'util/catch-async';

const createQuestion = catchAsync(
  async (req: express.Request, res: express.Response, next: NextFunction) => {
    const newQuestion = await Question.create(req.body);
    res.status(201).json({
      status: 'success',
      data: {
        newQuestion
      }
    });
  }
);

export default createQuestion;
