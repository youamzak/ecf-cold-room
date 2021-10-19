const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const uniqueValidator = require("mongoose-unique-validator");

const userSchema = new mongoose.Schema(
  {
    login: {
      type: String,
      required: [true, "Identifiant requis"],
      lowercase: true,
      unique: true,
    },
    password: {
      type: String,
      required: [true, "Mot de passe requis"],
      minLength: [8, "Longueur minimum 8 caractères"],
      max: 1024,
    },
    role: {
      type: String,
      enum : ["administrateur", "technicien", "officine"],
      default : "officine",
      required: [true, "Role requis"],
    },
    officine: {
      type: [{ type: mongoose.Schema.Types.ObjectId, ref: "officine" }],
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

// Encryption of the password before saving into the DB
userSchema.pre("save", async function (next) {
  const salt = await bcrypt.genSalt();
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

userSchema.statics.login = async function (login, password) {
  const user = await this.findOne({ login });

  if (user) {
    const auth = await bcrypt.compare(password, user.password);
    if (auth) {
      user.password = undefined;
      return user;
    }
    throw Error("Mot de passe incorrect");
  }
  throw Error("Identifiant incorrect");
};

userSchema.plugin(uniqueValidator, {
  message: "Erreur, {PATH} doit être unique.",
});

const UserModel = mongoose.model("user", userSchema);

module.exports = UserModel;
