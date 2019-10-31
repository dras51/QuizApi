import Quiz from '../../../quiz/model';

const createQuestion = async (req, res) => {
  try {
    // const newQuestion = await Question.create(req.body);
    const quiz = await Quiz.findById(req.params.quizID);

    quiz.questions.unshift(req.body);
    const newQuestion = quiz.questions[0];

    await quiz.save();
    res.status(201).json({
      status: 'success',
      data: {
        newQuestion
      }
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: err.message
    });
  }
};

export default createQuestion;
