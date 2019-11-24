import Quiz from 'quizModule/model/index';
import APIfeatures from 'util/APIfeatures';

const listQuiz = async (req, res) => {
  try {
    const features = new APIfeatures(Quiz.find({ archived: true }), req.query)
      .filter()
      .sort()
      .LimitFields()
      .paginaton();

    const quizes = await features.query;
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
