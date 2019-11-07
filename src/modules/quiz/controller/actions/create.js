import Quiz from 'quizModel';
import catchAsync from 'catchAsync';

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
