import { Router } from "express";
import { authMiddleware } from "../middlewares/auth.middleware";
import dengueRoutes from "./dengue.routes";
import authRoutes from "./auth.routes";
import userRoutes from "./user.routes";
import newsletterRoutes from "./newsletter.routes";
import healthCheckRoutes from "./health.routes";
import newsRoutes from "./news.routes";

const router = Router();

router.use("/", dengueRoutes);
router.use("/auth", authRoutes);
router.use("/users", authMiddleware, userRoutes);
router.use("/news", authMiddleware, newsRoutes);
router.use("/newsletter", newsletterRoutes);
router.use("/health-check", healthCheckRoutes);

export default router;
