import AnswerSheet from 'answer-sheet-module/model';
import express from 'express';
import ApiFeatures from 'util/api-features';

const listAnswerSheet = async (req: express.Request, res: express.Response) => {
  try {
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
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: err.message
    });
  }
};

export default listAnswerSheet;
