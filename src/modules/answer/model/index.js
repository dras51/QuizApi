import mongoose, { Schema } from 'mongoose';
import { hasOne } from '../../../util/modelRelationships';

const identifier = Schema.Types.ObjectId;

export const answerSchema = new Schema({
  userAnswer: {
    type: String,
    default: 'Undefined'
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

const Answer = mongoose.model('AnswerSheey', answerSchema);

export default Answer;
