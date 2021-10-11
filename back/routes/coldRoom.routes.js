const router = require('express').Router()
const coldRoomController = require('../controllers/coldRoom.controller')

// auth 
router.post('/createColdRoom', coldRoomController.createColdRoom)
router.get('/getColdRooms', coldRoomController.getColdRooms)
router.get('/getOfficineColdRooms', coldRoomController.getOfficineColdRooms)

module.exports = router