import Post from "../modules/Post.js";
import User from "../modules/User.js";
import { createError } from "../createError.js";

export const postController = {
  createPost: (req, res, next) => {
    const newPost = new Post(req.body);
    try {
      setTimeout(async () => {
        await newPost.save();
        res.status(200).json(newPost);
      }, 1000);
    } catch (error) {
      next(error);
    }
  },
  getOnePost: async (req, res, next) => {
    try {
      const post = await Post.findById(req.params.id);
      !post && next(createError(404, "Post not found!!"));
      res.status(200).json(post);
    } catch (error) {
      next(error);
    }
  },
  getAllPost: async (req, res, next) => {
    try {
      const posts = await Post.find({});
      res.status(200).json(posts);
    } catch (error) {
      next(error);
    }
  },
  updatePost: (req, res, next) => {
    try {
      setTimeout(async () => {
        const post = await Post.findById(req.params.id);
        if (post.userId === req.body.userId) {
          await post.updateOne({ $set: req.body });
          res.status(200).json("The post has been updated!!");
        } else {
          next(createError(403, "You can update only your post!"));
        }
      }, 1000);
    } catch (error) {
      next(error);
    }
  },
  deletePost: (req, res, next) => {
    try {
      setTimeout(async () => {
        const post = await Post.findById(req.params.id);
        if (post.userId === req.body.userId) {
          await post.deleteOne();
          res.status(200).json("The post has been deleted!!");
        } else {
          next(createError(403, "You can delete only your post!"));
        }
      }, 1000);
    } catch (error) {
      next(error);
    }
  },
  changeLikePost: async (req, res, next) => {
    try {
      const post = await Post.findById(req.params.id);
      if (!post.likes.includes(req.body.userId)) {
        await post.updateOne({ $push: { likes: req.body.userId } });
        res.status(200).json("you have been like post!");
      } else {
        await post.updateOne({ $pull: { likes: req.body.userId } });
        res.status(200).json("The post has been disliked!!");
      }
    } catch (error) {
      next(error);
      ``;
    }
  },
  sharePost: async (req, res, next) => {
    try {
      const post = await Post.findById(req.params.id);
      await post.updateOne({ $push: { shares: req.body.userId } });
      res.status(200).json("The post has been share!!");
    } catch (error) {
      next(error);
    }
  },
  timelinePost: (req, res, next) => {
    try {
      setTimeout(async () => {
        const currentUser = await User.findById(req.body.userId);
        const userPost = await Post.find({ userId: currentUser._id });
        const friendPosts = await Promise.all(
          currentUser.followings.map((friendId) => {
            return Post.find({ userId: friendId });
          })
        );
        res.status(200).json(userPost.reverse().concat(...friendPosts));
      }, 1500);
    } catch (error) {
      next(error);
    }
  },
  getAllPostForOneUser: async (req, res, next) => {
    try {
      const posts = await Post.find();
      const result = posts.filter((item) => item.userId === req.params.userId);
      res.status(200).json(result.reverse());
    } catch (error) {
      next(error);
    }
  },
  loadAllImagePost: async (req, res, next) => {
    try {
      const posts = await Post.find({});
      const allPostForOneUser = posts.filter(
        (item) =>
          item.userId === req.params.idUser && item.image !== "" && item.image
      );
      const result = allPostForOneUser.map((item) => {
        return { id: item._id, image: item.image };
      });
      res.status(200).json(result);
    } catch (error) {
      next(error);
    }
  },
};
