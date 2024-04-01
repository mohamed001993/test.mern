const JwtStrategy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;
const passport = require("passport");
const user = require("../Model/User");

const opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = process.env.secretKey;

passport.use(
  new JwtStrategy(opts, async (jwt_payload, done) => {
    try {
      const User = await user.findOne({ _id: jwt_payload._id }).select(
        "-password"
      );
      if (User) {
        return done(null, User);
      } else {
        return done(null, false);
      }
    } catch (err) {
      return done(err, false);
    }
  })
);

const isAuth = () => passport.authenticate("jwt", { session: false });

module.exports = isAuth;