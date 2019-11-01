// import Question from '../../model/index';
import Quiz from 'quizModel';

const listQuestion = async (req, res) => {
  try {
    const quiz = await Quiz.findById(req.params.quizID);
    const questions = await quiz.questions;
    // const questions = await Question.find();
    res.status(200).json({
      status: 'success',
      results: questions.length,
      data: {
        questions
      }
    });
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: err.message
    });
  }
};

export default listQuestion;
