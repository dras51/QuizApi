import Answer from 'answer-module/model/index';
import express, { NextFunction } from 'express';
import catchAsync from 'util/catchAsync';
import AppError from 'util/appError';

const updateAnswer = catchAsync(
  async (req: express.Request, res: express.Response, next: NextFunction) => {
    const updatedAnswer = await Answer.findByIdAndUpdate(
      req.params.id,
      {
        userAnswer: req.body.userAnswer,
        answerSheetId: req.body.answerSheetId,
        questionId: req.body.questionId
      },
      {
        new: true,
        runValidators: false
      }
    );
    if (!updatedAnswer) return next(new AppError('Answer not found', 404));
    res.status(201).json({
      status: 'success',
      data: { updatedAnswer }
    });
  }
);

export default updateAnswer;
