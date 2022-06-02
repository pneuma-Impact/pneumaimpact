const mongoose = require("mongoose");
const DB_URL = process.env.DB_URL || "mongodb://localhost:27017/pneumaimpact";
const slug = require("mongoose-slug-generator");
mongoose.connect(DB_URL);

mongoose.connection.on("connected", () => {
  console.log("Database connected");
});

mongoose.connection.on("error", (err) => {
  console.error(err);
});

mongoose.plugin(slug);
module.exports = mongoose;
