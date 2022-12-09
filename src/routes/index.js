import routerAuth from "./auth.js";
import routerComment from "./commentRoute.js";
import routerPost from "./postRoute.js";
import routerUser from "./userRoute.js";

const router = (app) => {
  app.use("/api/auth", routerAuth);
  app.use("/api/users", routerUser);
  app.use("/api/posts", routerPost);
  app.use("/api/comments", routerComment);
};
export default router;
