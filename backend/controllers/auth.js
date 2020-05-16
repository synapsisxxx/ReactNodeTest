import passport from 'passport';
import FacebookStrategy from 'passport-facebook';
import GoogleStrategy from 'passport-google-oauth20';
import User from '../models/user';

import { facebook, google } from '../config';


const transformFacebookProfile = (profile) => ({
  oauth_id: profile.id,
  name: profile.name,
  avatar: profile.picture.data.url,
});


const transformGoogleProfile = (profile) => ({
  oauth_id: profile.id,
  name: profile.displayName,
  avatar: profile.image.url,
});


passport.use(new FacebookStrategy(facebook,
  
  async (accessToken, refreshToken, profile, done)
    
    => done(null, await createOrGetUserFromDatabase(transformFacebookProfile(profile._json)))
));


passport.use(new GoogleStrategy(google,
  async (accessToken, refreshToken, profile, done)
    => done(null, await createOrGetUserFromDatabase(transformGoogleProfile(profile._json)))
));

const createOrGetUserFromDatabase = async (userProfile) => {
  let user = await User.findOne({ 'oauth_id': userProfile.oauth_id }).exec();
  if (!user) {
    user = new User({
      oauth_id: userProfile.oauth_id,
      name: userProfile.name,
      avatar: userProfile.avatar,
    });
    await user.save();
  }
  return user;
};


passport.serializeUser((user, done) => done(null, user));


passport.deserializeUser((user, done) => done(null, user));

// Facebook
export const facebookLogin = passport.authenticate('facebook');
export const facebookMiddleware = passport.authenticate('facebook', { failureRedirect: '/auth/facebook' });

// Google
export const googleLogin = passport.authenticate('google', { scope: ['profile'] });
export const googleMiddleware = passport.authenticate('google', { failureRedirect: '/auth/google' });

// Callback
export const oauthCallback = async (req, res) => {
  res.redirect('OAuthLogin://login?user=' + JSON.stringify(req.user));
};