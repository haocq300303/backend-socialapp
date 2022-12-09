import express from "express";
import { commentController } from "../controllers/commentController.js";

const routerComment = express.Router();

// CREATE COMMENT
routerComment.post("/", commentController.createComment);

// GET ALL REPLY FOR ONE COMMENT
routerComment.get("/:id/reply", commentController.getAllReplyForOneComment);

// CREATE REPLY
routerComment.post("/reply/:id", commentController.createCommentReply);

// GET ALL COMMENT FOR ONE POST
routerComment.get("/all/:idPost", commentController.getAllCommentForOnePost);

// GET ONE COMMENT
routerComment.get("/:id", commentController.getOneComment);

// LIKE / DISLIKE A COMMENT
routerComment.put("/:id/like", commentController.changeLikeComment);

// DELETE COMMENT
routerComment.delete("/:id", commentController.deleteComment);

// DELETE REPLY
routerComment.delete("/reply/:id", commentController.deleteReply);

export default routerComment;
