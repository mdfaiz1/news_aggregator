import { Router } from "express";
import {
  registerUser,
  verifyEmail,
  loginUser,
  logoutUser,
} from "../controllers/auth.controller.js";

const router = Router();

router.post("/register", registerUser);
router.post("/verify-email", verifyEmail);
router.post("/login", loginUser);
router.post("/logout", logoutUser);

export { router as authRoutes };
