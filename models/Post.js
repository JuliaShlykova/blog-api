const mongoose = require('mongoose');
const { DateTime } = require('luxon');

const Schema = mongoose.Schema;

const postSchema = new Schema({
  title: {type: String, required: true},
  text: {type: String, required: true},
  published: {type: Boolean, required: true}
}, {
  timestamps: true,
  toJSON: {virtuals: true}
});

postSchema.virtual('formatted_timestamp').get(function(){
  return DateTime.fromJSDate(this.updatedAt).toLocaleString(DateTime.DATETIME_MED);
})

module.exports = mongoose.model('Post', postSchema );