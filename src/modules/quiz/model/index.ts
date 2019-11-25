import mongoose, { Schema } from 'mongoose';
import { hasMany } from 'util/model-relationships';
// import Question from '../../question/model';

const identifier = Schema.Types.ObjectId;
export interface IQuizProps extends mongoose.Document {
  category: string;
  createdAt: number;
  updatedAt: number;
  timer: number;
  title: string;
  description: string;
  totalScore: number;
  archived: boolean;
}

export const quizSchema: Schema<IQuizProps> = new Schema({
  category: {
    type: String,
    default: 'Undefined'
  },
  timer: {
    type: Number,
    default: 15
  },
  title: {
    type: String,
    required: true,
    unique: true
  },
  description: {
    type: String,
    required: true
  },
  totalScore: {
    type: Number,
    default: 0
  },
  createdAt: {
    type: Date
  },
  updatedAt: {
    type: Date
  },
  archived: {
    type: Boolean,
    default: false
  }
});

quizSchema.plugin(hasMany, {
  ref: 'Question',
  type: identifier,
  name: 'questions'
});

quizSchema.pre('save', async function(next) {
  (this as IQuizProps).createdAt = Date.now();
  (this as IQuizProps).updatedAt = Date.now();
  next();
});

quizSchema.pre('findOneAndUpdate', async function(next) {
  (this as any).set({ updatedAt: new Date() });
  next();
});

quizSchema.pre(/^find/, function(next) {
  (this as any).find({ archived: { $ne: true } });
  next();
});

quizSchema.pre(/^find/, async function(next) {
  (this as any).populate({
    path: 'questions',
    select: '-__v'
  });
  next();
});

const Quiz = mongoose.model('Quiz', quizSchema);

export default Quiz;
