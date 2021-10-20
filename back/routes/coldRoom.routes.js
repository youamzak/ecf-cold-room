const router = require("express").Router();
const upload = require("../middleware/upload.middleware");
const coldRoomController = require("../controllers/coldRoom.controller");
const {
  createColdRoomValidationSchema,
  getOfficineValidationSchema,
  addMeasureValidationSchema,
} = require("../middleware/validations/coldRoom.validation");

const {
  validationError,
} = require("../middleware/validations/utils.validation");

const joiValidator = require("express-joi-validation").createValidator({
  passError: true,
});

router.post(
  "/createColdRoom",
  joiValidator.body(createColdRoomValidationSchema),
  coldRoomController.createColdRoom
);

router.post(
  "/addMeasure",
  upload.single("upload"),
  coldRoomController.addMesurementToColdroom
);

router.post(
  "/getColdRoomMeasurement",
  coldRoomController.getColdRoomMeasurement
);

router.post(
  "/switchValidationDayColdroom",
  coldRoomController.switchValidationDayColdroom
);

router.get(
  "/getColdRooms",
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
