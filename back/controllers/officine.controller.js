const jwt = require("jsonwebtoken");
const OfficineModel = require("../models/officine.model");

module.exports.addOfficine = async (req, res) => {
  const { name, address, city, phone, owner } = req.body;

  await OfficineModel.create({ name, address, city, phone, owner })
    .then((docs) => {
      res.status(201).json(docs);
    })
    .catch((err) => res.status(400).json({ err }));
};

module.exports.getOfficines = async (req, res) => {
  await OfficineModel.find()
    .populate("owner", "-password")
    .exec()
    .then((docs) => {
      res.status(200).json(docs);
    })
    .catch((err) => res.status(400).json({ err }));
};

module.exports.getOwnerOfficines = async (req, res) => {
  await OfficineModel.find({ owner: req.body.owner })
    .populate("owner", "-password")
    .exec()
    .then((docs) => {
      res.status(200).json(docs);
    })
    .catch((err) => res.status(400).json({ err }));
};
