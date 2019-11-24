import Answer from '../../model';

const viewAnswer = async (req, res) => {
  try {
    const answer = await Answer.findById(req.params.id);
    res.status(200).json({
      status: 'success',
      data: {
        answer
      }
    });
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: err.message
    });
  }
};

export default viewAnswer;
