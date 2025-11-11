const express = require('express');
const router = express.Router();
const { authMiddleware, adminMiddleware } = require('../utils/auth');
const db = require('../utils/db');

router.get('/', authMiddleware, adminMiddleware, async (req, res) => {
  try {
    const postKeys = await db.list('post:');
    const posts = await Promise.all(postKeys.map((key) => db.get(key)));
    
    const userKeys = await db.list('user:');
    const users = await Promise.all(userKeys.map((key) => db.get(key)));

    const feedbackKeys = await db.list('feedback:');
    const feedback = await Promise.all(feedbackKeys.map((key) => db.get(key)));

    const lostPosts = posts.filter((p) => p.type === 'lost').length;
    const foundPosts = posts.filter((p) => p.type === 'found').length;
    const resolvedPosts = posts.filter((p) => p.status === 'resolved').length;
    const activePosts = posts.filter((p) => p.status !== 'resolved').length;
    const activeUsers = users.filter((u) => u.enabled !== false).length;

    const stats = {
      totalUsers: users.length,
      totalPosts: posts.length,
      lostPosts,
      foundPosts,
      lostCount: lostPosts,
      foundCount: foundPosts,
      resolvedPosts,
      activePosts,
      activeUsers,
      totalFeedback: feedback.length,
    };

    res.json(stats);
  } catch (error) {
    console.error('Get analytics error:', error);
    res.status(500).json({ error: 'Failed to load analytics' });
  }
});

module.exports = router;
