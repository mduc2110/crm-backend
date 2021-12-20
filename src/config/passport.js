import JwtStrategy from "passport-jwt/lib/strategy";
import { ExtractJwt } from "passport-jwt/lib";

const opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = process.env.TOKEN_SECRET;

export default (passport) => {
   passport.use(
      new JwtStrategy(opts, (jwt_payload, done) => {
         console.log(jwt_payload);
         console.log("---");
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
