import Question from '../../model/index';
import APIfeatures from '../../../../util/APIfeatures';

const listQuestion = async (req, res) => {
  try {
    const features = new APIfeatures(Question.find(), req.query)
      .filter()
      .sort()
      .LimitFields()
      .paginaton();

    const questions = await features.query;
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
