// @desc Middleware to log requests to console
const logger = (req, res, next) => {
  console.log('Hello middleware');
  next();
};

module.exports = logger;
