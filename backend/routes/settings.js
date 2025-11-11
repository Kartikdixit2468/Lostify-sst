const express = require('express');
const router = express.Router();
const { authMiddleware, adminMiddleware } = require('../utils/auth');
const db = require('../utils/db');

router.get('/', authMiddleware, async (req, res) => {
  try {
    const settings = await db.get(`settings:${req.user.id}`);
    res.json(settings || {
      defaultPostType: 'lost',
      contactVisibility: 'public',
      whatsappPrefix: true,
      autoResolve: false,
    });
  } catch (error) {
    console.error('Get settings error:', error);
    res.status(500).json({ error: 'Failed to load settings' });
  }
});

router.put('/', authMiddleware, async (req, res) => {
  try {
    const settings = req.body;
    await db.set(`settings:${req.user.id}`, settings);
    res.json({ message: 'Settings saved successfully', settings });
  } catch (error) {
    console.error('Save settings error:', error);
    res.status(500).json({ error: 'Failed to save settings' });
  }
});

router.get('/admin', authMiddleware, adminMiddleware, async (req, res) => {
  try {
    const adminSettings = await db.get('admin:settings');
    res.json(adminSettings || {
      moderationThreshold: 3,
      manualApproval: false,
      announcementBanner: '',
    });
  } catch (error) {
    console.error('Get admin settings error:', error);
    res.status(500).json({ error: 'Failed to load admin settings' });
  }
});

router.put('/admin', authMiddleware, adminMiddleware, async (req, res) => {
  try {
    const adminSettings = req.body;
    await db.set('admin:settings', adminSettings);
    res.json({ message: 'Admin settings saved successfully', adminSettings });
  } catch (error) {
    console.error('Save admin settings error:', error);
    res.status(500).json({ error: 'Failed to save admin settings' });
  }
});

module.exports = router;
