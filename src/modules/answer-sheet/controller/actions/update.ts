import AnswerSheet from 'answer-sheet-module/model/index';
import express, { NextFunction } from 'express';
import catchAsync from 'util/catch-async';
import AppError from 'util/app-error';

const updateAnswerSheet = catchAsync(
  async (req: express.Request, res: express.Response, next: NextFunction) => {
    const answerSheet = await AnswerSheet.findByIdAndUpdate(
      req.params.id,
      {
        userId: req.body.userId,
        quizId: req.body.quizId,
        category: req.body.category
      },
      {
        new: true,
        runValidators: false
      }
    );
    if (!answerSheet) return next(new AppError('Answer Sheet not found', 404));
    res.status(201).json({
      status: 'success',
      data: { answerSheet }
    });
  }
);

export default updateAnswerSheet;
