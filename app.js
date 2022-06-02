require("dotenv").config();
const express = require("express");
const app = express();
const PORT = process.env.PORT || 3000;
const cors = require("cors");

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
const passport = require("passport");
const authStrategy = require("./core/auth");

passport.use(authStrategy);

const appVersion = "v1";

const { authRoutes, postsRoutes } = require("./routes");

app.use(`/${appVersion}/api/auth`, authRoutes);
app.use(`/${appVersion}/api/posts`, postsRoutes);

app.use((req, res) => {
  return res.status(404).json({ message: "Invalid enpoint" });
});

app.listen(PORT, () => {
  console.log(`Server is listening on port: ${PORT}`);
});
