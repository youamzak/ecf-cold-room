const jwt = require("jsonwebtoken");
const ColdRoomModel = require("../models/coldRoom.model");
const OfficineModel = require("../models/officine.model");

/** Add cold room  */
module.exports.createColdRoom = async (req, res) => {
  const { reference, officine } = req.body;

  await ColdRoomModel.create({ reference, officine })
    .then(async (docs) => {
      docs.officine = await OfficineModel.findById(docs.officine)
        .populate("owner", "-password")
        .populate("coldRooms");
      res.status(201).json(docs);
    })
    .catch((err) => res.status(400).json({ err }));
};

/** Get all cold rooms from the database */
module.exports.getColdRooms = async (req, res) => {
  await ColdRoomModel.find()
    .populate("officine")
    .lean()
    .exec()
    .then((docs) => {
      res.status(200).json(docs);
    })
    .catch((err) => res.status(400).json({ err }));
};

/** Get the cold rooms of the officine */
module.exports.getOfficineColdRooms = async (req, res) => {
  await ColdRoomModel.find({ officine: req.body.officine })
    .populate("officine")
    .lean()
    .exec()
    .then((docs) => {
      res.status(200).json(docs);
    })
    .catch((err) => res.status(400).json({ err }));
};
