import express from "express";
import { userController } from "../controllers/userController.js";
import { verifyToken } from "../middlewares/auth.js";

const routerUser = express.Router();

// GET A USER
routerUser.get("/:id", userController.getOneUser);

// GET ALL USER
routerUser.get("/", verifyToken, userController.getAllUser);

// UPDATE USER
routerUser.put("/:id", verifyToken, userController.updateUser);

// DELETE USER
routerUser.delete("/:id", verifyToken, userController.deleteUser);

// FOLLOW USER
routerUser.put("/:id/follow", verifyToken, userController.followUser);

//SEARCH USER
routerUser.get("/search/:username", userController.searchUser);

// GET FOLLOWERS
routerUser.get("/follower/:id", userController.getFollower);

//GET USER SUGGESTED
routerUser.get("/suggested/all", userController.getUserSuggested);

export default routerUser;
