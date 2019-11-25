import Answer from 'answer-module/model';
import express from 'express';

const createAnswer = async (req: express.Request, res: express.Response) => {
  try {
    const answer = await Answer.create({
      userAnswer: req.body.userAnswer,
      answerSheetId: req.body.answerSheetId,
      questionId: req.body.questionId
    });
    res.status(201).json({
      status: 'success',
      data: { answer }
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: err.message
    });
  }
};

export default createAnswer;
