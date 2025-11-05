import express from "express";
import cookieParser from "cookie-parser";
import { authRoutes } from "./routes/auth.routes.js";
import { newsRoutes } from "./routes/news.routes.js";

const app = express();
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Sample route
app.get("/", (req, res) => {
  res.send("News Aggregator API is Running on Port 3000");
});

app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/news", newsRoutes);

export { app };
