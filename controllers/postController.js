const Post = require('../models/Post');
const Comment = require('../models/Comment');
const { body, validationResult } = require('express-validator');

exports.getPublishedPosts = async (req, res, next) => {
  try {
    const posts = await Post.find({published: true}).select('title text updatedAt formatted_timestamp').sort('-updatedAt');
    return res.status(200).json(posts);
  } catch(err) {
    return res.sendStatus(503);
  }

}

exports.getAllPosts = async (req, res, next) => {
  try {
    const posts = await Post.find({}).sort({updatedAt: -1});
    return res.status(200).json(posts);
  } catch(err) {
    return res.sendStatus(503);
  }
}

exports.setPost = [
  body('title')
    .trim()
    .isLength({min: 1})
    .withMessage('Title must be specified')
    .escape()
    .isLength({max: 120})
    .withMessage('Title must not exceed 140 characters'),
  body('text')
    .trim()
    .isLength({min: 1})
    .withMessage('Post text must be specified')
    .escape(),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({"errors": errors.array()});
    }
    const post = new Post({
      title: req.body.title,
      text: req.body.text,
      published: req.body.published
    })
    try {
      const createdPost = await post.save();
      return res.status(201).json({"post id": createdPost.id})
    } catch(err) {
      return res.sendStatus(503);
    }
  }
]

exports.getPost = async (req, res, next) => {
  try{
    const [post, comments] = await Promise.all([Post.findById(req.params.id), Comment.find({post: req.params.id}).select('-post').sort({createdAt:1})]);
    return res.status(200).json({post, comments});
  } catch(err) {
    return res.sendStatus(404);
  }
}

exports.updatePost = [
  body('title')
    .trim()
    .isLength({min: 1})
    .withMessage('Title must be specified')
    .escape()
    .isLength({max: 120})
    .withMessage('Title must not exceed 140 characters'),
  body('text')
    .trim()
    .isLength({min: 1})
    .withMessage('Post text must be specified')
    .escape(),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({"errors": errors.array()});
    }
    const post = new Post({
      title: req.body.title,
      text: req.body.text,
      published: req.body.published,
      _id: req.params.id
    })
    try {
      await Post.findByIdAndUpdate(req.params.id, post);
      return res.sendStatus(201);
    } catch(err) {
      return res.sendStatus(503);
    }
  }
]

exports.deletePost = async (req, res, next) => {
  try {
    await Post.findByIdAndRemove(req.params.id);
    return res.status(200).send('Deleted successfully');
  } catch(err) {
    return res.sendStatus(503);
  }
}