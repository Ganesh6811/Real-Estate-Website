import {Router} from "express";
import ProtectedRoute from "../Middleware/ProtectedRoute.js";
import { savePost, sendMail, unSavePost, updateProfilePic } from "../controllers/user.controller.js";

const route = Router();

route.post("/updateProfilePic", ProtectedRoute, updateProfilePic);
route.post("/savePost", ProtectedRoute, savePost);
route.post("/unSavePost", ProtectedRoute, unSavePost);
route.post("/sendMail", ProtectedRoute, sendMail);

export default route;