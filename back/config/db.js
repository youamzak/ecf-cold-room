const mongoose = require('mongoose')
const url = `mongodb://${process.env.DB_USER_LOGIN}:${process.env.DB_USER_PASS}@${process.env.DB_HOST}/ecf-coldroom?authSource=admin&readPreference=primary&appname=MongoDB%20Compass&ssl=false`
mongoose
  .connect(url)
  .then(() => console.log('Connected to MongoDb'))
  .catch((err) => console.log('Failed to connect to MongoDb', err))