const {validateObjectId} = require("./utils.validation")
const Joi = require("joi");

module.exports.loginValidationSchema = Joi.object({
  login: Joi.string().required(),
  password: Joi.string().min(8).max(1024).required(),
});

module.exports.registerValidationSchema = Joi.object({
  login: Joi.string().required(),
  password: Joi.string().required(),
  role: Joi.string().required(),
  officines: Joi.array().items(Joi.string().custom(validateObjectId)),
});
