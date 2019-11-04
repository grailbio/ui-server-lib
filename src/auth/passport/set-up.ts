// load all the things we need
import { GoogleAuthConfig, User, extractUser } from "./passport-utils";
import { GoogleJwtStrategy } from "./google-strategy";

import { PassportStatic } from "passport";

export const setUpPassport = (passport: PassportStatic, googleAuthConfig: GoogleAuthConfig) => {
  // required for persistent login sessions
  // passport needs ability to serialize and deserialize users out of session
  passport.serializeUser((user: User, done: Function) => {
    done(null, user);
  });

  passport.deserializeUser((user: User, done: Function) => {
    done(null, user);
  });

  const strategy = new GoogleJwtStrategy(googleAuthConfig, (accessToken, refreshToken, info, done) => {
    const email = String(info.email);
    if (!email.endsWith("grailbio.com")) {
      return done(new Error(`Must sign in with grailbio.com account, not ${email}`));
    }
    return done(null, extractUser(accessToken, refreshToken, info));
  });
  passport.use(strategy);
};
