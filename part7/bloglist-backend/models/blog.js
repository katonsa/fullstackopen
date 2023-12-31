const mongoose = require('mongoose');

const blogSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  author: String,
  url: {
    type: String,
    required: true,
  },
  likes: Number,
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  comments: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'BlogComment',
    },
  ],
});

blogSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    const obj = { ...returnedObject };
    obj.id = obj._id.toString();
    delete obj._id;
    delete obj.__v;

    return obj;
  },
});

module.exports = mongoose.model('Blog', blogSchema);
