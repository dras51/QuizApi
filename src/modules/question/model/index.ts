import mongoose from 'mongoose';
import Quiz from '../../quiz/model';
import AppError from 'util/appError';
import { hasOne } from 'util/model-relationships';

const { Schema } = mongoose;
const identifier = Schema.Types.ObjectId;

export const questionSchema = new Schema({
  question: {
    type: String,
    required: [true, 'Question is required']
  },
  score: {
    type: Number,
    default: 1
  },
  questionType: {
    type: String,
    enum: [
      'yes or no',
      'true or false',
      'multiple choice',
      'text input',
      'single choice from multiple options'
    ],
    required: true
  },
  rightAnswer: {
    type: String,
    required: [true, 'Correct Answer is not specified']
  },
  answers: {
    type: Array,
    required: [true, 'Specify Answers']
  },
  createdAt: {
    type: Date,
    default: Date.now()
  }
});

//Query Middleware

questionSchema.plugin(hasOne, {
  ref: 'Quiz',
  type: identifier,
  name: 'quizId'
});

questionSchema.pre('save', async function(next) {
  const quiz = await Quiz.findById(this.quizId);
  quiz.questions.forEach(el => {
    if (el.question === this.question) {
      return next(new AppError('This Question already exit', 401));
    }
  });
  quiz.questions.push(this._id);
  quiz.save();
  next();
});

const Question = mongoose.model('Question', questionSchema);

export default Question;
