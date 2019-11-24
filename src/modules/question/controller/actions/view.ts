import Question from 'questionModule/model/index';

const viewQuestion = async (req, res) => {
  try {
    const question = await Question.findById(req.params.id);
    res.status(200).json({
      status: 'success',
      data: { question }
    });
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: err.message
    });
  }
};

export default viewQuestion;
