const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");

const officineSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Nom requis"],
      lowercase: true,
      unique: true,
    },
    address: {
      type: String,
      required: [true, "Adresse requise"],
      lowercase: true,
      max: 1024,
    },
    city: {
      type: String,
      required: [true, "Ville requise"],
      lowercase: true,
      max: 1024,
    },
    phone: {
      type: String,
      required: [true, "Téléphone requis"],
      unique: true,
      lowercase: true,
      max: 1024,
    },
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      required: [true, "Responsable requis"],
    },
    users: {
      type: [{ type: mongoose.Schema.Types.ObjectId, ref: "user" }],
      required: true,
    },
    coldRooms: {
      type: [{ type: mongoose.Schema.Types.ObjectId, ref: "coldRoom" }],
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

officineSchema.plugin(uniqueValidator, {
  message: "Erreur, {PATH} doit être unique.",
});

const OfficineModel = mongoose.model("officine", officineSchema);

module.exports = OfficineModel;
