import mongoose from 'mongoose';
import { hasMany } from '../../../util/modelRelationships';
// import Question from '../../question/model';

const { Schema } = mongoose;
const identifier = Schema.Types.ObjectId;

export const quizSchema = new Schema({
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
  this.createdAt = Date.now();
  this.updatedAt = Date.now();
  next();
});

quizSchema.pre('findOneAndUpdate', async function(next) {
  this.set({ updatedAt: new Date() });
  next();
});

quizSchema.pre(/^find/, function(next) {
  this.find({ archived: { $ne: true } });
  next();
});

quizSchema.pre(/^find/, async function(next) {
  this.populate({
    path: 'questions',
    select: '-__v'
  });
  next();
});

const Quiz = mongoose.model('Quiz', quizSchema);

export default Quiz;
