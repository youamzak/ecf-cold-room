const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator');

const coldRoomSchema = new mongoose.Schema(
  {
    reference: {
      type: String,
      required: [true, "Identifiant requis"],
      lowercase: true,
      unique: true,
    },
    officine : { 
      type: mongoose.Schema.Types.ObjectId, 
      ref: "officine",
      required: [true, "Officine requise"],
     },
    temperatures: {
      type: [
        {
          measure: String, 
          timestamp: Number,
        },
      ],
      required: true,
    },
    hygrometry: {
      type: [
        {
          measure: String,
          timestamp: Number,
        },
      ],
      required: true,
    },
  },
  {
    timestamps: true
  }
)

coldRoomSchema.plugin(uniqueValidator, {message : "Erreur, {PATH} doit être unique."});

const ColdRoomModel = mongoose.model("coldRoom", coldRoomSchema)

module.exports = ColdRoomModel