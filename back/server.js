const express = require("express");
const app = express();
const path = require('path');
const cookieParser = require("cookie-parser");
const cors = require("cors");
const helmet = require("helmet")
const { requireAuth } = require("./middleware/auth.middleware");
const userRoutes = require("./routes/user.routes");
const officineRoutes = require("./routes/officine.routes");
const coldRoomRoutes = require("./routes/coldRoom.routes");

require("dotenv").config({ path: "./config/.env" });
require("./config/db");

const corsOptions = {
  origin: true,//process.env.CLIENT_URL,
  credentials: true,
  allowedHeaders: ["sessionId", "Content-Type"],
  exposedHeaders: ["sessionId"],
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  preflightContinue: false,
};

app.use(express.static(path.join(__dirname, '../client/build')))
app.use(helmet());
app.use(cors(corsOptions));

// parsers
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// jwt
app.get("/jwtid", requireAuth, (req, res) => {
  if (res.locals.user) {
    res.locals.user.password = null
    res.status(200).json(res.locals.user);
  }
  else res.status(400).json({err: "no token"});
});

// routes
app.use("/api/user", userRoutes);
app.use("/api/officine", officineRoutes);
app.use("/api/coldRoom", coldRoomRoutes);

//server
app.listen(process.env.PORT, () => {
  console.log(`Listening on the port ${process.env.PORT}`);
});
