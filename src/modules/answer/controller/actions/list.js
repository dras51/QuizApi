import Answer from '../../model';

const listAnswer = async (req, res) => {
  try {
    const answers = await Answer.find({
      answerSheetId: req.params.answerSheetId
    });
    res.status(200).json({
      status: 'success',
      data: {
        answers
      }
    });
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: err.message
    });
  }
};

export default listAnswer;
