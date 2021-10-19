const jwt = require("jsonwebtoken");
const UserModel = require("../models/user.model");

module.exports.checkUser = (req, res, next) => {
  const token = req.cookies.jwt;

  if (token) {
    jwt.verify(token, process.env.TOKEN_SECRET, async (err, decodedToken) => {
      if (err) {
        res.locals.user = null;
        res.cookie("jwt", "", { maxAge: 1 });
        return res.status(401).json("Utilisateur non autorisé");
      } else {
        let user = await UserModel.findById(decodedToken.id);
        res.locals.user = user;
        next();
        return req;
      }
    });
  } else {
    res.locals.user = null;
    return res.status(401).json("Pas de token");
  }
};

module.exports.requireAuth = (req, res, next) => {
  const token = req.cookies.jwt;

  if (token) {
    jwt.verify(token, process.env.TOKEN_SECRET, async (err, decodedToken) => {
      if (err) {
        console.log(err);
      } else {
        let user = await UserModel.findById(decodedToken.id)
          .populate({
            path: "officine",
            populate: { path: "coldRooms", model:"coldRoom" },
          })
          .exec();
        res.locals.user = user;
        next();
      }
    });
  } else {
    console.log("No token");
    next();
  }
};
