import express from "express";
import { getAllPosts } from "../controllers/posts.controller";
const postsRouter = express.Router();

postsRouter.get("/", getAllPosts);

export default postsRouter;
