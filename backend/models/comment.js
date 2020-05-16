import mongoose, { Schema } from 'mongoose';


export const schema = new Schema({
  
  user: {
    type: Schema.ObjectId,
    ref: 'User',
  },
  content: String,
  created: Date
});


export default mongoose.model('Comment', schema);