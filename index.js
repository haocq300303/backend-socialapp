import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import morgan from "morgan";
import { connectDB } from "./src/config/db.js";
// import router from "./src/routes/index.js";
import routerAuth from "./src/routes/auth.js";
import routerComment from "./src/routes/commentRoute.js";
import routerPost from "./src/routes/postRoute.js";
import routerUser from "./src/routes/userRoute.js";
dotenv.config();
const app = express();
const PORT = process.env.PORT || 8080;

// connect DB
connectDB();

// middleware
app.use(cors());
app.use(morgan("combined"));
app.use(express.json());

// routes
app.use("/api/auth", routerAuth);
app.use("/api/users", routerUser);
app.use("/api/posts", routerPost);
app.use("/api/comments", routerComment);

// handle Error
app.use((err, req, res, next) => {
  const status = err.status || 500;
  const message = err.message || "Something went wrong!";
  return res.status(status).json({
    success: false,
    status,
    message,
  });
});

app.listen(PORT, () => {
  console.log(`Server listening to http://localhost:${PORT}`);
});
