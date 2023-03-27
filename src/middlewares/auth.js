import jwt from "jsonwebtoken";

export const verifyToken = (req, res, next) => {
  const token = req.headers.token;
  if (token) {
    const accessToken = token.split(" ")[1];
    jwt.verify(accessToken, process.env.JWT_KEY, (error, user) => {
      if (error) {
        return res.status(401).json({
          message: "Token is not valid!",
        });
      }
      req.user = user;
      next();
    });
  } else {
    res.status(402).json("You're not authenticated");
  }
};
