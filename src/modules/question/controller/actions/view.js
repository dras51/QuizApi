// import Question from '../../model/index';
import Quiz from '../../../quiz/model';

const viewQuestion = async (req, res) => {
  try {
    const quiz = await Quiz.findById(req.params.quizID);
    const question = await quiz.questions.id(req.params.id);
    res.status(200).json({
      status: 'success',
      data: {
        question
      }
    });
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: err.message
    });
  }
};

export default viewQuestion;
