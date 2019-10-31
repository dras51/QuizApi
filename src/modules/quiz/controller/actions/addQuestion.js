import Quiz from '../../model/index';

const addQuestion = async (req, res) => {
  try {
    const newQuestion = req.body;
    let quiz = await Quiz.findById(req.params.id, newQuestion);
    const questions = await quiz.questions;
    await questions.push(newQuestion);
    res.send(questions);
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: err.message
    });
  }
};

export default addQuestion;
