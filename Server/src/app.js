import express from "express";
import morgan from "morgan";
import authRoutes from "./Routes/auth.routes.js";
import postsRoutes from "./Routes/posts.routes.js";
import commentRoutes from "./Routes/comment.routes.js";
import cookieParser from "cookie-parser";
import cors from 'cors';

const app = express();

app.use(morgan("dev"));
app.use(express.json());
app.use(cookieParser());
app.use(cors({
  origin: process.env.FRONTEND_URL || "http://localhost:5173",
  credentials: true
}));

app.use("/api", authRoutes);
app.use("/api", postsRoutes);
app.use("/api",commentRoutes)

export default app;
