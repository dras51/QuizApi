import mongoose from 'mongoose';
// import Quiz from '../../quiz/model';
// import { quizSchema } from '../../quiz/model/index';

const { Schema } = mongoose;

export const questionSchema = new Schema({
  question: {
    type: String,
    required: [true, 'Question is required'],
    unique: true
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
  },
  quiz: {
    type: mongoose.Schema.ObjectId,
    ref: 'Quiz',
    required: [true, 'A question must belong to a quiz!']
  }
});

//Query Middleware

questionSchema.pre(/^find/, async function() {
  this.populate({
    path: 'quiz',
    select: 'title category'
  });
});

// questionSchema.pre('save', async function() {
//   Quiz.totalScore += this.score;
// });

const Question = mongoose.model('Question', questionSchema);

export default Question;
