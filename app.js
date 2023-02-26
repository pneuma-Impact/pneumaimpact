if (process.env.NODE_ENV === "testing") {
  require("dotenv").config({ path: "./.env.testing" });
} else {
  require("dotenv").config();
}

const express = require("express");
const app = express();
const PORT = process.env.PORT || 3000;
const cors = require("cors");
const path = require("path");

// App configuration
app.use(require("helmet")());
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
const passport = require("passport");

app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Core Files
const authStrategy = require("./core/auth");
const appRoutes = require("./core/routes");

passport.use(authStrategy);

const appVersion = "v1";

appRoutes(app, appVersion);

app.listen(PORT, () => {
  console.log(`Server is listening on port: ${PORT}`);
});

module.exports = { app };
