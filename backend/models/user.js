import mongoose, { Schema } from 'mongoose';


export const schema = new Schema({
  oauth_id: {
    type: String,
    unique: true,
    index: true,
  },
  name: String,
  avatar: String,
});

export default mongoose.model('User', schema);