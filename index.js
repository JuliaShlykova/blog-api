if (process.env.NODE_ENV!=='production') {
  require('dotenv').config();
}
const express = require('express');
const cors = require('cors');
const compression = require('compression');
const rateLimit = require('express-rate-limit');
const helmet = require('helmet');

const postRouter = require('./routes/post');
const adminRouter = require('./routes/admin');
const commentRouter = require('./routes/comment');

const app = express();

const dbConnect = require('./db-connect');
dbConnect();

app.use(cors({
  'origin': '*'
}));
app.use(helmet());
app.use(compression());
app.use(rateLimit({
  widnowMs: 1*60*1000,
  max: 40
}));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));


app.use('/post', postRouter);
app.use('/admin', adminRouter);
app.use('/comment', commentRouter);

app.use((req, res) => {
  res.sendStatus(404);
})

app.use((err, req, res) => {
  res.sendStatus(err.status||500);
})

app.listen(5000, () => {
  console.log('server is listening on port 5000');
})