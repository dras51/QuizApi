import mongoose, { Schema } from 'mongoose';
import { hasMany } from 'util/model-relationships';

const identifier = Schema.Types.ObjectId;

export const answerSheetSchema = new Schema({
  userId: {
    type: mongoose.Types.ObjectId,
    required: true
  },
  quizId: { type: mongoose.Types.ObjectId, required: true },
  category: {
    type: String,
    default: 'Undefined'
  },
  totalScore: {
    type: Number,
    default: 0
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
