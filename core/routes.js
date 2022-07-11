const { authRoutes, postsRoutes, profileRoutes } = require("../routes");
module.exports = (app, appVersion) => {
  app.use(`/${appVersion}/api/auth`, authRoutes);
  app.use(`/${appVersion}/api/posts`, postsRoutes);
  app.use(`/${appVersion}/api/profile`, profileRoutes);

  app.use((req, res) => {
    return res.status(404).json({ message: "Invalid enpoint" });
  });
};
