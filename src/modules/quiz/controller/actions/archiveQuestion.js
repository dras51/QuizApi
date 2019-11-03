import Quiz from 'quizModel';
// import archive from 'mongoose-archive';

const archciveQuestion = async (req, res) => {
  try {
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: err.message
    });
  }
};

export default archciveQuestion;
