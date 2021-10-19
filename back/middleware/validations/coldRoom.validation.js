const { validateObjectId } = require("./utils.validation");
const Joi = require("joi");

module.exports.createColdRoomValidationSchema = Joi.object({
  reference: Joi.string().required(),
  officine: Joi.string().custom(validateObjectId).required(),
});

module.exports.addMeasureValidationSchema = Joi.object({
  upload: Joi.string(),
  coldRoom: Joi.string().custom(validateObjectId).required(),
});

module.exports.getOfficineValidationSchema = Joi.object({
  officine: Joi.string().custom(validateObjectId).required(),
});
