import mongoose from 'mongoose';
import { questionSchema } from '../../question/model/index';

const { Schema } = mongoose;

const quizSchema = new Schema({
  category: {
    type: String,
    default: 'Undefined'
  },
  question: [questionSchema],
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
    type: Number
  },
  date: {
    date_added: Date,
    date_updated: {
      type: Date,
      default: Date.now()
    }
  }
});

const Quiz = mongoose.model('Quiz', quizSchema);

export default Quiz;
