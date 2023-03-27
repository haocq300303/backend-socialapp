import User from "../models/User.js";
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
          await user.updateOne({ $pull: { followers: req.body.userId } });
          await currentUser.updateOne({ $pull: { followings: req.params.id } });
          res.status(200).json("User has been unfollowed!!");
        }
      } catch (error) {
        next(error);
      }
    } else {
      next(createError(403, "You cant follow youself!!"));
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
          email: data.email,
        };
      });
      res.status(200).json(datas);
    } catch (error) {
      next(error);
    }
  },
  getFollower: async (req, res, next) => {
    try {
      if (req.params.id) {
        const dataFollowers = [];
        const userList = await User.findById(req.params.id);
        const responses = await Promise.all(
          userList.followers.map(async (item) => {
            return await User.findById(item);
          })
        );
        for (const response of responses) {
          dataFollowers.push({
            _id: response._id,
            email: response.email,
            avatar: response.avatar,
            username: response.username,
            desc: response.desc,
            city: response.city,
          });
        }
        res.status(200).json(dataFollowers);
      } else {
        res.status(400).json({ message: "something error!!" });
      }
    } catch (error) {
      next(error);
    }
  },
  getUserSuggested: async (req, res, next) => {
    try {
      const users = await User.find({});
      const bands = ["Nike", "Adidas", "Gucci", "Chanel"];
      const results = [];
      bands.forEach((item) => {
        const result = users.find((value) => value.username === item);
        if (!result) return;
        results.push(result);
      });
      res.status(200).json(results);
    } catch (error) {
      next(error);
    }
  },
};
