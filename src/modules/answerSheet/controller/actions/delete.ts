import AnswerSheet from '../../model';

const deleteAnswerSheet = async (req, res) => {
  try {
    await AnswerSheet.findByIdAndDelete(req.params.id);
    res.status(204).json({
      status: 'success',
      data: null
    });
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      data: err.message
    });
  }
};

export default deleteAnswerSheet;
