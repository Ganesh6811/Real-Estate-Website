import { Router } from "express";
import { checkAuth, login, logOut, signUp } from "../controllers/auth.controller.js";
import ProtectedRoute from "../Middleware/ProtectedRoute.js";

const route = Router();

route.post("/signUp", signUp);
route.post("/login", login);
route.get("/logOut", logOut);
route.get("/checkAuth", ProtectedRoute, checkAuth);

export default route;