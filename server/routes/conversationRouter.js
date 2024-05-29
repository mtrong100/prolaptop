import express from "express";
import { protectedRoute } from "../middlewares/protectedRoute.js";
import { getConversation } from "../controllers/conversationController.js";

const router = express.Router();

router.get("/", protectedRoute, getConversation);

export default router;
