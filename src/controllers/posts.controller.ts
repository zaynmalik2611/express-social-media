import { NextFunction, Request, Response } from "express";
import { getAll } from "../services/posts.service";

const getAllPosts = async (req: Request, res: Response, next: NextFunction) => {
  try {
    res.json(await getAll());
  } catch (err) {
    console.log("error: ", err);
    next(err);
  }
};

export { getAllPosts };
