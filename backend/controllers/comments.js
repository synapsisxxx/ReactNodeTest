import Comment from '../models/comment';

const userRelation = {
  path: 'user',
  select: ['name', 'avatar'],
  model: 'User',
};

export const list = async (req, res, next) => {
  const comments = await Comment.find()
    .sort({ 'created': -1 })
    .populate(userRelation)
    .exec();

  res.json({
    comments
  });
};

export const create = async (req, res, next) => {
  const { user_id, content } = req.body;
  
  
  
  
  
  
  const comment = await new Comment({
    user: user_id,
    content: content,
    created: new Date,
  }).save();

  res.json({
    comment: await Comment.findById(comment._id)
      .populate(userRelation)
      .exec()
  });
};