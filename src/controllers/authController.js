import User from "../models/User.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { createError } from "../createError.js";
import { generateAccessToken } from "../utils/token.js";

export const authController = {
  register: async (req, res, next) => {
    try {
      const users = await User.find();
      const salt = await bcrypt.genSalt(10);
      const hashPassword = await bcrypt.hash(req.body.password, salt);

      const checkUsername = users.find(
        (item) => item.username === req.body.username
      );
      if (checkUsername)
        return next(createError(400, "Username already exists!"));

      const checkEmail = users.find((item) => item.email === req.body.email);
      if (checkEmail) return next(createError(400, "Email already exists!"));

      const newUser = new User({
        username: req.body.username,
        email: req.body.email,
        password: hashPassword,
      });

      await newUser.save();

      res.status(200).json(newUser);
    } catch (error) {
      next(error);
    }
  },
  login: async (req, res, next) => {
    try {
      const user = await User.findOne({ email: req.body.email });
      if (!user) {
        return next(createError(404, "User not found!!"));
      }

      const validPassword = await bcrypt.compare(
        req.body.password,
        user.password
      );
      if (!validPassword) {
        return next(createError(400, "Email/password is not valid!!"));
      }

      const accessToken = generateAccessToken(user);

      res.status(200).json({ accessToken });
    } catch (error) {
      next(error);
    }
  },
  refreshToken: async (req, res) => {
    const refreshToken = req.cookies.refreshToken;
    if (!refreshToken) return res.status(401).json("you`re not authenticate");
    jwt.verify(refreshToken, process.env.JWT_KEY, (error, user) => {
      if (error) {
        return res.status(401).json({
          message: "Token is not valid!",
        });
      }
      const newAccessToken = user;
      const newRefreshToken = generateAccessToken(newAccessToken);
      res.cookie("refreshToken", newRefreshToken, {
        httpOnly: true,
        secure: false,
        path: "/",
        sameSite: "strict",
      });
      return res.status(200).json({ newAccessToken, refreshToken });
    });
  },
  logout: (req, res) => {
    res.clearnCookie("refreshToken");
  },
};
