import prisma from "./prisma";
import { Profile, VerifyCallback } from "passport-google-oauth20";

export const googleLoginOrSignUp = async (
  profile: Profile,
  cb: VerifyCallback
) => {
  try {
    const user = await prisma.user.findUnique({
      where: {
        email: profile._json.email,
      },
    });
    if (user) {
      return cb(null, user);
    } else {
      const createdUser = await prisma.user.create({
        data: {
          email: profile._json.email ?? "",
          firstName: profile._json.given_name ?? "",
          lastName: profile._json.family_name ?? "",
        },
      });
      return cb(null, createdUser);
    }
  } catch (error: any) {
    console.log("error: ", error);
    return cb(error);
  }
};
