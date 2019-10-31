// import Question from '../../model/index';
import Quiz from '../../../quiz/model';

const deleteQuestion = async (req, res) => {
  try {
    // await Question.findByIdAndDelete(req.params.id);
    const quiz = await Quiz.findById(req.params.quizID);
    await quiz.questions.id(req.params.id).remove();
    await quiz.save();
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
