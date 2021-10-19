const multer = require('multer')

const fileStorageEngine = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, './uploads')
  },
  filename: (req, file, cb ) => {
    cb(null, file.originalname)
  }
})

const fileFilter = (req, file, cb) => {
  const excludeMimeType = [
    'text/csv',
  ]

  if (excludeMimeType.includes(file.mimetype)) { // checking the MIME type of the uploaded file
      cb(null, true);
  } else {
      cb(null, false);
  }
}

const upload = multer({
  fileFilter,
  storage : fileStorageEngine
})

module.exports = upload