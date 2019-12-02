import AnswerSheet from 'answer-sheet-module/model/index';
import express, { NextFunction } from 'express';
import ApiFeatures from 'util/api-features';
import catchAsync from 'util/catch-async';

const listAnswerSheet = catchAsync(
  async (req: express.Request, res: express.Response, next: NextFunction) => {
    const features = new ApiFeatures(AnswerSheet.find(), req.query)
      .filter()
      .sort()
      .LimitFields()
      .pagination();

    const answerSheets = await features.query;

    res.status(200).json({
      status: 'success',
      data: {
        answerSheets
      }
    });
  }
);

export default listAnswerSheet;
