import Quiz from 'quizModel';

const listQuiz = async (req, res) => {
  try {
    const quizes = await Quiz.find({ archived: true });
    res.status(200).json({
      status: 'success',
      results: quizes.length,
      data: {
        quizes
      }
    });
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: err.message
    });
  }
};

export default listQuiz;
