const jwt = require("jsonwebtoken");
const OfficineModel = require("../models/officine.model");
const UserModel = require("../models/user.model");
const ColdRoomModel = require("../models/coldRoom.model");

const officineErrors = (err) => {
  const errorMessage = {};
  if(err && err.errors) {

    if (err.errors.name) errorMessage.name = err.errors.name.message;
    if (err.errors.address) errorMessage.address = err.errors.address.message;
    if (err.errors.city) errorMessage.city = err.errors.city.message;
    if (err.errors.phone) errorMessage.phone = err.errors.phone.message;
    if (err.errors.owner) errorMessage.owner = err.errors.owner.message;
    if (err.errors.users) errorMessage.users = err.errors.users.message;
    if (err.errors.coldRooms) errorMessage.coldRooms = err.errors.coldRooms.message;
    return errorMessage
  }

  return err.message
}

/** Add new officine */
module.exports.createOfficine = async (req, res) => {
  const { name, address, city, phone, owner } = req.body;

  await OfficineModel.create({ name, address, city, phone, owner })
    .then((docs) => {
      res.status(201).json(docs);
    })
    .catch((err) => {
      res.status(400).json({ err : officineErrors(err) });
    });
};

/** Add cold room to officine */
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
    .catch((err) => res.status(400).json({ err : officineErrors(err) }));
};

/** Add user to officine */
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
            officines: officine,
          },
        },
        { new: true, runValidators: true }
      );

      res.status(201).json(docs);
    })
    .catch((err) => res.status(400).json({ err : officineErrors(err)  }));
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
    .catch((err) => res.status(400).json({ err : officineErrors(err)  }));
};

/** Get the officine of the owner */
module.exports.getOwnerOfficines = async (req, res) => {
  await OfficineModel.find({ owner: req.body.owner })
    .populate("owner", "-password")
    .exec()
    .then((docs) => {
      res.status(200).json(docs);
    })
    .catch((err) => res.status(400).json({ err : officineErrors(err)  }));
};
