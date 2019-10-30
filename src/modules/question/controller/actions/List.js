import Question from '../../model/index';

const listQuestion = async (req, res) => {
  try {
    const questions = await Question.find();
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
