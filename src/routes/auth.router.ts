import express, { Request, Response, NextFunction } from "express";
import passport from "passport";
const authRouter = express.Router();

const isLoggedIn = (req: Request, res: Response, next: NextFunction) => {
  if (req.user) {
    next();
  } else {
    res.sendStatus(401);
  }
};

authRouter.get(
  "/google",
  passport.authenticate("google", {
    scope: ["email", "profile"],
  })
);

authRouter.get(
  "/google/callback",
  passport.authenticate("google", {
    successRedirect: process.env.CLIENT_URL,
    failureRedirect: "/auth/failed",
  })
);

authRouter.get("/success", isLoggedIn, (req, res) => {
  res.status(200).json({
    success: true,
    message: "successful",
    user: req.user,
    // cookies: req.cookies,
  });
});

authRouter.get("/failed", (req, res) => {
  res.status(401).json({
    success: false,
    message: "failure",
  });
});

authRouter.get("/logout", (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      console.log("Error while destroying session:", err);
    } else {
      req.logout(() => {
        console.log("You are logged out");
        res.redirect(String(process.env.CLIENT_URL));
      });
    }
  });
});

export default authRouter;
