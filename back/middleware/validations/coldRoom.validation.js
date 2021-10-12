const { validateObjectId } = require("./utils.validation");
const Joi = require("joi");

module.exports.createColdRoomValidationSchema = Joi.object({
  reference: Joi.string().required(),
  owner: Joi.string().custom(validateObjectId).required(),
});

module.exports.getOfficineValidationSchema = Joi.object({
  owner: Joi.string().custom(validateObjectId).required(),
});
