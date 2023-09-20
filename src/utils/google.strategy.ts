import { User } from "@prisma/client";
import passport, { Profile } from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID ?? "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? "",
      callbackURL: "http://localhost:5000/google/callback",
    },
    function (accessToken: string, refreshToken: string, profile: Profile, cb) {
      console.log(
        "here",
        profile.emails !== undefined ? profile.emails[0].value : ""
      );
      return cb(null, profile);
      //   googleLoginOrSignUp({ googleId: profile.id }, function (err, user) {
      //     return cb(null, profile);
      //   });
    }
  )
);

passport.serializeUser(function (user, done) {
  done(null, user);
});

passport.deserializeUser(function (user: User, done) {
  done(null, user);
});
