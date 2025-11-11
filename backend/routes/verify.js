const express = require('express');
const router = express.Router();
const { authMiddleware } = require('../utils/auth');

router.get('/', authMiddleware, async (req, res) => {
  try {
    res.json({
      username: req.user.username,
      email: req.user.email,
      isAdmin: req.user.isAdmin || false,
    });
  } catch (error) {
    console.error('Verify error:', error);
    res.status(500).json({ error: 'Verification failed' });
  }
});

module.exports = router;
