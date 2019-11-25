import Quiz from 'quizModule/model/index';
import express from 'express';

const updateQuiz = async (req: express.Request, res: express.Response) => {
  try {
    const quiz = await Quiz.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });
    res.status(201).json({
      status: 'success',
      data: {
        quiz
      }
    });
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: err.message
    });
  }
};

export default updateQuiz;
