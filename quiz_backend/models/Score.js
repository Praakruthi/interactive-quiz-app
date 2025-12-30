import mongoose from 'mongoose';

const scoreSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  domain: { type: String, required: true },
  score: { type: Number, required: true },
  total: { type: Number, default: 15 },
  timeSpent: [{ type: Number }], // seconds per question
  createdAt: { type: Date, default: Date.now }
});

const Score = mongoose.model('Score', scoreSchema);
export default Score;
