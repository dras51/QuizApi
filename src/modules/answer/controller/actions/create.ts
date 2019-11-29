import Answer from 'answer-module/model';
import express from 'express';
import catchAsync from 'util/catchAsync';

const createAnswer = catchAsync(
  async (req: express.Request, res: express.Response) => {
    const answer = await Answer.create({
      userAnswer: req.body.userAnswer,
      answerSheetId: req.body.answerSheetId,
      questionId: req.body.questionId
    });
    res.status(201).json({
      status: 'success',
      data: { answer }
    });
  }
);

export default createAnswer;
