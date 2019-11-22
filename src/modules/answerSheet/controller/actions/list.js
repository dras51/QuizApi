import AnswerSheet from '../../model';

const listAnswerSheet = async (req, res) => {
  try {
    const answerSheets = await AnswerSheet.find({
      quizId: req.query.quizId
    });
    res.status(200).json({
      status: 'success',
      data: {
        answerSheets
      }
    });
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: err.message
    });
  }
};

export default listAnswerSheet;
