import { Router } from "express";
import { dengueController } from "../controllers/dengue.controller";

const router = Router();

router.get("/dengue", dengueController.getDengueData);

export default router;
