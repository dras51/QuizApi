import mongoose, { Schema } from 'mongoose';
import { hasOne } from 'util/model-relationships';

const identifier = Schema.Types.ObjectId;

export interface IAnswerProps extends mongoose.Document {
  userAnswer: string;
  isCorrect: boolean;
  createdAt: number;
  answerSheetId: mongoose.Types.ObjectId;
  questionId: mongoose.Types.ObjectId;
}

export const answerSchema: Schema<IAnswerProps> = new Schema({
  userAnswer: {
    type: String,
    required: true
  },
  isCorrect: {
    type: Boolean
  },
  createdAt: {
    type: Date,
    default: Date.now()
  }
});

answerSchema.plugin(hasOne, {
  ref: 'AnswerSheet',
  type: identifier,
  name: 'answerSheetId'
});
answerSchema.plugin(hasOne, {
  ref: 'Question',
  type: identifier,
  name: 'questionId'
});

const Answer = mongoose.model('Answer', answerSchema);

export default Answer;
