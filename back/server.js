const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");
const userRoutes = require("./routes/user.routes");
const officineRoutes = require("./routes/officine.routes");
require("dotenv").config({ path: "./config/.env" });
require("./config/db");
const { requireAuth } = require("./middleware/auth.middleware");
const cors = require("cors");

const corsOptions = {
  origin: true,//process.env.CLIENT_URL,
  credentials: true,
  allowedHeaders: ["sessionId", "Content-Type"],
  exposedHeaders: ["sessionId"],
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  preflightContinue: false,
};

app.use(cors(corsOptions));

// parsers
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// jwt
app.get("/jwtid", requireAuth, (req, res) => {
  if (res.locals.user) {
    res.locals.user.password = null
    res.status(200).send(res.locals.user);
  }
  else res.status(200).send(null);
});

// routes
app.use("/api/user", userRoutes);
app.use("/api/officine", officineRoutes);
//server
app.listen(process.env.PORT, () => {
  console.log(`Listening on the port ${process.env.PORT}`);
});
