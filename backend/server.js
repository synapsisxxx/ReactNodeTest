import express from 'express';
import bodyParser from 'body-parser';
import passport from 'passport';
import mongoose from 'mongoose';
import {
  facebookLogin,
  facebookMiddleware,
  googleLogin,
  googleMiddleware,
  oauthCallback,
} from './controllers/auth';
import { list, create } from './controllers/comments';


mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/react-native-comments');

const app = express();
app.use(bodyParser.json());

app.use(passport.initialize());
app.use(passport.session());


app.get('/auth/facebook', facebookLogin);
app.get('/auth/google', googleLogin);
app.get('/auth/facebook/callback', facebookMiddleware, oauthCallback);
app.get('/auth/google/callback', googleMiddleware, oauthCallback);


app.route('/comments')
  .get(list)
  .put(create);

const server = app.listen(3000, () => {
  const { address, port } = server.address();
  console.log(`Listening at http://${address}:${port}`);
});