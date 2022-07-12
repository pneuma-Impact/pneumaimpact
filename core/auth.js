var JwtStrategy = require("passport-jwt").Strategy,
  ExtractJwt = require("passport-jwt").ExtractJwt;
var opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = process.env.SECRET_OR_KEY || "";
opts.issuer = "api.pneumaimpact.ng";
opts.audience = "pneumaimpact.ng";
const { User } = require("../models");

const authStrategy = new JwtStrategy(opts, async function (jwt_payload, done) {
  try {
    const user = await User.findById(jwt_payload.sub).populate("profile");
    if (!user) {
      return done(null, false, "Invalid user.");
    } else {
      return done(null, user);
    }
  } catch (error) {
    return done(error, false, "Invalid user");
  }
});

module.exports = authStrategy;
