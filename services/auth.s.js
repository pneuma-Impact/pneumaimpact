const jwt = require("jsonwebtoken");
const secretOrKey = process.env.SECRET_OR_KEY;

//  move this somewhere else to be shared betwen login and authenticate strategy
var opts = {};
opts.issuer = "api.pneumaimpact.ng";
opts.audience = "pneumaimpact.ng";
opts.expiresIn = "1d";

module.exports = {
  generateToken: (payload) => {
    //Make sure payload is the ID of the user
    try {
      return jwt.sign({ sub: payload }, secretOrKey, opts);
    } catch (error) {
      throw new Error(error);
    }
  },
};
