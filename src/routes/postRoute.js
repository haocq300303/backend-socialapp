import express from "express";
import { postController } from "../controllers/postController.js";

const routerPost = express.Router();

// CREATE A POST
routerPost.post("/", postController.createPost);

// GET A POST
routerPost.get("/:id", postController.getOnePost);

// GET ALL POST
routerPost.get("/", postController.getAllPost);

//GET ALL POST FOR USER
routerPost.get("/all/:userId", postController.getAllPostForOneUser);

// UPDATE A POST
routerPost.put("/:id", postController.updatePost);

// DELETE A POST
routerPost.delete("/:id", postController.deletePost);

// LIKE / DISLIKE A POST
routerPost.put("/:id/like", postController.changeLikePost);

// SHARE A POST
routerPost.put("/:id/share", postController.sharePost);

// GET TIMELINE POST
routerPost.post("/timeline/all", postController.timelinePost);

// LOAD ALL IMAGE FOR USER
routerPost.get("/images/:idUser", postController.loadAllImagePost);

export default routerPost;
