import { Router } from "express";
import { getNews } from "../controllers/news.controller.js";
import { protectRoute } from "../middlewares/auth.middleware.js";

const router = Router();
router.use(protectRoute);

router.get("/", getNews);

export { router as newsRoutes };
