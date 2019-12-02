import mongoose, { Schema } from 'mongoose';
import Quiz, { IQuizProps } from '../../quiz/model';
import AppError from 'util/app-error';
import { hasOne } from 'util/model-relationships';

const identifier = Schema.Types.ObjectId;

type quizProps = {
  category: string;
  createdAt: number;
  updatedAt: number;
  timer: number;
  title: string;
  description: string;
  totalScore: number;
  archived: boolean;
  questions: [];
};

export interface IQuestionProps extends mongoose.Document {
  question: string;
  score: number;
  questionType: Array<string>;
  rightAnswer: string;
  answers: [];
  createdAt: number;
  quizId: mongoose.Types.ObjectId;
}

export const questionSchema: Schema<IQuestionProps> = new Schema({
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
  }
});

//Query Middleware

questionSchema.plugin(hasOne, {
  ref: 'Quiz',
  type: identifier,
  name: 'quizId'
});

// questionSchema.pre('save', async function(next) {
//   const quiz = await Quiz.findById((this as IQuestionProps).quizId);
//   (quiz as IQuizProps).questions.forEach((el: IQuestionProps) => {
//     if (el.question === (this as IQuestionProps).question) {
//       return next(new AppError('This Question already exit', 401));
//     }
//   });
//   quiz.save();
//   next();
// });

const Question = mongoose.model('Question', questionSchema);

export default Question;
