import mongoose from 'mongoose';

const { Schema } = mongoose;

const questionSchema = new Schema({
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
    default: Date.now(),
    select: false
  }
});

const Question = mongoose.model('Question', questionSchema);

export default Question;
