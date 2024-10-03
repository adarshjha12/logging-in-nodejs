const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const GoogleUser = require('../userSchema/googleDetails');

// Google OAuth Strategy
passport.use(new GoogleStrategy({
  clientID: process.env.CLIENT_ID,  // Get from .env file
  clientSecret: process.env.CLIENT_SECRET,  // Get from .env file
  callbackURL: 'http://localhost:3000/auth/google/callback',
  passReqToCallback: true,
  prompt: 'consent'
}, async function (req, accessToken, refreshToken, profile, done) {
  try {
    // Check if the user exists in the database
    let user = await GoogleUser.findOne({ googleId: profile.id });

    if (!user) {
      // Create a new user if one doesn't exist
      user = new GoogleUser({
        googleId: profile.id,
        name: profile.displayName,
        email: profile.emails[0].value, // Get the user's email
        avatar: profile.photos[0].value, // Get the user's profile picture
      });
      await user.save();
    }

    return done(null, user);
  } catch (err) {
    return done(err, null);
  }
}));

// Serialize user into session
passport.serializeUser((user, done) => {
  done(null, user.id);  // Only store the user ID in the session
});

// Deserialize user from session
passport.deserializeUser(async (id, done) => {
  try {
    const user = await GoogleUser.findById(id);  // Find user by ID
    done(null, user);
  } catch (err) {
    done(err, null);
  }
});
