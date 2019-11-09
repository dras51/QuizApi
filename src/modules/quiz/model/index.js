import mongoose from 'mongoose';
// import Question from '../../question/model';

const { Schema } = mongoose;

export const quizSchema = new Schema({
  category: {
    type: String,
    default: 'Undefined',
    unique: true
  },
  questions: [
    {
      type: mongoose.Schema.ObjectId,
      ref: 'Question'
    }
  ],
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
  },
  archived: {
    type: Boolean,
    default: false,
    select: false
  }
});

quizSchema.pre('save', async function() {
  this.createdAt = Date.now();
  this.updatedAt = Date.now();
});

quizSchema.pre('findOneAndUpdate', async function() {
  this.set({ updatedAt: new Date() });
});

quizSchema.pre(/^find/, async function() {
  this.populate({
    path: 'questions',
    select: '-__v'
  });
});

const Quiz = mongoose.model('Quiz', quizSchema);

export default Quiz;
