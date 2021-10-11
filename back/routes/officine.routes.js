const router = require('express').Router()
const officineController = require('../controllers/officine.controller')

// auth 
router.post('/createOfficine', officineController.createOfficine)
router.post('/addColdRoomToOfficine', officineController.addColdRoomToOfficine)
router.post('/addUserToOfficine', officineController.addUserToOfficine)
router.get('/getOwnerOfficines', officineController.getOwnerOfficines)
router.get('/getOfficines', officineController.getOfficines)

module.exports = router