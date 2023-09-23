const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    minlength: [3, 'Username must be at least 3 characters long'],
    required: [true, 'Username is required'],
    unique: true,
    uniqueCaseInsensitive: true,
  },
  name: String,
  passwordHash: String,
  blogs: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Blog',
    },
  ],
});

userSchema.plugin(uniqueValidator, { message: '{PATH} must be unique' });

userSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    const obj = { ...returnedObject };
    obj.id = obj._id.toString();
    delete obj._id;
    delete obj.__v;
    delete obj.passwordHash;

    return obj;
  },
});

const User = mongoose.model('User', userSchema);

module.exports = User;
