const User = require('../models/User');

const userMiddleware = async (req, res, next) => {
  if (req.session.user) {
    req.user = await User.findById(req.session.user._id);
  }

  next();
};

module.exports = userMiddleware;
