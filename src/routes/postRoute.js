import express from "express";
import { postController } from "../controllers/postController.js";
import { verifyToken } from "../middlewares/auth.js";

const routerPost = express.Router();

// CREATE A POST
routerPost.post("/", verifyToken, postController.createPost);

// GET A POST
routerPost.get("/:id", postController.getOnePost);

// GET ALL POST
routerPost.get("/", postController.getAllPost);

//GET ALL POST FOR USER
routerPost.get("/all/:userId", postController.getAllPostForOneUser);

// UPDATE A POST
routerPost.put("/:id", verifyToken, postController.updatePost);

// DELETE A POST
routerPost.delete("/:id", verifyToken, postController.deletePost);

// LIKE / DISLIKE A POST
routerPost.put("/:id/like", verifyToken, postController.changeLikePost);

// SHARE A POST
routerPost.put("/:id/share", verifyToken, postController.sharePost);

// GET TIMELINE POST
routerPost.post("/timeline/all", verifyToken, postController.timelinePost);

// LOAD ALL IMAGE FOR USER
routerPost.get("/images/:idUser", postController.loadAllImagePost);

// GET SUGGESTED POST
routerPost.get("/suggested/all", postController.getSuggestedPost);

export default routerPost;
