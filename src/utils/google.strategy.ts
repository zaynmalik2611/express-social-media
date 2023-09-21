import { User } from "@prisma/client";
import passport from "passport";
import {
  Strategy as GoogleStrategy,
  Profile,
  VerifyCallback,
} from "passport-google-oauth20";
import { googleLoginOrSignUp } from "../services/auth.service";

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID ?? "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? "",
      callbackURL: "http://localhost:5000/auth/google/callback",
    },
    function (
      accessToken: string,
      refreshToken: string,
      profile: Profile,
      cb: VerifyCallback
    ) {
      googleLoginOrSignUp(profile, cb);
    }
  )
);

passport.serializeUser(function (user, done) {
  done(null, user);
});

passport.deserializeUser(function (user: User, done) {
  done(null, user);
});
