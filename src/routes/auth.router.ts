import express from "express";
import passport from "passport";
const authRouter = express.Router();

authRouter.get(
  "/google",
  passport.authenticate("google", {
    scope: ["email", "profile"],
  })
);

authRouter.get(
  "/google/callback",
  passport.authenticate("google", {
    failureRedirect: "/auth/failed",
  }),
  function (req, res) {
    res.redirect("/auth/success");
  }
);

authRouter.get("/success", (req, res) => {
  console.log("User is authenticated");
  res.send("Success");
});

authRouter.get("/failed", (req, res) => {
  console.log("User is not authenticated");
  res.send("Failed");
});

authRouter.get("/logout", (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      console.log("Error while destroying session:", err);
    } else {
      req.logout(() => {
        console.log("You are logged out");
        res.redirect("/home");
      });
    }
  });
});

export default authRouter;
