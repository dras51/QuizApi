import AnswerSheet from '../../model';

const viewAnswerSheet = async (req, res) => {
  try {
    const answerSheet = await AnswerSheet.findById(req.params.id);

    res.status(200).json({
      status: 'success',
      data: { answerSheet }
    });
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: err.message
    });
  }
};

export default viewAnswerSheet;
