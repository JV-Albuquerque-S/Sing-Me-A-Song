import { Router } from "express";
import { reset } from "../controllers/testController.js";

const router = Router();

router.post("/reset", reset);

export default router;