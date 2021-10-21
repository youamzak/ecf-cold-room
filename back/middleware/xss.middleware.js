const traverse = require('traverse')
const xss = require('xss')

/**
 * Body Xss function:
 * - protect the body of the request against xss
 */
 module.exports.bodyXss = (req, res, next) => {
  if (!req.body) return next();
  traverse(req.body).forEach(function (x) {
    this.update(xss(x));
  });
  next();
};