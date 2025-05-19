import { Router } from "express";
import ProtectedRoute from "../Middleware/ProtectedRoute.js";
import { createPost, deletePost, getPost, getPosts } from "../controllers/posts.controller.js";

const route = Router();

route.post("/createPost", ProtectedRoute, createPost);
route.delete("/deletePost", ProtectedRoute, deletePost);
route.get("/getPosts", ProtectedRoute, getPosts);
route.get("/getPost/:id", ProtectedRoute, getPost);

export default route;