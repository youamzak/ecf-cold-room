const jwt = require("jsonwebtoken");
const UserModel = require("../models/user.model");
const bcrypt = require("bcrypt");
const maxAge = 3 * 86400 * 1000; //86400 = one day

const createToken = (id) => {
  return jwt.sign({ id }, process.env.TOKEN_SECRET, {
    expiresIn: maxAge,
  });
};

/** Create user */
module.exports.signUp = async (req, res) => {
  const { login, password, role} = req.body;

  await UserModel.create({ login, password, role})
    .then((docs) => {
      res.status(201).json(docs._id);
    })
    .catch((err) => res.status(400).json({ err }));
};

/** Update password */
module.exports.updatePassword = async (req, res) => {
  const { userId, password } = req.body;
  const salt = await bcrypt.genSalt();
  const encryptPsw = await bcrypt.hash(password, salt);
  await UserModel.findByIdAndUpdate(userId, { password: encryptPsw })
    .select("-password")
    .then((docs) => {
      res.status(201).json(docs);
    })
    .catch((err) => res.status(400).json({ err }));
};

/** Update password */
module.exports.getUser = async (req, res) => {

  await UserModel.find()
    .select("-password")
    .then((docs) => {
      res.status(201).json(docs);
    })
    .catch((err) => res.status(400).json({ err }));
};

/** Login */
module.exports.signIn = async (req, res) => {
  const { login, password } = req.body;

  try {
    const user = await UserModel.login(login, password);
    if (user) {
      const token = createToken(user._id);
      res.cookie("jwt", token, { httpOnly: true, maxAge });
      res.status(200).json(user);
    } else {
      res.status(400).send({ err });
    }
  } catch (error) {
    res.status(400).send({ err: error.message });
  }
};

/** Logout */
module.exports.signOut = async (req, res) => {
  res.cookie("jwt", "", { maxAge: 1 });
  res.status(200).json({ res: "Déconnecté" });
  //res.redirect("/");
};
