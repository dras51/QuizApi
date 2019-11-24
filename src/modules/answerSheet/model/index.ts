import mongoose, { Schema } from 'mongoose';
import { hasMany } from '../../../util/modelRelationships';

const identifier = Schema.Types.ObjectId;

export const answerSheetSchema = new Schema({
  userId: {
    type: String,
    default: 'Undefined'
  },
  quizId: { type: String, required: true },
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

const AnswerSheet = mongoose.model('AnswerSheet', answerSheetSchema);

export default AnswerSheet;
