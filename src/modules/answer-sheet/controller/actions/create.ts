import AnswerSheet from 'answer-sheet-module/model/index';
import express, { NextFunction } from 'express';
import catchAsync from 'util/catch-async';

const createAnswerSheet = catchAsync(
  async (req: express.Request, res: express.Response, next: NextFunction) => {
    const answerSheet = await AnswerSheet.create({
      quizId: req.body.quizId,
      userId: req.body.userId,
      category: req.body.category,
      answers: req.body.answers
    });

    res.status(201).json({
      status: 'success',
      data: {
        answerSheet
      }
    });
  }
);

export default createAnswerSheet;
