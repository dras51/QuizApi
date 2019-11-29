import AnswerSheet from 'answer-sheet-module/model/index';
import express, { NextFunction } from 'express';
import catchAsync from 'util/catchAsync';
import AppError from 'util/appError';

const viewAnswerSheet = catchAsync(
  async (req: express.Request, res: express.Response, next: NextFunction) => {
    const answerSheetId = req.params.id;
    const answerSheet = await AnswerSheet.findById(answerSheetId);
    if (!AnswerSheet) return next(new AppError('Answer Sheet not found', 404));

    res.status(200).json({
      status: 'success',
      data: { answerSheet }
    });
  }
);

export default viewAnswerSheet;
