const { isValidObjectId } = require("mongoose");

module.exports.validateObjectId = (value, helpers) => {
  if (isValidObjectId(value)) return value;
  else return helpers.error("any.invalid");
};

module.exports.validationError = (errorDetails) => {
  const nbErrorDetails = errorDetails.length;
  const errorMessages = {};

  for (let i = 0; i < nbErrorDetails; i++) {
    const { type, context } = errorDetails[i];
    switch (type) {
      case "string.empty":
        errorMessages[context.label] = "Le paramètre ne doit pas être vide";
        break;

      case "string.min":
        errorMessages[context.label] = "Nombre de caractères saisi insuffisant";
        break;

      case "string.max":
        errorMessages[context.label] = "Nombre de caractères maxi dépassé";
        break;

      case "any.required":
        errorMessages[context.label] = "Le paramètre est requis";
        break;

      case "any.invalid":
        errorMessages[context.label] = "Le paramètre est invalide";
        break;

      default:
        errorMessages[type] = context.label;
        break;
    }
  }
  return { errorMessages };
};
