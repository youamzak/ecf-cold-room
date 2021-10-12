const router = require("express").Router();
const coldRoomController = require("../controllers/coldRoom.controller");
const {
  createColdRoomValidationSchema,
  getOfficineValidationSchema,
} = require("../middleware/validations/coldRoom.validation");
const { validationError } = require('../middleware/validations/utils.validation')
const joiValidator = require("express-joi-validation").createValidator({
  passError: true,
});

router.post(
  "/createColdRoom",
  joiValidator.body(createColdRoomValidationSchema),
  coldRoomController.createColdRoom
);
router.get(
  "/getColdRooms",
  joiValidator.body(getOfficineValidationSchema),
  coldRoomController.getColdRooms
);
router.get("/getOfficineColdRooms", coldRoomController.getOfficineColdRooms);

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
