require("dotenv").config();
const express = require("express");
const app = express();
const PORT = process.env.PORT || 3000;
const cors = require("cors");

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const appVersion = "v1";

const { authRoutes } = require("./routes");

app.use(`/${appVersion}/api/auth`, authRoutes);

app.listen(PORT, () => {
  console.log(`Server is listening on port: ${PORT}`);
});
