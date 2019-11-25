import AnswerSheet from 'answer-sheet-module/model';
import express from 'express';

const updateAnswerSheet = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const answerSheet = await AnswerSheet.findByIdAndUpdate(
      req.params.id,
      {
        userId: req.body.userId,
        quizId: req.body.quizId,
        category: req.body.category
      },
      {
        new: true,
        runValidators: true
      }
    );
    res.status(201).json({
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

export default updateAnswerSheet;
