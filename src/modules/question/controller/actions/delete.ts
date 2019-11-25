import Question from 'questionModule/model/index';
import express from 'express';

const deleteQuestion = async (req: express.Request, res: express.Response) => {
  try {
    await Question.findByIdAndDelete(req.params.id);
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

export default deleteQuestion;
