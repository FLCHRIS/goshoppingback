import { Router } from "express";
import * as authController from "../controllers/auth.controllers";

const router = Router();

router.post("/register", authController.register);

export default router;
