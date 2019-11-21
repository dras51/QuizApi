import mongoose, { Schema } from 'mongoose';
import { hasMany, hasOne } from '../../../util/modelRelationships';

const identifier = Schema.Types.ObjectId;

export const answerSheetSchema = new Schema({
  userId: {
    type: String,
    default: 'Undefined'
  },
  category: {
    type: String,
    default: 'Undefined'
  },
  totalScore: {
    type: Number
  },
  createdAt: {
    type: Date,
    default: Date.now()
  }
});

answerSheetSchema.plugin(hasMany, {
  ref: 'Answer',
  type: identifier,
  name: 'answers'
});
answerSheetSchema.plugin(hasOne, {
  ref: 'Quiz',
  type: identifier,
  name: 'quizId'
});

const AnswerSheet = mongoose.model('AnswerSheey', answerSheetSchema);

export default AnswerSheet;
