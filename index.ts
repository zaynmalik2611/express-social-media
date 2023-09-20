import express, {
  Express,
  Request,
  Response,
  Application,
  NextFunction,
  ErrorRequestHandler,
} from "express";
import dotenv from "dotenv";
import postsRouter from "./src/routes/posts.router";

//For env File
dotenv.config();

const app: Application = express();
const port = process.env.PORT || 5000;

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
