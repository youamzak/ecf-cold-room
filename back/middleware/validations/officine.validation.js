const { validateObjectId } = require("./utils.validation");
const Joi = require("joi");

module.exports.createOfficineValidationSchema = Joi.object({
  name: Joi.string().required(),
  address: Joi.string().required(),
  city: Joi.string().required(),
  phone: Joi.string().required(),
  owner: Joi.string().custom(validateObjectId).required(),
});

module.exports.addColdRoomValidationSchema = Joi.object({
  officine: Joi.string().custom(validateObjectId).required(),
  coldRoom: Joi.string().custom(validateObjectId).required(),
});

module.exports.addUserValidationSchema = Joi.object({
  officine: Joi.string().custom(validateObjectId).required(),
  user: Joi.string().custom(validateObjectId).required(),
});

module.exports.getOwnerValidationSchema = Joi.object({
  owner: Joi.string().custom(validateObjectId).required(),
});
