import Quiz from 'quizModule/model/index';
import express from 'express';
// import { IQuizProp } from

const viewQuiz = async (req: express.Request, res: express.Response) => {
  try {
    const quiz = Quiz.findById(req.params.id);
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

export default viewQuiz;
