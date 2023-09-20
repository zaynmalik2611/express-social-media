import express, {
  Express,
  Request,
  Response,
  Application,
  NextFunction,
  ErrorRequestHandler,
} from "express";
import dotenv from "dotenv";
import session from "express-session";
import passport from "passport";
import postsRouter from "./src/routes/posts.router";

//For env File
dotenv.config();
import "./src/utils/google.strategy";

const app: Application = express();
const port = process.env.PORT || 5000;

app.use(
  session({
    secret: process.env.SESSION_SECRET ?? "",
    resave: false,
    saveUninitialized: false,
  })
);

app.use(passport.initialize());
app.use(passport.session());

app.get(
  "/google",
  passport.authenticate("google", {
    scope: ["email", "profile"],
  })
);

app.get(
  "/google/callback",
  passport.authenticate("google", {
    failureRedirect: "/failed",
  }),
  function (req, res) {
    res.redirect("/success");
  }
);

app.get("/failed", (req, res) => {
  console.log("User is not authenticated");
  res.send("Failed");
});

app.get("/logout", (req, res) => {
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

app.use("/posts", postsRouter);

app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  const statusCode = err.status || 500;
  console.error(err.message, err.stack);
  res.status(statusCode).json({ message: err.message });

  return;
});

app.listen(port, () => {
  console.log(`Server is Fire at http://localhost:${port}`);
});
