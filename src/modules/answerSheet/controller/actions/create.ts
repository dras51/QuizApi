import AnswerSheet from 'answer-sheet-module/model';
import express from 'express';

const createAnswerSheet = async (
  req: express.Request,
  res: express.Response
) => {
  try {
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
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: err.message
    });
  }
};

export default createAnswerSheet;
