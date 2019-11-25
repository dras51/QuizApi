import Question from 'questionModule/model/index';
import express from 'express';

const viewQuestion = async (req: express.Request, res: express.Response) => {
  try {
    const question = await Question.findById(req.params.id);
    res.status(200).json({
      status: 'success',
      data: { question }
    });
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: err.message
    });
  }
};

export default viewQuestion;
