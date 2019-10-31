import mongoose from 'mongoose';
import { questionSchema } from '../../question/model/index';

const { Schema } = mongoose;

export const quizSchema = new Schema({
  category: {
    type: String,
    default: 'Undefined',
    unique: true
  },
  questions: {
    type: [questionSchema]
  },
  timer: {
    type: Number,
    default: 15
  },
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  totalScore: {
    type: Number,
    default: 0
  },
  date_added: {
    type: Date
  },
  date_updated: {
    type: Date
  }
});

quizSchema.pre('save', async function() {
  this.date_added = Date.now();
  this.date_updated = Date.now();
});

quizSchema.pre('findOneAndUpdate', async function() {
  this.set({ date_updated: new Date() });
});

const Quiz = mongoose.model('Quiz', quizSchema);

export default Quiz;
