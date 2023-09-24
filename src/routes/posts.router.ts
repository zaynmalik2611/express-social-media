import express from "express";
import { createPost, getAllPosts } from "../controllers/posts.controller";
const postsRouter = express.Router();

postsRouter.get("/", getAllPosts);
postsRouter.post("/", createPost);

export default postsRouter;
