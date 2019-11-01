// import Question from '../../model/index';
import Quiz from 'quizModel';

const updateQuestion = async (req, res) => {
  try {
    const quiz = await Quiz.findById(req.params.quizID);
    const question = await quiz.questions.id(req.params.id);
    question.set(req.body);

    await quiz.save();
    // const question = await Quiz.findByIdAndUpdate(req.params.id, req.body, {
    //   new: true,
    //   runValidators: true
    // });
    res.status(201).json({
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

export default updateQuestion;
