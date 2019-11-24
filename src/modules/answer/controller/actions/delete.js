import Answer from '../../model';

const deleteAnswer = async (req, res) => {
  try {
    await Answer.findByIdAndDelete(req.params.id);
    res.status(204).json({
      status: 'success',
      data: null
    });
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: err.message
    });
  }
};

export default deleteAnswer;
