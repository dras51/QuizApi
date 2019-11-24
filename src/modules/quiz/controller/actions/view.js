import Quiz from 'quizModule/model/index';

const viewQuiz = async (req, res) => {
  try {
    const quiz = await Quiz.findById(req.params.id);

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
