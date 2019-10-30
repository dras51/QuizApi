import Quiz from '../../model/index';

const listQuiz = async (req, res) => {
  try {
    const quizes = await Quiz.find();
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
