import Comment from "../modules/Comment.js";
import User from "../modules/User.js";
import { createError } from "../createError.js";

export const commentController = {
  createComment: async (req, res, next) => {
    const newComment = new Comment(req.body);
    try {
      await newComment.save();
      res.status(200).json("Create comment successfully!!!");
    } catch (error) {
      next(error);
    }
  },
  createCommentReply: async (req, res, next) => {
    try {
      const comment = await Comment.findById(req.params.id);
      const reply = {
        _id: req.body.idReply,
        userId: req.body.userId,
        content: req.body.content,
      };
      await comment.updateOne({ $push: { replies: reply } });
      res.status(200).json("The comment has been reply!!");
    } catch (error) {
      next(error);
    }
  },
  getAllReplyForOneComment: async (req, res, next) => {
    try {
      const dataUserReply = [];
      const comment = await Comment.findById(req.params.id);
      const responses = await Promise.all(
        comment.replies.map(async (item) => {
          return await User.findById(item.userId);
        })
      );
      for (const response of responses) {
        dataUserReply.push({
          _id: response._id,
          avatar: response.avatar,
          username: response.username,
          desc: response.desc,
          city: response.city,
        });
      }
      res.status(200).json(dataUserReply);
    } catch (error) {
      next(error);
    }
  },
  getAllCommentForOnePost: (req, res, next) => {
    try {
      setTimeout(async () => {
        const comments = await Comment.find({});
        const idPost = req.params.idPost;
        const result = comments.filter((item) => item.idPost === idPost);
        res.status(200).json(result);
      }, 1000);
    } catch (error) {
      next(error);
    }
  },
  getOneComment: async (req, res, next) => {
    try {
      const comment = await Comment.findById(req.params.id);
      res.status(200).json(comment);
    } catch (error) {
      next(error);
    }
  },
  deleteComment: async (req, res, next) => {
    try {
      const comment = await Comment.findById(req.params.id);
      if (
        req.body.idCurrentUser === req.body.idAdminPost ||
        req.body.userId === comment.userId
      ) {
        await comment.deleteOne();
        res.status(200).json("The comment has been deleted!!");
      } else {
        next(createError(403, "You can delete only your comment!"));
      }
    } catch (error) {
      next(error);
    }
  },
  deleteReply: async (req, res, next) => {
    try {
      const comment = await Comment.findById(req.params.id);
      if (
        req.body.idCurrentUser === req.body.idAdminPost ||
        req.body.userId === comment.userId ||
        comment.replies.some((item) => item.userId === req.body.idCurrentUser)
      ) {
        await comment.updateOne({
          $pull: { replies: { _id: req.body.idReply } },
        });
        res.status(200).json("The reply has been deleted!!");
      } else {
        next(createError(403, "You can delete only your reply in my comment!"));
      }
    } catch (error) {
      next(error);
    }
  },
  changeLikeComment: async (req, res, next) => {
    try {
      const comment = await Comment.findById(req.params.id);
      if (!comment.likes.includes(req.body.userId)) {
        await comment.updateOne({ $push: { likes: req.body.userId } });
        res.status(200).json("you have been like comment!");
      } else {
        await comment.updateOne({ $pull: { likes: req.body.userId } });
        res.status(200).json("The comment has been disliked!!");
      }
    } catch (error) {
      next(error);
    }
  },
};
