const router = require('express').Router()
const upload = require('../middleware/upload.middleware')
const uploadController = require('../controllers/upload.controller')
const ProjectModel = require("../models/project.model");
const { isValidObjectId } = require("mongoose");

router.param("id", async (req, res, next, id) => {
  if (isValidObjectId(id)){
    await ProjectModel.findById(id)
    .then((docs) => {
      if(!docs)
        return res.status(400).json("Id doesn't exist")
      next()
    })
    .catch(err=>res.status(400).json({err}))
  }else{
    return res.status(400).json("Id incorrect");
  }
});

router.post('/single/:id', upload.single('upload'), uploadController.single)

module.exports = router