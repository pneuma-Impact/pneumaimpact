const { authRoutes, postsRoutes } = require("../routes");
module.exports = (app, appVersion) => {
  app.use(`/${appVersion}/api/auth`, authRoutes);
  app.use(`/${appVersion}/api/posts`, postsRoutes);

  app.use((req, res) => {
    return res.status(404).json({ message: "Invalid enpoint" });
  });
};
