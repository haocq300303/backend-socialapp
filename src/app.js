import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import morgan from "morgan";
import { connectDB } from "./config/db.js";
import router from "./routes/index.js";

dotenv.config();
const app = express();
const PORT = process.env.PORT;

// connect DB
connectDB();

// middleware
app.use(cors());
app.use(morgan('combined'));
app.use(express.json());

// routes
router(app);

// handle Error
app.use((err, req, res, next) => {
   const status = err.status || 500;
   const message = err.message || "Something went wrong!";
   return res.status(status).json({
      success: false,
      status,
      message
   })
})

app.listen(PORT, () => {
   console.log(`Server listening to http://localhost:${PORT}`);
})