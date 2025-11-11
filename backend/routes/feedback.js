const express = require('express');
const router = express.Router();
const Database = require("@replit/database");
const db = new Database();
const { authMiddleware, adminMiddleware } = require('../utils/auth');

async function getAllFeedback() {
  const feedbackKeys = await db.list('feedback:');
  const feedback = [];
  for (const key of feedbackKeys) {
    const item = await db.get(key);
    if (item) feedback.push(item);
  }
  return feedback.sort((a, b) => new Date(b.date) - new Date(a.date));
}

router.post('/', async (req, res) => {
  try {
    const { name, email, subject, message } = req.body;
    
    if (!name || !email || !message) {
      return res.status(400).json({ error: 'Name, email, and message are required' });
    }
    
    const feedbackId = `feedback_${Date.now()}`;
    const feedbackData = {
      id: feedbackId,
      name,
      email,
      subject: subject || 'General Message',
      message,
      date: new Date().toISOString(),
      status: 'Pending'
    };
    
    await db.set(`feedback:${feedbackId}`, feedbackData);
    res.json({ message: 'Feedback submitted successfully. Thank you!' });
  } catch (error) {
    console.error('Feedback submission error:', error);
    res.status(500).json({ error: 'Failed to submit feedback. Please try again later.' });
  }
});

router.get('/', authMiddleware, adminMiddleware, async (req, res) => {
  try {
    const feedback = await getAllFeedback();
    res.json(feedback);
  } catch (error) {
    console.error('Get feedback error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

router.put('/:id', authMiddleware, adminMiddleware, async (req, res) => {
  try {
    const { status } = req.body;
    const feedbackKey = `feedback:${req.params.id}`;
    const feedback = await db.get(feedbackKey);
    
    if (!feedback) {
      return res.status(404).json({ error: 'Feedback not found' });
    }
    
    feedback.status = status;
    await db.set(feedbackKey, feedback);
    res.json(feedback);
  } catch (error) {
    console.error('Update feedback error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

router.delete('/:id', authMiddleware, adminMiddleware, async (req, res) => {
  try {
    const feedbackKey = `feedback:${req.params.id}`;
    await db.delete(feedbackKey);
    res.json({ message: 'Feedback deleted successfully' });
  } catch (error) {
    console.error('Delete feedback error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

router.get('/count/pending', authMiddleware, adminMiddleware, async (req, res) => {
  try {
    const feedback = await getAllFeedback();
    const pendingCount = feedback.filter(f => f.status === 'Pending').length;
    res.json({ count: pendingCount });
  } catch (error) {
    console.error('Get pending count error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;
