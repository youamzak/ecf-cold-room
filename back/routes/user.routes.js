const router = require('express').Router()
const authController = require('../controllers/auth.controller')
const {loginValidationSchema, 
  registerValidationSchema,
  changePswValidationSchema,
  roleValidationSchema
} = require("../middleware/validations/auth.validation")
const { validationError } = require('../middleware/validations/utils.validation')
const joiValidator = require("express-joi-validation").createValidator({
  passError: true,
});
// joiValidator.body(registerValidationSchema),
router.post('/signUp',  authController.signUp)
router.post('/updatePassword', joiValidator.body(changePswValidationSchema), authController.updatePassword)
router.post('/getUser', joiValidator.body(roleValidationSchema), authController.getUser)
router.post('/signIn', joiValidator.body(loginValidationSchema), authController.signIn)
router.post('/signOut', authController.signOut)

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

module.exports = router