const mongoose = require('mongoose');
const { DateTime } = require('luxon');

const Schema = mongoose.Schema;

const commentSchema = new Schema({
  username: {type: String, required: true},
  text: {type: String, required: true},
  createdAt: {type: Date, required: true},
  post: {type: Schema.Types.ObjectId, ref: 'Post'}
}, {
  toJSON: {virtuals: true}
});

commentSchema.virtual('formatted_timestamp').get(function(){
  return DateTime.fromJSDate(this.createdAt).toLocaleString(DateTime.DATETIME_MED);
})

module.exports = mongoose.model('Comment', commentSchema );