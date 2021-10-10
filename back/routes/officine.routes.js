const router = require('express').Router()
const officineController = require('../controllers/officine.controller')

// auth 
router.post('/addOfficine', officineController.addOfficine)
router.get('/getOwnerOfficines', officineController.getOwnerOfficines)
router.get('/getOfficines', officineController.getOfficines)

module.exports = router