import mongoose from 'mongoose';
import { questionSchema } from 'questionModel';

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
  createdAt: {
    type: Date
  },
  updatedAt: {
    type: Date
  }
});

quizSchema.pre('save', async function() {
  this.createdAt = Date.now();
  this.updatedAt = Date.now();
});

quizSchema.pre('findOneAndUpdate', async function() {
  this.set({ updatedAt: new Date() });
});

const Quiz = mongoose.model('Quiz', quizSchema);

export default Quiz;
