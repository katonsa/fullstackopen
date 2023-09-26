const mongoose = require('mongoose');

const blogComment = new mongoose.Schema({
  content: {
    type: String,
    required: true,
  },
  blog: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Blog',
  },
});

blogComment.set('toJSON', {
  transform: (document, returnedObject) => {
    const obj = { ...returnedObject };
    obj.id = obj._id.toString();
    delete obj._id;
    delete obj.__v;

    return obj;
  },
});

module.exports = mongoose.model('BlogComment', blogComment);
