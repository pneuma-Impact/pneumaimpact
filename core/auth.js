var JwtStrategy = require("passport-jwt").Strategy,
  ExtractJwt = require("passport-jwt").ExtractJwt;
var opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = process.env.SECRET_OR_KEY || "";
opts.issuer = "api.pneumaimpact.ng";
opts.audience = "pneumaimpact.ng";
const { User } = require("../models");

const authStrategy = new JwtStrategy(opts, function (jwt_payload, done) {
  User.findOne({ id: jwt_payload.sub }, function (err, user) {
    if (err) {
      return done(err, false, "Invalid user");
    }
    if (user) {
      return done(null, user);
    } else {
      return done(null, false, "You are not allowed");
      // or you could create a new account
    }
  });
});

module.exports = authStrategy;
