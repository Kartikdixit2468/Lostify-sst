const express = require('express');
const router = express.Router();
const passport = require('passport');
const { getUser, createUser } = require('../utils/db');
const { generateToken, hashPassword, comparePassword } = require('../utils/auth');

router.post('/signup', async (req, res) => {
  try {
    const { username, email, password } = req.body;
    
    if (!username || !email || !password) {
      return res.status(400).json({ error: 'All fields are required' });
    }
    
    const existingUser = await getUser(username);
    if (existingUser) {
      return res.status(400).json({ error: 'Username already exists' });
    }
    
    const passwordHash = await hashPassword(password);
    const userData = {
      id: username,
      username,
      email,
      passwordHash,
      isAdmin: false,
      createdAt: new Date().toISOString()
    };
    
    await createUser(userData);
    
    const token = generateToken(userData);
    res.status(201).json({
      message: 'User created successfully',
      token,
      user: { id: username, username, email, isAdmin: userData.isAdmin }
    });
  } catch (error) {
    console.error('Signup error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

router.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body;
    
    if (!username || !password) {
      return res.status(400).json({ error: 'Username and password are required' });
    }
    
    const user = await getUser(username);
    if (!user) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }
    
    const isValidPassword = await comparePassword(password, user.passwordHash);
    if (!isValidPassword) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }
    
    const token = generateToken({ ...user, id: user.id || user.username });
    res.json({
      message: 'Login successful',
      token,
      user: { id: user.id || user.username, username: user.username, email: user.email, isAdmin: user.isAdmin }
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

router.post('/admin/login', async (req, res) => {
  try {
    const { username, password } = req.body;
    
    if (!username || !password) {
      return res.status(400).json({ error: 'Username and password are required' });
    }
    
    const adminUsername = process.env.ADMIN_USERNAME;
    const adminPassword = process.env.ADMIN_PASSWORD;
    const adminEmail = process.env.ADMIN_EMAIL;
    
    if (!adminUsername || !adminPassword || !adminEmail) {
      return res.status(500).json({ error: 'Admin credentials not configured' });
    }
    
    if (username !== adminUsername || password !== adminPassword) {
      return res.status(401).json({ error: 'Invalid admin credentials' });
    }
    
    const adminUser = {
      id: 'admin',
      username: adminUsername,
      email: adminEmail,
      isAdmin: true
    };
    
    const token = generateToken(adminUser);
    res.json({
      message: 'Admin login successful',
      token,
      user: adminUser
    });
  } catch (error) {
    console.error('Admin login error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

router.get('/google',
  passport.authenticate('google', { scope: ['profile', 'email'] })
);

router.get('/google/callback',
  passport.authenticate('google', { session: false, failureRedirect: '/login?error=unauthorized' }),
  (req, res) => {
    try {
      if (!req.user) {
        return res.redirect('/login?error=unauthorized');
      }
      
      const token = generateToken(req.user);
      res.redirect(`/login?token=${token}&username=${req.user.username}&email=${req.user.email}&isAdmin=${req.user.isAdmin}`);
    } catch (error) {
      console.error('OAuth callback error:', error);
      res.redirect('/login?error=oauth_failed');
    }
  }
);

module.exports = router;
