import express from "express";
import { commentController } from "../controllers/commentController.js";
import { verifyToken } from "../middlewares/auth.js";

const routerComment = express.Router();

//GET ALL COMMENT
routerComment.get("/", commentController.getAllComment);

// CREATE COMMENT
routerComment.post("/", verifyToken, commentController.createComment);

// GET ALL REPLY FOR ONE COMMENT
routerComment.get("/:id/reply", commentController.getAllReplyForOneComment);

// CREATE REPLY
routerComment.post(
  "/reply/:id",
  verifyToken,
  commentController.createCommentReply
);

// GET ALL COMMENT FOR ONE POST
routerComment.get("/all/:idPost", commentController.getAllCommentForOnePost);

// GET ONE COMMENT
routerComment.get("/:id", commentController.getOneComment);

// LIKE / DISLIKE A COMMENT
routerComment.put(
  "/:id/like",
  verifyToken,
  commentController.changeLikeComment
);

// DELETE COMMENT
routerComment.delete("/:id", verifyToken, commentController.deleteComment);

// DELETE ALL COMMENT FOR A POST
routerComment.delete(
  "/delete/all",
  verifyToken,
  commentController.deleteAllCommentForPost
);

// DELETE REPLY
routerComment.delete("/reply/:id", verifyToken, commentController.deleteReply);

export default routerComment;
