const express = require('express');
const router = express.Router();
const {
  getPublishedPosts,
  getAllPosts,
  setPost,
  getPost,
  updatePost,
  deletePost
} = require('../controllers/postController');

const { verifyToken } = require('../token-functions');

router.get('/', getPublishedPosts);

router.post('/create', verifyToken, setPost);

router.get('/allposts', verifyToken, getAllPosts);

router.get('/:id', getPost);

router.post('/:id/update', verifyToken, updatePost);

router.post('/:id/delete', verifyToken, deletePost);

module.exports = router;