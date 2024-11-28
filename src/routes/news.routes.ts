import { Router } from "express";
import { newsController } from "../controllers/news.controller";

const router = Router();

router.get("/", newsController.getNews);
router.get("/:id", newsController.getNewsById);
router.post("/", newsController.createNews);
router.put("/:id", newsController.updateNews);
router.delete("/:id", newsController.deleteNews);

export default router;
