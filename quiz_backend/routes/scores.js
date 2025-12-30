
import express from 'express';
import Score from '../models/Score.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();

// Save a new score (protected)
router.post('/', protect, async (req, res) => {
  try {
    const { domain, score, total, timeSpent } = req.body;
    const newScore = new Score({ userId: req.userId, domain, score, total, timeSpent });
    await newScore.save();
    return res.json({ message: 'Score saved' });
  } catch (err) {
    return res.status(500).json({ message: 'Server error', error: err.message });
  }
});

// Get history for logged in user
router.get('/history', protect, async (req, res) => {
  try {
    const rows = await Score.find({ userId: req.userId }).sort({ createdAt: -1 }).lean();
    return res.json({ history: rows });
  } catch (err) {
    return res.status(500).json({ message: 'Server error', error: err.message });
  }
});

router.get("/:userId", async (req, res) => {
  try {
    const scores = await Score.find({ userId: req.params.userId }).sort({ createdAt: -1 });
    res.json(scores);
  } catch (err) {
    res.status(500).json({ message: "Error fetching scores", error: err.message });
  }
});


export default router;
