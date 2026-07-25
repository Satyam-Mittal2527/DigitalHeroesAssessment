import { getCurrentUserController, loginUser } from "../controllers/user_controller.js";
import { Router } from "express";

const router = Router();

console.log("userRoutes loaded");

router.post("/login", loginUser);
router.get("/me", getCurrentUserController);

export default router;