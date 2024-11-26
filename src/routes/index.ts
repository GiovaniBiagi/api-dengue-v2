import { Router } from "express";
import dengueRoutes from "./dengue/dengue.routes";

const router = Router();
const apiVersion = process.env.API_VERSION;

router.use(`/${apiVersion}`, dengueRoutes);

export default router;
