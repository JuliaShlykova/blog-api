const { body, validationResult } = require('express-validator');

const Comment = require('../models/Comment');

exports.setComment = [
  body('username')
    .trim()
    .isLength({min: 1})
    .withMessage('username must be specified')
    .isLength({max: 256})
    .withMessage('username mustn\'t exceed 256 characters')
    .escape(),
  body('text')
    .trim()
    .isLength({min: 1})
    .withMessage('comment must be specified')
    .isLength({max: 5000})
    .withMessage('comment mustn\'t exceed 5000 characters')
    .escape(),
  async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({"errors": errors.array()});
    }
    const comment = new Comment({
      username: req.body.username,
      text: req.body.text,
      createdAt: Date.now(),
      post: req.body.postid
    })
    try {
      const newComment = await comment.save();
      return res.status(200).json(newComment);
    } catch(err) {
      return res.sendStatus(503);
    }
  }
]

exports.deleteComment = async (req, res) => {
  try {
    await Comment.findByIdAndRemove(req.params.id);
    return res.status(200).send('Deleted successfully');
  } catch(err) {
    return res.sendStatus(503);
  }
}