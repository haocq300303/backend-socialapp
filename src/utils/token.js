import jwt from "jsonwebtoken";

export const generateAccessToken = ({ _doc: data }) => {
  const { password, ...otherData } = data;
  return jwt.sign(otherData, process.env.JWT_KEY, { expiresIn: "1d" });
};
