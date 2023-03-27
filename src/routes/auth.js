import express from "express";
import { authController } from "../controllers/authController.js";

const routerAuth = express.Router();

// REGISTER
routerAuth.post("/register", authController.register);

// LOGIN
routerAuth.post("/login", authController.login);

// REFRESH TOKEN
routerAuth.post("/refreshToken", authController.refreshToken);

// LOGOUT
routerAuth.post("/logout", authController.logout);

export default routerAuth;
