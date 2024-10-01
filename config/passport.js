const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const GoogleUser = require('../userSchema/googleDetails')

// Google OAuth Strategy
passport.use(new GoogleStrategy({
    clientID: process.env.CLIENT_ID,  // Get from .env file
    clientSecret: process.env.CLIENT_SECRET,  // Get from .env file
    callbackURL: '/auth/google/callback',
    passReqToCallback: true,
    accessType: 'offline'
  },async (accessToken, refreshToken, profile, done) => {
    // Here you can save the user profile to your database if needed
    // For this example, we'll just pass the profile object as the user
    console.log("access Token:", accessToken);
    console.log("Refresh Token:", refreshToken);
    try {
      let user = await GoogleUser.findOne({googleId: profile.id})

      if (!user) {
        user.create( {
          googleId: profile.googleId,
          displayName: profile.displayName,
          email: profile.email[0].value,
          profileImage: profile.image[0].value
        })
      }

      done(null, user)
    } catch (error) {
      done(err, null)
    }

    return done(null, profile);

  }));

  module.exports = passport