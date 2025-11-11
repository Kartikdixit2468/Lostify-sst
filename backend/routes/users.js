const express = require('express');
const router = express.Router();
const { authMiddleware, adminMiddleware } = require('../utils/auth');
const db = require('../utils/db');

router.get('/', authMiddleware, adminMiddleware, async (req, res) => {
  try {
    const users = await db.list('user:');
    const userList = await Promise.all(
      users.map(async (key) => {
        const user = await db.get(key);
        return {
          id: user.id,
          username: user.username,
          email: user.email,
          isAdmin: user.isAdmin || false,
          enabled: user.enabled !== false,
        };
      })
    );
    res.json(userList);
  } catch (error) {
    console.error('Get users error:', error);
    res.status(500).json({ error: 'Failed to load users' });
  }
});

router.put('/:userId/status', authMiddleware, adminMiddleware, async (req, res) => {
  try {
    const { userId } = req.params;
    const { enabled } = req.body;
    
    const user = await db.get(`user:${userId}`);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    user.enabled = enabled;
    await db.set(`user:${userId}`, user);
    
    res.json({ message: 'User status updated successfully', user });
  } catch (error) {
    console.error('Update user status error:', error);
    res.status(500).json({ error: 'Failed to update user status' });
  }
});

module.exports = router;
