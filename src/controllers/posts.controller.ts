import { NextFunction, Request, Response } from "express";
import { getAll, makePost } from "../services/posts.service";

const getAllPosts = async (req: Request, res: Response, next: NextFunction) => {
  try {
    res.json(await getAll());
  } catch (err) {
    console.log("error: ", err);
    next(err);
  }
};

const createPost = async (req: Request, res: Response, next: NextFunction) => {
  const { title, body } = req.body;
  try {
    res.json(await makePost(req.user?.email ?? "", title, body));
  } catch (error) {
    console.log("error: ", error);
    next(error);
  }
};

export { getAllPosts, createPost };
