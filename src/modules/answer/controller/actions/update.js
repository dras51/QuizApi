import Answer from '../../model';

const updateAnswer = async (req, res) => {
  try {
    const updatedAnswer = Answer.findByIdAndUpdate(
      req.params.id,
      {
        userAnswer: req.body.userAnswer,
        answerSheetId: req.body.answerSheetId,
        questionId: req.body.questionId
      },
      {
        new: true,
        runValidators: true
      }
    );
    res.status(201).json({
      status: 'success',
      data: { updatedAnswer }
    });
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: err.message
    });
  }
};

export default updateAnswer;
