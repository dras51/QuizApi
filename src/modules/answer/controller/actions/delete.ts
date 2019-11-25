import Answer from 'answer-module/model';
import express from 'express';

const deleteAnswer = async (req: express.Request, res: express.Response) => {
  try {
    await Answer.findByIdAndDelete(req.params.id);
    res.status(204).json({
      status: 'success',
      data: null
    });
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: err.message
    });
  }
};

export default deleteAnswer;
