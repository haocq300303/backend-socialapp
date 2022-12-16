import express from "express";
import { userController } from "../controllers/userController.js";

const routerUser = express.Router();

// GET A USER
routerUser.get("/:id", userController.getOneUser);

// GET ALL USER
routerUser.get("/", userController.getAllUser);

// UPDATE USER
routerUser.put("/:id", userController.updateUser);

// DELETE USER
routerUser.delete("/:id", userController.deleteUser);

// FOLLOW USER
routerUser.put("/:id/follow", userController.followUser);

// UNFOLLOW USER
routerUser.put("/:id/unfollow", userController.unFollowUser);

//SEARCH USER
routerUser.get("/search/:username", userController.searchUser);

// GET FOLLOWERS
routerUser.get("/follower/:id", userController.getFollower);

export default routerUser;
