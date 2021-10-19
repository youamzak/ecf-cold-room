const fs = require("fs");
const mongoose = require("mongoose");
const ColdRoomModel = require("../models/coldRoom.model");
const OfficineModel = require("../models/officine.model");
const csv = require("csvtojson");

const moveFile = (oldFile, newFile) => {
  fs.rename(oldFile, newFile, (err, docs) => {
    if (!err) return "done";
    else return err.toString();
  });
};

/** Create cold room  */
module.exports.createColdRoom = async (req, res) => {
  const { reference, officine } = req.body;

  await ColdRoomModel.create({ reference, officine })
    .then(async (docs) => {
      await OfficineModel.findByIdAndUpdate(
        officine,
        {
          $addToSet: {
            coldRooms: docs._id,
          },
        },
        { new: true, runValidators: true }
      );
      docs.officine = await OfficineModel.findById(docs.officine)
        .populate("owner", "-password")
        .populate("coldRooms");
      res.status(201).json(docs);
    })
    .catch((err) => res.status(400).json({ err }));
};

/** Add measurement */
module.exports.addMesurementToColdroom = async (req, res) => {
  const { coldRoom } = req.body;
  const arrTemperature = [];
  const arrHygrometry = [];
  const path = `./uploads/${coldRoom}`;
  const fileName = req.file.filename;
  const fileNamePath = `./uploads/${fileName}`;

  await csv()
    .fromFile(fileNamePath)
    .then(async (jsonObj) => {
      const columns = "id;timestamp;temperature;hygrometry";

      jsonObj.forEach((element) => {
        arrTemperature.push({
          id: element[columns].split(";")[0],
          timestamp: element[columns].split(";")[1],
          measure: element[columns].split(";")[2],
        });
        arrHygrometry.push({
          id: element[columns].split(";")[0],
          timestamp: element[columns].split(";")[1],
          measure: element[columns].split(";")[3],
        });
      });

      await ColdRoomModel.findByIdAndUpdate(
        coldRoom,
        {
          $addToSet: {
            measures: {
              isValid: false,
              uploadDay: arrTemperature[0].timestamp,
              temperatures: arrTemperature,
              hygrometry: arrHygrometry,
            },
          },
        },
        { new: true, runValidators: true }
      )
        .then(async (docs) => {
          return res.status(200).json({ docs });
        })
        .catch((err) => res.status(400).json({ err }));
    });
};

/** Set the validation information */
module.exports.switchValidationDayColdroom = async (req, res) => {
  const { idMeasurement } = req.body;
  const newId = mongoose.Types.ObjectId(idMeasurement.toString());
 
  await ColdRoomModel.find(
    { "measures._id": newId },
    "-measures.temperatures -measures.hygrometry"
  )
    .then((doc) => {
      for (let index = 0; index < doc[0].measures.length; index++) {
        if (doc[0].measures[index]._id.toString() === idMeasurement) {
          doc[0].measures[index].isValid = !doc[0].measures[index].isValid;

          doc[0].save();
          return res.status(200).json({ doc: doc[0].measures[index] });
        }
      }

      res.status(200).json({doc: null})
    })
    .catch((err) => console.log(err));
};

/** Get measurement */
module.exports.getColdRoomMeasurement = async (req, res) => {
  const { reference, uploadDay } = req.body;
  await ColdRoomModel.findOne({
    reference,
  })
    .then((docs) => {
      res.status(200).json(
        docs.measures.filter((el) => {
          return el.uploadDay === uploadDay;
        })
      );
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
