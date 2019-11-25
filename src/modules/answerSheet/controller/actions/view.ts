import AnswerSheet from 'answer-sheet-module/model';
import express from 'express';

const viewAnswerSheet = async (req: express.Request, res: express.Response) => {
  try {
    const answerSheet = await AnswerSheet.findById(req.params.id);

    res.status(200).json({
      status: 'success',
      data: { answerSheet }
    });
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: err.message
    });
  }
};

export default viewAnswerSheet;
