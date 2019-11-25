import AnswerSheet from 'answer-sheet-module/model';
import express from 'express';

const deleteAnswerSheet = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    await AnswerSheet.findByIdAndDelete(req.params.id);
    res.status(204).json({
      status: 'success',
      data: null
    });
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      data: err.message
    });
  }
};

export default deleteAnswerSheet;
