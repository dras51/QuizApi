import Quiz from 'quizModule/model/index';
import catchAsync from 'util/catchAsync';

const createQuiz = catchAsync(async (req, res) => {
  const newQuiz = await Quiz.create(req.body);
  res.status(201).json({
    status: 'success',
    data: {
      newQuiz
    }
  });
});

export default createQuiz;
