import User from "../modules/User.js";
import bcrypt from "bcryptjs";
import { createError } from "../createError.js";

export const userController = {
  getOneUser: async (req, res, next) => {
    try {
      const user = await User.findById(req.params.id);
      !user && next(createError(404, "User not found!!"));
      res.status(200).json(user);
    } catch (error) {
      next(error);
    }
  },
  getAllUser: (req, res, next) => {
    try {
      setTimeout(async () => {
        const user = await User.find({});
        res.status(200).json(user);
      }, 1000);
    } catch (error) {
      next(error);
    }
  },
  updateUser: async (req, res, next) => {
    if (req.body.userId === req.params.id || req.user.isAdmin) {
      if (req.body.password) {
        try {
          const salt = await bcrypt.genSalt(10);
          req.body.password = await bcrypt.hash(req.body.password, salt);
        } catch (error) {
          next(error);
        }
      }
      try {
        await User.findByIdAndUpdate(req.params.id, { $set: req.body });
        res.status(200).json("Account has been updated");
      } catch (error) {
        next(error);
      }
    } else {
      next(createError(403, "You can update only your account!!"));
    }
  },
  deleteUser: async (req, res, next) => {
    if (req.body.userId === req.params.id || req.user.isAdmin) {
      try {
        await User.findByIdAndDelete(req.params.id);
        res.status(200).json("Account has been deleted!!");
      } catch (error) {
        next(error);
      }
    } else {
      next(createError(403, "You can delete only your account!!"));
    }
  },
  followUser: async (req, res, next) => {
    if (req.body.userId !== req.params.id) {
      try {
        const user = await User.findById(req.params.id);
        const currentUser = await User.findById(req.body.userId);

        if (!user.followers.includes(req.body.userId)) {
          await user.updateOne({ $push: { followers: req.body.userId } });
          await currentUser.updateOne({ $push: { followings: req.params.id } });
          res.status(200).json("User has been followed!!");
        } else {
          next(createError(403, "you allready follow this user!"));
        }
      } catch (error) {
        next(error);
      }
    } else {
      next(createError(403, "You cant follow youself!!"));
    }
  },
  unFollowUser: async (req, res, next) => {
    if (req.body.userId !== req.params.id) {
      try {
        const user = await User.findById(req.params.id);
        const currentUser = await User.findById(req.body.userId);

        if (user.followers.includes(req.body.userId)) {
          await user.updateOne({ $pull: { followers: req.body.userId } });
          await currentUser.updateOne({ $pull: { followings: req.params.id } });
          res.status(200).json("User has been unfollowed!!");
        } else {
          next(createError(403, "you allready unfollow this user"));
        }
      } catch (error) {
        next(error);
      }
    } else {
      next(createError(403, "You cant unfollow youself!!"));
    }
  },
  searchUser: async (req, res, next) => {
    try {
      const user = await User.find({});
      const result = (await user).filter((item) =>
        item.username.toLowerCase().includes(req.params.username.toLowerCase())
      );
      const datas = result.map((data) => {
        return {
          id: data._id,
          avatar: data.avatar,
          username: data.username,
        };
      });
      res.status(200).json(datas);
    } catch (error) {
      next(error);
    }
  },
};
