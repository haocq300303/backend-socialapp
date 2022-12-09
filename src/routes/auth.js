import express from "express";
import { authController } from "../controllers/authController.js";

const routerAuth = express.Router();

// REGISTER
routerAuth.post("/register", authController.register);

// LOGIN
routerAuth.post("/login", authController.login);

export default routerAuth;
