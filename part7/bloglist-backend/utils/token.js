const jwt = require('jsonwebtoken');
const config = require("./config");

const generateToken = (userForToken) => jwt.sign(userForToken, config.JWT_SECRET, { expiresIn: 60 * 60 });

module.exports = {
  generateToken,
};
