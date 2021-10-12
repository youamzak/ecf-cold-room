const router = require("express").Router();
const officineController = require("../controllers/officine.controller");
const {
  createOfficineValidationSchema,
  addColdRoomValidationSchema,
  addUserValidationSchema,
  getOwnerValidationSchema,
} = require("../middleware/validations/officine.validation");
const { validationError } = require('../middleware/validations/utils.validation')
const joiValidator = require("express-joi-validation").createValidator({
  passError: true,
});

router.post(
  "/createOfficine",
  joiValidator.body(createOfficineValidationSchema),
  officineController.createOfficine
);
router.post(
  "/addColdRoomToOfficine",
  joiValidator.body(addColdRoomValidationSchema),
  officineController.addColdRoomToOfficine
);
router.post(
  "/addUserToOfficine",
  joiValidator.body(addUserValidationSchema),
  officineController.addUserToOfficine
);
router.get(
  "/getOwnerOfficines",
  joiValidator.body(getOwnerValidationSchema),
  officineController.getOwnerOfficines
);
router.get("/getOfficines", officineController.getOfficines);

// Validation route
router.use((err, req, res, next) => {
  if (err && err.error && err.error.details) {
    // we had a joi error, let's return a custom 400 json response
    return res.status(400).json(validationError(err.error.details));
  } else if (err) {
    // pass on to another error handler
    next(err);
  } else next();
});

module.exports = router;
