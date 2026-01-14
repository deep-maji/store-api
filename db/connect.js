require('dotenv').config()
const mongoose = require('mongoose');

const connectDB = (url) => {
  return mongoose.connect(url);
}

const ATLAS_DBURL = process.env.ATLAS_DB_URL;
const main = async function () {
  await connectDB(ATLAS_DBURL).
    then(() => {
      console.log("DB Connected ....");
    })
    .catch((e) => {
      console.log("DB Connection failed ...", e.message);
      process.exit(1);
    });
};

module.exports = main
