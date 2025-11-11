const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const { getUser, createUser } = require('../utils/db');

passport.serializeUser((user, done) => {
  done(null, user.username);
});

passport.deserializeUser(async (username, done) => {
  try {
    const user = await getUser(username);
    done(null, user);
  } catch (error) {
    done(error, null);
  }
});

const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET;
const CALLBACK_URL = process.env.REPLIT_DEV_DOMAIN 
  ? `https://${process.env.REPLIT_DEV_DOMAIN}/api/auth/google/callback`
  : 'http://localhost:5000/api/auth/google/callback';

if (GOOGLE_CLIENT_ID && GOOGLE_CLIENT_SECRET) {
  passport.use(
    new GoogleStrategy(
      {
        clientID: GOOGLE_CLIENT_ID,
        clientSecret: GOOGLE_CLIENT_SECRET,
        callbackURL: CALLBACK_URL
      },
      async (accessToken, refreshToken, profile, done) => {
        try {
          const email = profile.emails[0].value;
          
          if (!email.endsWith('@sst.scaler.com')) {
            return done(null, false, { message: 'Only @sst.scaler.com accounts are allowed.' });
          }

          let user = await getUser(email.split('@')[0]);

          if (!user) {
            user = await createUser({
              username: email.split('@')[0],
              email: email,
              passwordHash: null,
              isAdmin: false
            });
          }

          return done(null, user);
        } catch (error) {
          return done(error, null);
        }
      }
    )
  );
  console.log('✅ Google OAuth configured');
} else {
  console.log('⚠️  Google OAuth not configured (missing GOOGLE_CLIENT_ID or GOOGLE_CLIENT_SECRET)');
}

module.exports = passport;
