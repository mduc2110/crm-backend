import JwtStrategy from "passport-jwt/lib/strategy";
import { ExtractJwt } from "passport-jwt/lib";
import config from "../config";
const opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = config.token_secret;

export default (passport) => {
   passport.use(
      new JwtStrategy(opts, (jwt_payload, done) => {
         done(null, jwt_payload);
         // User.findOne({ id: 1 }, function (err, user) {
         //    if (err) {
         //       return done(err, false);
         //    }
         //    if (user) {
         //       return done(null, user);
         //    } else {
         //       return done(null, false);
         //       // or you could create a new account
         //    }
         // });
      })
   );
};
