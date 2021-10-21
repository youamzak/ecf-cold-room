const OfficineModel = require("../models/officine.model");
const UserModel = require("../models/user.model");
const ColdRoomModel = require("../models/coldRoom.model");

/** Create new officine */
module.exports.createOfficine = async (req, res) => {
  const { name, address, city, phone, owner } = req.body;

  await OfficineModel.create({ name, address, city, phone, owner })
    .then(async (docs) => {
      await UserModel.findByIdAndUpdate(
        owner,
        {
          $addToSet: {
            officine: docs._id,
          },
        },
        { new: true, runValidators: true }
      );

      res.status(201).json(docs);
    })
    .catch((err) => {
      res.status(400).json({ err });
    });
};

/** Add cold room to officine + associate the cold room model */
module.exports.addColdRoomToOfficine = async (req, res) => {
  const { officine, coldRoom } = req.body;

  await OfficineModel.findByIdAndUpdate(
    officine,
    {
      $addToSet: {
        coldRooms: coldRoom,
      },
    },
    { new: true, runValidators: true }
  )
    .then(async (docs) => {
      await ColdRoomModel.findByIdAndUpdate(
        coldRoom,
        {
          officine,
        },
        { new: true, runValidators: true }
      );
      res.status(201).json(docs);
    })
    .catch((err) => res.status(400).json({ err }));
};

/** Add user to officine + associate the user model */
module.exports.addUserToOfficine = async (req, res) => {
  const { officine, user } = req.body;

  await OfficineModel.findByIdAndUpdate(
    officine,
    {
      $addToSet: {
        users: user,
      },
    },
    { new: true, runValidators: true }
  )
    .then(async (docs) => {
      await UserModel.findByIdAndUpdate(
        user,
        {
          $addToSet: {
            officine: officine,
          },
        },
        { new: true, runValidators: true }
      );

      res.status(201).json(docs);
    })
    .catch((err) => res.status(400).json({ err }));
};

/** Get all officines from the database */
module.exports.getOfficines = async (req, res) => {
  await OfficineModel.find()
    .populate("owner", "-password")
    .lean()
    .exec()
    .then((docs) => {
      res.status(200).json(docs);
    })
    .catch((err) => res.status(400).json({ err }));
};

/** Get the officine of the owner */
module.exports.getOwnerOfficines = async (req, res) => {
  await OfficineModel.find({ owner: req.body.owner })
    .populate("owner", "-password")
    .exec()
    .then((docs) => {
      res.status(200).json(docs);
    })
    .catch((err) => res.status(400).json({ err }));
};
