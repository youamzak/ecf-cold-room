const { isValidObjectId } = require("mongoose");

module.exports.validateObjectId = (value, helpers) => {
  if (isValidObjectId(value)) return value;
  else return helpers.error("any.invalid");
};

module.exports.validationError = (errorDetails) => {
  const nbErrorDetails = errorDetails.length;
  const err = {};

  for (let i = 0; i < nbErrorDetails; i++) {
    const { type, context } = errorDetails[i];
    switch (type) {
      case "string.empty":
        err[context.label] = "Le paramètre ne doit pas être vide";
        break;

      case "string.min":
        err[context.label] = "Nombre de caractères saisi insuffisant";
        break;

      case "string.max":
        err[context.label] = "Nombre de caractères maxi dépassé";
        break;

      case "any.required":
        err[context.label] = "Le paramètre est requis";
        break;

      case "any.invalid":
        err[context.label] = "Le paramètre est invalide";
        break;

      default:
        err[type] = context.label;
        break;
    }
  }
  return { err };
};
