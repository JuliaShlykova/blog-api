const express = require('express');
const router  = express.Router();
const {
  setComment,
  deleteComment
} = require('../controllers/commentController');
const { verifyToken } = require('../token-functions');

router.get('/', (req, res) => {
  console.log('comment page');
  res.end();
});

router.post('/create', setComment);

router.post('/:id/delete',verifyToken, deleteComment);

module.exports = router;